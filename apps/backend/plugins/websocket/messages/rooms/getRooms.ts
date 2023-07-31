import { Rooms } from "./handlers";

const rooms: Rooms = new Map();

export function getRooms() {
	return rooms;
}