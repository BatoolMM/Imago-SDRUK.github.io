type PackageList = [
	'package_list',
	{
		limit?: number
		offset?: number
	}
]

type CurrentPackageListWithResources = [
	'current_package_list_with_resources',
	{
		limit?: number
		offset?: number
		page?: number
	}
]

type PackageShow = [
	'package_show',
	{
		id: string
		use_default_schema?: boolean
		include_plugin_data?: boolean
	}
]

type PackageSearch = [
	'package_search',
	{
		q?: string
		fq?: string
		fq_list?: string[]
		sort?: string
		rows?: number
		start?: number
		facet?: string
		'facet.mincount'?: number
		'facet.limit'?: number
		'facet.field'?: string[]
		include_drafts?: boolean
		include_private?: boolean
		use_default_schema?: boolean
	}
]

type MemberList = [
	'member_list',
	{
		id: string
		object_type?: string
		capacity?: string
	}
]

type MemberRolesList = [
	'member_roles_list',
	{
		group_type?: string
	}
]

type PackageCollaboratorList = [
	'package_collaborator_list',
	{
		id: string
		capacity?: string
	}
]

type PackageCollaboratorListForUser = [
	'package_collaborator_list_for_user',
	{
		id: string
		capacity?: string
	}
]

type GroupList = [
	'group_list',
	{
		type?: string
		order_by?: string
		sort?: string
		limit?: number
		offset?: number
		groups?: string[]
		all_fields?: boolean
		include_dataset_count?: boolean
		include_extras?: boolean
		include_groups?: boolean
		include_users?: boolean
	}
]

type GroupShow = [
	'group_show',
	{
		id: string
		include_datasets?: boolean
		include_dataset_count?: boolean
		include_extras?: boolean
		include_users?: boolean
		include_groups?: boolean
		include_followers?: boolean
	}
]

type GroupPackageShow = [
	'group_package_show',
	{
		id: string
		limit?: number
	}
]

type OrganizationList = [
	'organization_list',
	{
		type?: string
		order_by?: string
		sort?: string
		limit?: number
		offset?: number
		organizations?: string[]
		all_fields?: boolean
		include_dataset_count?: boolean
		include_extras?: boolean
		include_groups?: boolean
		include_users?: boolean
	}
]

type OrganizationShow = [
	'organization_show',
	{
		id: string
		include_datasets?: boolean
		include_dataset_count?: boolean
		include_extras?: boolean
		include_users?: boolean
		include_groups?: boolean
		include_followers?: boolean
	}
]

type UserList = [
	'user_list',
	{
		q?: string
		email?: string
		order_by?: string
		all_fields?: boolean
		include_site_user?: boolean
	}
]

type UserShow = [
	'user_show',
	{
		id?: string
		include_datasets?: boolean
		include_num_followers?: boolean
		include_password_hash?: boolean
		include_plugin_extras?: boolean
	}
]

type ResourceShow = [
	'resource_show',
	{
		id: string
	}
]

type ResourceSearch = [
	'resource_search',
	{
		query: string | string[]
		order_by?: string
		offset?: number
		limit?: number
	}
]

type TagList = [
	'tag_list',
	{
		query?: string
		vocabulary_id?: string
		all_fields?: boolean
	}
]

type TagShow = [
	'tag_show',
	{
		id: string
		vocabulary_id?: string
		include_datasets?: boolean
	}
]

type FolloweeList = [
	'followee_list',
	{
		id: string
		q?: string
	}
]

type UserFollowerCount = [
	'user_follower_count',
	{
		id: string
	}
]

type DatasetFollowerCount = [
	'dataset_follower_count',
	{
		id: string
	}
]

type GroupFollowerCount = [
	'group_follower_count',
	{
		id: string
	}
]

type ConfigOptionShow = [
	'config_option_show',
	{
		key: string
	}
]

type ConfigOptionList = ['config_option_list', {}]

type JobList = [
	'job_list',
	{
		queues?: string[]
		limit?: number
		ids_only?: boolean
	}
]

type JobShow = [
	'job_show',
	{
		id: string
	}
]

type ApiTokenList = [
	'api_token_list',
	{
		user_id?: string
		user?: string
	}
]

type VocabularyList = ['vocabulary_list', {}]

type VocabularyShow = [
	'vocabulary_show',
	{
		id: string
	}
]

type StatusShow = ['status_show', {}]

type OrganizationFollowerCount = [
	'organization_follower_count',
	{
		id: string
	}
]

type UserFollowerList = [
	'user_follower_list',
	{
		id: string
	}
]

type DatasetFollowerList = [
	'dataset_follower_list',
	{
		id: string
	}
]

type GroupFollowerList = [
	'group_follower_list',
	{
		id: string
	}
]

type OrganizationFollowerList = [
	'organization_follower_list',
	{
		id: string
	}
]

type FolloweeCount = [
	'followee_count',
	{
		id: string
	}
]

type UserFolloweeCount = [
	'user_followee_count',
	{
		id: string
	}
]

type DatasetFolloweeCount = [
	'dataset_followee_count',
	{
		id: string
	}
]

type GroupFolloweeCount = [
	'group_followee_count',
	{
		id: string
	}
]

type OrganizationFolloweeCount = [
	'organization_followee_count',
	{
		id: string
	}
]

type UserFolloweeList = [
	'user_followee_list',
	{
		id: string
	}
]

type DatasetFolloweeList = [
	'dataset_followee_list',
	{
		id: string
	}
]

type GroupFolloweeList = [
	'group_followee_list',
	{
		id: string
	}
]

type OrganizationFolloweeList = [
	'organization_followee_list',
	{
		id: string
	}
]

type AmFollowingUser = [
	'am_following_user',
	{
		id: string
	}
]

type AmFollowingDataset = [
	'am_following_dataset',
	{
		id: string
	}
]

type AmFollowingGroup = [
	'am_following_group',
	{
		id: string
	}
]

type ResourceViewShow = [
	'resource_view_show',
	{
		id: string
	}
]

type ResourceViewList = [
	'resource_view_list',
	{
		id: string
	}
]

type UserAutocomplete = [
	'user_autocomplete',
	{
		q: string
		limit?: number
		ignore_self?: boolean
	}
]

type GroupAutocomplete = [
	'group_autocomplete',
	{
		q: string
		limit?: number
	}
]

type OrganizationAutocomplete = [
	'organization_autocomplete',
	{
		q: string
		limit?: number
	}
]

type PackageAutocomplete = [
	'package_autocomplete',
	{
		q: string
		limit?: number
	}
]

type FormatAutocomplete = [
	'format_autocomplete',
	{
		q: string
		limit?: number
	}
]

type TagAutocomplete = [
	'tag_autocomplete',
	{
		query: string
		vocabulary_id?: string
		fields?: Record<string, unknown>
		limit?: number
		offset?: number
	}
]

type LicenseList = ['license_list', {}]

type TermTranslationShow = [
	'term_translation_show',
	{
		terms: string | string[]
		lang_codes?: string | string[]
	}
]

type GetSiteUser = [
	'get_site_user',
	{
		defer_commit?: boolean
	}
]

type HelpShow = [
	'help_show',
	{
		name: string
	}
]

type GroupListAuthz = [
	'group_list_authz',
	{
		available_only?: boolean
		am_member?: boolean
	}
]

type OrganizationListForUser = [
	'organization_list_for_user',
	{
		id?: string
		permission?: string
		include_dataset_count?: boolean
	}
]

type PackageRelationshipsList = [
	'package_relationships_list',
	{
		id: string
		id2?: string
		rel?: string
	}
]

type TaskStatusShow = [
	'task_status_show',
	{
		id?: string
		entity_id?: string
		task_type?: string
		key?: string
	}
]

type TagSearch = [
	'tag_search',
	{
		query?: string | string[]
		vocabulary_id?: string
		fields?: Record<string, unknown>
		limit?: number
		offset?: number
	}
]

export type CkanGetActions =
	| PackageList
	| CurrentPackageListWithResources
	| PackageShow
	| PackageSearch
	| MemberList
	| MemberRolesList
	| PackageCollaboratorList
	| PackageCollaboratorListForUser
	| GroupList
	| GroupShow
	| GroupPackageShow
	| OrganizationList
	| OrganizationShow
	| UserList
	| UserShow
	| ResourceSearch
	| TagList
	| TagShow
	| FolloweeList
	| UserFollowerCount
	| DatasetFollowerCount
	| GroupFollowerCount
	| ConfigOptionShow
	| ConfigOptionList
	| JobList
	| JobShow
	| ApiTokenList
	| VocabularyList
	| VocabularyShow
	| StatusShow
	| OrganizationFollowerCount
	| UserFollowerList
	| DatasetFollowerList
	| GroupFollowerList
	| OrganizationFollowerList
	| FolloweeCount
	| UserFolloweeCount
	| DatasetFolloweeCount
	| GroupFolloweeCount
	| OrganizationFolloweeCount
	| DatasetFolloweeList
	| GroupFolloweeList
	| OrganizationFolloweeList
	| AmFollowingUser
	| AmFollowingDataset
	| AmFollowingGroup
	| UserAutocomplete
	| ResourceViewShow
	| ResourceViewList
	| GroupAutocomplete
	| OrganizationAutocomplete
	| PackageAutocomplete
	| FormatAutocomplete
	| TagAutocomplete
	| LicenseList
	| GetSiteUser
	| HelpShow
	| GroupListAuthz
	| OrganizationListForUser
	| PackageRelationshipsList
	| TaskStatusShow
	| TagShow
	| TagSearch
	| ResourceShow
	| UserFolloweeList
	| TermTranslationShow

/**
 * create action types
 **/

type PackageCreate = [
	'package_create',
	{
		name: string // must be between 2 and 100 characters long and contain only lowercase alphanumeric characters, - and _
		title?: string // the title of the dataset (optional, default: same as name)
		private?: boolean // If true creates a private dataset
		author?: string // the name of the dataset's author
		author_email?: string // the email address of the dataset's author
		maintainer?: string // the name of the dataset's maintainer
		maintainer_email?: string // the email address of the dataset's maintainer
		license_id?: string // the id of the dataset's license
		notes?: string // a description of the dataset
		url?: string // a URL for the dataset's source
		version?: string // no longer than 100 characters
		state?: string // the current state of the dataset, e.g. 'active' or 'deleted'
		type?: string // the type of the dataset
		resources?: Array<unknown> // the dataset's resources
		tags?: Array<unknown> // the dataset's tags
		extras?: Array<{ key: string; value: string }> // the dataset's extras (arbitrary key:value metadata)
		plugin_data?: Record<string, unknown> // private package data belonging to plugins
		relationships_as_object?: Array<unknown> // relationship dictionaries
		relationships_as_subject?: Array<unknown> // relationship dictionaries
		groups?: Array<{ id?: string; name?: string }> // the groups to which the dataset belongs
		owner_org?: string // the id of the dataset's owning organization
	}
]

type ResourceCreate = [
	'resource_create',
	{
		package_id: string // id of package that the resource should be added to
		url: string // url of resource
		description?: string
		format?: string
		hash?: string
		name?: string
		resource_type?: string
		mimetype?: string
		mimetype_inner?: string
		cache_url?: string
		size?: number
		created?: string // iso date string
		last_modified?: string // iso date string
		cache_last_updated?: string // iso date string
		upload?: unknown // FieldStorage (needs multipart/form-data)
	}
]

type ResourceViewCreate = [
	'resource_view_create',
	{
		resource_id: string // id of the resource
		title: string // the title of the view
		description?: string // a description of the view
		view_type: string // type of view
		config?: string // options necessary to recreate a view state (JSON string)
	}
]

type UserCreate = [
	'user_create',
	{
		name: string // between 2 and 100 characters, containing only lowercase alphanumeric characters, - and _
		email: string // the email address for the new user
		password: string // at least 4 characters
		id?: string
		fullname?: string
		about?: string
		image_url?: string
		plugin_extras?: Record<string, unknown> // private extra user data belonging to plugins
		with_apitoken?: boolean // whether to create an API token for the user
	}
]

type UserInvite = [
	'user_invite',
	{
		email: string // the email of the user to be invited to the group
		group_id: string // the id or name of the group
		role: string // role of the user in the group (member, editor, or admin)
	}
]

type VocabularyCreate = [
	'vocabulary_create',
	{
		name: string // the name of the new vocabulary, e.g. 'Genre'
		tags?: Array<unknown> // the new tags to add to the new vocabulary
	}
]

type TagCreate = [
	'tag_create',
	{
		name: string // between 2 and 100 characters long containing only alphanumeric characters, spaces and -, _ and .
		vocabulary_id: string // the id of the vocabulary that the new tag should be added to
	}
]

type GroupCreate = [
	'group_create',
	{
		name: string // between 2 and 100 characters long, containing only lowercase alphanumeric characters, - and _
		id?: string
		title?: string
		description?: string
		image_url?: string
		type?: string // default: 'group'
		state?: string // e.g. 'active' or 'deleted'
		approval_status?: string
		extras?: Array<unknown> // arbitrary (key: value) metadata items
		packages?: Array<{ name: string; title?: string }> // datasets that belong to the group
		groups?: Array<{ name: string; capacity?: string }> // groups that belong to the group
		users?: Array<{ name: string; capacity?: string }> // users that belong to the group
	}
]

type OrganizationCreate = [
	'organization_create',
	{
		name: string // between 2 and 100 characters long, containing only lowercase alphanumeric characters, - and _
		id?: string
		title?: string
		description?: string
		image_url?: string
		state?: string // e.g. 'active' or 'deleted'
		approval_status?: string
		extras?: Array<unknown> // arbitrary (key: value) metadata items
		packages?: Array<{ name: string; title?: string }> // datasets that belong to the organization
		users?: Array<{ name: string; capacity?: string }> // users that belong to the organization
	}
]

type GroupMemberCreate = [
	'group_member_create',
	{
		id: string // the id or name of the group
		username: string // name or id of the user to be made member of the group
		role: string // role of the user in the group (member, editor, or admin)
	}
]

type OrganizationMemberCreate = [
	'organization_member_create',
	{
		id: string // the id or name of the organization
		username: string // name or id of the user to be made member of the organization
		role: string // role of the user in the organization (member, editor, or admin)
	}
]

type FollowUser = [
	'follow_user',
	{
		id: string // the id or name of the user to follow
	}
]

type FollowDataset = [
	'follow_dataset',
	{
		id: string // the id or name of the dataset to follow
	}
]

type FollowGroup = [
	'follow_group',
	{
		id: string // the id or name of the group to follow
	}
]

type ApiTokenCreate = [
	'api_token_create',
	{
		user: string // name or id of the user who owns new API Token
		name: string // distinctive name for API Token
	}
]

export type CkanCreateActions =
	| PackageCreate
	| ResourceCreate
	| ResourceViewCreate
	| UserCreate
	| UserInvite
	| VocabularyCreate
	| TagCreate
	| GroupCreate
	| OrganizationCreate
	| GroupMemberCreate
	| OrganizationMemberCreate
	| FollowUser
	| FollowDataset
	| FollowGroup
	| ApiTokenCreate

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

export type CkanResult = {
	help: string
	success: boolean
	result: Record<PropertyKey, unknown> | Record<PropertyKey, unknown>[]
}

export type CkanTextError = {
	success: false
	message: string
	status: number
	result: []
}
