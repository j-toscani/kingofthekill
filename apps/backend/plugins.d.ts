import { WebSocketServer } from 'ws';

declare module 'fastify' {
	interface FastifyInstance {
		wss: WebSocketServer;
	}
}
