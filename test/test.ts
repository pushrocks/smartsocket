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
    it("should register a new Function",function(){
        
    })
    it("should start listening when .started is called",function(){
        testSmartsocket.startServer();
    })
    it("should react to a new websocket connection", function (done) {
        this.timeout(10000);
        let socket = socketIoClient("http://localhost:3000", {});
        socket.on("requestAuth", function () {
            console.log("server requested authentication");
            socket.emit("dataAuth", {
                role: "coreflowContainer",
                password: "somePassword",
                alias: "coreflow1"
            });
            socket.on("authenticated",() => {
                console.log("client is authenticated");
                done();
            });
        });
    });
    it("should close the server",function(){
        testSmartsocket.closeServer();
    })
});