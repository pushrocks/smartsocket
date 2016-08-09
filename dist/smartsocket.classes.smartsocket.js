"use strict";
const plugins = require("./smartsocket.plugins");
// classes
const lik_1 = require("lik");
const smartsocket_classes_socketconnection_1 = require("./smartsocket.classes.socketconnection");
;
class Smartsocket {
    constructor(optionsArg) {
        this.openSockets = new lik_1.Objectmap();
        /**
         * starts listening to incling sockets:
         */
        this.startServer = () => {
            this.io = plugins.socketIo(this.options.port);
            this.io.on('connection', (socketArg) => {
                this._handleSocket(socketArg);
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
    _handleSocket(socketArg) {
        let socketConnection = new smartsocket_classes_socketconnection_1.SocketConnection({
            authenticated: false,
            socket: socketArg
        });
        plugins.beautylog.log("Socket connected. Trying to authenticate...");
        this.openSockets.add(socketConnection);
        socketConnection.authenticate()
            .then(socketConnection.listenToFunctionRequests);
    }
    ;
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFHakQsVUFBVTtBQUNWLHNCQUEwQixLQUFLLENBQUMsQ0FBQTtBQUdoQyx1REFBaUMsd0NBQXdDLENBQUMsQ0FBQTtBQUt6RSxDQUFDO0FBRUY7SUFJSSxZQUFZLFVBQTBDO1FBRHRELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQW9CLENBQUM7UUFtQmhEOztXQUVHO1FBRUgsZ0JBQVcsR0FBRztZQUNWLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCxnQkFBVyxHQUFHO1lBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFpQztnQkFDdkQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRixlQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQTtRQWxDRyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM5QixDQUFDOztJQUVEOztPQUVHO0lBQ0ssYUFBYSxDQUFDLFNBQVM7UUFDM0IsSUFBSSxnQkFBZ0IsR0FBc0IsSUFBSSx1REFBZ0IsQ0FBQztZQUMzRCxhQUFhLEVBQUMsS0FBSztZQUNuQixNQUFNLEVBQUMsU0FBUztTQUNuQixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO1FBQ3BFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFO2FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7O0FBb0JMLENBQUM7QUF4Q1ksbUJBQVcsY0F3Q3ZCLENBQUEifQ==