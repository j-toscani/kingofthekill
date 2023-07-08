import Fastify from 'fastify';
import { errorHandler } from './plugins/errors/errorHandler.js';
import { NotFoundError } from './plugins/errors/ApiErrors.js';
import { createHandleUpgrade } from './plugins/websocket/handleUpgrade.js';
import { wss } from './plugins/websocket/wss.js';
const fastify = Fastify({
	logger: true,
});
fastify.setErrorHandler(errorHandler);

fastify.get('/ws', () => {
	fastify.server.on(
		'upgrade',
		createHandleUpgrade(wss, (req) => Promise.resolve(true)),
	);
});

fastify.get('/', async function handler(request, reply) {
	return "Hello World!";
});

fastify.get('/error', async function handler(request, reply) {
	throw new NotFoundError('This is on purpose');
	return { hello: 'world' };
});

try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	fastify.log.error(`Server was not able to start: ${err}`);
	process.exit(1);
}
