import { Factory, User } from '../../../../types';

type Room = Set<string>;
export type Rooms = Map<string, Room>;

export type RoomHandlerFactory = Factory<
	{ getRooms: () => Rooms },
	{ room: string },
	Rooms,
	{ user: User }
>;

export const joinRoomFactory: RoomHandlerFactory =
	({ getRooms }) =>
	({ room }, { user }) => {
		getRooms().get(room).add(user);
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
	({ room }, { user }) => {
		getRooms().set(room, new Set([user]));
		return getRooms();
	};

export const removeRoomFactory: RoomHandlerFactory =
	({ getRooms }) =>
	({ room }) => {
		getRooms().delete(room);
		return getRooms();
	};
