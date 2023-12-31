import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
	const token = req.cookies.get('auth');
	
	if (!token) {
		return NextResponse.redirect(new URL('/', req.url));
	}
}

export const config = { matcher: ['/play(.*)']}