# @pushrocks/smartsocket
easy and secure websocket communication

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartsocket)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartsocket)
* [github.com (source mirror)](https://github.com/pushrocks/smartsocket)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartsocket/)

## Status for master

Status Category | Status Badge
-- | --
GitLab Pipelines | [![pipeline status](https://gitlab.com/pushrocks/smartsocket/badges/master/pipeline.svg)](https://lossless.cloud)
GitLab Pipline Test Coverage | [![coverage report](https://gitlab.com/pushrocks/smartsocket/badges/master/coverage.svg)](https://lossless.cloud)
npm | [![npm downloads per month](https://badgen.net/npm/dy/@pushrocks/smartsocket)](https://lossless.cloud)
Snyk | [![Known Vulnerabilities](https://badgen.net/snyk/pushrocks/smartsocket)](https://lossless.cloud)
TypeScript Support | [![TypeScript](https://badgen.net/badge/TypeScript/>=%203.x/blue?icon=typescript)](https://lossless.cloud)
node Support | [![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
Code Style | [![Code Style](https://badgen.net/badge/style/prettier/purple)](https://lossless.cloud)
PackagePhobia (total standalone install weight) | [![PackagePhobia](https://badgen.net/packagephobia/install/@pushrocks/smartsocket)](https://lossless.cloud)
PackagePhobia (package size on registry) | [![PackagePhobia](https://badgen.net/packagephobia/publish/@pushrocks/smartsocket)](https://lossless.cloud)
BundlePhobia (total size when bundled) | [![BundlePhobia](https://badgen.net/bundlephobia/minzip/@pushrocks/smartsocket)](https://lossless.cloud)
Platform support | [![Supports Windows 10](https://badgen.net/badge/supports%20Windows%2010/yes/green?icon=windows)](https://lossless.cloud) [![Supports Mac OS X](https://badgen.net/badge/supports%20Mac%20OS%20X/yes/green?icon=apple)](https://lossless.cloud)

## Usage

Use TypeScript for best in class instellisense.

Under the hood we use socket.io and shortid for managed data exchange.

### Serverside

```typescript
import * as smartsocket from 'smartsocket';
import * as q from q; // q is a promise library

// The "Smartsocket" listens on a port and can receive new "SocketConnection" requests.
let mySmartsocket = new smartsocket.Smartsocket({
  port: 3000, // the port smartsocket will listen on
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
  passwordHash: 'someHashedString',
});

// A "SocketFunction" executes a referenced function and passes in any data of the corresponding "SocketRequest".
// The referenced function must return a promise and resolve with data of type any.
// Any "SocketRequest" carries a unique identifier. If the referenced function's promise resolved any passed on argument will be returned to the requesting party
let testSocketFunction1 = new smartsocket.SocketFunction({
  funcName: 'testSocketFunction1',
  funcDef: (data) => {
    console.log('testSocketFunction1 executed successfully!');
  },
  allowedRoles: [mySocketRole], // all roles that have access to a specific function
});

// A "Smartsocket" exposes a .clientCall() that gets
// 1. the name of the "SocketFunction" on the client side
// 2. the data to pass in
// 3. And a target "SocketConnection" (there can be multiple connections at once)
// any unique id association is done internally
mySmartsocket.clientCall('restart', data, someTargetConnection).then((responseData) => {});
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
  role: 'testRole1',
});

// You can .connect() and .disconnect() from a "Smartsocket"
testSmartsocketClient.connect().then(() => {
  done();
});

// The client can also specify "SocketFunction"s. It can also specify "SocketRole"s in case a client connects to multiple servers at once
let testSocketFunction2 = new smartsocket.SocketFunction({
  funcName: 'testSocketFunction2',
  funcDef: (data) => {}, // the function to execute, has to return promise
  allowedRoles: [],
});

// A "SmartsocketClient" can call functions on the serverside using .serverCall() analog to the "Smartsocket"'s .clientCall method.
mySmartsocketClient.serverCall('function', functionCallData).then((functionResponseData) => {
  // the functionResponseData comes from the server... awesome, right?
});
```

> **NOTE:**  
> you can easily chain dependent requests on either the server or client side with promises.  
> `data` is always a js object that you can design for your specific needs.  
> It supports buffers for large binary data network exchange.

## Contribution

We are always happy for code contributions. If you are not the code contributing type that is ok. Still, maintaining Open Source repositories takes considerable time and thought. If you like the quality of what we do and our modules are useful to you we would appreciate a little monthly contribution: You can [contribute one time](https://lossless.link/contribute-onetime) or [contribute monthly](https://lossless.link/contribute). :)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
