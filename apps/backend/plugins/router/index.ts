import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createHandleUpgrade } from '../websocket/handleUpgrade.js';
import { NotFoundError } from '../errors/ApiErrors.js';

export function routes(fastify: FastifyInstance, _options: FastifyPluginOptions, done: () => void) {
	const handleUpgrade = createHandleUpgrade(fastify.wss, (_req) => Promise.resolve(true));
	fastify.server.on('upgrade', handleUpgrade);

	fastify.get('/', (_request, _reply) => {
		return 'Hello World!';
	});

	fastify.get('/error', () => {
		throw new NotFoundError('This is on purpose');
	});

	done();
}
