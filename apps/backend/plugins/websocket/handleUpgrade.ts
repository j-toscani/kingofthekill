import { FastifyInstance } from 'fastify';
import { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { UnauthorizedError } from '../errors/ApiErrors.js';

export function createHandleUpgrade(
	wss: WebSocketServer,
    authenticate: (req: IncomingMessage) => Promise<any> 
) {
	return async (request: IncomingMessage, socket: Socket, head: Buffer) => {
		const client = await authenticate(request);

		if (!client) throw new UnauthorizedError('You are not allowed to do that.');

		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit('connection', ws, request, client);
		});
	};
}
