#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const cwd = process.cwd();
const STATE_DIR = path.join(cwd, '.suite', 'state');

function jsonOut(value) { process.stdout.write(JSON.stringify(value)); }
function readStdin() { return fs.readFileSync(0, 'utf8'); }
function sha256(s) { return crypto.createHash('sha256').update(s).digest('hex'); }
function run(command, opts = {}) {
  const r = spawnSync(command, { cwd: opts.cwd || cwd, encoding: 'utf8', shell: true, timeout: opts.timeout || 120000, env: process.env });
  return { status: r.status ?? 1, stdout: r.stdout || '', stderr: r.stderr || '', error: r.error?.message || '' };
}
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function statePath(sessionId) { return path.join(STATE_DIR, `${sessionId}.json`); }
function loadState(sessionId) { const p = statePath(sessionId); return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null; }
function saveState(s) { ensureDir(STATE_DIR); fs.writeFileSync(statePath(s.sessionId), JSON.stringify(s, null, 2)); }
function normalizePath(p) { return String(p || '').replaceAll('\\', '/').replace(/^\.\//, ''); }
function patternToRegex(pattern) {
  const escaped = normalizePath(pattern).replace(/[.+^${}()|[\]\\]/g, '\\$&').replaceAll('**', '__DOUBLE_STAR__').replaceAll('*', '[^/]*').replaceAll('__DOUBLE_STAR__', '.*');
  return new RegExp(`^${escaped}$`);
}
export function matchesAny(file, patterns = []) { const f = normalizePath(file); return patterns.some(p => patternToRegex(p).test(f)); }

export function validateContract(c) {
  const errors = [];
  if (!c || typeof c !== 'object') return ['contract must be an object'];
  if (!String(c.objective || '').trim()) errors.push('objective required');
  if (!Array.isArray(c.allowedFiles) || c.allowedFiles.length === 0) errors.push('allowedFiles required');
  if (!Array.isArray(c.acceptance) || c.acceptance.length === 0) errors.push('acceptance required');
  if (!Array.isArray(c.forbiddenFiles)) errors.push('forbiddenFiles must be an array');
  if (c.docsOnly !== true && (!Array.isArray(c.tests) || c.tests.length === 0)) errors.push('at least one deterministic test required');
  for (const t of c.tests || []) {
    if (!t || typeof t !== 'object' || !String(t.name || '').trim() || !String(t.command || '').trim()) errors.push('each test needs name and command');
    if (t?.command && !/^(npm( |$)|npx( |$)|node( |$)|python3?( |$)|git diff --check$)/.test(t.command)) errors.push(`unsafe test command: ${t.command}`);
  }
  if (!c.runtime || typeof c.runtime !== 'object') errors.push('runtime object required');
  if (c.runtime?.required === true && !c.runtime.command && !c.runtime.url) errors.push('runtime.required needs command or url');
  const attempts = Number(c.maxRepairAttempts ?? 2);
  if (!Number.isInteger(attempts) || attempts < 0 || attempts > 3) errors.push('maxRepairAttempts must be 0..3');
  if (c.allowExternalWrites === true) errors.push('allowExternalWrites cannot be enabled by suite contract');
  return errors;
}

export function validateWorkflowObject(wf) {
  const errors = [];
  if (!wf || typeof wf !== 'object') return ['workflow JSON must be an object'];
  const nodes = Array.isArray(wf.nodes) ? wf.nodes : [];
  const connections = wf.connections && typeof wf.connections === 'object' ? wf.connections : {};
  if (nodes.length < 8) errors.push('workflow requires at least 8 nodes');
  if (!Object.keys(connections).length) errors.push('workflow connections missing');
  const names = new Set(nodes.map(n => String(n.name || '').toLowerCase()));
  const required = ['suite webhook','normalize task','contract gate','contract valid?','evidence gate','evidence valid?','pass response','fail response'];
  for (const name of required) if (!names.has(name)) errors.push(`required node missing: ${name}`);
  if (!nodes.find(n => String(n.type || '').includes('webhook'))) errors.push('webhook trigger missing');
  if (nodes.filter(n => String(n.type || '') === 'n8n-nodes-base.if').length < 2) errors.push('two independent IF gates required');
  const referenced = new Set(Object.keys(connections).map(x => x.toLowerCase()));
  for (const source of Object.values(connections)) {
    for (const group of Object.values(source || {})) for (const branch of group || []) for (const edge of branch || []) if (edge?.node) referenced.add(String(edge.node).toLowerCase());
  }
  for (const name of required) if (!referenced.has(name)) errors.push(`required node disconnected: ${name}`);
  return errors;
}

function parseStatus(text) {
  return text.split(/\r?\n/).filter(Boolean).map(line => normalizePath(line.slice(3).trim().replace(/^.* -> /, '')));
}
function currentChangedFiles(baseSha) {
  const tracked = run(`git diff --name-only ${baseSha} --`).stdout.split(/\r?\n/).filter(Boolean).map(normalizePath);
  const status = parseStatus(run('git status --porcelain').stdout);
  return [...new Set([...tracked, ...status])];
}
function isMutatingTool(name) { return /^(write_file|replace|edit_file|apply_patch|delete_file|move_file)$/i.test(name || ''); }
function extractTarget(input = {}) { return normalizePath(input.file_path || input.path || input.filePath || input.target || ''); }
function shellLooksMutating(command='') { return /(^|\s)(rm|mv|cp|install|truncate|touch)(\s|$)|(^|\s)(sed\s+-i|perl\s+-pi|git\s+(apply|restore|checkout\s+--|reset|clean|commit|push)|firebase\s+deploy)(\s|$)|(^|[^>])>{1,2}[^>]/i.test(command); }
function shellIsContract(command='') { return /node\s+scripts\/master-suite-v2\.mjs\s+contract\b/.test(command); }
function shellIsReadOnly(command='') { return /^(git\s+(status|diff|show|log|rev-parse)|rg\b|grep\b|cat\b|ls\b|find\b|pwd\b|node\s+scripts\/master-suite-v2\.mjs\s+validate-workflow\b)/.test(command.trim()); }

async function beforeAgent(input) {
  const prompt = String(input.prompt || '');
  if (!prompt.includes('[MASTER_SUITE_V2]')) return jsonOut({ suppressOutput: true });
  const baselineSha = run('git rev-parse HEAD').stdout.trim();
  if (!/^[0-9a-f]{40}$/.test(baselineSha)) return jsonOut({ decision:'deny', reason:'MASTER_SUITE_V2 requires a git repository with a valid HEAD.' });
  const state = { version:2, sessionId: input.session_id, active:true, promptHash:sha256(prompt), baselineSha, baselineDirty:parseStatus(run('git status --porcelain').stdout), attempts:0, contract:null, startedAt:new Date().toISOString() };
  saveState(state);
  return jsonOut({ suppressOutput:true, hookSpecificOutput:{ additionalContext:[
    'MASTER_SUITE_V2 ACTIVE. Fail-closed enforcement is enabled.',
    'Before any repository mutation, create .suite/contract-input.json and run: node scripts/master-suite-v2.mjs contract .suite/contract-input.json',
    'Contract fields: objective, allowedFiles, forbiddenFiles, acceptance, tests, runtime, maxRepairAttempts<=3, allowExternalWrites=false.',
    'Use scoped file-edit tools. Shell file mutation, deploy and push are blocked.',
    'AfterAgent verification is the completion oracle.'
  ].join('\n') } });
}

async function beforeTool(input) {
  const state = loadState(input.session_id);
  if (!state?.active) return jsonOut({ suppressOutput:true });
  const tool = String(input.tool_name || '');
  const ti = input.tool_input || {};
  if (/run_shell_command/i.test(tool)) {
    const command = String(ti.command || ti.cmd || '');
    if (/git\s+push\s+.*(--force|-f)|git\s+reset\s+--hard|git\s+clean\s+-[a-z]*f|firebase\s+deploy/i.test(command)) return jsonOut({ decision:'deny', reason:'MASTER_SUITE_V2 blocks destructive/external shell actions.' });
    if (!state.contract && !shellIsContract(command) && !shellIsReadOnly(command)) return jsonOut({ decision:'deny', reason:'Register the execution contract before mutation or non-read-only shell execution.' });
    if (state.contract && shellLooksMutating(command) && !shellIsContract(command)) return jsonOut({ decision:'deny', reason:'Shell-based file mutation is blocked. Use scoped file editing tools.' });
  }
  if (isMutatingTool(tool)) {
    const target = extractTarget(ti);
    if (!state.contract) {
      if (target === '.suite/contract-input.json') return jsonOut({ suppressOutput:true });
      return jsonOut({ decision:'deny', reason:'Execution contract must be registered before repository mutation.' });
    }
    if (!target) return jsonOut({ decision:'deny', reason:'Cannot determine mutation target path.' });
    if (matchesAny(target, state.contract.forbiddenFiles || [])) return jsonOut({ decision:'deny', reason:`Forbidden path: ${target}` });
    if (!matchesAny(target, state.contract.allowedFiles || [])) return jsonOut({ decision:'deny', reason:`Path outside execution contract: ${target}` });
  }
  return jsonOut({ suppressOutput:true });
}

async function verifyState(state) {
  const failures = [];
  const evidence = { baselineSha:state.baselineSha, changedFiles:[], tests:[], runtime:null, diffCheck:null };
  const c = state.contract;
  if (!c) return { ok:false, failures:['execution contract missing'], evidence };
  failures.push(...validateContract(c));
  const changed = currentChangedFiles(state.baselineSha).filter(f => !state.baselineDirty.includes(f) && !f.startsWith('.suite/'));
  evidence.changedFiles = changed;
  if (changed.length === 0 && c.docsOnly !== true) failures.push('no repository change detected');
  for (const f of changed) {
    if (matchesAny(f, c.forbiddenFiles || [])) failures.push(`forbidden file changed: ${f}`);
    if (!matchesAny(f, c.allowedFiles || [])) failures.push(`unrelated file changed: ${f}`);
  }
  const dc = run('git diff --check', { timeout:30000 });
  evidence.diffCheck = { status:dc.status, output:(dc.stdout+dc.stderr).trim().slice(0,4000) };
  if (dc.status !== 0) failures.push('git diff --check failed');
  for (const t of c.tests || []) {
    const rr = run(t.command, { timeout:Math.min(Number(t.timeoutMs || 120000),300000) });
    evidence.tests.push({ name:t.name, command:t.command, status:rr.status, output:(rr.stdout+rr.stderr).trim().slice(-5000) });
    if (rr.status !== 0) failures.push(`test failed: ${t.name}`);
  }
  if (c.runtime?.required === true) {
    if (c.runtime.command) {
      const rr = run(c.runtime.command, { timeout:Math.min(Number(c.runtime.timeoutMs || 120000),300000) });
      evidence.runtime = { type:'command', status:rr.status, output:(rr.stdout+rr.stderr).trim().slice(-5000) };
      if (rr.status !== 0) failures.push('runtime command failed');
    } else if (c.runtime.url) {
      try {
        const controller = new AbortController();
        setTimeout(()=>controller.abort(), Math.min(Number(c.runtime.timeoutMs || 15000),30000));
        const resp = await fetch(c.runtime.url, { signal:controller.signal, redirect:'follow' });
        const expected = Number(c.runtime.expectedStatus || 200);
        evidence.runtime = { type:'http', status:resp.status, url:c.runtime.url };
        if (resp.status !== expected) failures.push(`runtime HTTP ${resp.status}, expected ${expected}`);
      } catch (e) {
        evidence.runtime = { type:'http', error:String(e) };
        failures.push('runtime HTTP readback failed');
      }
    }
  }
  return { ok:failures.length===0, failures, evidence };
}

async function afterAgent(input) {
  const state = loadState(input.session_id);
  if (!state?.active) return jsonOut({ suppressOutput:true });
  const result = await verifyState(state);
  state.attempts += 1;
  state.lastVerification = { at:new Date().toISOString(), ...result };
  saveState(state);
  if (result.ok) return jsonOut({ suppressOutput:true, decision:'allow' });
  const max = Number(state.contract?.maxRepairAttempts ?? 2);
  const message = `MASTER_SUITE_V2 verification failed:\n- ${result.failures.join('\n- ')}\nRepair only within the contract and rerun verification.`;
  if (state.attempts <= max && input.stop_hook_active !== true) return jsonOut({ decision:'deny', reason:message, suppressOutput:true });
  return jsonOut({ continue:false, stopReason:`MASTER_SUITE_V2 STOP: verification still failing after ${state.attempts} attempt(s).`, suppressOutput:false });
}

async function registerContract(file) {
  if (!file || !fs.existsSync(file)) throw new Error('contract file missing');
  const contract = JSON.parse(fs.readFileSync(file,'utf8'));
  const errors = validateContract(contract);
  if (errors.length) throw new Error(errors.join('; '));
  const states = fs.existsSync(STATE_DIR) ? fs.readdirSync(STATE_DIR).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(path.join(STATE_DIR,f),'utf8'))).filter(s=>s.active).sort((a,b)=>String(b.startedAt).localeCompare(String(a.startedAt))) : [];
  if (!states.length) throw new Error('no active suite session');
  const state = states[0];
  state.contract = contract;
  state.contractHash = sha256(JSON.stringify(contract));
  saveState(state);
  process.stdout.write(JSON.stringify({ ok:true, sessionId:state.sessionId, contractHash:state.contractHash }));
}

async function validateWorkflow(file) {
  const wf = JSON.parse(fs.readFileSync(file,'utf8'));
  const errors = validateWorkflowObject(wf);
  process.stdout.write(JSON.stringify({ ok:errors.length===0, errors }, null, 2));
  process.exitCode = errors.length ? 1 : 0;
}

async function main() {
  const [cmd, sub, arg] = process.argv.slice(2);
  if (cmd === 'hook') {
    const input = JSON.parse(readStdin() || '{}');
    if (sub==='before-agent') return beforeAgent(input);
    if (sub==='before-tool') return beforeTool(input);
    if (sub==='after-agent') return afterAgent(input);
    throw new Error('unknown hook');
  }
  if (cmd === 'contract') return registerContract(sub || arg);
  if (cmd === 'validate-workflow') return validateWorkflow(sub || arg);
  throw new Error('usage: master-suite-v2.mjs hook <before-agent|before-tool|after-agent> | contract <file> | validate-workflow <file>');
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch(e=>{ process.stderr.write(String(e.stack || e)); process.exit(1); });
