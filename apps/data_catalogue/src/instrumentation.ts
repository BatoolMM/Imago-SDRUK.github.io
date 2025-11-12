import { env } from '$env/dynamic/private'
import * as Sentry from '@sentry/sveltekit'
Sentry.init({
	dsn: env.SENTRY_DSN,
	sendDefaultPii: true,
	tracesSampleRate: 1.0,
	enableLogs: true
})
