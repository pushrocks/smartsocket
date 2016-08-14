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
    clientCall() {
        // TODO: target specific client and initiate response        
    }
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFHakQsVUFBVTtBQUNWLHNCQUEwQixLQUFLLENBQUMsQ0FBQTtBQUdoQyx1REFBaUMsd0NBQXdDLENBQUMsQ0FBQTtBQUt6RSxDQUFDO0FBRUY7SUFJSSxZQUFZLFVBQTBDO1FBRHRELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQW9CLENBQUM7UUEwQmhEOztXQUVHO1FBRUgsZ0JBQVcsR0FBRztZQUNWLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Z0JBQy9CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUNELGdCQUFXLEdBQUc7WUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWlDO2dCQUN2RCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ2pGLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBekNFLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQzlCLENBQUM7O0lBRUQ7O09BRUc7SUFDSyx1QkFBdUIsQ0FBQyxTQUFTO1FBQ3JDLElBQUksZ0JBQWdCLEdBQXNCLElBQUksdURBQWdCLENBQUM7WUFDM0QsS0FBSyxFQUFDLFNBQVM7WUFDZixhQUFhLEVBQUMsS0FBSztZQUNuQixJQUFJLEVBQUMsU0FBUztZQUNkLE1BQU0sRUFBQyxTQUFTO1NBQ25CLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7UUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7YUFDMUIsSUFBSSxDQUFDO1lBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDdkQsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOztJQXFCRCxnQkFBZ0I7SUFDaEIsVUFBVTtRQUVOLDZEQUE2RDtJQUNqRSxDQUFDO0FBQ0wsQ0FBQztBQXJEWSxtQkFBVyxjQXFEdkIsQ0FBQSJ9