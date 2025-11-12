export const SERVER_ERRORS: { [k: number]: [number, { message: string; id: string }] } = {
	400: [
		400,
		{
			message: `Please check your request and try again`,
			id: 'bad-request'
		}
	],
	403: [
		403,
		{
			message: `You cannot do this.`,
			id: 'forbidden'
		}
	],
	404: [
		404,
		{
			message: `We couldn't find this page or it may have been removed.`,
			id: 'not-found'
		}
	]
}

export const COOKIES = {
	access_token: 'imago-invite',
	expire: 'imago-invite-expire'
}
