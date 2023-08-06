import { WebSocket } from 'ws';
import { Factory, Room, Rooms, User } from '@/types';

export type RoomHandlerFactory<T = Rooms> = Factory<
	{ getRooms: () => Rooms },
	{ room: string; ws: WebSocket },
	T,
	{ user: User }
>;

export const joinRoomFactory: RoomHandlerFactory =
	({ getRooms }) =>
	({ room, ws }, { user }) => {
		getRooms().get(room).set(user, { user, ws });
		return getRooms();
	};

export const leaveRoomFactory: RoomHandlerFactory =
	({ getRooms }) =>
	({ room }, { user }) => {
		getRooms().get(room).delete(user);
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
		return getRooms().get(room);
	};
