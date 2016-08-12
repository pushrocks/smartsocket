import * as plugins from "./smartsocket.plugins";

// classes
import { Smartsocket } from "./smartsocket.classes.smartsocket";
import { SocketFunction, allSocketFunctions } from "./smartsocket.classes.socketfunction";
import { SocketConnection } from "./smartsocket.classes.socketconnection";
import { SocketRequest, allSocketRequests, TSocketRequestSide } from "./smartsocket.classes.socketrequest";
import { SocketRole, allSocketRoles } from "./smartsocket.classes.socketrole";

// SocketFunction helpers
export let getSocketFunctionByName = (functionNameArg: string):SocketFunction => {
    return allSocketFunctions.find((socketFunctionArg) => { return socketFunctionArg.name === functionNameArg });
}

// SocketRequest helpers

/**
 * get corresponding Socketrequest instance by shortId
 */
export let getSocketRequestById = (shortIdArg:string,requestSide?:TSocketRequestSide):SocketRequest => {
    return allSocketRequests.find((socketRequestArg) => {return socketRequestArg.shortid === shortIdArg})
}

// SocketRole helpers

/**
 * get corresponding SocketRole instance by name
 */
export let getSocketRoleByName = (socketRoleNameArg: string): SocketRole => {
    return allSocketRoles.find((socketRoleArg) => { return socketRoleArg.name === socketRoleNameArg })
};

