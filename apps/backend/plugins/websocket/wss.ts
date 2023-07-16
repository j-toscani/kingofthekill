import { WebSocketServer, WebSocket, RawData } from 'ws';
import { IncomingMessage } from 'http';
import { parseRawData } from './parseRawData.js';
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { eventSchema } from './schemas.js';
import { joinRoom, leaveRoom } from './rooms.js';

const wss = new WebSocketServer({ noServer: true });
const events = {
	join: joinRoom,
	leave: leaveRoom,
};

function addWss(
	fastify: FastifyInstance,
	_options: FastifyPluginOptions,
	done: (err?: Error) => void,
) {
	wss.on('connection', (ws: WebSocket, _request: IncomingMessage, _client) => {
		ws.on('error', (e) => done(e));
		ws.on('message', handleMessage(ws, fastify));
	});

	fastify.decorate('wss', wss);
	done();
}

export const pluginWss = fp(addWss);

function handleMessage(_ws: WebSocket, fastify: FastifyInstance) {
	return (rawData: RawData) => {
		try {
			const parsed = parseRawData(rawData);
			const validated = eventSchema.parse(parsed);

			if (!validated?.data.id) throw new Error('No id was provided.');
			const { data } = validated;

			if (validated.event in events && data.id) {
				const rooms = events[validated.event](data.id);
				fastify.log.info(`People in room: ${rooms.room.size}`)
			} else {
				fastify.log.warn(`Unknown event: ${validated.event}`);
			}
		} catch (error) {
			fastify.log.error(error);
		}
	};
}
