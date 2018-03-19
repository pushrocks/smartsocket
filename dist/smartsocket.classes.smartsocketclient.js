"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartsocket.plugins");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldGNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXRjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFFakQsaUdBQTBFO0FBRTFFLDJGQUE4RjtBQWE5RjtJQU9FLFlBQVksVUFBcUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0wsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzlDLElBQUksU0FBUyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksdURBQWdCLENBQUM7WUFDM0MsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxlQUFlLEVBQUUsSUFBSTtZQUNyQixNQUFNLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDaEUsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUM1QyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUM3QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtnQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixFQUFFLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztRQUNsQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVSxDQUFDLGVBQXVCLEVBQUUsT0FBWTtRQUM5QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xDLElBQUksYUFBYSxHQUFHLElBQUksaURBQWEsQ0FBQztZQUNwQyxJQUFJLEVBQUUsWUFBWTtZQUNsQixzQkFBc0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQzdDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNuQyxZQUFZLEVBQUU7Z0JBQ1osUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFdBQVcsRUFBRSxPQUFPO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQTRCLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQXhFRCw4Q0F3RUMifQ==