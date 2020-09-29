// node native
import type http from 'http';
import type https from 'https';

export { http, https };

// pushrocks scope
import type * as smartexpress from '@pushrocks/smartexpress';

export { smartexpress };

// third party scope
import type socketIo from 'socket.io';
import type socketIoClient from 'socket.io-client';

export { socketIo, socketIoClient };
