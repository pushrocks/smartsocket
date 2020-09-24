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
exports.SocketServer = void 0;
const plugins = __importStar(require("./smartsocket.plugins"));
// used in case no other server is supplied
const http = __importStar(require("http"));
const smartsocket_logging_1 = require("./smartsocket.logging");
/**
 * class socketServer
 * handles the attachment of socketIo to whatever server is in play
 */
class SocketServer {
    constructor(smartSocketInstance) {
        // wether httpServer is standalone
        this.standaloneServer = false;
        this.smartsocket = smartSocketInstance;
    }
    /**
     * starts the server with another server
     * also works with an express style server
     */
    async setExternalServer(serverType, serverArg) {
        await serverArg.startedPromise;
        this.httpServer = serverArg.httpServer;
    }
    /**
     * gets the server for socket.io
     */
    getServerForSocketIo() {
        if (this.httpServer) {
            return this.httpServer;
        }
        else {
            this.httpServer = new http.Server();
            this.standaloneServer = true;
            return this.httpServer;
        }
    }
    /**
     * starts listening to incoming sockets:
     */
    async start() {
        const done = plugins.smartpromise.defer();
        // handle http servers
        // in case an external server has been set "this.standaloneServer" should be false
        if (this.httpServer && this.standaloneServer) {
            if (!this.smartsocket.options.port) {
                smartsocket_logging_1.logger.log('error', 'there should be a port specifed for smartsocket!');
                throw new Error('there should be a port specified for smartsocket');
            }
            this.httpServer.listen(this.smartsocket.options.port, () => {
                smartsocket_logging_1.logger.log('success', `Server started in standalone mode on ${this.smartsocket.options.port}`);
                done.resolve();
            });
        }
        else {
            done.resolve();
        }
        // nothing else to do if express server is set
        await done.promise;
        return;
    }
    /**
     * closes the server
     */
    async stop() { }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHNvY2tldC5jbGFzc2VzLnNvY2tldHNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQWlEO0FBRWpELDJDQUEyQztBQUMzQywyQ0FBNkI7QUFHN0IsK0RBQStDO0FBRS9DOzs7R0FHRztBQUNILE1BQWEsWUFBWTtJQU92QixZQUFZLG1CQUFnQztRQUo1QyxrQ0FBa0M7UUFDMUIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBSS9CLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxpQkFBaUIsQ0FDNUIsVUFBMEIsRUFDMUIsU0FBc0M7UUFFdEMsTUFBTSxTQUFTLENBQUMsY0FBYyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQkFBb0I7UUFDekIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFMUMsc0JBQXNCO1FBQ3RCLGtGQUFrRjtRQUNsRixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xDLDRCQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxrREFBa0QsQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7YUFDckU7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN6RCw0QkFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsd0NBQXdDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQy9GLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7UUFFRCw4Q0FBOEM7UUFDOUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ25CLE9BQU87SUFDVCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsSUFBSSxLQUFJLENBQUM7Q0FDdkI7QUFsRUQsb0NBa0VDIn0=