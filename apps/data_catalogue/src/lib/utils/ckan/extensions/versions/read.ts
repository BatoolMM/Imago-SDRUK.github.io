import type { CkanDataset } from '$lib/types/ckan'

export type CkanextActivityPackageActivityList = [
	'package_activity_list',

	{
		id: string
		offset?: number
		limit?: number
		after?: number
		before?: number
		include_hidden_activity?: boolean
		activity_types?: string[]
		exclude_activity_types?: string[]
	},
	{
		id: string
		timestamp: string
		user_id: string
		object_id: string
		activity_type: string
		data: {
			package: CkanDataset
			actor: string
		}
		permission_labels: string[]
	}[]
]

export type CkanextActivityGetActions = CkanextActivityPackageActivityList
