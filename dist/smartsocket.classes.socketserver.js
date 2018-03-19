"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartsocket.plugins");
// used in case no other server is supplied
const http = require("http");
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
    setExternalServer(serverType, serverArg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (serverType === 'http') {
                this.httpServer = serverArg;
            }
            else if (serverType === 'express') {
                this.expressServer = serverArg;
            }
        });
    }
    /**
     * gets the server for socket.io
     */
    getServerForSocketIo() {
        if (this.httpServer) {
            return this.httpServer;
        }
        else if (this.expressServer) {
            return this.expressServer;
        }
        else if (!this.httpServer && !this.expressServer) {
            this.httpServer = new http.Server();
            this.standaloneServer = true;
            return this.httpServer;
        }
        else {
            throw new Error('no server specified!');
        }
    }
    /**
     * starts listening to incoming sockets:
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const done = plugins.smartq.defer();
            // handle http servers
            if (this.httpServer && this.standaloneServer) {
                this.httpServer.listen(this.smartsocket.options.port, () => {
                    console.log(`Server started in standalone mode on ${this.smartsocket.options.port}`);
                    done.resolve();
                });
            }
            else {
                done.resolve();
            }
            // nothing else to do if express server is set
            yield done.promise;
            return;
        });
    }
    /**
     * closes the server
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHNvY2tldC5jbGFzc2VzLnNvY2tldHNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWlEO0FBRWpELDJDQUEyQztBQUMzQyw2QkFBNkI7QUFHN0I7OztHQUdHO0FBQ0g7SUFPRSxZQUFZLG1CQUFnQztRQUo1QyxrQ0FBa0M7UUFDMUIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBSS9CLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNVLGlCQUFpQixDQUFDLFVBQThCLEVBQUUsU0FBYzs7WUFDM0UsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzlCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQ2pDLENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNJLG9CQUFvQjtRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ1UsS0FBSzs7WUFDaEIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVwQyxzQkFBc0I7WUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO29CQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNyRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixDQUFDO1lBRUQsOENBQThDO1lBQzlDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNuQixNQUFNLENBQUM7UUFDVCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLElBQUk7OERBQUksQ0FBQztLQUFBO0NBQ3ZCO0FBakVELG9DQWlFQyJ9