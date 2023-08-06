import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createHandleUpgrade } from '@plugins/websocket/handleUpgradeFactory.js';
import { NotFoundError } from '@plugins/errors/ApiErrors.js';
import { getUser } from '@plugins/websocket/getUser.js';
import { getRooms } from '@plugins/websocket/messages/rooms/getRooms.js';

export function routes(fastify: FastifyInstance, _options: FastifyPluginOptions, done: () => void) {
	const handleUpgrade = createHandleUpgrade({ wss: fastify.wss, getUser });
	fastify.server.on('upgrade', handleUpgrade);

	fastify.get('/', (_request, _reply) => {
		return 'Hello World!';
	});

	fastify.get('/rooms', (_request, _reply) => {
		return getRooms();
	});

	fastify.get('/error', () => {
		throw new NotFoundError('This is on purpose');
	});

	done();
}
