"use strict";
const plugins = require("./smartsocket.plugins");
;
// export classes
/**
 * class that respresents a function that can be transparently called using a SocketConnection
 */
class SocketFunction {
    /**
     * the constructor for SocketFunction
     */
    constructor(optionsArg) {
        this.name = optionsArg.funcName;
        this.func = optionsArg.funcDef;
        this.roles = optionsArg.allowedRoles;
        for (let socketRoleArg of this.roles) {
            this._notifyRole(socketRoleArg);
        }
    }
    ;
    /**
     * notifies a role about access to this SocketFunction
     */
    _notifyRole(socketRoleArg) {
        socketRoleArg.addSocketFunction(this);
    }
    /**
     * invokes the function of this SocketFunction
     */
    invoke(dataArg) {
        let done = plugins.q.defer();
        return done.promise;
    }
    ;
}
exports.SocketFunction = SocketFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRmdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc29ja2V0ZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFrQmhELENBQUM7QUFVRixpQkFBaUI7QUFFakI7O0dBRUc7QUFDSDtJQUtJOztPQUVHO0lBQ0gsWUFBWSxVQUFrQztRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNyQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQztZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7SUFDTCxDQUFDOztJQUVEOztPQUVHO0lBQ0ssV0FBVyxDQUFDLGFBQXdCO1FBQ3hDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsT0FBVztRQUNkLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7QUFFTCxDQUFDO0FBaENZLHNCQUFjLGlCQWdDMUIsQ0FBQSJ9