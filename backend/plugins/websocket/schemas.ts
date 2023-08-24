import { object, string } from 'zod';

export const eventSchema = object({
	event: string(),
	data: object({
		room: string(),
	}),
});
