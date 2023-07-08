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
		super('BadRequest', 400, message);
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string) {
		super('Unauthorized', 401, message);
	}
}

export class NotFoundError extends ApiError {
	constructor(message: string) {
		super('NotFound', 404, message);
	}
}

export class InternalServerError extends ApiError {
	constructor(message: string) {
		super('InternalServerError', 500, message);
	}
}
