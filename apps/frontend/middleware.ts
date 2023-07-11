import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
	const token = req.cookies.get('token');
	
	if (!token) {
		return NextResponse.redirect(new URL('/', req.url));
	}
}

export const config = { matcher: ['/play(.*)']}