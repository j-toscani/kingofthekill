import { WebSocket } from "ws";

export type Effect<Input = {}, Result = {}, Context = {}> = (
	input: Input,
	context: Context,
) => Result;
export type Factory<Dependencies = {}, Input = {}, Result = {}, Context = {}> = (
	deps: Dependencies,
) => Effect<Input, Result, Context>;

export type User = string;
export type Room = Map<string, { user: User; ws: WebSocket }>;
export type Rooms = Map<string, Room>;