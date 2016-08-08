import * as plugins from "./smartsocket.plugins";

// classes
import { Smartsocket } from "./smartsocket.classes.smartsocket";
import { SocketFunction } from "./smartsocket.classes.socketfunction";
import { SocketConnection } from "./smartsocket.classes.socketconnection";
import { SocketRole, allSocketRoles } from "./smartsocket.classes.socketrole";


// SocketRole helpers
export let findSocketRoleByString = (socketRoleNameArg: string): SocketRole => {
    return allSocketRoles.find((socketRoleArg) => { return socketRoleArg.name === socketRoleNameArg })
};

