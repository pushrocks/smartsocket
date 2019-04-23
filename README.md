# @pushrocks/smartsocket
easy and secure websocket communication

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartsocket)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartsocket)
* [github.com (source mirror)](https://github.com/pushrocks/smartsocket)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartsocket/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartsocket/badges/master/build.svg)](https://gitlab.com/pushrocks/smartsocket/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartsocket/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartsocket/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smartsocket.svg)](https://www.npmjs.com/package/@pushrocks/smartsocket)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/smartsocket/badge.svg)](https://snyk.io/test/npm/@pushrocks/smartsocket)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

Under the hood we use socket.io and shortid for managed data exchange.

### Serverside

```typescript
import * as smartsocket from 'smartsocket';
import * as q from q; // q is a promise library

// The "Smartsocket" listens on a port and can receive new "SocketConnection" requests.
let mySmartsocket = new smartsocket.Smartsocket({
  port: 3000 // the port smartsocket will listen on
});

// optional:
// run this with anothoer existing server like express
declare var someExpressServer; // read the express docs about how express actually works
mySmartsocket.setServer(someExpressServer);

// A "SocketRole" can be referenced by "SocketFunction"s.
// All "SocketRequest"s carry authentication data for a specific "SocketRole".
// "SocketFunction"s know which "SocketRole"s are allowed to execute them
let mySocketRole = new smartsocket.SocketRole({
  name: 'someRoleName',
  passwordHash: 'someHashedString'
});

// A "SocketFunction" executes a referenced function and passes in any data of the corresponding "SocketRequest".
// The referenced function must return a promise and resolve with data of type any.
// Any "SocketRequest" carries a unique identifier. If the referenced function's promise resolved any passed on argument will be returned to the requesting party
let testSocketFunction1 = new smartsocket.SocketFunction({
  funcName: 'testSocketFunction1',
  funcDef: data => {
    console.log('testSocketFunction1 executed successfully!');
  },
  allowedRoles: [mySocketRole] // all roles that have access to a specific function
});

// A "Smartsocket" exposes a .clientCall() that gets
// 1. the name of the "SocketFunction" on the client side
// 2. the data to pass in
// 3. And a target "SocketConnection" (there can be multiple connections at once)
// any unique id association is done internally
mySmartsocket.clientCall('restart', data, someTargetConnection).then(responseData => {});
```

#### Client side

```typescript
import * as smartsocket from 'smartsocket';

// A "SmartsocketClient" is different from a "Smartsocket" in that it doesn't expose any public address.
// Thus any new "SocketConnection"s must be innitiated from a "SmartsocketClient".
let testSmartsocketClient = new smartsocket.SmartsocketClient({
  port: testConfig.port,
  url: 'http://localhost',
  password: 'testPassword',
  alias: 'testClient1',
  role: 'testRole1'
});

// You can .connect() and .disconnect() from a "Smartsocket"
testSmartsocketClient.connect().then(() => {
  done();
});

// The client can also specify "SocketFunction"s. It can also specify "SocketRole"s in case a client connects to multiple servers at once
let testSocketFunction2 = new smartsocket.SocketFunction({
  funcName: 'testSocketFunction2',
  funcDef: data => {}, // the function to execute, has to return promise
  allowedRoles: []
});

// A "SmartsocketClient" can call functions on the serverside using .serverCall() analog to the "Smartsocket"'s .clientCall method.
mySmartsocketClient.serverCall('function', functionCallData).then(functionResponseData => {
  // the functionResponseData comes from the server... awesome, right?
});
```

> **NOTE:**  
> you can easily chain dependent requests on either the server or client side with promises.  
> `data` is always a js object that you can design for your specific needs.  
> It supports buffers for large binary data network exchange.

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://maintainedby.lossless.com)
