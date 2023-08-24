'use client';

import useRooms from '@/utils/useRooms';
import useWs from '@/zustand/ws';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';

export default function ConnectWs() {
	const router = useRouter();
	const [value, setValue] = useState('');
	const { ws, connect } = useWs();
	const { createRoom } = useRooms(ws);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value);
	}
	function handleCreateRoom() {
		createRoom(value);
	}
	return (
		<div>
			<button onClick={connect}> Connect to Websocket </button>
			<div>
				<input type="text" onChange={handleChange} value={value} />
				<button onClick={handleCreateRoom}> send </button>
				<button onClick={() => setValue('')}>clear</button>
			</div>
		</div>
	);
}
