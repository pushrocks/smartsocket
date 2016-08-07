/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { ISocketObject } from "./smartsocket.classes.smartsocket";
/**
 * authenticate a socket
 */
export declare let authenticateSocket: (socketObjectArg: ISocketObject) => plugins.q.Promise<{}>;
