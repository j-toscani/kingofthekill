import { getRooms } from './getRooms';
import { RoomHandlerFactory, joinRoomFactory, leaveRoomFactory } from './handlers';

export const joinRoom = joinRoomFactory({ getRooms });
export const leaveRoom = leaveRoomFactory({ getRooms });

enum RoomEvents {
	JOIN = 'join',
	LEAVE = 'leave',
	// CREATE = 'create',
	// REMOVE = 'remove',
}

export const events: { [key in RoomEvents]: ReturnType<RoomHandlerFactory> } = {
	join: joinRoom,
	leave: leaveRoom,
} as const;

export const isRoomEvent = (name: string): name is RoomEvents => RoomEvents[name.toUpperCase()];
