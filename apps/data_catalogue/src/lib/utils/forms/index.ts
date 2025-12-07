const arr_regex = /\[[0-9]+\]/i

export const parseForm = (form: FormData) => {
	const result: Record<PropertyKey, unknown | unknown[]> = {}
	form.forEach((value, key) => {
		const split = key.split('.')
		if (split.length > 1) {
			//@ts-expect-error ok ok ok
			split.reduce((acc, key, index) => {
				if (typeof acc !== 'object') {
					return acc
				}
				const clean: Record<PropertyKey, unknown | unknown[]> = {}
				if (acc && key in acc) {
					if (index === split.length - 1) {
						handleArray(acc, key, value)
					}
					return acc[key]
				}
				acc[key] = clean
				if (index === split.length - 1) {
					acc[key] = value
				}
				return acc[key]
			}, result)
		}
		if (split.length === 1) {
			if (key in result === false) {
				result[key] = value
				return
			}
			handleArray(result, key, value)
		}
	})
	return parseObject(result)
}

// const a = {
// 	data: {
// 		status: 'draft',
// 		preferences: {
// 			notifications: 'ioasjdfoi',
// 			random: {
// 				testing: 'ihoihdfoiahsdoih'
// 			}
// 		},
// 		test: {
// 			random: {
// 				testing: 'joi'
// 			},
// 			ok: ['oih', 'oi']
// 		},
// 		admit: ['hopi', 'hpoihasdfoih'],
// 		tags: {
// 			'[1]': {
// 				key: 'hoihoiahsdfoiho',
// 				value: 'hoiashdofih'
// 			},
// 			'[2]': {
// 				key: 'oihoihid',
// 				value: 'ihsaidhfiashdf'
// 			}
// 		},
// 		email: 'test@test.com',
// 		name: 'test'
// 	}
// }

const handleArray = (
	result: Record<PropertyKey, unknown | unknown[]>,
	key: string,
	value: FormDataEntryValue
) => {
	if (!Array.isArray(result[key])) {
		result[key] = [result[key]]
	}
	if (Array.isArray(result[key])) {
		result[key].push(value)
	}
}

const parseObject = (result: Record<PropertyKey, unknown | unknown[]>) =>
	Object.fromEntries(
		Object.entries(result).reduce((acc, entry) => {
			if (typeof entry[1] !== 'object') {
				//@ts-expect-error ok ok ok
				acc.push(entry)
				return acc
			}
			if (Array.isArray(entry[1])) {
				//@ts-expect-error ok ok ok
				acc.push(entry)
				return acc
			}
			if (entry[1] === null) {
				//@ts-expect-error ok ok ok
				acc.push(entry)
				return acc
			}
			if (Object.keys(entry[1]).every((key) => arr_regex.test(key))) {
				const arr = Object.values(entry[1])
				//@ts-expect-error ok ok ok
				acc.push([entry[0], arr])
				return acc
			}
			//@ts-expect-error ok ok ok
			acc.push([entry[0], parseObject(entry[1])])
			return acc
		}, [])
	)
