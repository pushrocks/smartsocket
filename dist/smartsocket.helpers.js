"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFJakQsNkZBQTBGO0FBRTFGLDJGQUEyRztBQUczRywyQkFBMkI7QUFDaEIsUUFBQSxvQkFBb0IsR0FBRyxDQUFDLE9BQThDLEVBQUUsb0JBQWdDO0lBQy9HLElBQUksa0JBQWtCLEdBQUcsMkJBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxvQkFBb0IsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUM3RixJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xGLE1BQU0sQ0FBQyxrQkFBa0IsS0FBSyxtQkFBbUIsQ0FBQztBQUN0RCxDQUFDLENBQUE7QUFHRCx5QkFBeUI7QUFDZCxRQUFBLHVCQUF1QixHQUFHLENBQUMsZUFBdUI7SUFDekQsTUFBTSxDQUFDLHVEQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixPQUFPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakgsQ0FBQyxDQUFBO0FBRUQsd0JBQXdCO0FBRXhCOztHQUVHO0FBQ1EsUUFBQSxvQkFBb0IsR0FBRyxDQUFDLFVBQWtCLEVBQUUsV0FBZ0M7SUFDbkYsTUFBTSxDQUFDLHFEQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDM0csQ0FBQyxDQUFBO0FBRUQscUJBQXFCO0FBRXJCOztHQUVHO0FBQ1EsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLGlCQUF5QixFQUFDLG9CQUFnQztJQUN4RixNQUFNLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsT0FBTyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3hILENBQUMsQ0FBQyJ9