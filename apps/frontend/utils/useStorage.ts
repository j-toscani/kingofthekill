import { useEffect } from 'react';

export default function useStorage() {
	const store: Record<string, any> = {};
	let webStorage = {
		getItem: (key: string) => store[key],
		setItem: (key: string, data: any) => {
			store[key] = data;
		},
		removeItem: (key: string) => {
			delete store[key];
		},
	};

	function getData(key: string) {
		return webStorage.getItem(key);
	}

	function setData<T>(key: string, data: T) {
		try {
			webStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data));
		} catch (error) {
			console.error('Not able to save data to webstorage.');
		}
	}

	function deleteData(key: string) {
		webStorage.removeItem(key);
	}

	useEffect(() => {
		webStorage = sessionStorage;
	});

	return {
		get: getData,
		set: setData,
		remove: deleteData,
	};
}
