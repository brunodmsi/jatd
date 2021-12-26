import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useReducer, useRef } from 'react';

export enum RequestType {
	request = 'request',
	success = 'success',
	failure = 'failure',
}

export enum RequestStatus {
	init = 'init',
	error = 'error',
	fetching = 'fetching',
	fetched = 'fetched'
}

interface State<T> {
	status: RequestStatus;
	data?: T;
	error?: string;
}

interface Error {
	message: string;
}

interface Cache<T> {
	[url: string]: T;
}

type Action<T> = 
	| { type: RequestType.request }
	| { type: RequestType.success, payload: T }
	| { type: RequestType.failure, payload: string }


interface ExtraOptions {
	manual: boolean;
}

const defaultExtraOptions: ExtraOptions = {
	manual: false
}

function useFetch<T = unknown>(
	url?: string,
	options?: AxiosRequestConfig,
	extraOptions: ExtraOptions = defaultExtraOptions
): [State<T>, (url: string, options?: AxiosRequestConfig | undefined) => Promise<void>] {
	const cache = useRef<Cache<T>>({});
	const cancelRequest = useRef<boolean>(false);

	const initialState: State<T> = {
		status: RequestStatus.init,
		error: undefined,
		data: undefined,
	}

	const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case RequestType.request: 
				return {
					...initialState,
					status: RequestStatus.fetching,
				}
			case RequestType.success: 
				return {
					...initialState,
					data: action.payload,
					status: RequestStatus.fetched,
				}
			case RequestType.failure: 
				return {
					...initialState,
					error: action.payload,
					status: RequestStatus.error,
				}
			default:
				return state;
		}
	}

	let [state, dispatch] = useReducer(fetchReducer, initialState);

	const fetchData = async (url: string, fetchOptions?: AxiosRequestConfig | undefined) => {
		const useOptions = {
			...options,
			...fetchOptions
		};

		dispatch({ type: RequestType.request });

		if (cache.current[url]) {
			dispatch({ type: RequestType.success, payload: cache.current[url] });
		} else {
			try {
				const response = await axios(url, useOptions);
				cache.current[url] = response.data;
				if (cancelRequest.current)
					return;

				dispatch({ type: RequestType.success, payload: response.data })
			} catch (error: any) {
				const { message } = error as Error;

				if (cancelRequest.current)
					return;

				dispatch({ type: RequestType.failure, payload: message })
			}
		}
	};

	useEffect(() => {
		if (!url)
			return;

		if (!extraOptions.manual) {
			fetchData(url, options);
		}

		return () => {
			cancelRequest.current = true;
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, options]);

	return [state, fetchData];
}

export default useFetch;