export type PackageCreate = [
	'package_create',
	{
		context: unknown // CKAN Context
		data_dict?: unknown // CKAN DataDict (optional)
		// If an organization is given are we able to add a dataset to it?
		// data_dict.owner_org?: string
	}
]

export type FileUpload = [
	'file_upload',
	{
		context: unknown
		data_dict?: unknown
	}
]

export type ResourceCreate = [
	'resource_create',
	{
		context: unknown
		data_dict: unknown // must contain package_id or id
	}
]

export type ResourceViewCreate = [
	'resource_view_create',
	{
		context: unknown
		data_dict: unknown // must contain resource_id
	}
]

export type ResourceCreateDefaultResourceViews = [
	'resource_create_default_resource_views',
	{
		context: unknown
		data_dict: unknown // must contain resource.id
	}
]

export type PackageCreateDefaultResourceViews = [
	'package_create_default_resource_views',
	{
		context: unknown
		data_dict: unknown // must contain package
	}
]

export type PackageRelationshipCreate = [
	'package_relationship_create',
	{
		context: unknown
		data_dict: unknown // must contain subject and object
	}
]

export type GroupCreate = [
	'group_create',
	{
		context: unknown
		data_dict?: unknown
	}
]

export type OrganizationCreate = [
	'organization_create',
	{
		context: unknown
		data_dict?: unknown
	}
]

export type UserCreate = [
	'user_create',
	{
		context: unknown
		data_dict?: unknown
	}
]

export type UserInvite = [
	'user_invite',
	{
		context: unknown
		data_dict: unknown // must contain group_id
	}
]

export type VocabularyCreate = [
	'vocabulary_create',
	{
		context: unknown
		data_dict: unknown
	}
]

export type TagCreate = [
	'tag_create',
	{
		context: unknown
		data_dict: unknown
	}
]

export type OrganizationMemberCreate = [
	'organization_member_create',
	{
		context: unknown
		data_dict: unknown // must contain id
	}
]

export type GroupMemberCreate = [
	'group_member_create',
	{
		context: unknown
		data_dict: unknown // must contain id
	}
]

export type MemberCreate = [
	'member_create',
	{
		context: unknown
		data_dict: unknown // must contain object_type, group info
	}
]

export type ApiTokenCreate = [
	'api_token_create',
	{
		context: unknown
		data_dict: unknown // must contain user
	}
]

export type PackageCollaboratorCreate = [
	'package_collaborator_create',
	{
		context: unknown
		data_dict: unknown // must contain id
	}
]

export type CkanCreateAuth =
	| PackageCreate
	| FileUpload
	| ResourceCreate
	| ResourceViewCreate
	| ResourceCreateDefaultResourceViews
	| PackageCreateDefaultResourceViews
	| PackageRelationshipCreate
	| GroupCreate
	| OrganizationCreate
	| UserCreate
	| UserInvite
	| VocabularyCreate
	| TagCreate
	| OrganizationMemberCreate
	| GroupMemberCreate
	| MemberCreate
	| ApiTokenCreate
	| PackageCollaboratorCreate

export type UserDelete = [
	'user_delete',
	{
		context: unknown // CKAN Context
		data_dict: unknown // CKAN DataDict
		// sysadmins only
	}
]

export type PackageDelete = [
	'package_delete',
	{
		context: unknown
		data_dict: unknown
		// Defer authorization for package_delete to package_update, as deletions are essentially changing the state field
	}
]

export type DatasetPurge = [
	'dataset_purge',
	{
		context: unknown
		data_dict: unknown
		// Only sysadmins are authorized to purge datasets
	}
]

export type ResourceDelete = [
	'resource_delete',
	{
		context: unknown
		data_dict: unknown
		// check authentication against package
	}
]

export type ResourceViewDelete = [
	'resource_view_delete',
	{
		context: unknown
		data_dict: unknown // must contain id
	}
]

export type ResourceViewClear = [
	'resource_view_clear',
	{
		context: unknown
		data_dict: unknown
		// sysadmins only
	}
]

export type PackageRelationshipDelete = [
	'package_relationship_delete',
	{
		context: unknown
		data_dict: unknown
		// If you can create this relationship then you can also delete it
	}
]

export type GroupDelete = [
	'group_delete',
	{
		context: unknown
		data_dict: unknown
		// must contain group info
	}
]

export type GroupPurge = [
	'group_purge',
	{
		context: unknown
		data_dict: unknown
		// Only sysadmins are authorized to purge groups.
	}
]

export type OrganizationPurge = [
	'organization_purge',
	{
		context: unknown
		data_dict: unknown
		// Only sysadmins are authorized to purge organizations.
	}
]

export type OrganizationDelete = [
	'organization_delete',
	{
		context: unknown
		data_dict: unknown
		// must contain group info
	}
]

export type TaskStatusDelete = [
	'task_status_delete',
	{
		context: unknown
		data_dict: unknown
		// sysadmins only
	}
]

export type VocabularyDelete = [
	'vocabulary_delete',
	{
		context: unknown
		data_dict: unknown
		// sysadmins only
	}
]

export type TagDelete = [
	'tag_delete',
	{
		context: unknown
		data_dict: unknown
		// sysadmins only
	}
]

export type GroupMemberDelete = [
	'group_member_delete',
	{
		context: unknown
		data_dict: unknown
		// just return true as logic runs through member_delete
	}
]

export type OrganizationMemberDelete = [
	'organization_member_delete',
	{
		context: unknown
		data_dict: unknown
		// just return true as logic runs through member_delete
	}
]

export type MemberDelete = [
	'member_delete',
	{
		context: unknown
		data_dict: unknown
	}
]

export type PackageCollaboratorDelete = [
	'package_collaborator_delete',
	{
		context: unknown
		data_dict: unknown // must contain id
		// Checks if a user is allowed to remove collaborators from a dataset
	}
]

export type JobClear = [
	'job_clear',
	{
		context: unknown
		data_dict: unknown
		// Clear background jobs. Only sysadmins.
	}
]

export type JobCancel = [
	'job_cancel',
	{
		context: unknown
		data_dict: unknown
		// Cancel a background job. Only sysadmins.
	}
]

export type ApiTokenRevoke = [
	'api_token_revoke',
	{
		context: unknown
		data_dict: unknown // must contain jti
		// Delete token.
	}
]

// Union of all types
export type CkanDeleteAuth =
	| UserDelete
	| PackageDelete
	| DatasetPurge
	| ResourceDelete
	| ResourceViewDelete
	| ResourceViewClear
	| PackageRelationshipDelete
	| GroupDelete
	| GroupPurge
	| OrganizationPurge
	| OrganizationDelete
	| TaskStatusDelete
	| VocabularyDelete
	| TagDelete
	| GroupMemberDelete
	| OrganizationMemberDelete
	| MemberDelete
	| PackageCollaboratorDelete
	| JobClear
	| JobCancel
	| ApiTokenRevoke

export type Sysadmin = [
	'sysadmin',
	{
		context: unknown
		data_dict: unknown
		// This is a pseudo check if we are a sysadmin all checks are true
	}
]

export type PackageSearch = [
	'package_search',
	{
		context: unknown
		data_dict: unknown
		// Everyone can search by default
	}
]

export type PackageList = [
	'package_list',
	{
		context: unknown
		data_dict: unknown
		// List of all active packages are visible by default
	}
]

export type CurrentPackageListWithResources = [
	'current_package_list_with_resources',
	{
		context: unknown
		data_dict: unknown
	}
]

export type GroupList = [
	'group_list',
	{
		context: unknown
		data_dict: unknown
		// List of all active groups is visible by default
	}
]

export type GroupListAuthz = [
	'group_list_authz',
	{
		context: unknown
		data_dict: unknown
	}
]

export type GroupListAvailable = [
	'group_list_available',
	{
		context: unknown
		data_dict: unknown
	}
]

export type OrganizationList = [
	'organization_list',
	{
		context: unknown
		data_dict: unknown
		// List of all active organizations are visible by default
	}
]

export type OrganizationListForUser = [
	'organization_list_for_user',
	{
		context: unknown
		data_dict: unknown
	}
]

export type LicenseList = [
	'license_list',
	{
		context: unknown
		data_dict: unknown
		// Licenses list is visible by default
	}
]

export type VocabularyList = [
	'vocabulary_list',
	{
		context: unknown
		data_dict: unknown
		// List of all vocabularies are visible by default
	}
]

export type TagList = [
	'tag_list',
	{
		context: unknown
		data_dict: unknown
		// Tags list is visible by default
	}
]

export type UserList = [
	'user_list',
	{
		context: unknown
		data_dict: unknown
		// Users list is visible by default
		// only sysadmins can specify the 'email' parameter
	}
]

export type PackageRelationshipsList = [
	'package_relationships_list',
	{
		context: unknown
		data_dict: unknown
		// If we can see each package we can see the relationships
		// id: string, id2?: string
	}
]

export type PackageShow = [
	'package_show',
	{
		context: unknown
		data_dict: unknown
	}
]

export type ResourceShow = [
	'resource_show',
	{
		context: unknown
		data_dict: unknown
		// check authentication against package
	}
]

export type ResourceViewShow = [
	'resource_view_show',
	{
		context: unknown
		data_dict: unknown // must contain id
	}
]

export type ResourceViewList = [
	'resource_view_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type GroupShow = [
	'group_show',
	{
		context: unknown
		data_dict: unknown
		// include_users?: boolean, object_type?: string
	}
]

export type OrganizationShow = [
	'organization_show',
	{
		context: unknown
		data_dict: unknown
	}
]

export type VocabularyShow = [
	'vocabulary_show',
	{
		context: unknown
		data_dict: unknown
		// Allow viewing of vocabs by default
	}
]

export type TagShow = [
	'tag_show',
	{
		context: unknown
		data_dict: unknown
		// No authz check in the logic function
	}
]

export type UserShow = [
	'user_show',
	{
		context: unknown
		data_dict: unknown
		// By default, user details can be read by unknown, but some properties like the API key are stripped at the action level if not not logged in.
	}
]

export type PackageAutocomplete = [
	'package_autocomplete',
	{
		context: unknown
		data_dict: unknown
	}
]

export type GroupAutocomplete = [
	'group_autocomplete',
	{
		context: unknown
		data_dict: unknown
	}
]

export type OrganizationAutocomplete = [
	'organization_autocomplete',
	{
		context: unknown
		data_dict: unknown
	}
]

export type TagAutocomplete = [
	'tag_autocomplete',
	{
		context: unknown
		data_dict: unknown
	}
]

export type UserAutocomplete = [
	'user_autocomplete',
	{
		context: unknown
		data_dict: unknown
	}
]

export type FormatAutocomplete = [
	'format_autocomplete',
	{
		context: unknown
		data_dict: unknown
	}
]

export type TaskStatusShow = [
	'task_status_show',
	{
		context: unknown
		data_dict: unknown
	}
]

export type GetSiteUser = [
	'get_site_user',
	{
		context: unknown
		data_dict: unknown
		// FIXME this is available to sysadmins currently till @auth_sysadmins_check decorator is added
	}
]

export type MemberRolesList = [
	'member_roles_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type UserFollowerList = [
	'user_follower_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type DatasetFollowerList = [
	'dataset_follower_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type GroupFollowerList = [
	'group_follower_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type OrganizationFollowerList = [
	'organization_follower_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type FolloweeList = [
	'followee_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type UserFolloweeList = [
	'user_followee_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type DatasetFolloweeList = [
	'dataset_followee_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type GroupFolloweeList = [
	'group_followee_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type OrganizationFolloweeList = [
	'organization_followee_list',
	{
		context: unknown
		data_dict: unknown
	}
]

export type UserReset = [
	'user_reset',
	{
		context: unknown
		data_dict: unknown
	}
]

export type RequestReset = [
	'request_reset',
	{
		context: unknown
		data_dict: unknown
	}
]

export type HelpShow = [
	'help_show',
	{
		context: unknown
		data_dict: unknown
	}
]

export type ConfigOptionShow = [
	'config_option_show',
	{
		context: unknown
		data_dict: unknown
		// Show runtime-editable configuration option. Only sysadmins.
	}
]

export type ConfigOptionList = [
	'config_option_list',
	{
		context: unknown
		data_dict: unknown
		// List runtime-editable configuration options. Only sysadmins.
	}
]

export type JobList = [
	'job_list',
	{
		context: unknown
		data_dict: unknown
		// List background jobs. Only sysadmins.
	}
]

export type JobShow = [
	'job_show',
	{
		context: unknown
		data_dict: unknown
		// Show background job. Only sysadmins.
	}
]

export type ApiTokenList = [
	'api_token_list',
	{
		context: unknown
		data_dict: unknown
		// List all available tokens for current user.
		// user_id?: string, user?: string
	}
]

export type PackageCollaboratorList = [
	'package_collaborator_list',
	{
		context: unknown
		data_dict: unknown
		// Checks if a user is allowed to list the collaborators from a dataset
	}
]

export type PackageCollaboratorListForUser = [
	'package_collaborator_list_for_user',
	{
		context: unknown
		data_dict: unknown
		// Checks if a user is allowed to list all datasets a user is a collaborator in
	}
]

export type StatusShow = [
	'status_show',
	{
		context: unknown
		data_dict: unknown
		// Show information about the site's configuration. Visible to all by default.
	}
]

export type DatasetFolloweeCount = [
	'dataset_followee_count',
	{
		context: unknown
		data_dict: unknown
		// Check if the number of datasets followed by a user are visible. Visible to all by default.
	}
]

export type GroupFolloweeCount = [
	'group_followee_count',
	{
		context: unknown
		data_dict: unknown
		// Check if the number of groups followed by a user are visible. Visible to all by default.
	}
]

export type OrganizationFolloweeCount = [
	'organization_followee_count',
	{
		context: unknown
		data_dict: unknown
		// Check if the number of organizations followed by a user are visible. Visible to all by default.
	}
]

export type UserFolloweeCount = [
	'user_followee_count',
	{
		context: unknown
		data_dict: unknown
		// Check if the number of users followed by a user are visible. Visible to all by default.
	}
]

export type FolloweeCount = [
	'followee_count',
	{
		context: unknown
		data_dict: unknown
		// Check if the number of objects (of unknown type) followed by a user are visible. Visible to all by default.
	}
]

export type DatasetFollowerCount = [
	'dataset_follower_count',
	{
		context: unknown
		data_dict: unknown
		// Check if the number of followers of a dataset are visible. Visible to all by default.
	}
]

export type GroupFollowerCount = [
	'group_follower_count',
	{
		context: unknown
		data_dict: unknown
		// Check if the number of followers of a group are visible. Visible to all by default.
	}
]

export type OrganizationFollowerCount = [
	'organization_follower_count',
	{
		context: unknown
		data_dict: unknown
		// Check if the number of followers of an organization are visible. Visible to all by default.
	}
]

export type UserFollowerCount = [
	'user_follower_count',
	{
		context: unknown
		data_dict: unknown
		// Check if the number of followers of a user are visible. Visible to all by default.
	}
]

export type AmFollowingDataset = [
	'am_following_dataset',
	{
		context: unknown
		data_dict: unknown
		// Check if the information about following a dataset is visible. Visible to all by default.
	}
]

export type AmFollowingGroup = [
	'am_following_group',
	{
		context: unknown
		data_dict: unknown
		// Check if the information about following a group is visible. Visible to all by default.
	}
]

export type AmFollowingUser = [
	'am_following_user',
	{
		context: unknown
		data_dict: unknown
		// Check if the information about following a user is visible. Visible to all by default.
	}
]

export type GroupPackageShow = [
	'group_package_show',
	{
		context: unknown
		data_dict: unknown
		// Check if the set of datasets belonging to a group is visible. Visible to all by default.
	}
]

export type MemberList = [
	'member_list',
	{
		context: unknown
		data_dict: unknown
		// Check if the members of a given group are visible. Visible to all by default.
	}
]

export type ResourceSearch = [
	'resource_search',
	{
		context: unknown
		data_dict: unknown
		// Check if resource search is allowed. Allowed for all by default.
	}
]

export type TagSearch = [
	'tag_search',
	{
		context: unknown
		data_dict: unknown
		// Check if tag search is allowed. Allowed for all by default.
	}
]

export type TermTranslationShow = [
	'term_translation_show',
	{
		context: unknown
		data_dict: unknown
		// Check if the translations for the given term(s) and language(s) are visible. Visible to all by default.
	}
]

// Union of all types
export type CkanGetAuth =
	| Sysadmin
	| PackageSearch
	| PackageList
	| CurrentPackageListWithResources
	| GroupList
	| GroupListAuthz
	| GroupListAvailable
	| OrganizationList
	| OrganizationListForUser
	| LicenseList
	| VocabularyList
	| TagList
	| UserList
	| PackageRelationshipsList
	| PackageShow
	| ResourceShow
	| ResourceViewShow
	| ResourceViewList
	| GroupShow
	| OrganizationShow
	| VocabularyShow
	| TagShow
	| UserShow
	| PackageAutocomplete
	| GroupAutocomplete
	| OrganizationAutocomplete
	| TagAutocomplete
	| UserAutocomplete
	| FormatAutocomplete
	| TaskStatusShow
	| GetSiteUser
	| MemberRolesList
	| UserFollowerList
	| DatasetFollowerList
	| GroupFollowerList
	| OrganizationFollowerList
	| FolloweeList
	| UserFolloweeList
	| DatasetFolloweeList
	| GroupFolloweeList
	| OrganizationFolloweeList
	| UserReset
	| RequestReset
	| HelpShow
	| ConfigOptionShow
	| ConfigOptionList
	| JobList
	| JobShow
	| ApiTokenList
	| PackageCollaboratorList
	| PackageCollaboratorListForUser
	| StatusShow
	| DatasetFolloweeCount
	| GroupFolloweeCount
	| OrganizationFolloweeCount
	| UserFolloweeCount
	| FolloweeCount
	| DatasetFollowerCount
	| GroupFollowerCount
	| OrganizationFollowerCount
	| UserFollowerCount
	| AmFollowingDataset
	| AmFollowingGroup
	| AmFollowingUser
	| GroupPackageShow
	| MemberList
	| ResourceSearch
	| TagSearch
	| TermTranslationShow

export type PackagePatch = [
	'package_patch',
	{
		context: unknown // CKAN Context
		data_dict: unknown // CKAN DataDict
	}
]

export type ResourcePatch = [
	'resource_patch',
	{
		context: unknown
		data_dict: unknown
	}
]

export type GroupPatch = [
	'group_patch',
	{
		context: unknown
		data_dict: unknown
	}
]

export type OrganizationPatch = [
	'organization_patch',
	{
		context: unknown
		data_dict: unknown
	}
]

export type UserPatch = [
	'user_patch',
	{
		context: unknown
		data_dict: unknown
	}
]

export type CkanPatchAuth =
	| PackagePatch
	| ResourcePatch
	| GroupPatch
	| OrganizationPatch
	| UserPatch

type PackageUpdate = [
	'package_update',
	{
		// context: Context
		// data_dict: DataDict
		// user: string
		// package: object
		// if there is an owner org then we must have update_dataset permission for that organization
		// If dataset is not owned then we can edit if config permissions allow
		// if org-level auth failed, check dataset-level auth (ie if user is a collaborator)
	}
]

type PackageRevise = [
	'package_revise',
	{
		// context: Context
		// data_dict: DataDict
	}
]

type PackageResourceReorder = [
	'package_resource_reorder',
	{
		// context: Context
		// data_dict: DataDict
		// the action function runs package update so no need to run it twice
	}
]

type ResourceUpdate = [
	'resource_update',
	{
		// context: Context
		// data_dict: DataDict
		// user: string
		// resource: object
		// check authentication against package
	}
]

type ResourceViewUpdate = [
	'resource_view_update',
	{
		// context: Context
		// data_dict: DataDict
		// id: string // data_dict['resource_id']
	}
]

type ResourceViewReorder = [
	'resource_view_reorder',
	{
		// context: Context
		// data_dict: DataDict
		// id: string // data_dict['resource_id']
	}
]

type PackageRelationshipUpdate = [
	'package_relationship_update',
	{
		// context: Context
		// data_dict: DataDict
	}
]

type PackageChangeState = [
	'package_change_state',
	{
		// context: Context
		// data_dict: DataDict
		// user: string
		// package: object
		// use the logic for package_update
	}
]

type GroupUpdate = [
	'group_update',
	{
		// context: Context
		// data_dict: DataDict
		// group: object
		// user: string
	}
]

type OrganizationUpdate = [
	'organization_update',
	{
		// context: Context
		// data_dict: DataDict
		// group: object
		// user: string
	}
]

type GroupChangeState = [
	'group_change_state',
	{
		// context: Context
		// data_dict: DataDict
		// user: string
		// group: object
		// use logic for group_update
	}
]

type GroupEditPermissions = [
	'group_edit_permissions',
	{
		// context: Context
		// data_dict: DataDict
		// user: string
		// group: object
	}
]

type UserUpdate = [
	'user_update',
	{
		// context: Context
		// data_dict: DataDict
		// user: string
		// user_obj: object
		// If the user has a valid reset_key in the db, and that same reset key has been posted in the data_dict, we allow the user to update her account without using her password or API key.
		// Allow users to update their own user accounts.
		// Don't allow users to update other users' accounts.
	}
]

type TaskStatusUpdate = [
	'task_status_update',
	{
		// context: Context
		// data_dict: DataDict
		// sysadmins only
		// user: string
	}
]

type VocabularyUpdate = [
	'vocabulary_update',
	{
		// context: Context
		// data_dict: DataDict
		// sysadmins only
	}
]

type TermTranslationUpdate = [
	'term_translation_update',
	{
		// context: Context
		// data_dict: DataDict
		// sysadmins only
		// user: string
	}
]

type PackageOwnerOrgUpdate = [
	'package_owner_org_update',
	{
		// context: Context
		// data_dict: DataDict
		// sysadmins only
	}
]

type BulkUpdatePrivate = [
	'bulk_update_private',
	{
		// context: Context
		// data_dict: DataDict
		// org_id: string
		// user: string
	}
]

type BulkUpdatePublic = [
	'bulk_update_public',
	{
		// context: Context
		// data_dict: DataDict
		// org_id: string
		// user: string
	}
]

type BulkUpdateDelete = [
	'bulk_update_delete',
	{
		// context: Context
		// data_dict: DataDict
		// org_id: string
		// user: string
	}
]

type ConfigOptionUpdate = [
	'config_option_update',
	{
		// context: Context
		// data_dict: DataDict
		// Update the runtime-editable configuration options
		// Only sysadmins can do it
	}
]

// Union type of all function types
type CkanUpdateAuth =
	| PackageUpdate
	| PackageRevise
	| PackageResourceReorder
	| ResourceUpdate
	| ResourceViewUpdate
	| ResourceViewReorder
	| PackageRelationshipUpdate
	| PackageChangeState
	| GroupUpdate
	| OrganizationUpdate
	| GroupChangeState
	| GroupEditPermissions
	| UserUpdate
	| TaskStatusUpdate
	| VocabularyUpdate
	| TermTranslationUpdate
	| PackageOwnerOrgUpdate
	| BulkUpdatePrivate
	| BulkUpdatePublic
	| BulkUpdateDelete
	| ConfigOptionUpdate
