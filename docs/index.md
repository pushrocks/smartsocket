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

let mySmartsocket = new smartsocket.Smartsocket({
    port: 3000 // the port smartsocket will listen on
});

let mySocketRole = new smartsocket.SocketRole({
    name: "someRoleName",
    passwordHash: "someHashedString"
});

let testSocketFunction1 = new smartsocket.SocketFunction({
    funcName:"testSocketFunction1",
    funcDef:(data) => {
        
    }, // the function to execute
    allowedRoles:[mySocketRole] // all roles that have access to a specific function
});

mySmartsocket.clientCall("","restart",data,someTargetConnection)
    .then((responseData) => {

    });
```

#### Client side
```typescript
import * as smartsocket from "smartsocket";

let testSmartsocketClient = new smartsocket.SmartsocketClient({
    port: testConfig.port,
    url: "http://localhost",
    password: "testPassword",
    alias: "testClient1",
    role: "testRole1"
});
testSmartsocketClient.connect()
    .then(() => {
        done();
    });

let testSocketFunction2 = new smartsocket.SocketFunction({
    funcName: "testSocketFunction2",
    funcDef: (data) => {}, // the function to execute, has to return promise
    allowedRoles:[]
});

let functionCalldata = {
    funcName: "",
    funcData: {
        someKey:"someValue"
    }
}

mySmartsocketClient.serverCall("function",functionCallData)
    .then((functionResponseData) => { // the functionResponseData comes from the server... awesome, right?
        
    });;
```

> **NOTE:**  
you can easily chain dependent requests on either the server or client side with promises.  
`data` is always a js object that you can design for your specific needs.  
It supports buffers for large binary data network exchange.  