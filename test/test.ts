import { expect, tap } from 'tapbundle';

import socketIoClient = require('socket.io-client');
import smartsocket = require('../ts/index');
import smartq = require('smartq');
import nodehash = require('nodehash');

let testSmartsocket: smartsocket.Smartsocket;
let testSmartsocketClient: smartsocket.SmartsocketClient;
let testSocketRole1: smartsocket.SocketRole;
let testSocketFunction1: smartsocket.SocketFunction;

let testConfig = {
  port: 3000
};

// class smartsocket
tap.test('should create a new smartsocket', async () => {
  testSmartsocket = new smartsocket.Smartsocket({ port: testConfig.port });
  expect(testSmartsocket).be.instanceOf(smartsocket.Smartsocket);
});

tap.test('should start listening when .started is called', async () => {
  testSmartsocket.startServer();
});

// class socketrole
tap.test('should add a socketrole', async () => {
  testSocketRole1 = new smartsocket.SocketRole({
    name: 'testRole1',
    passwordHash: nodehash.sha256FromStringSync('testPassword')
  });
  testSmartsocket.addSocketRoles([testSocketRole1]);
});

// class SocketFunction
tap.test('should register a new Function', async () => {
  testSocketFunction1 = new smartsocket.SocketFunction({
    funcName: 'testFunction1',
    funcDef: async dataArg => {
      return dataArg;
    },
    allowedRoles: [testSocketRole1]
  });
});

// class SmartsocketClient
tap.test('should react to a new websocket connection from client', async () => {
  let done = smartq.defer();
  testSmartsocketClient = new smartsocket.SmartsocketClient({
    port: testConfig.port,
    url: 'http://localhost',
    password: 'testPassword',
    alias: 'testClient1',
    role: 'testRole1'
  });
  testSmartsocketClient.connect().then(() => {
    done.resolve();
  });
  await done.promise;
});
tap.test('client should disconnect and reconnect', async () => {
  let done = smartq.defer();
  testSmartsocketClient
    .disconnect()
    .then(() => {
      let done = smartq.defer();
      setTimeout(() => {
        testSmartsocketClient.connect().then(done.resolve);
      }, 0);
      return done.promise;
    })
    .then(() => {
      done.resolve();
    });
  await done.promise;
});
tap.test('2 clients should connect in parallel', async () => {
  // nothing here
});
tap.test('should be able to make a functionCall from client to server', async () => {
  let done = smartq.defer();
  testSmartsocketClient
    .serverCall('testFunction1', {
      value1: 'hello'
    })
    .then(dataArg => {
      console.log(dataArg);
      done.resolve();
    });
  await done.promise;
});

tap.test('should be able to make a functionCall from server to client', async () => {
  let done = smartq.defer();
  let targetSocket = (() => {
    return smartsocket.allSocketConnections.find(socketConnectionArg => {
      return socketConnectionArg.alias === 'testClient1';
    });
  })();
  testSmartsocket
    .clientCall(
      'testFunction1',
      {
        value1: 'helloFromServer'
      },
      targetSocket
    )
    .then(dataArg => {
      console.log(dataArg);
      done.resolve();
    });
});

// terminate
tap.test('should close the server', async () => {
  await testSmartsocket.closeServer();
});

tap.start();
