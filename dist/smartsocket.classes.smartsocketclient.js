"use strict";
const plugins = require("./smartsocket.plugins");
// import classes
const smartsocket_classes_socketconnection_1 = require("./smartsocket.classes.socketconnection");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
class SmartsocketClient {
    constructor(optionsArg) {
        this.alias = optionsArg.alias;
        this.role = optionsArg.role;
        this.serverUrl = optionsArg.url;
        this.serverPort = optionsArg.port;
        this.serverPassword = optionsArg.password;
    }
    ;
    /**
     * connect the client to the server
     */
    connect() {
        let done = plugins.q.defer();
        plugins.beautylog.log("trying to connect...");
        let socketUrl = `${this.serverUrl}:${this.serverPort}`;
        this.socketConnection = new smartsocket_classes_socketconnection_1.SocketConnection({
            alias: this.alias,
            authenticated: false,
            role: undefined,
            socket: plugins.socketIoClient(socketUrl, {})
        });
        this.socketConnection.socket.on("requestAuth", () => {
            console.log("server requested authentication");
            this.socketConnection.socket.emit("dataAuth", {
                role: this.role,
                password: this.serverPassword,
                alias: this.alias
            });
            this.socketConnection.socket.on("authenticated", () => {
                console.log("client is authenticated");
                done.resolve();
            });
        });
        return done.promise;
    }
    ;
    disconnect() {
        let done = plugins.q.defer();
        this.socketConnection.socket.disconnect();
        plugins.beautylog.ok("disconnected!");
        done.resolve();
        return done.promise;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldGNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXRjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUl6QixDQUFDLENBSitDO0FBT2hELGlCQUFpQjtBQUNqQix1REFBaUMsd0NBQXdDLENBQUMsQ0FBQTtBQUUxRSxvREFBOEIscUNBQXFDLENBQUMsQ0FBQTtBQVlwRTtJQU9JLFlBQVksVUFBb0M7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUE7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQTtJQUM3QyxDQUFDOztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM5QyxJQUFJLFNBQVMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLHVEQUFnQixDQUFDO1lBQ3pDLEtBQUssRUFBQyxJQUFJLENBQUMsS0FBSztZQUNoQixhQUFhLEVBQUMsS0FBSztZQUNuQixJQUFJLEVBQUMsU0FBUztZQUNkLE1BQU0sRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBQyxFQUFFLENBQUM7U0FDL0MsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQzFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQzdCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNwQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUM7Z0JBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOztJQUNELFVBQVU7UUFDTixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDMUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNELFVBQVUsQ0FBQyxlQUFzQixFQUFDLE9BQTJCO1FBQ3pELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxpREFBYSxDQUFDO1lBQ2xDLElBQUksRUFBQyxZQUFZO1lBQ2pCLHNCQUFzQixFQUFDLElBQUksQ0FBQyxnQkFBZ0I7WUFDNUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ2xDLFlBQVksRUFBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsV0FBVyxFQUFDLE9BQU87YUFDdEI7U0FDSixDQUFDLENBQUM7UUFDSCxhQUFhLENBQUMsUUFBUSxFQUFFO2FBQ25CLElBQUksQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7O0FBRUwsQ0FBQztBQW5FWSx5QkFBaUIsb0JBbUU3QixDQUFBIn0=