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
const http = require("http");
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
            let done = plugins.smartq.defer();
            if (!this.httpServer) {
                this.httpServer = new http.Server();
            }
            this.io = plugins.socketIo(this.httpServer);
            this.io.on('connection', socketArg => {
                this._handleSocketConnection(socketArg);
            });
            this.httpServer.listen(this.options.port, () => {
                done.resolve();
            });
            return yield done.promise;
        });
    }
    /**
     * starts the server with another server
     */
    setServer(httpServerArg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.httpServer = httpServerArg;
        });
    }
    /**
     * closes the server
     */
    closeServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield plugins.smartdelay.delayFor(1000);
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
        socketRequest.dispatch().then((dataArg) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlEQUFpRDtBQUdqRCw2QkFBNkI7QUFFN0IsVUFBVTtBQUNWLDZCQUFnQztBQUVoQyxpR0FBMEU7QUFDMUUsMkZBQW9FO0FBVXBFO0lBTUUsWUFBWSxVQUEwQztRQUZ0RCxnQkFBVyxHQUFHLElBQUksZUFBUyxFQUFvQixDQUFDO1FBQ2hELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWMsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDRyxXQUFXOztZQUNmLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxD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