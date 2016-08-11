import * as plugins from "./smartsocket.plugins"


// import interfaces
import { ISocketFunctionCall } from "./smartsocket.classes.socketfunction";
import { ISocketRequestDataObject } from "./smartsocket.classes.socketrequest"

// import classes
import { SocketConnection } from "./smartsocket.classes.socketconnection";
import { SocketFunction } from "./smartsocket.classes.socketfunction";
import { SocketRequest } from "./smartsocket.classes.socketrequest";
/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
    port: number;
    url: string;
    alias?:string; // an alias makes ir easier to identify this client in a multo client environment
    password: string; // by setting a password access to functions can be limited
}

export class SmartsocketClient {
    socketConnection:SocketConnection;
    serverUrl:string;
    serverPort:number;
    serverPassword:string;
    constructor(optionsArg:ISmartsocketClientOptions){
        this.serverUrl = optionsArg.url
        this.serverPort = optionsArg.port;
        this.serverPassword = optionsArg.password
    };

    // authenticates the socket against the server
    private _handleSocketConnection() {
        let done = plugins.q.defer();
        let socketUrl = `${this.serverUrl}:${this.serverPort}`;
        this.socketConnection = new SocketConnection({
            authenticated:false,
            socket: plugins.socketIoClient(this.serverUrl,{})
        });
        this.socketConnection.socket.on("requestAuth", function () {
            console.log("server requested authentication");
            this.socketConnection.socket.emit("dataAuth", {
                role: "coreflowContainer",
                password: "somePassword",
                alias: "coreflow1"
            });
            this.socketConnection.socket.on("authenticated",() => {
                console.log("client is authenticated");
                done.resolve();
            });
        });
        return done.promise;
    };
    serverCall(functionNameArg:string,dataArg:ISocketFunctionCall){
        let done = plugins.q.defer();
        let socketRequest = new SocketRequest({
            side:"requesting",
            originSocketConnection:this.socketConnection,
            shortId:plugins.shortid.generate(),
            funcCallData:{
                funcName: functionNameArg,
                funcDataArg:dataArg
            }
        });
        socketRequest.dispatch()
            .then(() => {
                done.resolve();
            });
        return done.promise;
    };
    
}