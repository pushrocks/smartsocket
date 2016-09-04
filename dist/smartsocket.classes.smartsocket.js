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
        this.socketRoles = new lik_1.Objectmap();
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
            smartsocketHost: this,
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
    ;
    /**
     * adds socketRoles
     */
    addSocketRoles(socketRolesArray) {
        for (let socketRole of socketRolesArray) {
            this.socketRoles.add(socketRole);
        }
        ;
        return;
    }
    ;
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFHakQsVUFBVTtBQUNWLHNCQUEwQixLQUFLLENBQUMsQ0FBQTtBQUVoQyx1REFBaUMsd0NBQXdDLENBQUMsQ0FBQTtBQUMxRSxvREFBOEIscUNBQXFDLENBQUMsQ0FBQTtBQUtuRSxDQUFDO0FBRUY7SUFLSSxZQUFZLFVBQTBDO1FBRnRELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQW9CLENBQUM7UUFDaEQsZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBYyxDQUFDO1FBNEIxQzs7V0FFRztRQUNILGdCQUFXLEdBQUc7WUFDVixJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTO2dCQUMvQixJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCxnQkFBVyxHQUFHO1lBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFpQztnQkFDdkQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRixlQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQztRQTFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM5QixDQUFDOztJQUVEOztPQUVHO0lBQ0ssdUJBQXVCLENBQUMsU0FBUztRQUNyQyxJQUFJLGdCQUFnQixHQUFzQixJQUFJLHVEQUFnQixDQUFDO1lBQzNELEtBQUssRUFBQyxTQUFTO1lBQ2YsYUFBYSxFQUFDLEtBQUs7WUFDbkIsSUFBSSxFQUFDLFNBQVM7WUFDZCxJQUFJLEVBQUMsUUFBUTtZQUNiLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLE1BQU0sRUFBQyxTQUFTO1NBQ25CLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7UUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7YUFDMUIsSUFBSSxDQUFDO1lBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDdkQsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOztJQW9CRCxnQkFBZ0I7SUFFaEI7O09BRUc7SUFDSCxVQUFVLENBQUMsZUFBc0IsRUFBQyxPQUFXLEVBQUMseUJBQTBDO1FBQ3BGLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxpREFBYSxDQUFDO1lBQ2xDLElBQUksRUFBQyxZQUFZO1lBQ2pCLHNCQUFzQixFQUFDLHlCQUF5QjtZQUNoRCxPQUFPLEVBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDbEMsWUFBWSxFQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUMsT0FBTzthQUN0QjtTQUNKLENBQUMsQ0FBQztRQUNILGFBQWEsQ0FBQyxRQUFRLEVBQUU7YUFDbkIsSUFBSSxDQUFDLENBQUMsT0FBMkI7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOztJQUVEOztPQUVHO0lBQ0gsY0FBYyxDQUFDLGdCQUE2QjtRQUN4QyxHQUFHLENBQUEsQ0FBQyxJQUFJLFVBQVUsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFBLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUFBLENBQUM7UUFDRixNQUFNLENBQUM7SUFDWCxDQUFDOztBQUVMLENBQUM7QUFuRlksbUJBQVcsY0FtRnZCLENBQUEifQ==