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
    alias:string; // an alias makes it easier to identify this client in a multo client environment
    role:string;
    password: string; // by setting a password access to functions can be limited
}

export class SmartsocketClient {
    alias:string;
    role:string;
    socketConnection:SocketConnection;
    serverUrl:string;
    serverPort:number;
    serverPassword:string;
    constructor(optionsArg:ISmartsocketClientOptions){
        this.alias = optionsArg.alias;
        this.role = optionsArg.role;
        this.serverUrl = optionsArg.url
        this.serverPort = optionsArg.port;
        this.serverPassword = optionsArg.password
    };

    /**
     * connect the client to the server
     */
    connect(){
        let done = plugins.q.defer();
        plugins.beautylog.log("trying to connect...");
        let socketUrl = `${this.serverUrl}:${this.serverPort}`;
        this.socketConnection = new SocketConnection({
            alias:this.alias,
            authenticated:false,
            role:undefined,
            side:"client",
            socket: plugins.socketIoClient(socketUrl,{multiplex:false})
        });
        this.socketConnection.socket.on("requestAuth", () => {
            console.log("server requested authentication");
            this.socketConnection.socket.emit("dataAuth", {
                role: this.role,
                password: this.serverPassword,
                alias: this.alias
            });
            this.socketConnection.socket.on("authenticated",() => {
                console.log("client is authenticated");
                this.socketConnection.authenticated = true;
                this.socketConnection.listenToFunctionRequests();
                done.resolve();
            });
        });
        return done.promise;
    };
    disconnect(){
        let done = plugins.q.defer();
        this.socketConnection.socket.disconnect();
        this.socketConnection = undefined;
        plugins.beautylog.ok("disconnected!");
        done.resolve();
        return done.promise;
    }
    serverCall(functionNameArg:string,dataArg:any){
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
            .then((dataArg:ISocketFunctionCall) => {
                done.resolve(dataArg.funcDataArg);
            });
        return done.promise;
    };
    
}