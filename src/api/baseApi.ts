export interface DataResponse<T> {
	status: 200;
	body: T;
	message: string;
}

export interface NoDataResponse {
	status: 204 | 500 | 401 | 403;
	message: string;
}

export type ApiResponse<T> = DataResponse<T> | NoDataResponse;

export class BaseApi {
	baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	genericRequest = async <T>(
		method: "GET" | "POST",
		uri: string
	): Promise<ApiResponse<T>> => {
		return await fetch(`${this.baseUrl}/${uri}`, {
			method: method,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then(async (response) => {
				if (response.status === 200) {
					var body = (await response.json()) as T;
					return {
						status: response.status,
						message: response.statusText,
						body: body,
					} as ApiResponse<T>;
				} else {
					return {
						status: response.status,
						message: response.statusText,
					} as ApiResponse<T>;
				}
			})
			.catch((r) => ({ status: 500, message: `Unkown error occured: ${r}` }));
	};
}
