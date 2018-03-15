"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartsocket.plugins");
// import classes
const smartsocket_classes_socketconnection_1 = require("./smartsocket.classes.socketconnection");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
class SmartsocketClient {
    constructor(optionsArg) {
        this.alias = optionsArg.alias;
        this.role = optionsArg.role;
        this.serverUrl = optionsArg.url;
        this.serverPort = optionsArg.port;
        this.serverPassword = optionsArg.password;
    }
    /**
     * connect the client to the server
     */
    connect() {
        let done = plugins.smartq.defer();
        plugins.beautylog.log('trying to connect...');
        let socketUrl = `${this.serverUrl}:${this.serverPort}`;
        this.socketConnection = new smartsocket_classes_socketconnection_1.SocketConnection({
            alias: this.alias,
            authenticated: false,
            role: undefined,
            side: 'client',
            smartsocketHost: null,
            socket: plugins.socketIoClient(socketUrl, { multiplex: false })
        });
        this.socketConnection.socket.on('requestAuth', () => {
            console.log('server requested authentication');
            this.socketConnection.socket.emit('dataAuth', {
                role: this.role,
                password: this.serverPassword,
                alias: this.alias
            });
            this.socketConnection.socket.on('authenticated', () => {
                console.log('client is authenticated');
                this.socketConnection.authenticated = true;
                this.socketConnection.listenToFunctionRequests();
                done.resolve();
            });
        });
        return done.promise;
    }
    disconnect() {
        let done = plugins.smartq.defer();
        this.socketConnection.socket.disconnect();
        this.socketConnection = undefined;
        plugins.beautylog.ok('disconnected!');
        done.resolve();
        return done.promise;
    }
    serverCall(functionNameArg, dataArg) {
        let done = plugins.smartq.defer();
        let socketRequest = new smartsocket_classes_socketrequest_1.SocketRequest({
            side: 'requesting',
            originSocketConnection: this.socketConnection,
            shortId: plugins.shortid.generate(),
            funcCallData: {
                funcName: functionNameArg,
                funcDataArg: dataArg
            }
        });
        socketRequest.dispatch().then((dataArg) => {
            done.resolve(dataArg.funcDataArg);
        });
        return done.promise;
    }
}
exports.SmartsocketClient = SmartsocketClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldGNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXRjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFNakQsaUJBQWlCO0FBQ2pCLGlHQUEwRTtBQUUxRSwyRkFBb0U7QUFZcEU7SUFPRSxZQUFZLFVBQXFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNMLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM5QyxJQUFJLFNBQVMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLHVEQUFnQixDQUFDO1lBQzNDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixhQUFhLEVBQUUsS0FBSztZQUNwQixJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsZUFBZSxFQUFFLElBQUk7WUFDckIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ2hFLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDNUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ2xCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7Z0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dCQUNqRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxlQUF1QixFQUFFLE9BQVk7UUFDOUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQyxJQUFJLGFBQWEsR0FBRyxJQUFJLGlEQUFhLENBQUM7WUFDcEMsSUFBSSxFQUFFLFlBQVk7WUFDbEIsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUM3QyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDbkMsWUFBWSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUUsT0FBTzthQUNyQjtTQUNGLENBQUMsQ0FBQztRQUNILGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUE0QixFQUFFLEVBQUU7WUFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUF4RUQsOENBd0VDIn0=