import { WebSocket, WebSocketServer } from 'ws';
import { getRooms } from '../adapters/getRooms';
import { leaveRoomFactory } from '../rooms/handlers';
import { getConnections } from '../adapters/getConnections';
import {
	addConnectionFactory,
	checkConnectionFactory,
	getConnectionFactory,
	hasConnectionFactory,
	removeConnectionFactory,
} from './handlers';
import { FastifyInstance } from 'fastify';

const PING_PONG_INTERVAL = 15000;

export const getConnection = getConnectionFactory({ getConnections });
export const removeConnection = removeConnectionFactory({ getConnections });
export const addConnection = addConnectionFactory({ getConnections });
export const hasConnection = hasConnectionFactory({ getConnections });
export const checkConnection = checkConnectionFactory({
	getConnection,
	hasConnection,
	removeConnection,
	leaveRoom: leaveRoomFactory({ getRooms }),
});

export function checkConnections({
	wss,
	fastify,
}: {
	wss: WebSocketServer;
	fastify: FastifyInstance;
}) {
	const interval = setInterval(() => {
		wss.clients.forEach((client) =>
			checkConnection({ ws: Object.assign(client, { broadcast: undefined }) }, { fastify }),
		);
	}, PING_PONG_INTERVAL);

	wss.on('connection', (ws: WebSocket) => {
		addConnection({ ws }, {});
		ws.on('ping', () => addConnection({ ws }, {}));
	});

	wss.on('close', () => clearInterval(interval));
}
