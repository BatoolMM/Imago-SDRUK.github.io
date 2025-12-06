export const getDatasetBasePermissions = ({
	object,
	owner
}: {
	object: string
	owner?: string
}) => {
	const base = [
		{
			namespace: 'Dataset',
			object: object,
			relation: 'admins',
			subject_set: {
				namespace: 'Group',
				object: 'admin',
				relation: 'users'
			}
		},
		{
			namespace: 'Dataset',
			object: object,
			relation: 'editors',
			subject_set: {
				namespace: 'Group',
				object: 'editor',
				relation: 'users'
			}
		},
		{
			namespace: 'Dataset',
			object: object,
			relation: 'viewers',
			subject_set: {
				namespace: 'Group',
				object: 'public',
				relation: 'users'
			}
		}
	]
	if (owner) {
		return [
			...base,
			{
				namespace: 'Dataset',
				object: object,
				relation: 'owners',
				subject_id: owner
			}
		]
	}
	return base
}

export const getResourceBasePermissions = ({
	object,
	dataset_id
}: {
	object: string
	dataset_id: string
}) => {
	const base = [
		{
			namespace: 'Resource',
			object: object,
			relation: 'datasets',
			subject_set: {
				namespace: 'Dataset',
				object: dataset_id
			}
		}
	]

	return base
}
