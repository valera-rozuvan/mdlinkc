// const spawn = require('child_process').spawn;
import { spawn } from 'child_process'
import * as path from 'path'

interface IProcRetVal {
  code: string
  signal: string
}

function _runProc(CWD, pageConfig, configs): Promise<IProcRetVal> {
  let resolve = null
  let reject = null

  const promise = new Promise<IProcRetVal>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  const command = 'node';
  const fullPath = path.join(CWD, 'templates', pageConfig.template, 'index.js')
  console.log('processPages ... fullPath = ', fullPath)
  const parameters = [ fullPath ];

  const child = spawn(command, parameters, {
    stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
  });

  child.stdout.on('data', (data) => {
    const chunk = data.toString().replace(/\r?\n|\r/g, ' ');
    console.log(`Received chunk ${chunk}`);
  });

  child.on('message', (m) => {
    console.log('PARENT got message:', m);
  });
  child.send({ hello: 'world' });

  child.on('exit', function (code, signal) {
    resolve({ code, signal })
  });

  return promise
}

async function runProc(CWD, pageConfig, configs): Promise<IProcRetVal> {
  return await _runProc(CWD, pageConfig, configs)
}

export {
  runProc
}
