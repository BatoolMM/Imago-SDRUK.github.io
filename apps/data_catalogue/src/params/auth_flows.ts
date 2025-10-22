const ALLOWED_AUTH_FLOWS = ['registration', 'login', 'logout', 'recovery', 'verification', 'error']
export function match(param: string) {
	return ALLOWED_AUTH_FLOWS.includes(param)
}
