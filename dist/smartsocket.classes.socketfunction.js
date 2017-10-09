"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartsocket.plugins");
// import classes
const lik_1 = require("lik");
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
        exports.allSocketFunctions.add(this); // map instance with Objectmap
    }
    /**
     * invokes the function of this SocketFunction
     */
    invoke(dataArg) {
        let done = plugins.smartq.defer();
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
    /**
     * notifies a role about access to this SocketFunction
     */
    _notifyRole(socketRoleArg) {
        socketRoleArg.addSocketFunction(this);
    }
}
exports.SocketFunction = SocketFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRmdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc29ja2V0ZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBZ0Q7QUFFaEQsaUJBQWlCO0FBQ2pCLDZCQUErQjtBQTZCL0IsaUJBQWlCO0FBQ04sUUFBQSxrQkFBa0IsR0FBRyxJQUFJLGVBQVMsRUFBa0IsQ0FBQTtBQUUvRCxpQkFBaUI7QUFFakI7O0dBRUc7QUFDSDtJQUtFOztPQUVHO0lBQ0gsWUFBYSxVQUE2QztRQUN4RCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUE7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFBO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQTtRQUNwQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFDRCwwQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyw4QkFBOEI7SUFDN0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFFLE9BQTRCO1FBQ2xDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDakMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7aUJBQzlCLElBQUksQ0FBQyxDQUFDLFVBQWUsRUFBRSxFQUFFO2dCQUN4QixJQUFJLGdCQUFnQixHQUF3QjtvQkFDMUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNuQixXQUFXLEVBQUUsVUFBVTtpQkFDeEIsQ0FBQTtnQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDaEMsQ0FBQyxDQUFDLENBQUE7UUFFTixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUE7UUFDbEYsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNLLFdBQVcsQ0FBRSxhQUF5QjtRQUM1QyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUNGO0FBN0NELHdDQTZDQyJ9