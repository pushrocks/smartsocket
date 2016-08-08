/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { SocketConnection } from "./smartsocket.classes.socketconnection";
/**
 * authenticate a socket
 */
export declare let authenticateSocket: (socketConnectionArg: SocketConnection) => plugins.q.Promise<{}>;
export declare let listenToReadySocket: (socketConnectionArg: SocketConnection) => plugins.q.Promise<{}>;
