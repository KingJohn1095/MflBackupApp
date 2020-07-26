export interface DataResponse<T> {
	status: number;
	body: T;
	message: string;
}

export interface NoDataResponse {
	status: 204 | 500;
	message: string;
}

export type ApiResponse<T> = DataResponse<T> & NoDataResponse;

class MflApi {
	baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	genericRequest = async <T>(method: "GET" | "POST", uri: string) => {
		var response: ApiResponse<T> = await fetch(`${this.baseUrl}/${uri}`, {
			method: method,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((response) =>
			response.status === 200
				? response.json()
				: ({
						status: response.status,
						message: response.statusText,
				  } as NoDataResponse)
		);
	};
}
