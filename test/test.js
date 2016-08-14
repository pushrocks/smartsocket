"use strict";
require("typings-test");
require("should");
const smartsocket = require("../dist/index");
const q = require("q");
let testSmartsocket;
let testSmartsocketClient;
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
    });
    describe("class SocketFunction", function () {
        it("should register a new Function", function () {
            testSocketFunction1 = new smartsocket.SocketFunction({
                funcName: "testFunction1",
                funcDef: () => {
                    let done = q.defer();
                    return done.promise;
                },
                allowedRoles: []
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
    });
    describe("terminating smartsocket", function () {
        it("should close the server", function () {
            testSmartsocket.closeServer();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsUUFBTyxRQUFRLENBQUMsQ0FBQTtBQUVoQixNQUFPLFdBQVcsV0FBVyxlQUFlLENBQUMsQ0FBQztBQUM5QyxNQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUV4QixJQUFJLGVBQXdDLENBQUM7QUFDN0MsSUFBSSxxQkFBb0QsQ0FBQztBQUN6RCxJQUFJLG1CQUE4QyxDQUFDO0FBRW5ELElBQUksVUFBVSxHQUFHO0lBQ2IsSUFBSSxFQUFFLElBQUk7Q0FDYixDQUFBO0FBRUQsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUNwQixRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDMUIsRUFBRSxDQUFDLGlDQUFpQyxFQUFFO1lBQ2xDLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDekUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRTtZQUNqRCxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtJQUU3QixDQUFDLENBQUMsQ0FBQTtJQUNGLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUM3QixFQUFFLENBQUMsZ0NBQWdDLEVBQUU7WUFDakMsbUJBQW1CLEdBQUcsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDO2dCQUNqRCxRQUFRLEVBQUMsZUFBZTtnQkFDeEIsT0FBTyxFQUFFO29CQUNMLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLENBQUM7Z0JBQ0QsWUFBWSxFQUFDLEVBQUU7YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtRQUNoQyxFQUFFLENBQUMsd0RBQXdELEVBQUUsVUFBVSxJQUFJO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIscUJBQXFCLEdBQUcsSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3RELElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtnQkFDckIsR0FBRyxFQUFFLGtCQUFrQjtnQkFDdkIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLEtBQUssRUFBRSxhQUFhO2dCQUNwQixJQUFJLEVBQUUsU0FBUzthQUNsQixDQUFDLENBQUM7WUFDSCxxQkFBcUIsQ0FBQyxPQUFPLEVBQUU7aUJBQzFCLElBQUksQ0FBQztnQkFDRixJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsd0NBQXdDLEVBQUUsVUFBVSxJQUFJO1lBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIscUJBQXFCLENBQUMsVUFBVSxFQUFFO2lCQUM3QixJQUFJLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQixVQUFVLENBQUM7b0JBQ1AscUJBQXFCLENBQUMsT0FBTyxFQUFFO3lCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUMzQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQztnQkFDRixJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsc0NBQXNDLEVBQUU7UUFFM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtRQUNoQyxFQUFFLENBQUMseUJBQXlCLEVBQUU7WUFDMUIsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQyJ9