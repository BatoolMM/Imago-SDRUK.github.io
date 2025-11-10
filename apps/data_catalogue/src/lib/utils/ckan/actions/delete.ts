type UserDelete = [
	'user_delete',
	{
		/** the id or usernamename of the user to delete */
		id: string
	}
]

type PackageDelete = [
	'package_delete',
	{
		/** the id or name of the dataset to delete */
		id: string
	}
]

type DatasetPurge = [
	'dataset_purge',
	{
		/** the name or id of the dataset to be purged */
		id: string
	}
]

type ResourceDelete = [
	'resource_delete',
	{
		/** the id of the resource */
		id: string
	}
]

type ResourceViewDelete = [
	'resource_view_delete',
	{
		/** the id of the resource_view */
		id: string
	}
]

type ResourceViewClear = [
	'resource_view_clear',
	{
		/** specific types to delete (optional) */
		view_types?: string[]
	}
]

type PackageRelationshipDelete = [
	'package_relationship_delete',
	{
		/** the id or name of the dataset that is the subject of the relationship */
		subject: string
		/** the id or name of the dataset that is the object of the relationship */
		object: string
		/** the type of the relationship */
		type: string
	}
]

type MemberDelete = [
	'member_delete',
	{
		/** the id of the group */
		id: string
		/** the id or name of the object to be removed */
		object: string
		/** the type of the object to be removed, e.g. `package` or `user` */
		object_type: string
	}
]

type PackageCollaboratorDelete = [
	'package_collaborator_delete',
	{
		/** the id or name of the dataset */
		id: string
		/** the id or name of the user to remove */
		user_id: string
	}
]

type GroupDelete = [
	'group_delete',
	{
		/** the name or id of the group */
		id: string
	}
]

type OrganizationDelete = [
	'organization_delete',
	{
		/** the name or id of the organization */
		id: string
	}
]

type GroupPurge = [
	'group_purge',
	{
		/** the name or id of the group to be purged */
		id: string
	}
]

type OrganizationPurge = [
	'organization_purge',
	{
		/** the name or id of the organization to be purged */
		id: string
	}
]

type TaskStatusDelete = [
	'task_status_delete',
	{
		/** the id of the task status to delete */
		id: string
	}
]

type VocabularyDelete = [
	'vocabulary_delete',
	{
		/** the id of the vocabulary */
		id: string
	}
]

type TagDelete = [
	'tag_delete',
	{
		/** the id or name of the tag */
		id: string
		/** the id or name of the vocabulary that the tag belongs to (optional) */
		vocabulary_id?: string
	}
]

type UnfollowUser = [
	'unfollow_user',
	{
		/** the id or name of the user to stop following */
		id: string
	}
]

type UnfollowDataset = [
	'unfollow_dataset',
	{
		/** the id or name of the dataset to stop following */
		id: string
	}
]

type GroupMemberDelete = [
	'group_member_delete',
	{
		/** the id or name of the group */
		id: string
		/** name or id of the user to be removed */
		username: string
	}
]

type OrganizationMemberDelete = [
	'organization_member_delete',
	{
		/** the id or name of the organization */
		id: string
		/** name or id of the user to be removed */
		username: string
	}
]

type UnfollowGroup = [
	'unfollow_group',
	{
		/** the id or name of the group to stop following */
		id: string
	}
]

type JobClear = [
	'job_clear',
	{
		/** The queues to clear. If not given then ALL queues are cleared */
		queues?: string[]
	}
]

type JobCancel = [
	'job_cancel',
	{
		/** The ID of the background job */
		id: string
	}
]

type ApiTokenRevoke = [
	'api_token_revoke',
	{
		/** Token to remove(required if `jti` not specified) */
		token?: string
		/** Id of the token to remove(overrides `token` if specified) */
		jti?: string
	}
]

export type CkanDeleteActions =
	| UserDelete
	| PackageDelete
	| DatasetPurge
	| ResourceDelete
	| ResourceViewDelete
	| ResourceViewClear
	| PackageRelationshipDelete
	| MemberDelete
	| PackageCollaboratorDelete
	| GroupDelete
	| OrganizationDelete
	| GroupPurge
	| OrganizationPurge
	| TaskStatusDelete
	| VocabularyDelete
	| TagDelete
	| UnfollowUser
	| UnfollowDataset
	| GroupMemberDelete
	| OrganizationMemberDelete
	| UnfollowGroup
	| JobClear
	| JobCancel
	| ApiTokenRevoke
