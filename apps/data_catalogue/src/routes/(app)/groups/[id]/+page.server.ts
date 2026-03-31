export const load = async ({ fetch, params }) => {
	const res = await fetch(`/api/v1/groups/${params.id}`)
	const data = await res.json()
	return data
}
