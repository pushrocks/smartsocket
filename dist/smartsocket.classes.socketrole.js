"use strict";
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
    ;
    addSocketFunction(socketFunctionArg) {
        this.allowedFunctions.add(socketFunctionArg);
    }
}
exports.SocketRole = SocketRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxpQkFBaUI7QUFDakIsc0JBQTBCLEtBQUssQ0FBQyxDQUFBO0FBWWhDOztHQUVHO0FBQ0g7SUFJSSxZQUFZLFVBQTZCO1FBRHpDLHFCQUFnQixHQUFHLElBQUksZUFBUyxFQUFrQixDQUFDO1FBRS9DLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7SUFDaEQsQ0FBQzs7SUFDRCxpQkFBaUIsQ0FBQyxpQkFBZ0M7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDTCxDQUFDO0FBWFksa0JBQVUsYUFXdEIsQ0FBQSJ9