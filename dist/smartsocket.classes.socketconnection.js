"use strict";
const plugins = require("./smartsocket.plugins");
const helpers = require("./smartsocket.helpers");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
;
// export classes
/**
 * class SocketConnection represents a websocket connection
 */
class SocketConnection {
    constructor(optionsArg) {
        this.authenticated = false;
        this.alias = optionsArg.alias;
        this.authenticated = optionsArg.authenticated;
        this.role = optionsArg.role;
        this.socket = optionsArg.socket;
        // standard behaviour that is always true
        this.socket.on("disconnect", () => {
            plugins.beautylog.info(`Client ${this.alias} disconnected`);
        });
    }
    ;
    // authenticating --------------------------
    /**
     * authenticate the socket
     */
    authenticate() {
        let done = plugins.q.defer();
        this.socket.on("dataAuth", dataArg => {
            plugins.beautylog.log("received authentication data. now hashing and comparing...");
            this.socket.removeListener("dataAuth", () => { });
            if ((true)) {
                this.alias = dataArg.alias;
                this.authenticated = true;
                this.role = helpers.getSocketRoleByName(dataArg.role);
                this.socket.emit("authenticated");
                plugins.beautylog.ok(`socket with >>alias ${this.alias} >>role ${this.role} is authenticated!`);
                done.resolve(this);
            }
            else {
                this.authenticated = false;
                this.socket.disconnect();
                done.reject("not authenticated");
            }
            ;
        });
        this.socket.emit("requestAuth");
        return done.promise;
    }
    ;
    // listening -------------------------------
    /**
     * listen to function requests
     */
    listenToFunctionRequests() {
        let done = plugins.q.defer();
        if (this.authenticated) {
            this.socket.on("function", (dataArg) => {
                // check if requested function is available to the socket's scope
                plugins.beautylog.log("function request received");
                let referencedFunction = this.role.allowedFunctions.find((socketFunctionArg) => {
                    return socketFunctionArg.name === dataArg.funcCallData.funcName;
                });
                if (referencedFunction !== undefined) {
                    plugins.beautylog.ok("function in access scope");
                    let localSocketRequest = new smartsocket_classes_socketrequest_1.SocketRequest({
                        side: "responding",
                        originSocketConnection: this,
                        shortId: dataArg.shortId,
                        funcCallData: dataArg.funcCallData
                    });
                    localSocketRequest.createResponse(); // takes care of creating response and sending it back 
                }
                else {
                    plugins.beautylog.warn("function not existent or out of access scope");
                }
                ;
            });
            this.socket.on("functionResponse", (dataArg) => {
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
        ;
        return done.promise;
    }
    ;
}
exports.SocketConnection = SocketConnection;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFJakQsb0RBQTJFLHFDQUFxQyxDQUFDLENBQUE7QUFhaEgsQ0FBQztBQVdGLGlCQUFpQjtBQUVqQjs7R0FFRztBQUNIO0lBS0ksWUFBWSxVQUErQztRQUgzRCxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUkzQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFFaEMseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUN6QixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLGVBQWUsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7SUFFRCw0Q0FBNEM7SUFFNUM7O09BRUc7SUFDSCxZQUFZO1FBQ1IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsT0FBTztZQUM5QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1lBQ3BGLElBQUks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