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
            this.funcDef(dataArg.funcDataArg).then((resultData) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRmdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc29ja2V0ZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFFakQsaUJBQWlCO0FBQ2pCLDZCQUFnQztBQTZCaEMsaUJBQWlCO0FBQ04sUUFBQSxrQkFBa0IsR0FBRyxJQUFJLGVBQVMsRUFBa0IsQ0FBQztBQUVoRSxpQkFBaUI7QUFFakI7O0dBRUc7QUFDSDtJQUtFOztPQUVHO0lBQ0gsWUFBWSxVQUE2QztRQUN2RCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNyQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCwwQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyw4QkFBOEI7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQTRCO1FBQ2pDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFlLEVBQUUsRUFBRTtnQkFDekQsSUFBSSxnQkFBZ0IsR0FBd0I7b0JBQzFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDbkIsV0FBVyxFQUFFLFVBQVU7aUJBQ3hCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1FBQ25GLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxXQUFXLENBQUMsYUFBeUI7UUFDM0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQTNDRCx3Q0EyQ0MifQ==