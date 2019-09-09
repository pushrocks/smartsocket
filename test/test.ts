// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from '@pushrocks/tapbundle';

import * as smarthash from '@pushrocks/smarthash';
import * as smartpromise from '@pushrocks/smartpromise';

import socketIoClient = require('socket.io-client');
import smartsocket = require('../ts/index');

let testSmartsocket: smartsocket.Smartsocket;
let testSmartsocketClient: smartsocket.SmartsocketClient;
let testSocketConnection: smartsocket.SocketConnection;
let testSocketRole1: smartsocket.SocketRole;
let testSocketFunctionForServer: smartsocket.SocketFunction;
let testSocketFunctionClient: smartsocket.SocketFunction;

const testConfig = {
  port: 3000
};

// class smartsocket
tap.test('should create a new smartsocket', async () => {
  testSmartsocket = new smartsocket.Smartsocket({ port: testConfig.port });
  expect(testSmartsocket).be.instanceOf(smartsocket.Smartsocket);
});

// class socketrole
tap.test('should add a socketrole', async () => {
  testSocketRole1 = new smartsocket.SocketRole({
    name: 'testRole1',
    passwordHash: smarthash.sha256FromStringSync('testPassword')
  });
  testSmartsocket.addSocketRoles([testSocketRole1]);
});

// class SocketFunction
tap.test('should register a new Function', async () => {
  testSocketFunctionForServer = new smartsocket.SocketFunction({
    allowedRoles: [testSocketRole1],
    funcDef: async (dataArg, socketConnectionArg) => {
      return dataArg;
    },
    funcName: 'testFunction1'
  });
  testSmartsocket.addSocketFunction(testSocketFunctionForServer);

  testSocketFunctionClient = new smartsocket.SocketFunction({
    allowedRoles: [],
    funcDef: async (dataArg, socketConnectionArg) => {
      return dataArg;
    },
    funcName: 'testFunction2'
  });
  testSmartsocket.addSocketFunction(testSocketFunctionForServer);
  console.log(testSmartsocket.socketFunctions);
});

tap.test('should start listening when .started is called', async () => {
  await testSmartsocket.start();
});

// class SmartsocketClient
tap.test('should react to a new websocket connection from client', async () => {
  testSmartsocketClient = new smartsocket.SmartsocketClient({
    port: testConfig.port,
    url: 'http://localhost',
    password: 'testPassword',
    alias: 'testClient1',
    role: 'testRole1'
  });
  testSmartsocketClient.addSocketFunction(testSocketFunctionClient);
  console.log(testSmartsocketClient.socketFunctions);
  await testSmartsocketClient.connect();
});

tap.test('2 clients should connect in parallel', async () => {
  // TODO: implement parallel test
});

tap.test('should be able to make a functionCall from client to server', async () => {
  const response = await testSmartsocketClient.serverCall('testFunction1', {
    value1: 'hello'
  });
  console.log(response);
  expect(response.value1).to.equal('hello');
});

tap.test('should be able to make a functionCall from server to client', async () => {
  const response = await testSmartsocket.clientCall(
    'testFunction2',
    {
      hi: 'hi there from server'
    },
    testSmartsocket.socketConnections.find(socketConnection => {
      return true;
    })
  );
  console.log(response);
  expect(response.hi).to.equal('hi there from server');
});

tap.test('client should disconnect and reconnect', async tools => {
  await testSmartsocketClient.disconnect();
  await tools.delayFor(100);
  await testSmartsocketClient.connect();
});

// terminate
tap.test('should close the server', async () => {
  await testSmartsocket.stop();
});

tap.start();
