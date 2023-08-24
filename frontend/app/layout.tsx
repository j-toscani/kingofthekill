import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';


export const metadata: Metadata = {
	title: 'King of The Kill',
	description: 'Multiplayer 2D Shooting game.',
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body className="h-screen">{children}</body>
		</html>
	);
}
