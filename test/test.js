"use strict";
require("typings-test");
require("should");
const smartsocket = require("../dist/index");
const q = require("q");
const nodehash = require("nodehash");
let testSmartsocket;
let testSmartsocketClient;
let testSocketRole1;
let testSocketFunction1;
let testConfig = {
    port: 3000
};
describe("smartsocket", function () {
    describe("class Smartsocket", function () {
        it("should create a new smartsocket", function () {
            testSmartsocket = new smartsocket.Smartsocket({ port: testConfig.port });
            testSmartsocket.should.be.instanceOf(smartsocket.Smartsocket);
        });
        it("should start listening when .started is called", function () {
            testSmartsocket.startServer();
        });
    });
    describe("class SocketRole", function () {
        testSocketRole1 = new smartsocket.SocketRole({
            name: "testRole1",
            passwordHash: nodehash.sha256FromStringSync("testPassword")
        });
    });
    describe("class SocketFunction", function () {
        it("should register a new Function", function () {
            testSocketFunction1 = new smartsocket.SocketFunction({
                funcName: "testFunction1",
                funcDef: (dataArg) => {
                    let done = q.defer();
                    done.resolve(dataArg);
                    return done.promise;
                },
                allowedRoles: [testSocketRole1]
            });
        });
    });
    describe("class SmartsocketClient", function () {
        it("should react to a new websocket connection from client", function (done) {
            this.timeout(10000);
            testSmartsocketClient = new smartsocket.SmartsocketClient({
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
        });
        it("client should disconnect and reconnect", function (done) {
            this.timeout(10000);
            testSmartsocketClient.disconnect()
                .then(() => {
                let done = q.defer();
                setTimeout(() => {
                    testSmartsocketClient.connect()
                        .then(done.resolve);
                }, 0);
                return done.promise;
            })
                .then(() => {
                done();
            });
        });
        it("2 clients should connect in parallel", function () {
        });
        it("should be able to make a functionCall from client to server", function (done) {
            this.timeout(5000);
            testSmartsocketClient.serverCall("testFunction1", {
                value1: "hello"
            }).then((dataArg) => {
                console.log(dataArg);
                done();
            });
        });
        it("should be able to make a functionCall from server to client", function (done) {
            this.timeout(5000);
            let targetSocket = (() => {
                return smartsocket.allSocketConnections.find((socketConnectionArg) => {
                    return socketConnectionArg.alias === "testClient1";
                });
            })();
            testSmartsocket.clientCall("testFunction1", {
                value1: "helloFromServer"
            }, targetSocket).then((dataArg) => {
                console.log(dataArg);
                done();
            });
        });
    });
    describe("terminating smartsocket", function () {
        it("should close the server", function () {
            testSmartsocket.closeServer();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsUUFBTyxRQUFRLENBQUMsQ0FBQTtBQUVoQixNQUFPLFdBQVcsV0FBVyxlQUFlLENBQUMsQ0FBQztBQUM5QyxNQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4QixNQUFPLFFBQVEsV0FBVyxVQUFVLENBQUMsQ0FBQztBQUV0QyxJQUFJLGVBQXdDLENBQUM7QUFDN0MsSUFBSSxxQkFBb0QsQ0FBQztBQUN6RCxJQUFJLGVBQXVDLENBQUM7QUFDNUMsSUFBSSxtQkFBOEMsQ0FBQztBQUVuRCxJQUFJLFVBQVUsR0FBRztJQUNiLElBQUksRUFBRSxJQUFJO0NBQ2IsQ0FBQTtBQUVELFFBQVEsQ0FBQyxhQUFhLEVBQUU7SUFDcEIsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzFCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtZQUNsQyxlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsZ0RBQWdELEVBQUU7WUFDakQsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDekIsZUFBZSxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQztZQUN6QyxJQUFJLEVBQUMsV0FBVztZQUNoQixZQUFZLEVBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQztTQUM3RCxDQUFDLENB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