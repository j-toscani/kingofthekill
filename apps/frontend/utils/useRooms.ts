import { RefObject } from 'react';
import useStorage from './useStorage';

export default function useRooms(wsRef: RefObject<WebSocket>) {
	const storage = useStorage();

	function joinRoom() {
		if (!wsRef.current) return;

		const id = storage.get('id');

		if (!id) {
			throw new Error('No ID in storage. Cannot join Room.')
		}

		const ws = wsRef.current;
		const data = {
			event: 'join',
			data: {
				room: id,
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
				room: id,
			},
		};

		ws.send(JSON.stringify(data));
		storage.remove('id');
	}

	function createRoom(id: string) {
		if (!wsRef.current) return;

		storage.set('id', id);
		const ws = wsRef.current;
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
