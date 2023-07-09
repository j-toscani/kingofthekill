import { WebSocketServer, WebSocket, RawData } from 'ws';
import { IncomingMessage } from 'http';
import { parseRawData } from './parseRawData.js';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const wss = new WebSocketServer({ noServer: true });

function pluginWss(
	fastify: FastifyInstance,
	_options: FastifyPluginOptions,
	done: (err?: Error) => void,
) {
	wss.on('connection', (ws: WebSocket, _request: IncomingMessage, _client) => {
		ws.on('error', (e) => done(e));
		ws.on('message', handleMessage);
	});

	fastify.decorate('wss', wss)
	done()
}

export { pluginWss };

function handleMessage(ws: WebSocket) {
	return (data: RawData) => {
		const parsed = parseRawData(data);
		ws.send(typeof parsed === 'string' ? parsed : JSON.stringify(parsed));
	};
}
