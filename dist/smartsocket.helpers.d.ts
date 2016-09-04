import { Smartsocket } from "./smartsocket.classes.smartsocket";
import { SocketFunction } from "./smartsocket.classes.socketfunction";
import { ISocketConnectionAuthenticationObject } from "./smartsocket.classes.socketconnection";
import { SocketRequest, TSocketRequestSide } from "./smartsocket.classes.socketrequest";
import { SocketRole } from "./smartsocket.classes.socketrole";
export declare let checkPasswordForRole: (dataArg: ISocketConnectionAuthenticationObject, referenceSmartsocket: Smartsocket) => boolean;
export declare let getSocketFunctionByName: (functionNameArg: string) => SocketFunction;
/**
 * get corresponding Socketrequest instance by shortId
 */
export declare let getSocketRequestById: (shortIdArg: string, requestSide?: TSocketRequestSide) => SocketRequest;
/**
 * get corresponding SocketRole instance by name
 */
export declare let getSocketRoleByName: (socketRoleNameArg: string, referenceSmartsocket: Smartsocket) => SocketRole;
