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
     * also works with an express style server
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