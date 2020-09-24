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
exports.Smartsocket = void 0;
const plugins = __importStar(require("./smartsocket.plugins"));
// classes
const smartsocket_classes_socketconnection_1 = require("./smartsocket.classes.socketconnection");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
const smartsocket_classes_socketserver_1 = require("./smartsocket.classes.socketserver");
const smartsocket_logging_1 = require("./smartsocket.logging");
class Smartsocket {
    constructor(optionsArg) {
        /**
         * a unique id to detect server restarts
         */
        this.shortId = plugins.smartunique.shortId();
        this.socketConnections = new plugins.lik.ObjectMap();
        this.socketRoles = new plugins.lik.ObjectMap();
        this.socketFunctions = new plugins.lik.ObjectMap();
        this.socketRequests = new plugins.lik.ObjectMap();
        this.socketServer = new smartsocket_classes_socketserver_1.SocketServer(this);
        this.options = optionsArg;
    }
    // tslint:disable-next-line:member-ordering
    async setExternalServer(serverType, serverArg) {
        await this.socketServer.setExternalServer(serverType, serverArg);
    }
    /**
     * starts smartsocket
     */
    async start() {
        this.io = plugins.socketIo(this.socketServer.getServerForSocketIo());
        await this.socketServer.start();
        this.io.on('connection', socketArg => {
            this._handleSocketConnection(socketArg);
        });
    }
    /**
     * stops smartsocket
     */
    async stop() {
        await plugins.smartdelay.delayFor(1000);
        this.socketConnections.forEach((socketObjectArg) => {
            smartsocket_logging_1.logger.log('info', `disconnect socket with >>alias ${socketObjectArg.alias}`);
            socketObjectArg.socket.disconnect();
        });
        this.socketConnections.wipe();
        this.io.close();
        // stop the corresponging server
        this.socketServer.stop();
    }
    // communication
    /**
     * allows call to specific client.
     */
    async clientCall(functionNameArg, dataArg, targetSocketConnectionArg) {
        const socketRequest = new smartsocket_classes_socketrequest_1.SocketRequest(this, {
            funcCallData: {
                funcDataArg: dataArg,
                funcName: functionNameArg
            },
            originSocketConnection: targetSocketConnectionArg,
            shortId: plugins.smartunique.shortId(),
            side: 'requesting'
        });
        const response = await socketRequest.dispatch();
        const result = response.funcDataArg;
        return result;
    }
    /**
     * adds socketRoles
     */
    addSocketRoles(socketRolesArray) {
        for (const socketRole of socketRolesArray) {
            this.socketRoles.add(socketRole);
        }
        return;
    }
    addSocketFunction(socketFunction) {
        this.socketFunctions.add(socketFunction);
    }
    /**
     * the standard handler for new socket connections
     */
    async _handleSocketConnection(socketArg) {
        const socketConnection = new smartsocket_classes_socketconnection_1.SocketConnection({
            alias: undefined,
            authenticated: false,
            role: undefined,
            side: 'server',
            smartsocketHost: this,
            socket: socketArg
        });
        smartsocket_logging_1.logger.log('info', 'Socket connected. Trying to authenticate...');
        this.socketConnections.add(socketConnection);
        await socketConnection.authenticate();
        await socketConnection.listenToFunctionRequests();
    }
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUFpRDtBQUVqRCxVQUFVO0FBQ1YsaUdBQTBFO0FBRTFFLDJGQUFvRTtBQUVwRSx5RkFBa0U7QUFJbEUsK0RBQStDO0FBTS9DLE1BQWEsV0FBVztJQWN0QixZQUFZLFVBQTBDO1FBYnREOztXQUVHO1FBQ0ksWUFBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFHeEMsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBb0IsQ0FBQztRQUNsRSxnQkFBVyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQWMsQ0FBQztRQUN0RCxvQkFBZSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQXVCLENBQUM7UUFDbkUsbUJBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFzQixDQUFDO1FBRWhFLGlCQUFZLEdBQUcsSUFBSSwrQ0FBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQzVCLENBQUM7SUFFRCwyQ0FBMkM7SUFDcEMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFVBQTBCLEVBQUUsU0FBYztRQUN2RSxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFD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