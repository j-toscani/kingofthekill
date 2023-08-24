import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiError, BadRequestError } from './ApiErrors.js';

export function errorHandler(error: Error, _r: FastifyRequest, response: FastifyReply) {
	if (error instanceof ApiError) {
		response.status(error.statusCode).send({ name: error.name, message: error.message });
	} else {
		const badRequest = new BadRequestError('Server was not able to handle this request.');
		response
			.status(badRequest.statusCode)
			.send({ name: badRequest.name, message: badRequest.message });
	}
}
