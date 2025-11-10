type PackagePatch = [
	'package_patch',
	{
		/** the id or name of the dataset */
		id: string
	}
]

type ResourcePatch = [
	'resource_patch',
	{
		/** the id of the resource */
		id: string
	}
]

type GroupPatch = [
	'group_patch',
	{
		/** the id or name of the group */
		id: string
	}
]

type OrganizationPatch = [
	'organization_patch',
	{
		/** the id or name of the organization */
		id: string
	}
]

type UserPatch = [
	'user_patch',
	{
		/** the id or name of the user */
		id: string
	}
]

export type CkanPatchActions =
	| PackagePatch
	| ResourcePatch
	| GroupPatch
	| OrganizationPatch
	| UserPatch

type ResourceUpdate = [
	'resource_update',
	{
		/** the id of the resource to update */
		id: string
	}
]

type ResourceViewUpdate = [
	'resource_view_update',
	{
		/** the id of the resource_view to update */
		id: string
	}
]

type ResourceViewReorder = [
	'resource_view_reorder',
	{
		/** the id of the resource */
		id: string
		/** the list of id of the resource to update the order of the views */
		order: string[]
	}
]

type PackageUpdate = [
	'package_update',
	{
		/** the name or id of the dataset to update */
		id: string
	}
]

type PackageRevise = [
	'package_revise',
	{
		/** dict containing "id" or "name" values of the dataset to update */
		match: Record<string, unknown>
		/** list of string patterns of fields to remove from the current dataset */
		filter?: string[]
		/** dict with values to update/create after filtering */
		update?: Record<string, unknown>
		/** list of string pattern of fields to include in response */
		include?: string[]
	}
]

type PackageResourceReorder = [
	'package_resource_reorder',
	{
		/** the id or name of the package to update */
		id: string
		/** a list of resource ids in the order needed */
		order: string[]
	}
]

type PackageRelationshipUpdate = [
	'package_relationship_update',
	{
		/** the name or id of the dataset that is the subject of the relationship */
		subject: string
		/** the name or id of the dataset that is the object of the relationship */
		object: string
		/** the type of the relationship */
		type:
			| 'depends_on'
			| 'dependency_of'
			| 'derives_from'
			| 'has_derivation'
			| 'links_to'
			| 'linked_from'
			| 'child_of'
			| 'parent_of'
		/** a comment about the relationship (optional) */
		comment?: string
	}
]

type GroupUpdate = [
	'group_update',
	{
		/** the name or id of the group to update */
		id: string
	}
]

type OrganizationUpdate = [
	'organization_update',
	{
		/** the name or id of the organization to update */
		id: string
		/** ignored. use package_owner_org_update to change package ownership */
		packages?: never
	}
]

type UserUpdate = [
	'user_update',
	{
		/** the name or id of the user to update */
		id: string
	}
]

type TaskStatusUpdate = [
	'task_status_update',
	{
		/** the id of the task status to update */
		id: string
		entity_id: string
		entity_type: string
		task_type: string
		key: string
		value?: unknown
		state?: string
		last_updated?: string
		error?: string
	}
]

type TaskStatusUpdateMany = [
	'task_status_update_many',
	{
		/** the task_status dictionaries to update */
		data: Array<Record<string, unknown>>
	}
]

type TermTranslationUpdate = [
	'term_translation_update',
	{
		/** the term to be translated, in the original language */
		term: string
		/** the translation of the term */
		term_translation: string
		/** the language code of the translation */
		lang_code: string
	}
]

type TermTranslationUpdateMany = [
	'term_translation_update_many',
	{
		/** the term translation dictionaries to create or update */
		data: Array<Record<string, unknown>>
	}
]

type VocabularyUpdate = [
	'vocabulary_update',
	{
		/** the id of the vocabulary to update */
		id: string
	}
]

type PackageOwnerOrgUpdate = [
	'package_owner_org_update',
	{
		/** the name or id of the dataset to update */
		id: string
		/** the name or id of the owning organization */
		organization_id: string
	}
]

type BulkUpdatePrivate = [
	'bulk_update_private',
	{
		/** list of ids of the datasets to update */
		datasets: string[]
		/** id of the owning organization */
		org_id: string
	}
]

type BulkUpdatePublic = [
	'bulk_update_public',
	{
		/** list of ids of the datasets to update */
		datasets: string[]
		/** id of the owning organization */
		org_id: string
	}
]

type BulkUpdateDelete = [
	'bulk_update_delete',
	{
		/** list of ids of the datasets to update */
		datasets: string[]
		/** id of the owning organization */
		org_id: string
	}
]

type ConfigOptionUpdate = [
	'config_option_update',
	{
		/** a configuration option key (eg ckan.site_title) */
		[key: string]: unknown
	}
]

export type CkanUpdateActions =
	| ResourceUpdate
	| ResourceViewUpdate
	| ResourceViewReorder
	| PackageUpdate
	| PackageRevise
	| PackageResourceReorder
	| PackageRelationshipUpdate
	| GroupUpdate
	| OrganizationUpdate
	| UserUpdate
	| TaskStatusUpdate
	| TaskStatusUpdateMany
	| TermTranslationUpdate
	| TermTranslationUpdateMany
	| VocabularyUpdate
	| PackageOwnerOrgUpdate
	| BulkUpdatePrivate
	| BulkUpdatePublic
	| BulkUpdateDelete
	| ConfigOptionUpdate
