"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketFunction = void 0;
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
        for (const socketRoleArg of this.roles) {
            this._notifyRole(socketRoleArg);
        }
    }
    // STATIC
    static getSocketFunctionByName(smartsocketRefArg, functionNameArg) {
        return smartsocketRefArg.socketFunctions.find(socketFunctionArg => {
            return socketFunctionArg.name === functionNameArg;
        });
    }
    /**
     * invokes the function of this SocketFunction
     */
    async invoke(dataArg, socketConnectionArg) {
        if (dataArg.funcName === this.name) {
            const funcResponseData = {
                funcName: this.name,
                funcDataArg: await this.funcDef(dataArg.funcDataArg, socketConnectionArg)
            };
            return funcResponseData;
        }
        else {
            throw new Error("SocketFunction.name does not match the data argument's .name!");
        }
    }
    /**
     * notifies a role about access to this SocketFunction
     */
    _notifyRole(socketRoleArg) {
        socketRoleArg.addSocketFunction(this);
    }
}
exports.SocketFunction = SocketFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRmdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc29ja2V0ZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBd0NBLGlCQUFpQjtBQUVqQjs7R0FFRztBQUNILE1BQWEsY0FBYztJQWdCekI7O09BRUc7SUFDSCxZQUFZLFVBQWdEO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQ3JDLEtBQUssTUFBTSxhQUFhLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQXpCRCxTQUFTO0lBQ0YsTUFBTSxDQUFDLHVCQUF1QixDQUNuQyxpQkFBa0QsRUFDbEQsZUFBdUI7UUFFdkIsT0FBTyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDaEUsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQW1CRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBMEMsRUFBRSxtQkFBcUM7UUFDbkcsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbEMsTUFBTSxnQkFBZ0IsR0FBdUM7Z0JBQzNELFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDbkIsV0FBVyxFQUFFLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLG1CQUFtQixDQUFDO2FBQzFFLENBQUM7WUFDRixPQUFPLGdCQUFnQixDQUFDO1NBQ3pCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7U0FDbEY7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxXQUFXLENBQUMsYUFBeUI7UUFDM0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQWpERCx3Q0FpREMifQ==