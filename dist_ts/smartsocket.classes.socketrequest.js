"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketRequest = void 0;
const plugins = __importStar(require("./smartsocket.plugins"));
// import interfaces
const smartsocket_classes_socketfunction_1 = require("./smartsocket.classes.socketfunction");
const smartsocket_logging_1 = require("./smartsocket.logging");
// export classes
class SocketRequest {
    constructor(smartsocketRefArg, optionsArg) {
        // INSTANCE
        this.status = 'new';
        this.done = plugins.smartpromise.defer();
        this.smartsocketRef = smartsocketRefArg;
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortId;
        this.funcCallData = optionsArg.funcCallData;
        this.originSocketConnection = optionsArg.originSocketConnection;
        this.smartsocketRef.socketRequests.add(this);
    }
    // STATIC
    static getSocketRequestById(smartsocketRef, shortIdArg) {
        return smartsocketRef.socketRequests.find(socketRequestArg => {
            return socketRequestArg.shortid === shortIdArg;
        });
    }
    // requesting --------------------------
    /**
     * dispatches a socketrequest from the requesting to the receiving side
     */
    dispatch() {
        const requestData = {
            funcCallData: this.funcCallData,
            shortId: this.shortid
        };
        this.originSocketConnection.socket.emit('function', requestData);
        return this.done.promise;
    }
    /**
     * handles the response that is received by the requesting side
     */
    async handleResponse(responseDataArg) {
        smartsocket_logging_1.logger.log('info', 'handling response!');
        this.done.resolve(responseDataArg.funcCallData);
        this.smartsocketRef.socketRequests.remove(this);
    }
    // responding --------------------------
    /**
     * creates the response on the responding side
     */
    async createResponse() {
        const targetSocketFunction = smartsocket_classes_socketfunction_1.SocketFunction.getSocketFunctionByName(this.smartsocketRef, this.funcCallData.funcName);
        if (!targetSocketFunction) {
            smartsocket_logging_1.logger.log('warn', `There is no SocketFunction defined for ${this.funcCallData.funcName}`);
            smartsocket_logging_1.logger.log('warn', `So now response is being sent.`);
            return;
        }
        smartsocket_logging_1.logger.log('info', `invoking ${targetSocketFunction.name}`);
        targetSocketFunction.invoke(this.funcCallData, this.originSocketConnection).then(resultData => {
            smartsocket_logging_1.logger.log('info', 'got resultData. Sending it to requesting party.');
            const responseData = {
                funcCallData: resultData,
                shortId: this.shortid
            };
            this.originSocketConnection.socket.emit('functionResponse', responseData);
            this.smartsocketRef.socketRequests.remove(this);
        });
    }
}
exports.SocketRequest = SocketRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBaUQ7QUFFakQsb0JBQW9CO0FBQ3BCLDZGQUF1STtBQUl2SSwrREFBK0M7QUEyQi9DLGlCQUFpQjtBQUNqQixNQUFhLGFBQWE7SUFxQnhCLFlBQ0UsaUJBQWtELEVBQ2xELFVBQStDO1FBWmpELFdBQVc7UUFDSixXQUFNLEdBQXlCLEtBQUssQ0FBQztRQUtyQyxTQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQXNDLENBQUM7UUFRN0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUM1QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsVUFBVSxDQUFDLHNCQUFzQixDQUFDO1FBQ2hFLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBOUJELFNBQVM7SUFDRixNQUFNLENBQUMsb0JBQW9CLENBQ2hDLGNBQStDLEVBQy9DLFVBQWtCO1FBRWxCLE9BQU8sY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUMzRCxPQUFPLGdCQUFnQixDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBd0JELHdDQUF3QztJQUV4Qzs7T0FFRztJQUNJLFFBQVE7UUFDYixNQUFNLFdBQVcsR0FBZ0M7WUFDL0MsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDO1FBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxlQUE0QztRQUN0RSw0QkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCx3Q0FBd0M7SUFFeEM7O09BRUc7SUFDSSxLQUFLLENBQUMsY0FBYztRQUN6QixNQUFNLG9CQUFvQixHQUFzQixtREFBYyxDQUFDLHVCQUF1QixDQUNwRixJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FDM0IsQ0FBQztRQUVGLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUN6Qiw0QkFBTSxDQUFDLEdBQUcsQ0FDUixNQUFNLEVBQ04sMENBQTBDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQ3ZFLENBQUM7WUFDRiw0QkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztZQUNyRCxPQUFPO1NBQ1I7UUFDRCw0QkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVELG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM1Riw0QkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsaURBQWlELENBQUMsQ0FBQztZQUN0RSxNQUFNLFlBQVksR0FBZ0M7Z0JBQ2hELFlBQVksRUFBRSxVQUFVO2dCQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQztZQUNGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXRGRCxzQ0FzRkMifQ==