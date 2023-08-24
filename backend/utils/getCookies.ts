import { IncomingMessage } from 'http';

export function getCookies(request?: IncomingMessage): Record<string, string> {
	const {
		headers: { cookie: header },
	} = request;

	if (!header) return {};

	const cookiePairs = header.split(';').map((split) => split.trim().split('='));
	return Object.fromEntries(cookiePairs);
}
