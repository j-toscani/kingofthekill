import { Rooms } from "../../../../types";

const rooms: Rooms = new Map();

export function getRooms() {
	return rooms;
}