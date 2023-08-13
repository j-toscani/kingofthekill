import { WebSocket } from 'ws';
import { Connections, Factory, Rooms } from '../../../types';

type BroadcastFactory = Factory<
	{
		getConnections: () => Connections;
		predicate?: (me: WebSocket, current: WebSocket) => boolean;
	},
	{
		ws?: WebSocket;
		data: { event: string; data: any };
	},
	void
>;
type BroadcastToFactory = Factory<
	{ getRooms: () => Rooms; predicate?: (me: WebSocket, current: WebSocket) => boolean },
	{
		ws?: WebSocket;
		room: string;
		data: { event: string; data: any };
	},
	void
>;

export const broadcastFactory: BroadcastFactory =
	({ getConnections, predicate }) =>
	({ data, ws }) => {
		getConnections().forEach((_room, connection) => {
			if (!connection.OPEN) {
				getConnections().delete(connection);
			} else {
				const canSend = ws && predicate ? predicate(ws, connection) : true;
				canSend && connection.send(JSON.stringify(data));
			}
		});
	};

export const broadcastToFactory: BroadcastToFactory =
	({ getRooms, predicate }) =>
	({ room, data, ws }) => {
		getRooms()
			.get(room)
			.forEach((value) => {
				const canSend = ws && predicate ? predicate(ws, value.ws) : true;
				canSend && value.ws.send(JSON.stringify(data));
			});
	};
