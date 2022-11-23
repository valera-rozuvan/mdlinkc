"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const spawn = require('child_process').spawn;
const child_process_1 = require("child_process");
const path = require("path");
function _runProc(CWD, pageConfig, configs) {
    let resolve = null;
    let reject = null;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    const command = 'node';
    const fullPath = path.join(CWD, 'templates', pageConfig.template, 'index.js');
    console.log('processPages ... fullPath = ', fullPath);
    const parameters = [fullPath];
    const child = child_process_1.spawn(command, parameters, {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
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
        resolve({ code, signal });
    });
    return promise;
}
function runProc(CWD, pageConfig, configs) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield _runProc(CWD, pageConfig, configs);
    });
}
exports.runProc = runProc;
