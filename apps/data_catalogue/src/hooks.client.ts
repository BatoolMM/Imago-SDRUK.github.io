import { env } from '$env/dynamic/public'
import * as Sentry from '@sentry/sveltekit'
import type { HandleClientError } from '@sveltejs/kit'
const myErrorHandler: HandleClientError = ({ error, event }) => {
	console.error('An error occurred on the client side:', error, event)
}

if (env.PUBLIC_NODE_ENV === 'production') {
	Sentry.init({
		dsn: env.PUBLIC_SENTRY_DSN,
		tracesSampleRate: 1.0,
		sendDefaultPii: true,
		integrations: [Sentry.replayIntegration()],
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0,
		enableLogs: true
	})
}

export const handleError =
	env.PUBLIC_NODE_ENV === 'production'
		? Sentry.handleErrorWithSentry(myErrorHandler)
		: myErrorHandler
