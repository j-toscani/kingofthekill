import { create } from 'zustand';

const WEBSOCKET_URL = 'ws://localhost:3001/ws'

type WsStore = {
	ws: WebSocket | null;
	connect: () => void;
};

const useWs = create<WsStore>((set) => ({
	ws: null,
	connect: () =>
		set((state) => {
			if (state.ws) {
				return { ws: state.ws };
			}

			const ws = new WebSocket(WEBSOCKET_URL);
			ws.onopen = () => console.debug('Open!');
			ws.onmessage = (message) => console.debug(message.data);

			return { ws };
		}),
	disonnect: () =>
		set((state) => {
			if (state.ws) {
				state.ws.close();
			}

			return { ws: null };
		}),
}));

export default useWs
