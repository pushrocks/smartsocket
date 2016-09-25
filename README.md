# smartsocket
easy and secure websocket communication, Typescript ready

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartsocket)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/smartsocket)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartsocket)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartsocket/docs)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartsocket/badges/master/build.svg)](https://gitlab.com/pushrocks/smartsocket/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartsocket/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartsocket/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/smartsocket.svg)](https://david-dm.org/pushrocks/smartsocket)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartsocket/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartsocket/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartsocket/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartsocket)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)

## Usage
We recommend the use of typescript.
Under the hood we use socket.io and shortid for managed data exchange.

### Serverside
```typescript
import * as smartsocket from "smartsocket";
import * as q from q // q is a promise library

// The smartsocket listens on a port and can receive new socketconnection requests.
let mySmartsocket = new smartsocket.Smartsocket({
    port: 3000 // the port smartsocket will listen on
});

// A socket role can be referenced by SocketFunctions.
// All SocketRequests carry authentication data for a specific role.
// SocketFunctions now which roles are allowed to execute them
let mySocketRole = new smartsocket.SocketRole({
    name: "someRoleName",
    passwordHash: "someHashedString"
});

// A SocketFunction executes a referenced function and passes in any data of the corresponding request.
// The referenced function must return a promise and resolve with any data
// Any request will be carries a unique identifier. If the referenced function's promise resolved any passed on argument will be returned to the requesting party 
let testSocketFunction1 = new smartsocket.SocketFunction({
    funcName:"testSocketFunction1",
    funcDef:(data) => {
        console.log('testSocketFunction1 executed successfully!')
    },
    allowedRoles:[mySocketRole] // all roles that have access to a specific function
});

// A smartsocket exposes a .clientCall() that gets
// 1. the name of the SocketFunctin on the client side
// 2. the data to pass in
// 3. And a target connection (there can be multiple connections at once)
// any unique id association is done internally
mySmartsocket.clientCall("restart",data,someTargetConnection)
    .then((responseData) => {

    });
```

#### Client side
```typescript
import * as smartsocket from "smartsocket";

// A SmartsocketClient is different from a Smartsocket in that it doesn't expose any public address
// Thus any new connections must be innitiated from the client
let testSmartsocketClient = new smartsocket.SmartsocketClient({
    port: testConfig.port,
    url: "http://localhost",
    password: "testPassword",
    alias: "testClient1",
    role: "testRole1"
});

// You can .connect() and .disconnect() from a Smartsocket
testSmartsocketClient.connect()
    .then(() => {
        done();
    });

// The client can also specify SocketFunctions. It can also specify Roles in case a client connects to multiple servers at once
let testSocketFunction2 = new smartsocket.SocketFunction({
    funcName: "testSocketFunction2",
    funcDef: (data) => {}, // the function to execute, has to return promise
    allowedRoles:[]
});


// A SmartsocketClient can call functions on the serverside using .serverCall() analog to the Smartsocket's .clientCall method.
mySmartsocketClient.serverCall("function",functionCallData)
    .then((functionResponseData) => { // the functionResponseData comes from the server... awesome, right?
        
    });;
```

> **NOTE:**  
you can easily chain dependent requests on either the server or client side with promises.  
`data` is always a js object that you can design for your specific needs.  
It supports buffers for large binary data network exchange.  