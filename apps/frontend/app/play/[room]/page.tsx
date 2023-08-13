'use client'

import useRooms from '@/utils/useRooms';
import Link from 'next/link';

const RoomDetail = ({ params }: { params: { room: string } }) => {
	return (
		<div>
			<h1>Room id: {params.room}</h1>
			<Link href="/play"> Back </Link>
		</div>
	);
};

export default RoomDetail;
