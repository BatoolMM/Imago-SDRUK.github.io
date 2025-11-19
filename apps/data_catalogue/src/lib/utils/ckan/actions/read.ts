import type {
	CkanDataset,
	CkanGroup,
	CkanOrganisation,
	CkanResource,
	CkanTag
} from '$lib/types/ckan'

type PackageList = [
	'package_list',
	{
		limit?: number
		offset?: number
	},
	{ result: string[] }
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
	},
	CkanDataset
]

type PackageSearch = [
	'package_search',
	{
		q?: string
		fq?: string | null
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
	},
	CkanDataset[]
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
	},
	CkanGroup
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
	},
	CkanResource
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
	},
	CkanTag[]
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
