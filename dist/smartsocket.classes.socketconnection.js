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
    }
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
                this.role = helpers.findSocketRoleByString(dataArg.role);
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
                    localSocketRequest;
                }
                else {
                    plugins.beautylog.warn("function not existent or out of access scope");
                }
                ;
            });
            this.socket.on("functionResponse", (dataArg) => {
            });
        }
        else {
            done.reject("socket needs to be authenticated first");
        }
        ;
        return done.promise;
    }
}
exports.SocketConnection = SocketConnection;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRjb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFJakQsb0RBQXdELHFDQUFxQyxDQUFDLENBQUE7QUFhN0YsQ0FBQztBQVdGLGlCQUFpQjtBQUVqQjs7R0FFRztBQUNIO0lBS0ksWUFBWSxVQUFvQztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUNEOztPQUVHO0lBQ0gsWUFBWTtRQUNSLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU87WUFDOUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNERBQTRELENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7Z0JBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dC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