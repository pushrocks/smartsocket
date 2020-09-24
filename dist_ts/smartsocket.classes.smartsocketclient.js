"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartsocketClient = void 0;
const plugins = __importStar(require("./smartsocket.plugins"));
const smartsocket_classes_socketconnection_1 = require("./smartsocket.classes.socketconnection");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
const smartsocket_classes_socketrole_1 = require("./smartsocket.classes.socketrole");
const smartsocket_logging_1 = require("./smartsocket.logging");
class SmartsocketClient {
    constructor(optionsArg) {
        // a unique id
        this.shortId = plugins.smartunique.shortId();
        // the shortId of the remote we connect to
        this.remoteShortId = null;
        // status handling
        this.eventSubject = new plugins.smartrx.rxjs.Subject();
        this.eventStatus = 'new';
        this.socketFunctions = new plugins.lik.ObjectMap();
        this.socketRequests = new plugins.lik.ObjectMap();
        this.socketRoles = new plugins.lik.ObjectMap();
        this.alias = optionsArg.alias;
        this.serverUrl = optionsArg.url;
        this.serverPort = optionsArg.port;
        this.socketRole = new smartsocket_classes_socketrole_1.SocketRole({
            name: optionsArg.role,
            passwordHash: optionsArg.password
        });
        this.autoReconnect = optionsArg.autoReconnect;
    }
    addSocketFunction(socketFunction) {
        this.socketFunctions.add(socketFunction);
        this.socketRole.allowedFunctions.add(socketFunction);
    }
    /**
     * connect the client to the server
     */
    connect() {
        const done = plugins.smartpromise.defer();
        smartsocket_logging_1.logger.log('info', 'trying to connect...');
        const socketUrl = `${this.serverUrl}:${this.serverPort}`;
        this.socketConnection = new smartsocket_classes_socketconnection_1.SocketConnection({
            alias: this.alias,
            authenticated: false,
            role: this.socketRole,
            side: 'client',
            smartsocketHost: this,
            socket: plugins.socketIoClient(socketUrl, {
                multiplex: false,
                reconnectionAttempts: 5,
            })
        });
        const timer = new plugins.smarttime.Timer(5000);
        timer.start();
        timer.completed.then(() => {
            smartsocket_logging_1.logger.log('warn', 'connection to server timed out.');
            this.disconnect();
        });
        // authentication flow
        this.socketConnection.socket.on('requestAuth', (requestAuthPayload) => {
            timer.reset();
            smartsocket_logging_1.logger.log('info', 'server requested authentication');
            // lets register the authenticated event
            this.socketConnection.socket.on('authenticated', () => {
                this.remoteShortId = requestAuthPayload.serverShortId;
                smartsocket_logging_1.logger.log('info', 'client is authenticated');
                this.socketConnection.authenticated = true;
                this.socketConnection.listenToFunctionRequests();
                done.resolve();
            });
            // lets register the forbidden event
            this.socketConnection.socket.on('forbidden', async () => {
                smartsocket_logging_1.logger.log('warn', `disconnecting due to being forbidden to use the ressource`);
                await this.disconnect();
            });
            // lets provide the actual auth data
            this.socketConnection.socket.emit('dataAuth', {
                role: this.socketRole.name,
                password: this.socketRole.passwordHash,
                alias: this.alias
            });
        });
        // handle connection
        this.socketConnection.socket.on('connect', async () => {
            this.updateStatus('connected');
        });
        // handle disconnection and errors
        this.socketConnection.socket.on('disconnect', async () => {
            await this.disconnect();
        });
        this.socketConnection.socket.on('reconnect_failed', async () => {
            await this.disconnect();
        });
        this.socketConnection.socket.on('connect_error', async () => {
            await this.disconnect();
        });
        return done.promise;
    }
    /**
     * disconnect from the server
     */
    async disconnect() {
        if (this.socketConnection) {
            await this.socketConnection.disconnect();
            this.socketConnection = undefined;
            smartsocket_logging_1.logger.log('ok', 'disconnected!');
        }
        smartsocket_logging_1.logger.log('warn', `disconnected from server ${this.remoteShortId}`);
        this.remoteShortId = null;
        this.updateStatus('disconnected');
        if (this.autoReconnect) {
            this.tryDebouncedReconnect();
        }
    }
    /**
     * try a reconnection
     */
    async tryDebouncedReconnect() {
        await plugins.smartdelay.delayForRandom(10000, 60000);
        await this.connect();
    }
    /**
     * dispatches a server call
     * @param functionNameArg
     * @param dataArg
     */
    async serverCall(functionNameArg, dataArg) {
        const done = plugins.smartpromise.defer();
        const socketRequest = new smartsocket_classes_socketrequest_1.SocketRequest(this, {
            side: 'requesting',
            originSocketConnection: this.socketConnection,
            shortId: plugins.smartunique.shortId(),
            funcCallData: {
                funcName: functionNameArg,
                funcDataArg: dataArg
            }
        });
        const response = await socketRequest.dispatch();
        const result = response.funcDataArg;
        return result;
    }
    updateStatus(statusArg) {
        if (this.eventStatus !== statusArg) {
            this.eventSubject.next(statusArg);
        }
        this.eventStatus = statusArg;
    }
}
exports.SmartsocketClient = SmartsocketClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldGNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXRjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUFpRDtBQUdqRCxpR0FBMEU7QUFFMUUsMkZBQThGO0FBQzlGLHFGQUE4RDtBQUM5RCwrREFBK0M7QUFjL0MsTUFBYSxpQkFBaUI7SUFzQjVCLFlBQVksVUFBcUM7UUFyQmpELGNBQWM7UUFDUCxZQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUvQywwQ0FBMEM7UUFDbkMsa0JBQWEsR0FBVyxJQUFJLENBQUM7UUFTcEMsa0JBQWtCO1FBQ1gsaUJBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBZ0MsQ0FBQztRQUNoRixnQkFBVyxHQUFpQyxLQUFLLENBQUM7UUFFbEQsb0JBQWUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUF1QixDQUFDO1FBQ25FLG1CQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBc0IsQ0FBQztRQUNqRSxnQkFBVyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQWMsQ0FBQztRQUczRCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksMkNBQVUsQ0FBQztZQUMvQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7WUFDckIsWUFBWSxFQUFFLFVBQVUs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