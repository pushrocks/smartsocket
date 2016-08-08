"use strict";
const plugins = require("./smartsocket.plugins");
/**
 * authenticate a socket
 */
exports.authenticateSocket = (socketConnectionArg) => {
    let done = plugins.q.defer();
    socketConnectionArg.socket.on("dataAuth", dataArg => {
        plugins.beautylog.log("received authentication data. now hashing and comparing...");
        socketConnectionArg.socket.removeListener("dataAuth", () => { });
        if ((true)) {
            socketConnectionArg.alias = dataArg.alias;
            socketConnectionArg.authenticated = true;
            socketConnectionArg.role = dataArg.role;
            socketConnectionArg.socket.emit("authenticated");
            plugins.beautylog.ok(`socket with >>alias ${socketConnectionArg.alias} >>role ${socketConnectionArg.role} is authenticated!`);
            done.resolve(socketConnectionArg);
        }
        else {
            socketConnectionArg.socket.disconnect();
            done.reject("not authenticated");
        }
        ;
    });
    socketConnectionArg.socket.emit("requestAuth");
    return done.promise;
};
exports.listenToReadySocket = (socketConnectionArg) => {
    let done = plugins.q.defer();
    // socketConnectionArg.socket.listen("function", )
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFRakQ7O0dBRUc7QUFDUSwwQkFBa0IsR0FBRyxDQUFDLG1CQUFxQztJQUNsRSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU87UUFDN0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNERBQTRELENBQUMsQ0FBQztRQUNwRixtQkFBbUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsbUJBQW1CLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7WUFDekMsbUJBQW1CLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUN6QyxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN4QyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLHVCQUF1QixtQkFBbUIsQ0FBQyxLQUFLLFdBQVcsbUJBQW1CLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxDQUFBO1lBQzdILElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFBQSxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVTLDJCQUFtQixHQUFHLENBQUMsbUJBQXFDO0lBQ25FLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0Isa0RBQWtEO0lBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQSJ9