export enum BackendRoomEvents {
	JOIN = 'join',
	LEAVE = 'leave',
	CREATE = 'create',
	REMOVE = 'remove',
}

export enum ClientRoomEvents {
	JOINED = 'joined',
	CREATED = 'created',
	ERROR = 'error',
}
