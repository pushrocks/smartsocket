import * as plugins from "./smartsocket.plugins";
import * as helpers from "./smartsocket.helpers";

import {Objectmap} from "lik";

// import classes
import { Smartsocket } from "./smartsocket.classes.smartsocket"
import { SocketFunction } from "./smartsocket.classes.socketfunction";
import { SocketRequest, ISocketRequestDataObject, allSocketRequests } from "./smartsocket.classes.socketrequest";
import { SocketRole } from "./smartsocket.classes.socketrole";

// export interfaces

/**
 * defines is a SocketConnection is server or client side. Important for mesh setups.
 */
export type TSocketConnectionSide = "server" | "client";

/**
 * interface for constructor of class SocketConnection
 */
export interface ISocketConnectionConstructorOptions {
    alias: string;
    authenticated: boolean;
    role: SocketRole;
    side: TSocketConnectionSide;
    smartsocketHost: Smartsocket;
    socket: SocketIO.Socket | SocketIOClient.Socket;
};

/**
 * interface for authentication data
 */
export interface ISocketConnectionAuthenticationObject {
    role: "coreflowContainer",
    password: "somePassword",
    alias: "coreflow1"
};

// export classes
export let allSocketConnections = new Objectmap<SocketConnection>();

/**
 * class SocketConnection represents a websocket connection
 */
export class SocketConnection {
    alias: string;
    side:TSocketConnectionSide;
    authenticated: boolean = false;
    role: SocketRole;
    smartsocketHost:Smartsocket;
    socket: SocketIO.Socket | SocketIOClient.Socket;
    constructor(optionsArg: ISocketConnectionConstructorOptions) {
        this.alias = optionsArg.alias;
        this.authenticated = optionsArg.authenticated;
        this.role = optionsArg.role;
        this.side = optionsArg.side;
        this.smartsocketHost = optionsArg.smartsocketHost;
        this.socket = optionsArg.socket;
        
        // standard behaviour that is always true
        allSocketConnections.add(this);
        this.socket.on("disconnect", () => {
            plugins.beautylog.info(`SocketConnection with >alias ${this.alias} on >side ${this.side} disconnected`);
            allSocketConnections.remove(this);
        });
    };

    // authenticating --------------------------

    /**
     * authenticate the socket
     */
    authenticate() {
        let done = plugins.q.defer();
        this.socket.on("dataAuth", (dataArg:ISocketConnectionAuthenticationObject) => {
            plugins.beautylog.log("received authentication data. now hashing and comparing...");
            this.socket.removeListener("dataAuth", () => { });
            if (helpers.checkPasswordForRole(dataArg,this.smartsocketHost)) { // TODO: authenticate password
                this.alias = dataArg.alias
                this.authenticated = true;
                this.role = helpers.getSocketRoleByName(dataArg.role,this.smartsocketHost);
                this.socket.emit("authenticated");
                plugins.beautylog.ok(`socket with >>alias ${this.alias} >>role ${this.role} is authenticated!`);
                done.resolve(this);
            } else {
                this.authenticated = false;
                this.socket.disconnect();
                done.reject("not authenticated");
            };
        });
        this.socket.emit("requestAuth");
        return done.promise;
    };

    // listening -------------------------------

    /**
     * listen to function requests
     */
    listenToFunctionRequests(){
        let done = plugins.q.defer();
        if(this.authenticated){
            this.socket.on("function", (dataArg:ISocketRequestDataObject) => {
                // check if requested function is available to the socket's scope
                plugins.beautylog.log("function request received");
                let referencedFunction:SocketFunction = this.role.allowedFunctions.find((socketFunctionArg) => {
                    return socketFunctionArg.name === dataArg.funcCallData.funcName;
                });
                if(referencedFunction !== undefined){
                    plugins.beautylog.ok!("function in access scope");
                    let localSocketRequest = new SocketRequest({
                        side:"responding",
                        originSocketConnection:this,
                        shortId:dataArg.shortId,
                        funcCallData:dataArg.funcCallData
                    });
                    localSocketRequest.createResponse(); // takes care of creating response and sending it back 
                } else {
                    plugins.beautylog.warn("function not existent or out of access scope");
                };
            });
            this.socket.on("functionResponse", (dataArg:ISocketRequestDataObject) => {
                plugins.beautylog.info(`received response for request with id ${dataArg.shortId}`);
                let targetSocketRequest = helpers.getSocketRequestById(dataArg.shortId);
                targetSocketRequest.handleResponse(dataArg);
            });
            plugins.beautylog.log(`now listening to function requests for ${this.alias}`);
            done.resolve(this);
        } else {
            let errMessage: "socket needs to be authenticated first";
            plugins.beautylog.error(errMessage);
            done.reject(errMessage);
        };
        return done.promise;
    };

    // sending ----------------------
    
};
