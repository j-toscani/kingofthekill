import { RawData } from "ws";

export function parseRawData(data: RawData): string | {} {
	const string = data.toString();
	try {
		const obj = JSON.parse(string);
		return obj;
	} catch (error) {
		return string;
	}
}