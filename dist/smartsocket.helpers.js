"use strict";
const plugins = require("./smartsocket.plugins");
const smartsocket_classes_socketfunction_1 = require("./smartsocket.classes.socketfunction");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
// SocketConnection helpers
exports.checkPasswordForRole = (dataArg, referenceSmartsocket) => {
    let targetPasswordHash = exports.getSocketRoleByName(dataArg.role, referenceSmartsocket).passwordHash;
    let computedCompareHash = plugins.nodehash.sha256FromStringSync(dataArg.password);
    return targetPasswordHash === computedCompareHash;
};
// SocketFunction helpers
exports.getSocketFunctionByName = (functionNameArg) => {
    return smartsocket_classes_socketfunction_1.allSocketFunctions.find((socketFunctionArg) => { return socketFunctionArg.name === functionNameArg; });
};
// SocketRequest helpers
/**
 * get corresponding Socketrequest instance by shortId
 */
exports.getSocketRequestById = (shortIdArg, requestSide) => {
    return smartsocket_classes_socketrequest_1.allSocketRequests.find((socketRequestArg) => { return socketRequestArg.shortid === shortIdArg; });
};
// SocketRole helpers
/**
 * get corresponding SocketRole instance by name
 */
exports.getSocketRoleByName = (socketRoleNameArg, referenceSmartsocket) => {
    return referenceSmartsocket.socketRoles.find((socketRoleArg) => { return socketRoleArg.name === socketRoleNameArg; });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFJakQscURBQW1ELHNDQUFzQyxDQUFDLENBQUE7QUFFMUYsb0RBQXFFLHFDQUFxQyxDQUFDLENBQUE7QUFHM0csMkJBQTJCO0FBQ2hCLDRCQUFvQixHQUFHLENBQUMsT0FBOEMsRUFBRSxvQkFBZ0M7SUFDL0csSUFBSSxrQkFBa0IsR0FBRywyQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLG9CQUFvQixDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzdGLElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEYsTUFBTSxDQUFDLGtCQUFrQixLQUFLLG1CQUFtQixDQUFDO0FBQ3RELENBQUMsQ0FBQTtBQUdELHlCQUF5QjtBQUNkLCtCQUF1QixHQUFHLENBQUMsZUFBdUI7SUFDekQsTUFBTSxDQUFDLHVEQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixPQUFPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakgsQ0FBQyxDQUFBO0FBRUQsd0JBQXdCO0FBRXhCOztHQUVHO0FBQ1EsNEJBQW9CLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFdBQWdDO0lBQ25GLE1BQU0sQ0FBQyxxREFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzNHLENBQUMsQ0FBQTtBQUVELHFCQUFxQjtBQUVyQjs7R0FFRztBQUNRLDJCQUFtQixHQUFHLENBQUMsaUJBQXlCLEVBQUMsb0JBQWdDO0lBQ3hGLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxPQUFPLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDeEgsQ0FBQyxDQUFDIn0=