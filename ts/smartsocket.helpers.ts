import * as plugins from "./smartsocket.plugins";

// classes
import { Smartsocket } from "./smartsocket.classes.smartsocket";
import { SocketFunction, allSocketFunctions } from "./smartsocket.classes.socketfunction";
import { SocketConnection } from "./smartsocket.classes.socketconnection";
import { SocketRole, allSocketRoles } from "./smartsocket.classes.socketrole";

// SocketFunction helpers
export let getSocketFunctionByName = (functionNameArg:string) => {
    return allSocketFunctions.find((socketFunctionArg) => { return socketFunctionArg.name === functionNameArg});
}


// SocketRole helpers

/**
 * get corresponding SocketRequest instance by name
 */
export let getSocketRoleByName = (socketRoleNameArg: string): SocketRole => {
    return allSocketRoles.find((socketRoleArg) => { return socketRoleArg.name === socketRoleNameArg })
};

