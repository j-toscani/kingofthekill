import { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { UnauthorizedError } from '../errors/ApiErrors.js';
import { User } from '../../types/index.js';

declare module 'fastify' {
	interface FastifyInstance {
		wss: WebSocketServer;
	}
}

export function handleUpgradeFactory({
	wss,
	getUser,
}: {
	wss: WebSocketServer;
	getUser: (request: IncomingMessage) => User;
}) {
	return (request: IncomingMessage, socket: Socket, head: Buffer) => {
		const user = getUser(request);
		if (!user) throw new UnauthorizedError('You need to be logged in.');

		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit('connection', ws, request, user);
		});
	};
}
