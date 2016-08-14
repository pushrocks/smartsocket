import "typings-test";
import "should";
import socketIoClient = require("socket.io-client");
import smartsocket = require("../dist/index");

let testSmartsocket: smartsocket.Smartsocket;
let testSmartsocketClient: smartsocket.SmartsocketClient;

let testConfig = {
    port:3000
}

describe("smartsocket", function () {
    it("should create a new smartsocket", function () {
        testSmartsocket = new smartsocket.Smartsocket({ port: testConfig.port });
        testSmartsocket.should.be.instanceOf(smartsocket.Smartsocket);
    });
    it("should register a new Function", function () {

    })
    it("should start listening when .started is called", function () {
        testSmartsocket.startServer();
    })
    it("should react to a new websocket connection from client", function (done) {
        this.timeout(10000);
        testSmartsocketClient = new smartsocket.SmartsocketClient({
            port: testConfig.port,
            url: "http://localhost",
            password:"testPassword",
            alias: "testClient1"
        });
        testSmartsocketClient.connect()
            .then(() => {
                done();
            });
    });
    it("client should disconnect and reconnect", function (done) {
        this.timeout(10000);
        testSmartsocketClient.disconnect()
            .then(testSmartsocketClient.connect)
            .then(() => {
                done();
            });
    });
    it("should close the server", function () {
        testSmartsocket.closeServer();
    });
});