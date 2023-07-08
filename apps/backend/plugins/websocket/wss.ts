import { WebSocketServer, WebSocket, RawData } from 'ws';
import { IncomingMessage } from 'http';
import { parseRawData } from './parseRawData.js';

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws: WebSocket, _request: IncomingMessage, _client) => {
	ws.on('error', console.error);
	ws.on('message', handleMessage);

});

export { wss };

function handleMessage(data: RawData) {
	const parsed = parseRawData(data);
	console.log(parsed);
}
