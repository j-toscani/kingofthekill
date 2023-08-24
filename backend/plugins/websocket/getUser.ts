import { IncomingMessage } from 'http';
import { getCookies } from '../../utils/getCookies';

export function getUser(request: IncomingMessage) {
	return getCookies(request)['auth'];
}
