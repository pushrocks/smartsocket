"use strict";
require("typings-test");
require("should");
const smartsocket = require("../dist/index");
let testSmartsocket;
let testSmartsocketClient;
let testConfig = {
    port: 3000
};
describe("smartsocket", function () {
    it("should create a new smartsocket", function () {
        testSmartsocket = new smartsocket.Smartsocket({ port: testConfig.port });
        testSmartsocket.should.be.instanceOf(smartsocket.Smartsocket);
    });
    it("should register a new Function", function () {
    });
    it("should start listening when .started is called", function () {
        testSmartsocket.startServer();
    });
    it("should react to a new websocket connection", function (done) {
        this.timeout(10000);
        testSmartsocketClient = new smartsocket.SmartsocketClient({
            port: testConfig.port,
            url: "http://localhost",
            password: "testPassword",
            alias: "testClient1"
        });
    });
    it("should close the server", function () {
        testSmartsocket.closeServer();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsUUFBTyxRQUFRLENBQUMsQ0FBQTtBQUVoQixNQUFPLFdBQVcsV0FBVyxlQUFlLENBQUMsQ0FBQztBQUU5QyxJQUFJLGVBQXdDLENBQUM7QUFDN0MsSUFBSSxxQkFBb0QsQ0FBQztBQUV6RCxJQUFJLFVBQVUsR0FBRztJQUNiLElBQUksRUFBQyxJQUFJO0NBQ1osQ0FBQTtBQUVELFFBQVEsQ0FBQyxhQUFhLEVBQUU7SUFDcEIsRUFBRSxDQUFDLGlDQUFpQyxFQUFFO1FBQ2xDLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtJQUVyQyxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRTtRQUNqRCxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsNENBQTRDLEVBQUUsVUFBVSxJQUFJO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIscUJBQXFCLEdBQUcsSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQUM7WUFDdEQsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO1lBQ3JCLEdBQUcsRUFBRSxrQkFBa0I7WUFDdkIsUUFBUSxFQUFDLGNBQWM7WUFDdkIsS0FBSyxFQUFFLGFBQWE7U0FDdkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMseUJBQXlCLEVBQUU7UUFDMUIsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==