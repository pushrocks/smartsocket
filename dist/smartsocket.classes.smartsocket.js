"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartsocket.plugins");
// classes
const lik_1 = require("lik");
const smartsocket_classes_socketconnection_1 = require("./smartsocket.classes.socketconnection");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
class Smartsocket {
    constructor(optionsArg) {
        this.openSockets = new lik_1.Objectmap();
        this.socketRoles = new lik_1.Objectmap();
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
    // communication
    /**
     * allows call to specific client.
     */
    clientCall(functionNameArg, dataArg, targetSocketConnectionArg) {
        let done = plugins.smartq.defer();
        let socketRequest = new smartsocket_classes_socketrequest_1.SocketRequest({
            side: 'requesting',
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
    /**
     * adds socketRoles
     */
    addSocketRoles(socketRolesArray) {
        for (let socketRole of socketRolesArray) {
            this.socketRoles.add(socketRole);
        }
        return;
    }
    /**
     * the standard handler for new socket connections
     */
    _handleSocketConnection(socketArg) {
        let socketConnection = new smartsocket_classes_socketconnection_1.SocketConnection({
            alias: undefined,
            authenticated: false,
            role: undefined,
            side: 'server',
            smartsocketHost: this,
            socket: socketArg
        });
        plugins.beautylog.log('Socket connected. Trying to authenticate...');
        this.openSockets.add(socketConnection);
        socketConnection.authenticate()
            .then(() => {
            return socketConnection.listenToFunctionRequests();
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBZ0Q7QUFHaEQsVUFBVTtBQUNWLDZCQUErQjtBQUUvQixpR0FBeUU7QUFDekUsMkZBQW1FO0FBT25FO0lBS0UsWUFBYSxVQUEwQztRQUZ2RCxnQkFBVyxHQUFHLElBQUksZUFBUyxFQUFvQixDQUFBO1FBQy9DLGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWMsQ0FBQTtRQUt6Qzs7V0FFRztRQUNILGdCQUFXLEdBQUc7WUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM3QyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTO2dCQUNqQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDekMsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUE7UUFDRCxnQkFBVyxHQUFHO1lBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFpQztnQkFDekQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO2dCQUNoRixlQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3JDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2pCLENBQUMsQ0FBQTtRQW5CQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQTtJQUMzQixDQUFDO0lBb0JELGdCQUFnQjtJQUVoQjs7T0FFRztJQUNILFVBQVUsQ0FBRSxlQUF1QixFQUFFLE9BQVksRUFBRSx5QkFBMkM7UUFDNUYsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNqQyxJQUFJLGFBQWEsR0FBRyxJQUFJLGlEQUFhLENBQUM7WUFDcEMsSUFBSSxFQUFFLFlBQVk7WUFDbEIsc0JBQXNCLEVBQUUseUJBQXlCO1lBQ2pELE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNuQyxZQUFZLEVBQUU7Z0JBQ1osUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFdBQVcsRUFBRSxPQUFPO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFBO1FBQ0YsYUFBYSxDQUFDLFFBQVEsRUFBRTthQUNyQixJQUFJLENBQUMsQ0FBQyxPQUE0QjtZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQyxDQUFDLENBQUMsQ0FBQTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWMsQ0FBRSxnQkFBOEI7UUFDNUMsR0FBRyxDQUFDLENBQUMsSUFBSSxVQUFVLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLENBQUM7UUFDRCxNQUFNLENBQUE7SUFDUixDQUFDO0lBRUQ7O09BRUc7SUFDSyx1QkFBdUIsQ0FBRSxTQUFTO1FBQ3hDLElBQUksZ0JBQWdCLEdBQXFCLElBQUksdURBQWdCLENBQUM7WUFDNUQsS0FBSyxFQUFFLFNBQVM7WUFDaEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsUUFBUTtZQUNkLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUMsQ0FBQTtRQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7UUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUN0QyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7YUFDNUIsSUFBSSxDQUFDO1lBQ0osTUFBTSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixFQUFFLENBQUE7UUFDcEQsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRztZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBRUY7QUFuRkQsa0NBbUZDIn0=