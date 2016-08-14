import "typings-test";
import "should";
import socketIoClient = require("socket.io-client");
import smartsocket = require("../dist/index");
import q = require("q");

let testSmartsocket: smartsocket.Smartsocket;
let testSmartsocketClient: smartsocket.SmartsocketClient;
let testSocketRole1: smartsocket.SocketRole;
let testSocketFunction1:smartsocket.SocketFunction;

let testConfig = {
    port: 3000
}

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
    describe("class SocketRole", function(){
        testSocketRole1 = new smartsocket.SocketRole({
            name:"testRole1",
            passwordHash:"somehash"
        })
    })
    describe("class SocketFunction", function () {
        it("should register a new Function", function () {
            testSocketFunction1 = new smartsocket.SocketFunction({
                funcName:"testFunction1",
                funcDef: (dataArg) => {
                    let done = q.defer();
                    done.resolve(dataArg);
                    return done.promise;
                },
                allowedRoles:[testSocketRole1]
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
                            .then(done.resolve)
                    }, 0)
                    return done.promise;
                })
                .then(() => {
                    done();
                });
        });
        it("2 clients should connect in parallel", function () {

        });
        it("should be able to make a functionCall",function(done){
            this.timeout(5000);
            testSmartsocketClient.serverCall("testFunction1",{
                value1:"hello"
            }).then((dataArg) => {
                console.log(dataArg);
                done();
            });
        })
    });
    describe("terminating smartsocket", function () {
        it("should close the server", function () {
            testSmartsocket.closeServer();
        });
    })
});