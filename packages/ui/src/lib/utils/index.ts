export const getFields = <T extends object, K extends keyof T & string>(
	obj: T,
	keys: K[]
): Pick<T, K> => {
	return Object.fromEntries(keys.map((key) => [key, obj[key]])) as Pick<T, K>
}
