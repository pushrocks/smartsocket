"use strict";
const plugins = require("./smartsocket.plugins");
const helpers = require("./smartsocket.helpers");
// classes
const lik_1 = require("lik");
const smartsocket_classes_socketconnection_1 = require("./smartsocket.classes.socketconnection");
;
class Smartsocket {
    constructor(optionsArg) {
        this.openSockets = new lik_1.Objectmap();
        this.registeredFunctions = new lik_1.Objectmap();
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
        helpers.authenticateSocket(socketConnection)
            .then();
    }
    registerFunction(socketRoleArg) {
        this.registeredFunctions.add(socketRoleArg);
    }
    ;
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDakQsTUFBWSxPQUFPLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQUVqRCxVQUFVO0FBQ1Ysc0JBQTBCLEtBQUssQ0FBQyxDQUFBO0FBR2hDLHVEQUFpQyx3Q0FBd0MsQ0FBQyxDQUFBO0FBS3pFLENBQUM7QUFFRjtJQUtJLFlBQVksVUFBMEM7UUFGdEQsZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBRSxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksZUFBUyxFQUFFLENBQUM7UUF3QnRDOztXQUVHO1FBRUgsZ0JBQVcsR0FBRztZQUNWLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCxnQkFBVyxHQUFHO1lBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUE4QjtnQkFDcEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRixlQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQTtRQXZDRyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM5QixDQUFDOztJQUVEOztPQUVHO0lBQ0ssYUFBYSxDQUFDLFNBQVM7UUFDM0IsSUFBSSxnQkFBZ0IsR0FBc0IsSUFBSSx1REFBZ0IsQ0FBQztZQUMzRCxhQUFhLEVBQUMsS0FBSztZQUNuQixNQUFNLEVBQUMsU0FBUztTQUNuQixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO1FBQ3BFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDO2FBQ3ZDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxhQUF5QjtRQUN0QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRWhELENBQUM7O0FBb0JMLENBQUM7QUE5Q1ksbUJBQVcsY0E4Q3ZCLENBQUEifQ==