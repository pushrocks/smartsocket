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
const smartsocket_classes_socketserver_1 = require("./smartsocket.classes.socketserver");
class Smartsocket {
    constructor(optionsArg) {
        this.openSockets = new lik_1.Objectmap();
        this.socketRoles = new lik_1.Objectmap();
        this.socketServer = new smartsocket_classes_socketserver_1.SocketServer(this);
        // tslint:disable-next-line:member-ordering
        this.setExternalServer = this.socketServer.setExternalServer;
        this.options = optionsArg;
    }
    /**
     * starts smartsocket
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.io = plugins.socketIo(this.socketServer.getServerForSocketIo());
            yield this.socketServer.start();
            this.io.on('connection', socketArg => {
                this._handleSocketConnection(socketArg);
            });
        });
    }
    /**
     * stops smartsocket
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield plugins.smartdelay.delayFor(1000);
            this.openSockets.forEach((socketObjectArg) => {
                plugins.beautylog.log(`disconnect socket with >>alias ${socketObjectArg.alias}`);
                socketObjectArg.socket.disconnect();
            });
            this.openSockets.wipe();
            this.io.close();
            // stop the corresponging server
            this.socketServer.stop();
        });
    }
    // communication
    /**
     * allows call to specific client.
     */
    clientCall(functionNameArg, dataArg, targetSocketConnectionArg) {
        return __awaiter(this, void 0, void 0, function* () {
            const done = plugins.smartq.defer();
            const socketRequest = new smartsocket_classes_socketrequest_1.SocketRequest({
                funcCallData: {
                    funcDataArg: dataArg,
                    funcName: functionNameArg
                },
                originSocketConnection: targetSocketConnectionArg,
                shortId: plugins.shortid.generate(),
                side: 'requesting'
            });
            socketRequest.dispatch().then((dataArg) => {
                done.resolve(dataArg.funcDataArg);
            });
            const result = yield done.promise;
            return result;
        });
    }
    /**
     * adds socketRoles
     */
    addSocketRoles(socketRolesArray) {
        for (const socketRole of socketRolesArray) {
            this.socketRoles.add(socketRole);
        }
        return;
    }
    /**
     * the standard handler for new socket connections
     */
    _handleSocketConnection(socketArg) {
        const socketConnection = new smartsocket_classes_socketconnection_1.SocketConnection({
            alias: undefined,
            authenticated: false,
            role: undefined,
            side: 'server',
            smartsocketHost: this,
            socket: socketArg
        });
        plugins.beautylog.log('Socket connected. Trying to authenticate...');
        this.openSockets.add(socketConnection);
        socketConnection
            .authenticate()
            .then(() => {
            return socketConnection.listenToFunctionRequests();
        })
            .catch(err => {
            console.log(err);
        });
    }
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlEQUFpRDtBQUdqRCxVQUFVO0FBQ1YsNkJBQWdDO0FBQ2hDLGlHQUEwRTtBQUUxRSwyRkFBb0U7QUFFcEUseUZBQWtFO0FBU2xFO0lBUUUsWUFBWSxVQUEwQztRQUwvQyxnQkFBVyxHQUFHLElBQUksZUFBUyxFQUFvQixDQUFDO1FBQ2hELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWMsQ0FBQztRQUV6QyxpQkFBWSxHQUFHLElBQUksK0NBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQU05QywyQ0FBMkM7UUFDcEMsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztRQUo3RCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM1QixDQUFDO0lBS0Q7O09BRUc7SUFDVSxLQUFLOztZQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7WUFDckUsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxJQUFJOztZQUNmLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMs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