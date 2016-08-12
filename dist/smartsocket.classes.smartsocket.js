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
            authenticated: false,
            socket: socketArg
        });
        plugins.beautylog.log("Socket connected. Trying to authenticate...");
        this.openSockets.add(socketConnection);
        socketConnection.authenticate()
            .then(socketConnection.listenToFunctionRequests);
    }
    ;
    // communication
    clientCall() {
        // TODO: target specific client and initiate response        
    }
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFHakQsVUFBVTtBQUNWLHNCQUEwQixLQUFLLENBQUMsQ0FBQTtBQUdoQyx1REFBaUMsd0NBQXdDLENBQUMsQ0FBQTtBQUt6RSxDQUFDO0FBRUY7SUFJSSxZQUFZLFVBQTBDO1FBRHRELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQW9CLENBQUM7UUFtQmhEOztXQUVHO1FBRUgsZ0JBQVcsR0FBRztZQUNWLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Z0JBQy9CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUNELGdCQUFXLEdBQUc7WUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWlDO2dCQUN2RCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ2pGLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBbENFLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQzlCLENBQUM7O0lBRUQ7O09BRUc7SUFDSyx1QkFBdUIsQ0FBQyxTQUFTO1FBQ3JDLElBQUksZ0JBQWdCLEdBQXNCLElBQUksdURBQWdCLENBQUM7WUFDM0QsYUFBYSxFQUFDLEtBQUs7WUFDbkIsTUFBTSxFQUFDLFNBQVM7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtRQUNwRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLGdCQUFnQixDQUFDLFlBQVksRUFBRTthQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN6RCxDQUFDOztJQXFCRCxnQkFBZ0I7SUFDaEIsVUFBVTtRQUNOLDZEQUE2RDtJQUNqRSxDQUFDO0FBQ0wsQ0FBQztBQTdDWSxtQkFBVyxjQTZDdkIsQ0FBQSJ9