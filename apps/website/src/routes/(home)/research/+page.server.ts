import { redirect } from '@sveltejs/kit'

export const load = () => {
	redirect(307, `https://github.com/Imago-SDRUK`)
}
