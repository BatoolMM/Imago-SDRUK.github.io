import type {
	CkanCreateActions,
	CkanDeleteActions,
	CkanGetActions,
	CkanPatchActions,
	CkanResult,
	CkanTextError,
	CkanUpdateActions
} from './actions'
import type { CkanClient, CkanClientParams } from '.'

// interface CkanClient extends CkanClientParams {
// 	request: <T extends Record<PropertyKey, unknown>>(
// 		data: (client: CkanClient) => Promise<T>
// 	) => this & Promise<T>
// }

const handleResponse = async (response: Response) => {
	const contentType = response.headers.get('content-type')
	if (contentType && contentType.indexOf('application/json') !== -1) {
		return response.json() as Promise<CkanResult>
	} else {
		return response.text().then((text) => ({
			message: text,
			status: response.status,
			success: false,
			result: []
		})) as Promise<CkanTextError>
	}
}

export const createCkanClient = ({ url, token, fetch }: CkanClientParams): CkanClient => {
	const config = { url, token, fetch }
	return {
		...config,
		async request(data) {
			return data(this)
		}
	}
}

const processURL = (url: string | URL, path: string, params?: Record<PropertyKey, unknown>) => {
	const _url = typeof url === 'string' ? new URL(url) : url
	_url.pathname = path
	if (params) {
		Object.entries(params).forEach(([name, value]) => {
			_url.searchParams.append(String(name), String(value))
		})
	}
	return _url.toString()
}

export const get =
	(action: CkanGetActions[0], query?: CkanGetActions[1]) => async (client: CkanClient) => {
		const url = processURL(client.url, `/api/3/action/${action}`, query)
		const headers = new Headers()
		if (client.token) {
			headers.set('Authorization', client.token)
		}
		console.log(url)
		const res = await fetch(url, { method: 'GET', headers })
		const data = await handleResponse(res)
		return data
	}

export const create =
	(...action: CkanCreateActions) =>
	async (client: CkanClient) => {
		const url = processURL(client.url, `/api/3/action/${action}`, action[1])
		const headers = new Headers()
		if (client.token) {
			headers.set('Authorization', client.token)
		}
		const res = await fetch(url, { method: 'POST', headers })
		const data = await handleResponse(res)
		return data
	}

export const remove =
	(...action: CkanDeleteActions) =>
	async (client: CkanClient) => {
		const url = processURL(client.url, `/api/3/action/${action}`, action[1])
		const headers = new Headers()
		if (client.token) {
			headers.set('Authorization', client.token)
		}
		const res = await fetch(url, { method: 'DELETE', headers })
		const data = await handleResponse(res)
		return data
	}

export const patch =
	(...action: CkanPatchActions) =>
	async (client: CkanClient) => {
		const url = processURL(client.url, `/api/3/action/${action}`, action[1])
		const headers = new Headers()
		if (client.token) {
			headers.set('Authorization', client.token)
		}
		const res = await fetch(url, { method: 'PATCH', headers })
		const data = await handleResponse(res)
		return data
	}

export const update =
	(...action: CkanUpdateActions) =>
	async (client: CkanClient) => {
		const url = processURL(client.url, `/api/3/action/${action}`, action[1])
		const headers = new Headers()
		if (client.token) {
			headers.set('Authorization', client.token)
		}
		const res = await fetch(url, { method: 'PUT', headers })
		const data = await handleResponse(res)
		return data
	}
