"use strict";
require("typings-test");
require("should");
const socketIoClient = require("socket.io-client");
const smartsocket = require("../dist/index");
let testSmartsocket;
describe("smartsocket", function () {
    it("should create a new smartsocket", function () {
        testSmartsocket = new smartsocket.Smartsocket({ port: 3000 });
        testSmartsocket.should.be.instanceOf(smartsocket.Smartsocket);
    });
    it("should register a new Function", function () {
    });
    it("should start listening when .started is called", function () {
        testSmartsocket.startServer();
    });
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
            socket.on("authenticated", () => {
                console.log("client is authenticated");
                done();
            });
        });
    });
    it("should close the server", function () {
        testSmartsocket.closeServer();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsUUFBTyxRQUFRLENBQUMsQ0FBQTtBQUNoQixNQUFPLGNBQWMsV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3BELE1BQU8sV0FBVyxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBRTlDLElBQUksZUFBd0MsQ0FBQztBQUU3QyxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3BCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtRQUNsQyxlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDOUQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBQztJQUVwQyxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxnREFBZ0QsRUFBQztRQUNoRCxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsNENBQTRDLEVBQUUsVUFBVSxJQUFJO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLEtBQUssRUFBRSxXQUFXO2FBQ3JCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFDO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQ3ZDLElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHlCQUF5QixFQUFDO1FBQ3pCLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFDIn0=