"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartsocket.plugins");
const helpers = require("./smartsocket.helpers");
const lik_1 = require("lik");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
// export classes
exports.allSocketConnections = new lik_1.Objectmap();
/**
 * class SocketConnection represents a websocket connection
 */
class SocketConnection {
    constructor(optionsArg) {
        this.authenticated = false;
        this.alias = optionsArg.alias;
        this.authenticated = optionsArg.authenticated;
        this.role = optionsArg.role;
        this.side = optionsArg.side;
        this.smartsocketHost = optionsArg.smartsocketHost;
        this.socket = optionsArg.socket;
        // standard behaviour that is always true
        exports.allSocketConnections.add(this);
        this.socket.on('disconnect', () => {
            plugins.beautylog.info(`SocketConnection with >alias ${this.alias} on >side ${this.side} disconnected`);
            this.socket.disconnect();
            exports.allSocketConnections.remove(this);
        });
    }
    // authenticating --------------------------
    /**
     * authenticate the socket
     */
    authenticate() {
        let done = plugins.smartq.defer();
        this.socket.on('dataAuth', (dataArg) => {
            plugins.beautylog.log('received authentication data. now hashing and comparing...');
            this.socket.removeListener('dataAuth', () => { });
            if (helpers.checkPasswordForRole(dataArg, this.smartsocketHost)) {
                this.alias = dataArg.alias;
                this.authenticated = true;
                this.role = helpers.getSocketRoleByName(dataArg.role, this.smartsocketHost);
                this.socket.emit('authenticated');
                plugins.beautylog.ok(`socket with >>alias ${this.alias} >>role ${this.role} is authenticated!`);
                done.resolve(this);
            }
            else {
                this.authenticated = false;
                this.socket.disconnect();
                done.reject('not authenticated');
            }
        });
        this.socket.emit('requestAuth');
        return done.promise;
    }
    // listening -------------------------------
    /**
     * listen to function requests
     */
    listenToFunctionRequests() {
        let done = plugins.smartq.defer();
        if (this.authenticated) {
            this.socket.on('function', (dataArg) => {
                // check if requested function is available to the socket's scope
                plugins.beautylog.log('function request received');
                let referencedFunction = this.role.allowedFunctions.find((socketFunctionArg) => {
                    return socketFunctionArg.name === dataArg.funcCallData.funcName;
                });
                if (referencedFunction !== undefined) {
                    plugins.beautylog.ok('function in access scope');
                    let localSocketRequest = new smartsocket_classes_socketrequest_1.SocketRequest({
                        side: 'responding',
                        originSocketConnection: this,
                        shortId: dataArg.shortId,
                        funcCallData: dataArg.funcCallData
                    });
                    localSocketRequest.createResponse(); // takes care of creating response and sending it back
                }
                else {
                    plugins.beautylog.warn('function not existent or out of access scope');
                }
            });
            this.socket.on('functionResponse', (dataArg) => {
                plugins.beautylog.info(`received response for request with id ${dataArg.shortId}`);
                let targetSocketRequest = helpers.getSocketRequestById(dataArg.shortId);
                targetSocketRequest.handleResponse(dataArg);
            });
            plugins.beautylog.log(`now listening to function requests for ${this.alias}`);
            done.resolve(this);
        }
        else {
            let errMessage;
            plugins.beautylog.error(errMessage);
            done.reject(errMessage);
        }
        return done.promise;
    }
}
exports.SocketConnection = SocketConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQWdEO0FBQ2hELGlEQUFnRDtBQUVoRCw2QkFBK0I7QUFLL0IsMkZBQWdIO0FBK0JoSCxpQkFBaUI7QUFDTixRQUFBLG9CQUFvQixHQUFHLElBQUksZUFBUyxFQUFvQixDQUFBO0FBRW5FOztHQUVHO0FBQ0g7SUFPRSxZQUFhLFVBQStDO1FBSjVELGtCQUFhLEdBQVksS0FBSyxDQUFBO1FBSzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQTtRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUE7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFBO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQTtRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUE7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFBO1FBRS9CLHlDQUF5QztRQUN6Qyw0QkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtZQUNoQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsSUFBSSxDQUFDLEtBQUssYUFBYSxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsQ0FBQTtZQUN2RyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3hCLDRCQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNu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