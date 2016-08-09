import * as plugins from "./smartsocket.plugins";
import * as helpers from "./smartsocket.helpers";

// import classes
import { SocketFunction, ISocketFunctionRequestObject } from "./smartsocket.classes.socketfunction";
import { SocketRequest } from "./smartsocket.classes.socketrequest";
import { SocketRole } from "./smartsocket.classes.socketrole";

// export interfaces

/**
 * interface for constructor of class SocketConnection
 */
export interface ISocketConnectionOptions {
    alias?: string;
    authenticated: boolean;
    role?: SocketRole;
    socket: SocketIO.Socket;
};

/**
 * interface for authentication data
 */
export interface ISocketConnectionAuthenticationObject {
    role: "coreflowContainer",
    password: "somePassword",
    alias: "coreflow1"
}

// export classes

/**
 * class SocketConnection represents a websocket connection
 */
export class SocketConnection {
    alias?: string;
    authenticated: boolean;
    role?: SocketRole;
    socket: SocketIO.Socket;
    constructor(optionsArg: ISocketConnectionOptions) {
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
            if ((true)) { // TODO: authenticate password
                this.alias = dataArg.alias
                this.authenticated = true;
                this.role = helpers.findSocketRoleByString(dataArg.role);
                this.socket.emit("authenticated");
                plugins.beautylog.ok(`socket with >>alias ${this.alias} >>role ${this.role} is authenticated!`);
                done.resolve(this);
            } else {
                this.socket.disconnect();
                done.reject("not authenticated");
            };
        });
        this.socket.emit("requestAuth");
        return done.promise;
    };

    /**
     * listen to function requests
     */
    listenToFunctionRequests() {
        let done = plugins.q.defer();
        if(this.authenticated){
            this.socket.on("function", (dataArg:ISocketFunctionRequestObject) => {
                let referencedFunction:SocketFunction = this.role.allowedFunctions.find((socketFunctionArg) => {
                    return socketFunctionArg.name === dataArg.functionName
                });
                if(referencedFunction !== undefined){
                    let localSocketRequest = new SocketRequest({
                        side:"responding",
                        shortid:dataArg.shortId,
                        requestData:dataArg
                    });
                } else {
                    plugins.beautylog.warn("function not existent or out of access scope");
                };
            });
            this.socket.on("functionResponse", (dataArg:ISocketFunctionRequestObject) => {
                
            })
        } else {
            done.reject("socket needs to be authenticated first");
        };
        return done.promise;
    }
};
