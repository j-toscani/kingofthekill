import { GameScreen } from '@/components/GameScreen.client';
import Link from 'next/link';

export default function Game() {
	return (
		<main className="container flex mx-auto h-full">
			<Link href="/play"> Back </Link>
			<GameScreen />
		</main>
	);
}
