"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartsocket.plugins");
const helpers = require("./smartsocket.helpers");
// import classes
const lik_1 = require("lik");
// export objects
exports.allSocketRequests = new lik_1.Objectmap();
// export classes
class SocketRequest {
    constructor(optionsArg) {
        this.status = 'new';
        this.done = plugins.smartq.defer();
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortId;
        this.funcCallData = optionsArg.funcCallData;
        this.originSocketConnection = optionsArg.originSocketConnection;
        exports.allSocketRequests.add(this);
    }
    // requesting --------------------------
    /**
     * dispatches a socketrequest from the requesting to the receiving side
     */
    dispatch() {
        let requestData = {
            funcCallData: this.funcCallData,
            shortId: this.shortid
        };
        this.originSocketConnection.socket.emit('function', requestData);
        return this.done.promise;
    }
    /**
     * handles the response that is received by the requesting side
     */
    handleResponse(responseDataArg) {
        plugins.beautylog.log('handling response!');
        this.done.resolve(responseDataArg.funcCallData);
        exports.allSocketRequests.remove(this);
    }
    // responding --------------------------
    /**
     * creates the response on the responding side
     */
    createResponse() {
        let targetSocketFunction = helpers.getSocketFunctionByName(this.funcCallData.funcName);
        plugins.beautylog.info(`invoking ${targetSocketFunction.name}`);
        targetSocketFunction.invoke(this.funcCallData).then(resultData => {
            plugins.beautylog.log('got resultData. Sending it to requesting party.');
            let requestData = {
                funcCallData: resultData,
                shortId: this.shortid
            };
            this.originSocketConnection.socket.emit('functionResponse', requestData);
            exports.allSocketRequests.remove(this);
        });
    }
}
exports.SocketRequest = SocketRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQWlEO0FBQ2pELGlEQUFpRDtBQUtqRCxpQkFBaUI7QUFDakIsNkJBQWdDO0FBMkJoQyxpQkFBaUI7QUFDTixRQUFBLGlCQUFpQixHQUFHLElBQUksZUFBUyxFQUFpQixDQUFDO0FBRTlELGlCQUFpQjtBQUNqQjtJQU9FLFlBQVksVUFBMkM7UUFOdkQsV0FBTSxHQUF5QixLQUFLLENBQUM7UUFLckMsU0FBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFDNUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQztRQUNoRSx5QkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHdDQUF3QztJQUV4Qzs7T0FFRztJQUNILFFBQVE7UUFDTixJQUFJLFdBQVcsR0FBNkI7WUFDMUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDO1FBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUMsZUFBeUM7UUFDdEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQseUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx3Q0FBd0M7SUFFeEM7O09BRUc7SUFDSCxjQUFjO1FBQ1osSUFBSSxvQkFBb0IsR0FBbUIsT0FBTyxDQUFDLHVCQUF1QixDQUN4RSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FDM0IsQ0FBQztRQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMvRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1lBQ3pFLElBQUksV0FBVyxHQUE2QjtnQkFDMUMsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN0QixDQUFDO1lBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDekUseUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBMURELHNDQTBEQyJ9