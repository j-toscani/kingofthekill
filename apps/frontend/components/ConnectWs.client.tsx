'use client';

import { ChangeEvent, useRef, useState } from 'react';

export default function ConnectWs() {
    const [value, setValue] = useState('');
	const wsRef = useRef<null | WebSocket>(null);
	function setWsRef() {
		if (wsRef.current) return;

		wsRef.current = new WebSocket('ws://localhost:3001/ws');
		wsRef.current.onopen = () => console.debug('Open!');
        wsRef.current.onmessage = (message) => console.debug(message.data)
	}
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }
    function sendMessage() {
		if (!wsRef.current) return;
        wsRef.current.send(value)
    }
	return (
		<div>
            <input type="text" onChange={handleChange} value={value}/>
			<button onClick={setWsRef}> Connect to Websocket </button>
			<button onClick={sendMessage}> send </button>
            <button onClick={() => setValue('')}>clear</button>
		</div>
	);
}
