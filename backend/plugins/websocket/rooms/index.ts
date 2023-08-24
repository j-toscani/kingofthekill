import { getRooms } from '../adapters/getRooms';
import { BackendRoomEvents } from "shared/types/RoomEvents"
import { RoomHandlerFactory, createRoomFactory, joinRoomFactory, leaveRoomFactory } from './handlers';

const joinRoom = joinRoomFactory({ getRooms });
const leaveRoom = leaveRoomFactory({ getRooms });
const createRoom = createRoomFactory({ getRooms });
const removeRoom = leaveRoomFactory({ getRooms });

export const events: { [key in BackendRoomEvents]: ReturnType<RoomHandlerFactory> } = {
	join: joinRoom,
	leave: leaveRoom,
	create: createRoom,
	remove: removeRoom
} as const;

export const isRoomEvent = (name: string): name is BackendRoomEvents => BackendRoomEvents[name.toUpperCase()];
