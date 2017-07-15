"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.options = optionsArg;
    }
    /**
     * starts listening to incoming sockets:
     */
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.io = plugins.socketIo(this.options.port);
            this.io.on('connection', (socketArg) => {
                this._handleSocketConnection(socketArg);
            });
        });
    }
    /**
     * closes the server
     */
    closeServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.openSockets.forEach((socketObjectArg) => {
                plugins.beautylog.log(`disconnect socket with >>alias ${socketObjectArg.alias}`);
                socketObjectArg.socket.disconnect();
            });
            this.openSockets.wipe();
            this.io.close();
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUdoRCxVQUFVO0FBQ1YsNkJBQStCO0FBRS9CLGlHQUF5RTtBQUN6RSwyRkFBbUU7QUFPbkU7SUFLRSxZQUFhLFVBQTBDO1FBRnZELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQW9CLENBQUE7UUFDL0MsZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBYyxDQUFBO1FBRXZDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFBO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNHLFdBQVc7O1lBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUztnQkFDakMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDRyxXQUFXOztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBaUM7Z0JBQ3pELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtnQkFDaEYsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUNyQyxDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNqQixDQUFDO0tBQUE7SUFFRCxnQkFBZ0I7SUFFaEI7O09BRUc7SUFDSCxVQUFVLENBQUUsZUFBdUIsRUFBRSxPQUFZLEVBQUUseUJBQTJDO1FBQzVGLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDakMsSUFBSSxhQUFhLEdBQUcsSUFBSSxpREFBYSxDQUFDO1lBQ3BDLElBQUksRUFBRSxZQUFZO1lBQ2xCLHNCQUFzQixFQUFFLHlCQUF5QjtZQUNqRCxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDbkMsWUFBWSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUUsT0FBTzthQUNyQjtTQUNGLENBQUMsQ0FBQTtRQUNGLGFBQWEsQ0FBQyxRQUFRLEVBQUU7YUFDckIsSUFBSSxDQUFDLENBQUMsT0FBNEI7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkMsQ0FBQyxDQUFDLENBQUE7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUUsZ0JBQThCO1FBQzVDLEdBQUcsQ0FBQyxDQUFDLElBQUksVUFBVSxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxDQUFDO1FBQ0QsTUFBTSxDQUFBO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ0ssdUJBQXVCLENBQUUsU0FBUztRQUN4QyxJQUFJLGdCQUFnQixHQUFxQixJQUFJLHVEQUFnQixDQUFDO1lBQzVELEtBQUssRUFBRSxTQUFTO1lBQ2hCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxlQUFlLEVBQUUsSUFBSTtZQUNyQixNQUFNLEVBQUUsU0FBUztTQUNsQixDQUFDLENBQUE7UUFDRixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO1FBQ3BFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDdEMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFO2FBQzVCLElBQUksQ0FBQztZQUNKLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO1FBQ3BELENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEdBQUc7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUVGO0FBdkZELGtDQXVGQyJ9