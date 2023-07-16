const rooms = {
	room: new Set(),
};

export function joinRoom(id: string) {
	rooms.room.add(id);
	return rooms;
}
export function leaveRoom(id: string) {
	rooms.room.delete(id);
	return rooms;
}
