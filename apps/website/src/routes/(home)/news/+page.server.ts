import { env } from '$env/dynamic/private'
import { handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'

export async function load({ locals }) {
	const articles = await locals.directus
		.request(
			readItems('articles', {
				filter:
					env.NODE_ENV === 'development'
						? {}
						: {
								_and: [
									{
										status: {
											_eq: 'published'
										}
									}
								]
							},
				deep: {
					sections: {
						_filter:
							env.NODE_ENV === 'development'
								? {}
								: {
										article_sections_id: {
											status: {
												_eq: 'published'
											}
										}
									}
					}
				},
				fields: [
					'*',
					{
						sections: [
							{
								article_sections_id: [
									'*',
									{ content: ['*', { media: [{ directus_files_id: ['*'] }] }] }
								]
							}
						]
					},
					{ media: ['*', { directus_files_id: ['*'] }] },
					{ user_created: ['first_name', 'last_name'] }
				]
			})
		)
		.catch(handleDirectusError)
	return {
		articles
	}
}
