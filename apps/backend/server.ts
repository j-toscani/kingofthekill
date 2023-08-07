import Fastify from 'fastify';
import cors from '@fastify/cors'

import { errorHandler } from './plugins/errors/errorHandler.js';
import { PROCESS_EXIT_CODE } from './constants.js';
import { routes } from './plugins/router/index.js';
import { pluginWss } from './plugins/websocket/wss.js';

const PORT = 3001;

const fastify = Fastify({
	logger: true,
});
fastify.register(cors, { origin: '*' })
fastify.setErrorHandler(errorHandler);
fastify.register(pluginWss);
fastify.register(routes);

try {
	await fastify.listen({ port: PORT });
} catch (err) {
	fastify.log.error(`Server was not able to start: ${err}`);
	process.exit(PROCESS_EXIT_CODE);
}
