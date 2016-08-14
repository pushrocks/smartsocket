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
                let referencedFunction = this.role.allowedFunctions.find((socketFunctionArg) => {
                    return socketFunctionArg.name === dataArg.funcCallData.funcName;
                });
                if (referencedFunction !== undefined) {
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
                let targetSocketRequest = helpers.getSocketRequestById(dataArg.shortId);
                targetSocketRequest.handleResponse(dataArg);
            });
        }
        else {
            done.reject("socket needs to be authenticated first");
        }
        ;
        return done.promise;
    }
    ;
}
exports.SocketConnection = SocketConnection;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFJakQsb0RBQTJFLHFDQUFxQyxDQUFDLENBQUE7QUFhaEgsQ0FBQztBQVdGLGlCQUFpQjtBQUVqQjs7R0FFRztBQUNIO0lBS0ksWUFBWSxVQUErQztRQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFFaEMseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUN6QixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLGVBQWUsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7SUFFRCw0Q0FBNEM7SUFFNUM7O09BRUc7SUFDSCxZQUFZO1FBQ1IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsT0FBTztZQUM5QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVB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