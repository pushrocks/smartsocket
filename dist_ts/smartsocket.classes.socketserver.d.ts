/// <reference types="node" />
import * as plugins from './smartsocket.plugins';
import * as http from 'http';
import * as https from 'https';
import { Smartsocket } from './smartsocket.classes.smartsocket';
/**
 * class socketServer
 * handles the attachment of socketIo to whatever server is in play
 */
export declare class SocketServer {
    private smartsocket;
    private httpServer;
    private standaloneServer;
    private expressServer;
    constructor(smartSocketInstance: Smartsocket);
    /**
     * starts the server with another server
     * also works with an express style server
     */
    setExternalServer(serverType: 'smartexpress', serverArg: plugins.smartexpress.Server): Promise<void>;
    /**
     * gets the server for socket.io
     */
    getServerForSocketIo(): http.Server | https.Server;
    /**
     * starts listening to incoming sockets:
     */
    start(): Promise<void>;
    /**
     * closes the server
     */
    stop(): Promise<void>;
}
