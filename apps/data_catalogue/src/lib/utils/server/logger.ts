import { env } from '$env/dynamic/private'
import { pino } from 'pino'
export const log = pino({
	level: env.LOG_LEVEL || 'info'
})
