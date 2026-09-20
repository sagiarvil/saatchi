import assert from 'node:assert/strict';
import { matchesAny, validateContract, validateWorkflowObject } from './master-suite-v2.mjs';

assert.equal(matchesAny('src/app/page.tsx',['src/**']), true);
assert.equal(matchesAny('functions/payment/x.js',['src/**']), false);
assert.equal(matchesAny('src/app/page.tsx',['src/*.tsx']), false);

const goodContract = {
  objective:'change one UI behavior', allowedFiles:['src/**'], forbiddenFiles:['functions/payment/**'], acceptance:['requested behavior exists'],
  tests:[{name:'suite unit',command:'node scripts/test-master-suite-v2.mjs'}], runtime:{required:false}, maxRepairAttempts:2, allowExternalWrites:false
};
assert.deepEqual(validateContract(goodContract), []);
assert.ok(validateContract({...goodContract, allowedFiles:[]}).some(x=>x.includes('allowedFiles')));
assert.ok(validateContract({...goodContract, tests:[{name:'bad',command:'rm -rf /'}]}).some(x=>x.includes('unsafe test command')));
assert.ok(validateContract({...goodContract, tests:[{name:'chain',command:'node scripts/test-master-suite-v2.mjs && rm -rf /'}]}).some(x=>x.includes('unsafe test command')));
assert.ok(validateContract({...goodContract, runtime:{required:true}}).some(x=>x.includes('runtime.required')));

const wf = {
  nodes:[
    {name:'Suite Webhook',type:'n8n-nodes-base.webhook'}, {name:'Normalize Task',type:'n8n-nodes-base.code'},
    {name:'Contract Gate',type:'n8n-nodes-base.code'}, {name:'Contract Valid?',type:'n8n-nodes-base.if'},
    {name:'Evidence Gate',type:'n8n-nodes-base.code'}, {name:'Evidence Valid?',type:'n8n-nodes-base.if'},
    {name:'Pass Response',type:'n8n-nodes-base.respondToWebhook'}, {name:'Fail Response',type:'n8n-nodes-base.respondToWebhook'}
  ],
  connections:{
    'Suite Webhook':{main:[[{node:'Normalize Task'}]]}, 'Normalize Task':{main:[[{node:'Contract Gate'}]]},
    'Contract Gate':{main:[[{node:'Contract Valid?'}]]}, 'Contract Valid?':{main:[[{node:'Evidence Gate'}],[{node:'Fail Response'}]]},
    'Evidence Gate':{main:[[{node:'Evidence Valid?'}]]}, 'Evidence Valid?':{main:[[{node:'Pass Response'}],[{node:'Fail Response'}]]}
  }
};
assert.deepEqual(validateWorkflowObject(wf), []);
const broken = structuredClone(wf); broken.nodes = broken.nodes.filter(n=>n.name!=='Evidence Gate');
assert.ok(validateWorkflowObject(broken).length > 0);
console.log('MASTER_SUITE_V2_TESTS_PASS');
