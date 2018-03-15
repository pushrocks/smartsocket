"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import classes
const lik_1 = require("lik");
/**
 * A socketrole defines access to certain routines.
 */
class SocketRole {
    constructor(optionsArg) {
        this.allowedFunctions = new lik_1.Objectmap();
        this.name = optionsArg.name;
        this.passwordHash = optionsArg.passwordHash;
    }
    addSocketFunction(socketFunctionArg) {
        this.allowedFunctions.add(socketFunctionArg);
    }
}
exports.SocketRole = SocketRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsaUJBQWlCO0FBQ2pCLDZCQUFnQztBQVdoQzs7R0FFRztBQUNIO0lBSUUsWUFBWSxVQUE2QjtRQUR6QyxxQkFBZ0IsR0FBRyxJQUFJLGVBQVMsRUFBa0IsQ0FBQztRQUVqRCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO0lBQzlDLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxpQkFBaUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRjtBQVhELGdDQVdDIn0=