export type CkanClientParams = {
	url: string | URL
	token?: string
	fetch?: globalThis.fetch
}

export interface CkanClient extends CkanClientParams {
	request: <T extends Record<PropertyKey, unknown>>(
		data: (client: CkanClient) => Promise<T>
	) => Promise<T>
}
