"use strict";
const plugins = require("./smartsocket.plugins");
const helpers = require("./smartsocket.helpers");
// classes
const lik_1 = require("lik");
;
;
class Smartsocket {
    constructor(optionsArg) {
        this.openSockets = new lik_1.Objectmap();
        this.registeredRoles = new lik_1.Objectmap();
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
    _handleSocket(socket) {
        let socketObject = {
            socket: socket,
            authenticated: false
        };
        plugins.beautylog.log("Socket connected. Trying to authenticate...");
        this.openSockets.add(socketObject);
        helpers.authenticateSocket(socketObject)
            .then();
    }
    registerFunctions(socketRoleArg) {
        this.registeredRoles.add(socketRoleArg);
    }
    ;
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDakQsTUFBWSxPQUFPLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQUVqRCxVQUFVO0FBQ1Ysc0JBQTBCLEtBQUssQ0FBQyxDQUFBO0FBVS9CLENBQUM7QUFLRCxDQUFDO0FBRUY7SUFLSSxZQUFZLFVBQTBDO1FBRnRELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQUUsQ0FBQztRQUM5QixvQkFBZSxHQUFHLElBQUksZUFBUyxFQUFFLENBQUM7UUF3QmxDOztXQUVHO1FBRUgsZ0JBQVcsR0FBRztZQUNWLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCxnQkFBVyxHQUFHO1lBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUE4QjtnQkFDcEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRixlQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQTtRQXZDRyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM5QixDQUFDOztJQUVEOztPQUVHO0lBQ0ssYUFBYSxDQUFDLE1BQU07UUFDeEIsSUFBSSxZQUFZLEdBQWtCO1lBQzlCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsYUFBYSxFQUFFLEtBQUs7U0FDdkIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7UUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQzthQUNuQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsYUFBd0I7UUFDdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7QUFxQkwsQ0FBQztBQTlDWSxtQkFBVyxjQThDdkIsQ0FBQSJ9