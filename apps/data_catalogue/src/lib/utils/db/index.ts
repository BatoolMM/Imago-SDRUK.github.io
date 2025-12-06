import { SERVER_ERRORS } from '$lib/globals/server'
import { error } from '@sveltejs/kit'

export type DBError = {
	query: string
	params: string[]
	cause: {
		length: number
		name: string
		severity: string
		code: string
		where: string
		file: string
		line: string
		routine: string
	}
}

export const handleDBError = (err: DBError | string | unknown) => (_err?: DBError) => {
	if (typeof err === 'object' && err && 'id' in err && 'message' in err) {
		console.log(err, _err?.cause)
		const __err = _err as DBError
		if (__err.cause.code === 'ECONNREFUSED') {
			error(...SERVER_ERRORS[503])
		}
		error(500, { id: `${err.id}`, message: `${err.message}` })
	}
	if (typeof err === 'string') {
		console.log(err, _err?.cause)
		const __err = _err as DBError
		if (__err.cause.code === 'ECONNREFUSED') {
			error(...SERVER_ERRORS[503])
		}
		error(500, { id: 'unknown error', message: err })
	}
	console.log(_err?.cause)
	const __err = (err ? err : _err) as DBError
	if (__err.cause.code === 'ECONNREFUSED') {
		error(...SERVER_ERRORS[503])
	}
	error(...SERVER_ERRORS[500])
}
