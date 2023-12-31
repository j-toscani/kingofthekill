import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { handleUpgradeFactory } from '../websocket/handleUpgradeFactory.js';
import { NotFoundError } from '../errors/ApiErrors.js';
import { getUser } from '../websocket/getUser.js';
import { getRooms } from '../websocket/adapters/getRooms.js';

export function routes(fastify: FastifyInstance, _options: FastifyPluginOptions, done: () => void) {
	const handleUpgrade = handleUpgradeFactory({ wss: fastify.wss, getUser });
	fastify.server.on('upgrade', handleUpgrade);

	fastify.get('/', (_request, _reply) => {
		return 'Hello World!';
	});

	fastify.get('/rooms', (_request, _reply) => {
		return Array.from(getRooms().keys());
	});

	fastify.get('/error', () => {
		throw new NotFoundError('This is on purpose');
	});

	done();
}
