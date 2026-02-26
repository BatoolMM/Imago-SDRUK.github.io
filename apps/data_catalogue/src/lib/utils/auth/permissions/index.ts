import type { Relationship } from '@ory/client-fetch'

export const getDatasetBasePermissions = ({
	object,
	owner
}: {
	object: string
	owner?: string
}): Relationship[] => {
	const namespace = 'Dataset'
	const base = [
		{
			namespace,
			object: object,
			relation: 'admins',
			subject_set: {
				namespace: 'Group',
				object: 'admin',
				relation: 'users'
			}
		},
		{
			namespace,
			object: object,
			relation: 'editors',
			subject_set: {
				namespace: 'Group',
				object: 'editor',
				relation: 'users'
			}
		},
		{
			namespace,
			object: object,
			relation: 'viewers',
			subject_set: {
				namespace: 'Group',
				object: 'viewer',
				relation: 'users'
			}
		}
	]
	if (owner) {
		return [
			...base,
			{
				namespace,
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
}): Relationship[] => {
	const namespace = 'Resource'
	const base = [
		{
			namespace,
			object: object,
			relation: 'datasets',
			subject_set: {
				namespace: 'Dataset',
				object: dataset_id,
				relation: 'admins'
			}
		},
		{
			namespace,
			object: object,
			relation: 'datasets',
			subject_set: {
				namespace: 'Dataset',
				object: dataset_id,
				relation: 'editors'
			}
		},
		{
			namespace,
			object: object,
			relation: 'datasets',
			subject_set: {
				namespace: 'Dataset',
				object: dataset_id,
				relation: 'viewers'
			}
		}
	]

	return base
}

export const getUserBasePermissions = ({ id }: { id: string }): Relationship[] => {
	return [
		{
			namespace: 'User',
			object: id,
			relation: 'members',
			subject_id: id
		},
		{
			namespace: 'Group',
			object: 'viewer',
			relation: 'users',
			subject_id: id
		}
	]
}

export const getAnswerBasePermissions = ({
	user_id,
	answer_id
}: {
	user_id: string
	answer_id: string
}): Relationship[] => {
	const namespace = 'Answer'
	return [
		{
			namespace,
			object: answer_id,
			relation: 'admins',
			subject_set: {
				namespace: 'Group',
				object: 'admin',
				relation: 'users'
			}
		},
		{
			namespace,
			object: answer_id,
			relation: 'editors',
			subject_set: {
				namespace: 'Group',
				object: 'editor',
				relation: 'users'
			}
		},
		{
			namespace,
			object: answer_id,
			relation: 'owners',
			subject_id: user_id
		}
	]
}
