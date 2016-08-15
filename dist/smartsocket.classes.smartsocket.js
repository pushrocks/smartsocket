"use strict";
const plugins = require("./smartsocket.plugins");
// classes
const lik_1 = require("lik");
const smartsocket_classes_socketconnection_1 = require("./smartsocket.classes.socketconnection");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
;
class Smartsocket {
    constructor(optionsArg) {
        this.openSockets = new lik_1.Objectmap();
        /**
         * starts listening to incling sockets:
         */
        this.startServer = () => {
            this.io = plugins.socketIo(this.options.port);
            this.io.on("connection", (socketArg) => {
                this._handleSocketConnection(socketArg);
            });
        };
        this.closeServer = () => {
            this.openSockets.forEach((socketObjectArg) => {
                plugins.beautylog.log(`disconnect socket with >>alias ${socketObjectArg.alias}`);
                socketObjectArg.socket.disconnect();
            });
            this.openSockets.wipe();
            this.io.close();
        };
        this.options = optionsArg;
    }
    ;
    /**
     * the standard handler for new socket connections
     */
    _handleSocketConnection(socketArg) {
        let socketConnection = new smartsocket_classes_socketconnection_1.SocketConnection({
            alias: undefined,
            authenticated: false,
            role: undefined,
            side: "server",
            socket: socketArg
        });
        plugins.beautylog.log("Socket connected. Trying to authenticate...");
        this.openSockets.add(socketConnection);
        socketConnection.authenticate()
            .then(() => {
            return socketConnection.listenToFunctionRequests();
        })
            .catch((err) => {
            console.log(err);
        });
    }
    ;
    // communication
    /**
     * allows call to specific client.
     */
    clientCall(functionNameArg, dataArg, targetSocketConnectionArg) {
        let done = plugins.q.defer();
        let socketRequest = new smartsocket_classes_socketrequest_1.SocketRequest({
            side: "requesting",
            originSocketConnection: targetSocketConnectionArg,
            shortId: plugins.shortid.generate(),
            funcCallData: {
                funcName: functionNameArg,
                funcDataArg: dataArg
            }
        });
        socketRequest.dispatch()
            .then((dataArg) => {
            done.resolve(dataArg.funcDataArg);
        });
        return done.promise;
    }
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFHakQsVUFBVTtBQUNWLHNCQUEwQixLQUFLLENBQUMsQ0FBQTtBQUVoQyx1REFBaUMsd0NBQXdDLENBQUMsQ0FBQTtBQUMxRSxvREFBOEIscUNBQXFDLENBQUMsQ0FBQTtBQUtuRSxDQUFDO0FBRUY7SUFJSSxZQUFZLFVBQTBDO1FBRHRELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQW9CLENBQUM7UUEyQmhEOztXQUVHO1FBRUgsZ0JBQVcsR0FBRztZQUNWLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Z0JBQy9CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUNELGdCQUFXLEdBQUc7WUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWlDO2dCQUN2RCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ2pGLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBMUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQzlCLENBQUM7O0lBRUQ7O09BRUc7SUFDSyx1QkFBdUIsQ0FBQyxTQUFTO1FBQ3JDLElBQUksZ0JBQWdCLEdBQXNCLElBQUksdURBQWdCLENBQUM7WUFDM0QsS0FBSyxFQUFDLFNBQVM7WUFDZixhQUFhLEVBQUMsS0FBSztZQUNuQixJQUFJLEVBQUMsU0FBUztZQUNkLElBQUksRUFBQyxRQUFRO1lBQ2IsTUFBTSxFQUFDLFNBQVM7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtRQUNwRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLGdCQUFnQixDQUFDLFlBQVksRUFBRTthQUMxQixJQUFJLENBQUM7WUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUN2RCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7O0lBcUJELGdCQUFnQjtJQUVoQjs7T0FFRztJQUNILFVBQVUsQ0FBQyxlQUFzQixFQUFDLE9BQVcsRUFBQyx5QkFBMEM7UUFDcEYsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLGlEQUFhLENBQUM7WUFDbEMsSUFBSSxFQUFDLFlBQVk7WUFDakIsc0JBQXNCLEVBQUMseUJBQXlCO1lBQ2hELE9BQU8sRUFBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNsQyxZQUFZLEVBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFdBQVcsRUFBQyxPQUFPO2FBQ3RCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsYUFBYSxDQUFDLFFBQVEsRUFBRTthQUNuQixJQUFJLENBQUMsQ0FBQyxPQUEyQjtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7QUFDTCxDQUFDO0FBdkVZLG1CQUFXLGNBdUV2QixDQUFBIn0=