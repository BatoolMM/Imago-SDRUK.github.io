import { getId } from '@arturoguzman/art-ui'
import { writable } from 'svelte/store'

/**
 * @namespace NodeJS
 * @typedef {NodeJS.Timeout} Timeout
 **/

/**
 * @namespace NodeJS
 * @typedef {Object} Notification
 * @property {string} message
 * @property {string} [status]
 * @property {string} [background_colour]
 * @property {string} [colour]
 * @property {number} [duration]
 * @property {string} [id]
 * @property {Timeout} [cancel]
 **/

export const handleNotifications = () => {
	/**
	 * @type {import('svelte/store').Writable<Notification[]>}
	 **/
	const _store = writable([])
	const { set, update, subscribe } = _store

	/**
	 * @param {string | Notification} notification
	 **/
	const send = (notification) => {
		const id = getId()
		let _duration = 5000
		/**
		 * @type {Notification}
		 **/
		let _notification = { message: '' }

		if (typeof notification === 'string') {
			_notification = {
				message: notification,
				duration: _duration,
				id
			}
		}
		if (typeof notification !== 'string') {
			const {
				status,
				message,
				background_colour = 'white',
				colour = 'black',
				duration
			} = notification
			_duration = duration ?? 5000
			_notification = { status, message, background_colour, colour, duration: _duration, id }
		}
		_notification.cancel = setTimeout(() => {
			remove(id)
		}, _duration)
		update((store) => {
			console.log(_notification)
			store.push(_notification)
			return store
		})
	}

	/**
	 * @param {string} [id]
	 **/
	const remove = (id) => {
		update((store) => {
			const index = store.findIndex((notification) => notification.id === id)
			store = [...store.slice(0, index), ...store.slice(index + 1)]
			return store
		})
	}
	return {
		send,
		set,
		update,
		subscribe,
		remove
	}
}
export const notify = handleNotifications()
