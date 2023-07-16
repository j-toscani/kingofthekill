import { RefObject } from 'react';
import useStorage from './useStorage';

export default function useRooms(wsRef: RefObject<WebSocket>) {
	const storage = useStorage();

	function joinRoom() {
		if (!wsRef.current) return;

		const storedId = storage.get('id');
		const id = storedId ?? crypto.randomUUID();

		if (!storedId) {
			storage.set('id', id);
		}

		const ws = wsRef.current;
		const data = {
			event: 'join',
			data: {
				id,
			},
		};
		ws.send(JSON.stringify(data));
	}

	function leaveRoom() {
		if (!wsRef.current) return;

		const id = storage.get('id');

		if (!id) {
			throw new Error('User id missing! Cannot disconnect.');
		}

		const ws = wsRef.current;
		const data = {
			event: 'leave',
			data: {
				id,
			},
		};

		ws.send(JSON.stringify(data));
		storage.remove('id');
	}

    return {
        joinRoom,
        leaveRoom
    }
}
