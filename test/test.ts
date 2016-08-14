import "typings-test";
import "should";
import socketIoClient = require("socket.io-client");
import smartsocket = require("../dist/index");
import q = require("q");

let testSmartsocket: smartsocket.Smartsocket;
let testSmartsocketClient: smartsocket.SmartsocketClient;
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

    })
    describe("class SocketFunction", function () {
        it("should register a new Function", function () {
            testSocketFunction1 = new smartsocket.SocketFunction({
                funcName:"testFunction1",
                funcDef: () => {
                    let done = q.defer();
                    return done.promise;
                },
                allowedRoles:[]
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
                role: undefined
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
    });
    describe("terminating smartsocket", function () {
        it("should close the server", function () {
            testSmartsocket.closeServer();
        });
    })
});