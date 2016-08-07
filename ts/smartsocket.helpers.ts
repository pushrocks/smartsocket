import * as plugins from "./smartsocket.plugins";

// interfaces
import {ISocketObject} from "./smartsocket.classes.smartsocket";




/**
 * authenticate a socket
 */
export let authenticateSocket = (socketObjectArg: ISocketObject) => {
    let done = plugins.q.defer();
    socketObjectArg.socket.on("dataAuth", data => {
        socketObjectArg.socket.removeListener("dataAuth", () => { });
        done.resolve();
    });
    socketObjectArg.socket.emit("requestAuth");
    return done.promise;
};