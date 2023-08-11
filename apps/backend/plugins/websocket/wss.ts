import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { User } from '../../types/index.js';
import { handleMessageFactory } from './messages/handleMessageFactory.js';
import { checkConnections } from './connections/index.js';
import { broadcastFactory } from './broadcast/handlers.js';
import { broadcast } from './broadcast/index.js';

declare module 'ws' {
	interface WebSocket {
		broadcast: ReturnType<typeof broadcastFactory> 
	}
}

const wss = new WebSocketServer({ noServer: true });

function addWss(
	fastify: FastifyInstance,
	_options: FastifyPluginOptions,
	done: (err?: Error) => void,
) {
	checkConnections({ wss, fastify });

	wss.on('connection', (ws: WebSocket, _request: IncomingMessage, user: User) => {
		ws.broadcast = broadcast
		const handleMessage = handleMessageFactory({ ws, fastify, user });
		const handleError = (e: Error) => {
			ws.send(JSON.stringify({ event: 'error', message: e.message }));
			done(e);
		};
		ws.on('error', handleError);
		ws.on('message', handleMessage);
	});

	fastify.decorate('wss', wss);
	done();
}

export const pluginWss = fp(addWss);
