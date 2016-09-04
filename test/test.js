"use strict";
require("typings-test");
const should = require("should");
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
            should(testSmartsocket).be.instanceOf(smartsocket.Smartsocket);
        });
        it("should start listening when .started is called", function () {
            testSmartsocket.startServer();
        });
    });
    describe("class SocketRole", function () {
        it("should add a socketrole", function () {
            testSocketRole1 = new smartsocket.SocketRole({
                name: "testRole1",
                passwordHash: nodehash.sha256FromStringSync("testPassword")
            });
            testSmartsocket.addSocketRoles([testSocketRole1]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsTUFBTyxNQUFNLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFFbEMsTUFBTyxXQUFXLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFDOUMsTUFBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDeEIsTUFBTyxRQUFRLFdBQVcsVUFBVSxDQUFDLENBQUM7QUFFdEMsSUFBSSxlQUF3QyxDQUFDO0FBQzdDLElBQUkscUJBQW9ELENBQUM7QUFDekQsSUFBSSxlQUF1QyxDQUFDO0FBQzVDLElBQUksbUJBQStDLENBQUM7QUFFcEQsSUFBSSxVQUFVLEdBQUc7SUFDYixJQUFJLEVBQUUsSUFBSTtDQUNiLENBQUE7QUFFRCxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3BCLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtRQUMxQixFQUFFLENBQUMsaUNBQWlDLEVBQUU7WUFDbEMsZUFBZSxHQUFHLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN6RSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsZ0RBQWdELEVBQUU7WUFDakQsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDekIsRUFBRSxDQUFDLHlCQUF5QixFQUFFO1lBQzFCLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pDLElBQUksRUFBRSxXQUFXO2dCQUNqQixZQUFZLEVBQUUs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