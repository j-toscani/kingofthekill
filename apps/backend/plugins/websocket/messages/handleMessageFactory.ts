import { FastifyInstance } from 'fastify';
import { RawData, WebSocket } from 'ws';
import { Factory, User } from '../../../types';
import { parseRawData } from '../parseRawData';
import { eventSchema } from '../schemas';
import { isRoomEvent, events as roomEvents } from '../rooms';

type HandleMessageFactory = Factory<
	{ ws: WebSocket; fastify: FastifyInstance; user: User },
	RawData,
	void
>;

export const handleMessageFactory: HandleMessageFactory =
	({ ws, fastify, user }) =>
	(rawData: RawData) => {
		const parsedData = parseRawData(rawData);
		const { event, data } = eventSchema.parse(parsedData);

		if (!data) throw new Error('No data was provided.');

		if (isRoomEvent(event) && data.room) {
			const rooms = roomEvents[event]({ room: data.room, ws }, { user });
			fastify.log.info(`People in room: ${rooms.get(data.room).size}`);
		} else {
			fastify.log.warn(`Unknown event: ${event}`);
		}
	};
