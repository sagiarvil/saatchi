import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let sha = process.env.GITHUB_SHA || '';
if (!sha) {
  try {
    sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    sha = 'unknown';
  }
}
if (!/^[0-9a-f]{40}$/i.test(sha)) sha = 'unknown';
const payload = {
  gitSha: sha,
  builtAt: new Date().toISOString(),
};
fs.mkdirSync(path.join(root, 'public'), { recursive: true });
fs.writeFileSync(path.join(root, 'public', 'build-info.json'), `${JSON.stringify(payload)}\n`, 'utf8');
console.log(`Build identity: ${payload.gitSha}`);
