import { Connections } from '../../../types';

const connections: Connections = new Map();

export function getConnections(): Connections {
	return connections;
}

