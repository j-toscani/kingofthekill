import { IncomingMessage } from 'http';

export function getCookies(request?: IncomingMessage): Record<string, string> {
    const cookies: Record<string, string> = {};
	const {
		headers: { cookie: header },
	} = request;

	if (header) {
		const cookiePairs = header.split(';').map((split) => split.split('='));
		cookiePairs.forEach(([key, value]) => (cookies[key] = value));
	}

	return cookies;
}
