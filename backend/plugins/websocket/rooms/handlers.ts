import { WebSocket } from 'ws';
import { Factory, Room, Rooms, User } from '../../../types';
import { BadRequestError } from '../../errors/ApiErrors';

const MAX_USER_IN_ROOMS = 4;

export type RoomHandlerFactory<T = void> = Factory<
	{ getRooms: () => Rooms },
	{ room: string; ws: WebSocket },
	T,
	{ user: User }
>;

export const joinRoomFactory: RoomHandlerFactory =
	({ getRooms }) =>
	({ room: roomId, ws }, { user }) => {
		const room = getRooms().get(roomId);
		if (!room) throw new BadRequestError('Room does not exist.');
		if (room.size >= MAX_USER_IN_ROOMS) throw new BadRequestError('Room is already full.');

		room.set(user, { ws, user });
		ws.emitTo(
			{ room: roomId, data: { event: 'joined', data: 'A User joined the Room.' }, ws },
			{},
		);
		ws.send(JSON.stringify({ event: 'joined' }));
	};

export const leaveRoomFactory: RoomHandlerFactory =
	({ getRooms }) =>
	({ room: roomId, ws }, { user }) => {
		const room = getRooms().get(roomId);
		if (!room) throw new BadRequestError('Room does not exist.');

		room.delete(user);

		if (!room.size) {
			getRooms().delete(roomId);
		}

		ws.emitTo({ room: roomId, data: { event: 'left', data: 'A User left the Room.' }, ws }, {});
		return getRooms();
	};

export const createRoomFactory: RoomHandlerFactory =
	({ getRooms }) =>
	({ room, ws }, { user }) => {
		getRooms().set(room, new Map([[user, { user, ws }]]));
		return getRooms();
	};

export const removeRoomFactory: RoomHandlerFactory =
	({ getRooms }) =>
	({ room }) => {
		getRooms().delete(room);
		return getRooms();
	};

export const getRoomFactory: RoomHandlerFactory<Room> =
	({ getRooms }) =>
	({ room }) => {
		const gotRoom = getRooms().get(room);
		if (!gotRoom) throw new BadRequestError('Room does not exist.');
		return gotRoom
	};
