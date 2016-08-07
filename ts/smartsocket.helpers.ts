import * as plugins from "./smartsocket.plugins";

// interfaces
import {ISocketObject} from "./smartsocket.classes.smartsocket";




/**
 * authenticate a socket
 */
export let authenticateSocket = (socketObjectArg: ISocketObject) => {
    let done = plugins.q.defer();
    socketObjectArg.socket.on("dataAuth", dataArg => {
        plugins.beautylog.log("received authentication data. now hashing and comparing...");
        socketObjectArg.socket.removeListener("dataAuth", () => { });
        if((true)){ // TODO: authenticate password
            socketObjectArg.alias = dataArg.alias 
            socketObjectArg.authenticated = true;
            socketObjectArg.role = dataArg.role;
            socketObjectArg.socket.emit("authenticated");
            plugins.beautylog.ok(`socket with >>alias ${socketObjectArg.alias} >>role ${socketObjectArg.role} is authenticated!`)
            done.resolve(socketObjectArg);
        } else {
            socketObjectArg.socket.disconnect();
            done.reject("not authenticated");
        };
    });
    socketObjectArg.socket.emit("requestAuth");
    return done.promise;
};