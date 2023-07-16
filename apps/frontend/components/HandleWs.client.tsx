'use client';

import useRooms from '@/utils/useRooms';
import { ChangeEvent, useRef, useState } from 'react';

export default function ConnectWs() {
	const [value, setValue] = useState('');
	const wsRef = useRef<null | WebSocket>(null);
	const { joinRoom, leaveRoom } = useRooms(wsRef)

	function setWsRef() {
		if (wsRef.current) return;

		wsRef.current = new WebSocket('ws://localhost:3001/ws');
		wsRef.current.onopen = () => console.debug('Open!');
		wsRef.current.onmessage = (message) => console.debug(message.data);
		wsRef.current.onclose = leaveRoom;
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value);
	}
	function sendMessage() {
		if (!wsRef.current) return;
		wsRef.current.send(value);
	}
	return (
		<div>
			<button onClick={setWsRef}> Connect to Websocket </button>
			<div>
				<input type="text" onChange={handleChange} value={value} />
				<button onClick={sendMessage}> send </button>
				<button onClick={() => setValue('')}>clear</button>
			</div>
			<div>
				<button onClick={joinRoom}>Join Room</button>
				<button onClick={leaveRoom}>Leave Room</button>
			</div>
		</div>
	);
}
