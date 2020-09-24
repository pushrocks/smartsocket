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
exports.SocketConnection = exports.allSocketConnections = void 0;
const plugins = __importStar(require("./smartsocket.plugins"));
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
const smartsocket_classes_socketrole_1 = require("./smartsocket.classes.socketrole");
const smartsocket_logging_1 = require("./smartsocket.logging");
// export classes
exports.allSocketConnections = new plugins.lik.ObjectMap();
/**
 * class SocketConnection represents a websocket connection
 */
class SocketConnection {
    constructor(optionsArg) {
        this.authenticated = false;
        this.eventSubject = new plugins.smartrx.rxjs.Subject();
        this.eventStatus = 'new';
        this.alias = optionsArg.alias;
        this.authenticated = optionsArg.authenticated;
        this.role = optionsArg.role;
        this.side = optionsArg.side;
        this.smartsocketRef = optionsArg.smartsocketHost;
        this.socket = optionsArg.socket;
        // standard behaviour that is always true
        exports.allSocketConnections.add(this);
        // handle connection
        this.socket.on('connect', async () => {
            this.updateStatus('connected');
        });
        this.socket.on('disconnect', async () => {
            smartsocket_logging_1.logger.log('info', `SocketConnection with >alias ${this.alias} on >side ${this.side} disconnected`);
            await this.disconnect();
            exports.allSocketConnections.remove(this);
        });
    }
    // authenticating --------------------------
    /**
     * authenticate the socket
     */
    authenticate() {
        const done = plugins.smartpromise.defer();
        this.socket.on('dataAuth', async (dataArg) => {
            smartsocket_logging_1.logger.log('info', 'received authentication data. now hashing and comparing...');
            this.socket.removeListener('dataAuth', () => { });
            if (smartsocket_classes_socketrole_1.SocketRole.checkPasswordForRole(dataArg, this.smartsocketRef)) {
                // TODO: authenticate password
                this.alias = dataArg.alias;
                this.authenticated = true;
                this.role = smartsocket_classes_socketrole_1.SocketRole.getSocketRoleByName(this.smartsocketRef, dataArg.role);
                this.socket.emit('authenticated');
                smartsocket_logging_1.logger.log('ok', `socket with >>alias ${this.alias} >>role ${this.role} is authenticated!`);
                done.resolve(this);
            }
            else {
                this.authenticated = false;
                await this.disconnect();
                done.reject('not authenticated');
            }
        });
        const requestAuthPayload = {
            serverShortId: this.smartsocketRef.shortId
        };
        this.socket.emit('requestAuth', requestAuthPayload);
        return done.promise;
    }
    // listening -------------------------------
    /**
     * listen to function requests
     */
    listenToFunctionRequests() {
        const done = plugins.smartpromise.defer();
        if (this.authenticated) {
            this.socket.on('function', (dataArg) => {
                // check if requested function is available to the socket's scope
                smartsocket_logging_1.logger.log('info', 'function request received');
                const referencedFunction = this.role.allowedFunctions.find(socketFunctionArg => {
                    return socketFunctionArg.name === dataArg.funcCallData.funcName;
                });
                if (referencedFunction) {
                    smartsocket_logging_1.logger.log('ok', 'function in access scope');
                    const localSocketRequest = new smartsocket_classes_socketrequest_1.SocketRequest(this.smartsocketRef, {
                        side: 'responding',
                        originSocketConnection: this,
                        shortId: dataArg.shortId,
                        funcCallData: dataArg.funcCallData
                    });
                    localSocketRequest.createResponse(); // takes care of creating response and sending it back
                }
                else {
                    smartsocket_logging_1.logger.log('warn', 'function not existent or out of access scope');
                }
            });
            this.socket.on('functionResponse', (dataArg) => {
                smartsocket_logging_1.logger.log('info', `received response for request with id ${dataArg.shortId}`);
                const targetSocketRequest = smartsocket_classes_socketrequest_1.SocketRequest.getSocketRequestById(this.smartsocketRef, dataArg.shortId);
                targetSocketRequest.handleResponse(dataArg);
            });
            smartsocket_logging_1.logger.log('info', `now listening to function requests for ${this.alias}`);
            done.resolve(this);
        }
        else {
            const errMessage = 'socket needs to be authenticated first';
            smartsocket_logging_1.logger.log('error', errMessage);
            done.reject(errMessage);
        }
        return done.promise;
    }
    // disconnecting ----------------------
    async disconnect() {
        this.socket.disconnect(true);
        this.updateStatus('disconnected');
    }
    updateStatus(statusArg) {
        if (this.eventStatus !== statusArg) {
            this.eventSubject.next(statusArg);
        }
        this.eventStatus = statusArg;
    }
}
exports.SocketConnection = SocketConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBaUQ7QUFNakQsMkZBQThGO0FBQzlGLHFGQUE4RDtBQUs5RCwrREFBK0M7QUE4Qi9DLGlCQUFpQjtBQUNOLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBb0IsQ0FBQztBQUVoRjs7R0FFRztBQUNILE1BQWEsZ0JBQWdCO0lBVzNCLFlBQVksVUFBK0M7UUFScEQsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFLL0IsaUJBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBZ0MsQ0FBQztRQUNoRixnQkFBVyxHQUFpQyxLQUFLLENBQUM7UUFHdkQsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFFaEMseUNBQXlDO1FBQ3pDLDRCQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ25DLElBQUksQ0FB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