import "typings-test";
import "should";
import socketIoClient = require("socket.io-client");
import smartsocket = require("../dist/index");

let testSmartsocket: smartsocket.Smartsocket;

describe("smartsocket", function () {
    it("should create a new smartsocket", function () {
        testSmartsocket = new smartsocket.Smartsocket({ port: 3000 });
        testSmartsocket.should.be.instanceOf(smartsocket.Smartsocket);
    });
    it("should react to a new websocket connection", function (done) {
        this.timeout(10000);
        let socket = socketIoClient("http://localhost:3000", {});
        socket.on("requestAuth", function () {
            console.log("server requested authentication");
            socket.emit("dataAuth", {
                secret: "hello"
            });
            done();
        });
    })
});