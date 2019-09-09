// apiglobal scope
import * as typedrequestInterfaces from '@apiglobal/typedrequest-interfaces';

export {typedrequestInterfaces};

// pushrocks scope
import * as lik from '@pushrocks/lik';
import * as smartlog from '@pushrocks/smartlog';
import * as smarthash from '@pushrocks/smarthash';
import * as smartdelay from '@pushrocks/smartdelay';
import * as smartexpress from '@pushrocks/smartexpress';
import * as smartpromise from '@pushrocks/smartpromise';


export {
  lik,
  smartlog,
  smarthash,
  smartdelay,
  smartexpress,
  smartpromise
};

// third party scope
import * as shortid from 'shortid';
import socketIo from 'socket.io';
import socketIoClient from 'socket.io-client';

export {
  shortid,
  socketIo,
  socketIoClient
};
