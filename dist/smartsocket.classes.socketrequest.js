"use strict";
const plugins = require("./smartsocket.plugins");
const helpers = require("./smartsocket.helpers");
// import classes
const lik_1 = require("lik");
;
;
//export objects
exports.allSocketRequests = new lik_1.Objectmap();
// export classes
class SocketRequest {
    constructor(optionsArg) {
        this.status = "new";
        this.done = plugins.q.defer();
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortId;
        this.funcCallData = optionsArg.funcCallData;
        exports.allSocketRequests.add(this);
    }
    ;
    // requesting --------------------------
    /**
     * dispatches a socketrequest from the requesting to the receiving side
     */
    dispatch() {
        let requestData = {
            funcCallData: this.funcCallData,
            shortId: this.shortid
        };
        this.originSocketConnection.socket.emit("function", requestData);
        return this.done.promise;
    }
    ;
    /**
     * handles the response that is received by the requesting side
     */
    handleResponse(responseDataArg) {
        this.done.resolve(responseDataArg);
        exports.allSocketRequests.remove(this);
    }
    // responding --------------------------
    /**
     * creates the response on the responding side
     */
    createResponse() {
        let targetSocketFunction = helpers.getSocketFunctionByName(this.funcCallData.funcName);
        targetSocketFunction.invoke(this.funcCallData)
            .then((resultData) => {
            let requestData = {
                funcCallData: resultData,
                shortId: this.shortid
            };
            this.originSocketConnection.socket.emit("functionResponse", requestData);
            exports.allSocketRequests.remove(this);
        });
    }
}
exports.SocketRequest = SocketRequest;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFLakQsaUJBQWlCO0FBQ2pCLHNCQUEwQixLQUFLLENBQUMsQ0FBQTtBQWdCL0IsQ0FBQztBQVNELENBQUM7QUFFRixnQkFBZ0I7QUFDTCx5QkFBaUIsR0FBRyxJQUFJLGVBQVMsRUFBaUIsQ0FBQztBQUU5RCxpQkFBaUI7QUFDakI7SUFPSSxZQUFZLFVBQTJDO1FBTnZELFdBQU0sR0FBeUIsS0FBSyxDQUFDO1FBS3JDLFNBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQzVDLHlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOztJQUVELHdDQUF3QztJQUV4Qzs7T0FFRztJQUNILFFBQVE7UUFDSixJQUFJLFdBQVcsR0FBNkI7WUFDeEMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN4QixDQUFBO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDOztJQUVEOztPQUVHO0lBQ0gsY0FBYyxDQUFDLGVBQXlDO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25DLHlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsd0NBQXdDO0lBRXhDOztPQUVHO0lBQ0gsY0FBYztRQUNWLElBQUksb0JBQW9CLEdBQW1CLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3pDLElBQUksQ0FBQyxDQUFDLFVBQVU7WUFDYixJQUFJLFdBQVcsR0FBNkI7Z0JBQ3hDLFlBQVksRUFBRSxVQUFVO2dCQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDeEIsQ0FBQTtZQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hFLHlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7QUFDTCxDQUFDO0FBckRZLHFCQUFhLGdCQXFEekIsQ0FBQTtBQUFBLENBQUMifQ==