import { WebSocket } from 'ws';
import { getConnections } from '../adapters/getConnections';
import { getRooms } from '../adapters/getRooms';
import { broadcastFactory, broadcastToFactory } from './handlers';

const notMe = (me: WebSocket, them: WebSocket) => me !== them;

export const broadcast = broadcastFactory({ getConnections });
export const broadcastTo = broadcastToFactory({ getRooms });
export const emit = broadcastFactory({ getConnections, predicate: notMe });
export const emitTo = broadcastToFactory({ getRooms, predicate: notMe });
