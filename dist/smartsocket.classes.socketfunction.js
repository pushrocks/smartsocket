"use strict";
const plugins = require("./smartsocket.plugins");
// import classes
const lik_1 = require("lik");
;
;
// export objects
exports.allSocketFunctions = new lik_1.Objectmap();
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
        this.funcDef = optionsArg.funcDef;
        this.roles = optionsArg.allowedRoles;
        for (let socketRoleArg of this.roles) {
            this._notifyRole(socketRoleArg);
        }
        ;
        exports.allSocketFunctions.add(this); // map instance with Objectmap
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
        if (dataArg.funcName === this.name) {
            this.funcDef(dataArg.funcDataArg)
                .then((resultData) => {
                let funcResponseData = {
                    funcName: this.name,
                    funcDataArg: resultData
                };
                done.resolve(funcResponseData);
            });
        }
        else {
            throw new Error("SocketFunction.name does not match the data argument's .name!");
        }
        return done.promise;
    }
    ;
}
exports.SocketFunction = SocketFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRmdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc29ja2V0ZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFFakQsaUJBQWlCO0FBQ2pCLHNCQUEwQixLQUFLLENBQUMsQ0FBQTtBQVkvQixDQUFDO0FBUUQsQ0FBQztBQVNGLGlCQUFpQjtBQUNOLDBCQUFrQixHQUFHLElBQUksZUFBUyxFQUFrQixDQUFDO0FBRWhFLGlCQUFpQjtBQUVqQjs7R0FFRztBQUNIO0lBS0k7O09BRUc7SUFDSCxZQUFZLFVBQTZDO1FBQ3JELElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxDQUFDLElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUFBLENBQUM7UUFDRiwwQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyw4QkFBOEI7SUFDaEUsQ0FBQzs7SUFFRDs7T0FFRztJQUNLLFdBQVcsQ0FBQyxhQUF3QjtRQUN4QyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQTJCO1FBQzlCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7aUJBQzVCLElBQUksQ0FBQyxDQUFDLFVBQWM7Z0JBQ2pCLElBQUksZ0JBQWdCLEdBQXVCO29CQUN2QyxRQUFRLEVBQUMsSUFBSSxDQUFDLElBQUk7b0JBQ2xCLFdBQVcsRUFBQyxVQUFVO2lCQUN6QixDQUFBO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVYLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztRQUNyRixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7QUFFTCxDQUFDO0FBOUNZLHNCQUFjLGlCQThDMUIsQ0FBQSJ9