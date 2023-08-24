import { RefObject } from 'react';
import useStorage from './useStorage';

export default function useRooms(ws: WebSocket | null) {
	const storage = useStorage();

	function joinRoom() {
		if (!ws) return;

		const id = storage.get('id');

		if (!id) {
			throw new Error('No ID in storage. Cannot join Room.')
		}

		const data = {
			event: 'join',
			data: {
				room: id,
			},
		};
		ws.send(JSON.stringify(data));
	}

	function leaveRoom() {
		if (!ws) return;

		const id = storage.get('id');

		if (!id) {
			throw new Error('User id missing! Cannot disconnect.');
		}

		const data = {
			event: 'leave',
			data: {
				room: id,
			},
		};

		ws.send(JSON.stringify(data));
		storage.remove('id');
	}

	function createRoom(id: string) {
		if (!ws) return;

		storage.set('id', id);
		const data = {
			event: 'create',
			data: {
				room: id
			}
		}

		ws.send(JSON.stringify(data));
	}

    return {
        joinRoom,
        leaveRoom,
		createRoom
    }
}
