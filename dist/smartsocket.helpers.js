"use strict";
const plugins = require("./smartsocket.plugins");
/**
 * authenticate a socket
 */
exports.authenticateSocket = (socketObjectArg) => {
    let done = plugins.q.defer();
    socketObjectArg.socket.on("dataAuth", dataArg => {
        plugins.beautylog.log("received authentication data. now hashing and comparing...");
        socketObjectArg.socket.removeListener("dataAuth", () => { });
        if ((true)) {
            socketObjectArg.alias = dataArg.alias;
            socketObjectArg.authenticated = true;
            socketObjectArg.role = dataArg.role;
            socketObjectArg.socket.emit("authenticated");
            plugins.beautylog.ok(`socket with >>alias ${socketObjectArg.alias} >>role ${socketObjectArg.role} is authenticated!`);
            done.resolve(socketObjectArg);
        }
        else {
            socketObjectArg.socket.disconnect();
            done.reject("not authenticated");
        }
        ;
    });
    socketObjectArg.socket.emit("requestAuth");
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFRakQ7O0dBRUc7QUFDUSwwQkFBa0IsR0FBRyxDQUFDLGVBQThCO0lBQzNELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU87UUFDekMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNERBQTRELENBQUMsQ0FBQztRQUNwRixlQUFlLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM3RCxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUNQLGVBQWUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtZQUNyQyxlQUFlLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNyQyxlQUFlLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDcEMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLGVBQWUsQ0FBQyxLQUFLLFdBQVcsZUFBZSxDQUFDLElBQUksb0JBQW9CLENBQUMsQ0FBQTtZQUNySCxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFBQSxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUMifQ==