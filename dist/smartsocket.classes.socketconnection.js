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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQWdEO0FBQ2hELGlEQUFnRDtBQUVoRCw2QkFBK0I7QUFLL0IsMkZBQWdIO0FBK0JoSCxpQkFBaUI7QUFDTixRQUFBLG9CQUFvQixHQUFHLElBQUksZUFBUyxFQUFvQixDQUFBO0FBRW5FOztHQUVHO0FBQ0g7SUFPRSxZQUFhLFVBQStDO1FBSjVELGtCQUFhLEdBQVksS0FBSyxDQUFBO1FBSzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQTtRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUE7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFBO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQTtRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUE7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFBO1FBRS9CLHlDQUF5QztRQUN6Qyw0QkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxJQUFJLENBQUMsS0FBSyxhQUFhLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxDQUFBO1lBQ3ZHLDRCQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuQyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCw0Q0FBNEM7SUFFNUM7O09BRUc7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