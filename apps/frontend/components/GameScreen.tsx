'use client';
import { useDraw } from '@/hooks/useDraw';
import { useRef, useEffect } from 'react';

export function GameScreen() {
	const screen = useRef<HTMLCanvasElement>(null);
	useDraw(screen)
	return <canvas style={{ border: "1px solid black"}} ref={screen} width={800} height={600}></canvas>;
}
