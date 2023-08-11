import { WebSocket } from 'ws';
import { Connections, Factory, Rooms } from '../../../types';

export const broadcastFactory: Factory<
	{ getConnections: () => Connections; getRooms: () => Rooms; },
	{ room?: string; data: { event: string, data: any }; ws: WebSocket },
	void
> =
	({ getConnections, getRooms }) =>
	({ room, data, ws }) => {
		if (room) {
			getRooms()
				.get(room)
				.forEach((value) => ws !== value.ws && value.ws.send(JSON.stringify(data)));
		} else {
			getConnections().forEach((_room, connection) => ws !== connection && connection.send(JSON.stringify(data)));
		}
	};
