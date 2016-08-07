# smartsocket
easy and secure websocket communication

## Status
[![build status](https://gitlab.com/pushrocks/smartsocket/badges/master/build.svg)](https://gitlab.com/pushrocks/smartsocket/commits/master)

## Usage
We recommend the use of typescript.

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

let mySocketFunction = new smartsocket.SocketFunction({
    name:"newService",
    func:(data) => {
        
    }, the function to execute
    roles:[mySocketRole] // all roles that have access to a specific function
});

mySmartsocket.registerRole(mySocketRole);
mySmartsocket.clientCall.select("client1","restart",data)
    .then((responseData) => {

    });
```

#### Client side
```typescript
import * as smartsocket from "smartsocket";

let mySmartsocketClient = new smartsocket.SmartsocketClient({
    url: "somedomain.com", // url, note: will only work over https, no http supported.
    port: 3000
    role:"dockerhost", // some role, in this example a dockerhost vm,
    password:"somePassword",
    alias:"client1"
});

let mySocketFunction2 = new smartsocket.SocketFunction({
    name:"restart",
    func:(data) => {}, the function to execute
    roles: [mySocketRole] // all roles that have access to a specific function
});

mySmartsocketClient.registerFunction(mySocketFunction2);

mySmartsocketClient.serverCall("newService",data)
    .then((responseData) => {
        
    });;
```