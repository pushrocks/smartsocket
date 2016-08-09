"use strict";
// import classes
const lik_1 = require("lik");
;
//export objects
exports.allRequestingSocketRequests = new lik_1.Objectmap();
exports.allRespondingSocketRequests = new lik_1.Objectmap();
// export classes
class SocketRequest {
    constructor(optionsArg) {
        this.status = "new";
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortid;
        this.requestData = optionsArg.requestData;
        this.responseData = optionsArg.responseData;
        if (this.side === "requesting") {
            exports.allRequestingSocketRequests.add(this);
        }
        else {
            exports.allRespondingSocketRequests.add(this);
        }
        ;
    }
    ;
    _sendRequest(dataArg) {
    }
    ;
    _receiveRequest(dataArg) {
    }
    ;
    _sendResponse(dataArg) {
    }
    _receiveResponse(dataArg) {
    }
    ;
    _dispatch(dataArg) {
    }
    ;
}
exports.SocketRequest = SocketRequest;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSxpQkFBaUI7QUFDakIsc0JBQTBCLEtBQUssQ0FBQyxDQUFBO0FBWS9CLENBQUM7QUFFRixnQkFBZ0I7QUFDTCxtQ0FBMkIsR0FBRyxJQUFJLGVBQVMsRUFBaUIsQ0FBQztBQUM3RCxtQ0FBMkIsR0FBRyxJQUFJLGVBQVMsRUFBaUIsQ0FBQztBQUV4RSxpQkFBaUI7QUFDakI7SUFNSSxZQUFZLFVBQTJDO1FBTHZELFdBQU0sR0FBeUIsS0FBSyxDQUFDO1FBTWpDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUM1QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFBLENBQUM7WUFDM0IsbUNBQTJCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLG1DQUEyQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQUEsQ0FBQztJQUNOLENBQUM7O0lBRU8sWUFBWSxDQUFDLE9BQW9DO0lBRXpELENBQUM7O0lBQ08sZUFBZSxDQUFDLE9BQW9DO0lBRTVELENBQUM7O0lBQ08sYUFBYSxDQUFDLE9BQXFDO0lBRTNELENBQUM7SUFDTyxnQkFBZ0IsQ0FBQyxPQUFxQztJQUU5RCxDQUFDOztJQUNPLFNBQVMsQ0FBQyxPQUFvQztJQUV0RCxDQUFDOztBQUNMLENBQUM7QUFqQ1kscUJBQWEsZ0JBaUN6QixDQUFBO0FBQUEsQ0FBQyJ9