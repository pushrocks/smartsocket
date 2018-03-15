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
    return smartsocket_classes_socketfunction_1.allSocketFunctions.find(socketFunctionArg => {
        return socketFunctionArg.name === functionNameArg;
    });
};
// SocketRequest helpers
/**
 * get corresponding Socketrequest instance by shortId
 */
exports.getSocketRequestById = (shortIdArg, requestSide) => {
    return smartsocket_classes_socketrequest_1.allSocketRequests.find(socketRequestArg => {
        return socketRequestArg.shortid === shortIdArg;
    });
};
// SocketRole helpers
/**
 * get corresponding SocketRole instance by name
 */
exports.getSocketRoleByName = (socketRoleNameArg, referenceSmartsocket) => {
    return referenceSmartsocket.socketRoles.find(socketRoleArg => {
        return socketRoleArg.name === socketRoleNameArg;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFJakQsNkZBQTBGO0FBSzFGLDJGQUk2QztBQUc3QywyQkFBMkI7QUFDaEIsUUFBQSxvQkFBb0IsR0FBRyxDQUNoQyxPQUE4QyxFQUM5QyxvQkFBaUMsRUFDeEIsRUFBRTtJQUNYLElBQUksa0JBQWtCLEdBQUcsMkJBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUM5RixJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xGLE1BQU0sQ0FBQyxrQkFBa0IsS0FBSyxtQkFBbUIsQ0FBQztBQUNwRCxDQUFDLENBQUM7QUFFRix5QkFBeUI7QUFDZCxRQUFBLHVCQUF1QixHQUFHLENBQUMsZUFBdUIsRUFBa0IsRUFBRTtJQUMvRSxNQUFNLENBQUMsdURBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDakQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksS0FBSyxlQUFlLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRix3QkFBd0I7QUFFeEI7O0dBRUc7QUFDUSxRQUFBLG9CQUFvQixHQUFHLENBQ2hDLFVBQWtCLEVBQ2xCLFdBQWdDLEVBQ2pCLEVBQUU7SUFDakIsTUFBTSxDQUFDLHFEQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQy9DLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYscUJBQXFCO0FBRXJCOztHQUVHO0FBQ1EsUUFBQSxtQkFBbUIsR0FBRyxDQUMvQixpQkFBeUIsRUFDekIsb0JBQWlDLEVBQ3JCLEVBQUU7SUFDZCxNQUFNLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9