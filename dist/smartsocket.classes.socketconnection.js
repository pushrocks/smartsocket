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
                // TODO: authenticate password
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
                let referencedFunction = this.role.allowedFunctions.find(socketFunctionArg => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQWlEO0FBQ2pELGlEQUFpRDtBQUVqRCw2QkFBZ0M7QUFLaEMsMkZBSTZDO0FBa0M3QyxpQkFBaUI7QUFDTixRQUFBLG9CQUFvQixHQUFHLElBQUksZUFBUyxFQUFvQixDQUFDO0FBRXBFOztHQUVHO0FBQ0g7SUFPRSxZQUFZLFVBQStDO1FBSjNELGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBSzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBRWhDLHlDQUF5QztRQUN6Qyw0QkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtZQUNoQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDcEIsZ0NBQWdDLElBQUksQ0FBQyxLQUFLLGFBQWEsSUFBSSxDQUFDLElBQUksZUFBZSxDQUNoRixDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN6Qiw0QkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFD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