"use strict";
const plugins = require("./smartsocket.plugins");
// import classes
const smartsocket_classes_socketconnection_1 = require("./smartsocket.classes.socketconnection");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
class SmartsocketClient {
    constructor(optionsArg) {
        this.serverUrl = optionsArg.url;
        this.serverPort = optionsArg.port;
        this.serverPassword = optionsArg.password;
    }
    ;
    // authenticates the socket against the server
    _handleSocketConnection() {
        let done = plugins.q.defer();
        let socketUrl = `${this.serverUrl}:${this.serverPort}`;
        this.socketConnection = new smartsocket_classes_socketconnection_1.SocketConnection({
            authenticated: false,
            socket: plugins.socketIoClient(this.serverUrl, {})
        });
        this.socketConnection.socket.on("requestAuth", function () {
            console.log("server requested authentication");
            this.socketConnection.socket.emit("dataAuth", {
                role: "coreflowContainer",
                password: "somePassword",
                alias: "coreflow1"
            });
            this.socketConnection.socket.on("authenticated", () => {
                console.log("client is authenticated");
                done.resolve();
            });
        });
        return done.promise;
    }
    ;
    serverCall(functionNameArg, dataArg) {
        let done = plugins.q.defer();
        let socketRequest = new smartsocket_classes_socketrequest_1.SocketRequest({
            side: "requesting",
            originSocketConnection: this.socketConnection,
            shortId: plugins.shortid.generate(),
            funcCallData: {
                funcName: functionNameArg,
                funcDataArg: dataArg
            }
        });
        socketRequest.dispatch()
            .then(() => {
            done.resolve();
        });
        return done.promise;
    }
    ;
}
exports.SmartsocketClient = SmartsocketClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldGNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXRjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUl6QixDQUFDLENBSitDO0FBT2hELGlCQUFpQjtBQUNqQix1REFBaUMsd0NBQXdDLENBQUMsQ0FBQTtBQUUxRSxvREFBOEIscUNBQXFDLENBQUMsQ0FBQTtBQVdwRTtJQUtJLFlBQVksVUFBb0M7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFBO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUE7SUFDN0MsQ0FBQzs7SUFFRCw4Q0FBOEM7SUFDdEMsdUJBQXVCO1FBQzNCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxTQUFTLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSx1REFBZ0IsQ0FBQztZQUN6QyxhQUFhLEVBQUMsS0FBSztZQUNuQixNQUFNLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQztTQUNwRCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDMUMsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLEtBQUssRUFBRSxXQUFXO2FBQ3JCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBQztnQkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7O0lBQ0QsVUFBVSxDQUFDLGVBQXNCLEVBQUMsT0FBMkI7UUFDekQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLGlEQUFhLENBQUM7WUFDbEMsSUFBSSxFQUFDLFlBQVk7WUFDakIsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLGdCQUFnQjtZQUM1QyxPQUFPLEVBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDbEMsWUFBWSxFQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUMsT0FBTzthQUN0QjtTQUNKLENBQUMsQ0FBQztRQUNILGFBQWEsQ0FBQyxRQUFRLEVBQUU7YUFDbkIsSUFBSSxDQUFDO1lBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7QUFFTCxDQUFDO0FBbkRZLHlCQUFpQixvQkFtRDdCLENBQUEifQ==