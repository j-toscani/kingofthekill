'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Rooms() {
	const [rooms, setRooms] = useState<string[]>([]);

	useEffect(() => {
		fetchRooms();
	}, []);

	async function fetchRooms() {
		const response = await fetch('http://localhost:3001/rooms');
		if (!response.ok) {
			throw new Error('Response not OK!');
		}
		const roomIds = await response.json();
		setRooms(Array.isArray(roomIds) ? roomIds : []);
	}

	return rooms.map((room) => (
		<Link key={room} href={`/play/${room}`}>
			{room}
		</Link>
	));
}
