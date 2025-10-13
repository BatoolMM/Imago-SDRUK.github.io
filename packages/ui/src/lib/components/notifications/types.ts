export type Notification = {
	message: string
	status?: string
	background_colour?: string
	colour?: string
	duration?: number
	id?: string
	cancel?: NodeJS.Timeout
}
