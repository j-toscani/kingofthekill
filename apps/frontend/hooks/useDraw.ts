import { RefObject, useEffect } from 'react';

type DrawContext = {
	ctx: CanvasRenderingContext2D;
	canvas: HTMLCanvasElement;
};

export function useDraw(screen: RefObject<HTMLCanvasElement>) {
	useEffect(() => {
		if (!screen.current) return;
		const canvas = screen.current;
		const ctx = screen.current.getContext('2d');

		if (!ctx) return;

		ctx.fillStyle = 'black';

		const drawRect = createDrawRectangle({ ctx, canvas });
		const animate = createAnimate(drawRect);

		animate();
	}, []);
}

function createDrawRectangle({ ctx, canvas }: DrawContext) {
	const rect = {
		w: 100,
		h: 100,
		x: 20,
		y: 100,
		move: 10,
	};

	return () => {
		ctx?.clearRect(0, 0, canvas.width, canvas.height);
		ctx?.fillRect(rect.x, rect.y, rect.w, rect.h);

		if (rect.x < 20 || rect.x > canvas.width - 120) {
			rect.move = rect.move * -1;
		}

		rect.x += rect.move;
	};
}

function createAnimate(cb: () => void) {
	const animate = () => {
		cb();
		requestAnimationFrame(animate);
	};
	return animate;
}
