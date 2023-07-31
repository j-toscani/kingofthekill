import { IncomingMessage } from "http";

export function getUser(request: IncomingMessage) {
	return request.headers.authorization;
}