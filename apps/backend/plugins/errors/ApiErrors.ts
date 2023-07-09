import { API_RESPONSE_CODE } from '../../constants.js';

export abstract class ApiError extends Error {
	statusCode: number;

	constructor(name: string, statusCode: number, message: string) {
		super();
		this.name = name;
		this.message = message;
		this.statusCode = statusCode;
	}

	format() {
		return `[${this.statusCode} - ${this.name}]: ${this.message}`;
	}
}

export class BadRequestError extends ApiError {
	constructor(message: string) {
		super('BadRequest', API_RESPONSE_CODE.BAD_REQUEST, message);
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string) {
		super('Unauthorized', API_RESPONSE_CODE.UNAUTHORIZED, message);
	}
}

export class NotFoundError extends ApiError {
	constructor(message: string) {
		super('NotFound', API_RESPONSE_CODE.NOT_FOUND, message);
	}
}

export class InternalServerError extends ApiError {
	constructor(message: string) {
		super('InternalServerError', API_RESPONSE_CODE.INTERNAL_SERVER_ERROR, message);
	}
}
