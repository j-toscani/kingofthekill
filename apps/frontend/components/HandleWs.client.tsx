'use client';

import useRooms from '@/utils/useRooms';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function ConnectWs() {
	const [value, setValue] = useState('');
	const [rooms, setRooms] = useState<string[]>([]);
	const wsRef = useRef<null | WebSocket>(null);
	const { joinRoom, leaveRoom, createRoom } = useRooms(wsRef);

	useEffect(() => {
		fetchRooms().catch(console.error)
	}, []);

	function setWsRef() {
		if (wsRef.current) return;

		wsRef.current = new WebSocket('ws://localhost:3001/ws');
		wsRef.current.onopen = () => console.debug('Open!');
		wsRef.current.onmessage = (message) => console.debug(message.data);
		wsRef.current.onclose = leaveRoom;
	}

	async function fetchRooms() {
		const response = await fetch('http://localhost:3001/rooms');
		if (!response.ok) {
			throw new Error('Response not OK!');
		}
		const roomIds = await response.json();
		setRooms(Array.isArray(roomIds) ? roomIds : []);
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value);
	}
	function handleCreateRoom() {
		createRoom(value);
	}
	return (
		<div>
			<button onClick={setWsRef}> Connect to Websocket </button>
			<div>
				<input type="text" onChange={handleChange} value={value} />
				<button onClick={handleCreateRoom}> send </button>
				<button onClick={() => setValue('')}>clear</button>
			</div>
			<div>
				<button onClick={joinRoom}>Join Room</button>
				<button onClick={leaveRoom}>Leave Room</button>
			</div>
			{rooms.map((room) => (
				<span key={room}>{room}</span>
			))}
		</div>
	);
}
