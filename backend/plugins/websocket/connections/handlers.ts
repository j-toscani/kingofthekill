import { WebSocket } from "ws";
import { Connection, Connections, Effect, Factory, Rooms, User } from "../../../types";
import { FastifyInstance } from "fastify";

export const getConnectionFactory: Factory<
	{ getConnections: () => Connections },
	{ ws: WebSocket },
	Connection
> =
	({ getConnections }) =>
	({ ws }) =>
		getConnections().get(ws);

export const addConnectionFactory: Factory<
	{ getConnections: () => Connections },
	{ ws: WebSocket; room?: string },
	void,
	{ user?: User }
> =
	({ getConnections }) =>
	({ ws, room }, { user }) => {
		getConnections().set(ws, { user, room });
	};

export const removeConnectionFactory: Factory<
	{ getConnections: () => Connections },
	{ ws: WebSocket },
	void
> =
	({ getConnections }) =>
	({ ws }, _ = {}) => {
		getConnections().delete(ws);
	};

export const hasConnectionFactory: Factory<
	{ getConnections: () => Connections },
	{ ws: WebSocket },
	boolean
> =
	({ getConnections }) =>
	({ ws }) => {
		return getConnections().has(ws);
	};

export const checkConnectionFactory: Factory<
	{
		getConnection: Effect<{ ws: WebSocket }, Connection>;
		hasConnection: Effect<{ ws: WebSocket }, boolean>;
		removeConnection: Effect<{ ws: WebSocket }, void>;
		leaveRoom: Effect<{ room: string }, Rooms, { user: User }>;
	},
	{ ws: WebSocket },
	void,
    { fastify: FastifyInstance }
> =
	({ getConnection, hasConnection, removeConnection, leaveRoom }) =>
	({ ws }, { fastify }) => {
		if (!hasConnection({ ws }, {})) {
			const { room, user } = getConnection({ ws }, {}) ?? {};
            if (room && !user) {
                fastify.log.error(`Connection found with room ${room} without user.`)
            }
			if (room) {
				leaveRoom({ room }, { user });
			}

			ws.terminate();
		} else {
			removeConnection({ ws }, {});
			ws.ping();
		}
	};
