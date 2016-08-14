import { SocketFunction } from "./smartsocket.classes.socketfunction";
import { SocketRequest, TSocketRequestSide } from "./smartsocket.classes.socketrequest";
import { SocketRole } from "./smartsocket.classes.socketrole";
export declare let getSocketFunctionByName: (functionNameArg: string) => SocketFunction;
/**
 * get corresponding Socketrequest instance by shortId
 */
export declare let getSocketRequestById: (shortIdArg: string, requestSide?: TSocketRequestSide) => SocketRequest;
/**
 * get corresponding SocketRole instance by name
 */
export declare let getSocketRoleByName: (socketRoleNameArg: string) => SocketRole;
