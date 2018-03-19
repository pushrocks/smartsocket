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
    setExternalServer(serverType: 'express' | 'http', serverArg: any): Promise<void>;
    /**
     * gets the server for socket.io
     */
    getServerForSocketIo(): any;
    /**
     * starts listening to incoming sockets:
     */
    start(): Promise<void>;
    /**
     * closes the server
     */
    stop(): Promise<void>;
}
