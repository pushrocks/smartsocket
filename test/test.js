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
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsUUFBTyxRQUFRLENBQUMsQ0FBQTtBQUNoQixNQUFPLGNBQWMsV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3BELE1BQU8sV0FBVyxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBRTlDLElBQUksZUFBd0MsQ0FBQztBQUU3QyxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3BCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtRQUNsQyxlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDOUQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxVQUFVLElBQUk7UUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNwQixNQUFNLEVBQUUsT0FBTzthQUNsQixDQUFDLENBQUM7WUFDSCxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQyJ9