import { getRooms } from './getRooms';
import { RoomHandlerFactory, createRoomFactory, joinRoomFactory, leaveRoomFactory } from './handlers';

const joinRoom = joinRoomFactory({ getRooms });
const leaveRoom = leaveRoomFactory({ getRooms });
const createRoom = createRoomFactory({ getRooms });
const removeRoom = leaveRoomFactory({ getRooms });

enum RoomEvents {
	JOIN = 'join',
	LEAVE = 'leave',
	CREATE = 'create',
	REMOVE = 'remove',
}

export const events: { [key in RoomEvents]: ReturnType<RoomHandlerFactory> } = {
	join: joinRoom,
	leave: leaveRoom,
	create: createRoom,
	remove: removeRoom
} as const;

export const isRoomEvent = (name: string): name is RoomEvents => RoomEvents[name.toUpperCase()];
