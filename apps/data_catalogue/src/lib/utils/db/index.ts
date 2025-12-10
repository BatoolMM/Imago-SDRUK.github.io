import { SERVER_ERRORS } from '$lib/globals/server'
import { log } from '$lib/utils/server/logger.js'
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
		log.debug(err)
		log.debug(_err?.cause)
		const __err = _err as DBError
		if (__err.cause.code === 'ECONNREFUSED') {
			error(...SERVER_ERRORS[503])
		}
		error(500, { id: `${err.id}`, message: `${err.message}` })
	}
	if (typeof err === 'string') {
		log.debug(err)
		log.debug(_err?.cause)
		const __err = _err as DBError
		if (__err.cause.code === 'ECONNREFUSED') {
			error(...SERVER_ERRORS[503])
		}
		error(500, { id: 'unknown error', message: err })
	}
	log.debug(_err?.cause)
	const __err = (err ? err : _err) as DBError
	if (__err.cause.code === 'ECONNREFUSED') {
		error(...SERVER_ERRORS[503])
	}
	error(...SERVER_ERRORS[500])
}
