import { getConnections } from "../adapters/getConnections";
import { getRooms } from "../adapters/getRooms";
import { broadcastFactory } from "./handlers";

export const broadcast = broadcastFactory({ getConnections, getRooms })