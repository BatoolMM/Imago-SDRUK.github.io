import { config } from '@imago/config/eslint'

export default [
	...config,
	{
		ignores: ['.svelte-kit/*']
	}
]
