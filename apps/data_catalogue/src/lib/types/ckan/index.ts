export type CkanPing = {
	site_title: string
	site_description: string
	site_url: string
	error_emails_to: string
	locale_default: string
	extensions: string[]
	ckan_version: string
}

export type CkanTag = {
	display_name: string
	id: string
	name: string
	state: 'active' | 'draft'
	vocabulary_id: string | null
}

export type CkanResource = {
	id: string
	package_id: string
	last_modified?: string | null
	metadata_modified: string
	mimetype?: string | null
	mimetype_inner?: string | null
	name: string
	position: 0
	resource_type?: string | null
	size?: string | null
	state: string
	url?: string
	url_type: string
	cache_last_updated?: string | null
	cache_url?: string | null
	created: string
	datastore_active: false
	description: string
	format: string
	hash: string
}

// {
// 			id?: string
// 			package_id: string // id of package that the resource should be added to
// 			url: string // url of resource
// 			description?: string
// 			format?: string
// 			hash?: string
// 			name?: string
// 			resource_type?: string
// 			mimetype?: string
// 			mimetype_inner?: string
// 			cache_url?: string
// 			size?: number
// 			created?: string // iso date string
// 			last_modified?: string // iso date string
// 			cache_last_updated?: string // iso date string
// 			upload?: unknown // FieldStorage (needs multipart/form-data)
// 		}

export type CkanGroup = {
	approval_status: string
	created: string
	description: string
	display_name: string
	id: string
	image_display_url: string
	image_url: string
	is_organization: boolean
	name: string
	num_followers: number
	package_count: number
	state: string
	title: string
	type: string
}

export type CkanOrganisation = {
	id: string
	name: string
	title: string
	type: 'organization'
	description: string
	image_url: string
	created: string
	is_organization: boolean
	approval_status: string
	state: string
}

export type CkanDatasetRequest = {
	/**
	 * must be between 2 and 100 characters long and contain only lowercase alphanumeric characters, - and _
	 **/
	name: string
	/**
	 *  the title of the dataset (optional, default: same as name)
	 **/
	title?: string
	/**
	 * If true creates a private dataset
	 **/
	private?: boolean
	/**
	 *  the name of the dataset's author
	 **/
	author?: string
	/**
	 *  the email address of the dataset's author
	 **/
	author_email?: string
	/**
	 *  the name of the dataset's maintainer
	 **/
	maintainer?: string
	/**
	 *  the email address of the dataset's maintainer
	 **/
	maintainer_email?: string
	/**
	 *  the id of the dataset's license
	 **/
	license_id?: string
	/**
	 *  a description of the dataset
	 **/
	notes?: string
	/**
	 *  a URL for the dataset's source
	 **/
	url?: string
	/**
	 *  no longer than 100 characters
	 **/
	version?: string
	/**
	 *  the current state of the dataset, e.g. 'active' or 'deleted'
	 **/
	state?: string
	/**
	 *  the type of the dataset
	 **/
	type?: string
	/**
	 *  the dataset's resources
	 **/
	resources?: unknown[]
	/**
	 *  the dataset's tags
	 **/
	tags?: unknown[]
	/**
	 *  the dataset's extras (arbitrary key:value metadata)
	 **/
	extras?: { key: string; value: string }[]
	/**
	 *  private package data belonging to plugins
	 **/
	plugin_data?: Record<string, unknown>
	/**
	 *  relationship dictionaries
	 **/
	relationships_as_object?: unknown[]
	/**
	 *  relationship dictionaries
	 **/
	relationships_as_subject?: unknown[]
	/**
	 *  the groups to which the dataset belongs
	 **/
	groups?: { id?: string; name?: string }[]
	/**
	 *  the id of the dataset's owning organization
	 **/
	owner_org?: string
}

export type CkanDataset = {
	author?: string | null
	author_email?: string | null
	creator_user_id: string
	id: string
	isopen: boolean
	license_id?: string | null
	license_url?: string | null
	license_title?: string | null
	maintainer?: string | null
	maintainer_email?: string | null
	metadata_created: string
	metadata_modified: string
	name: string
	notes?: string | null
	num_resources?: number
	num_tags?: number
	organization: CkanOrganisation
	owner_org: string
	private: boolean
	state: string
	title: string
	type: string
	url?: string | null
	version?: string | null
	resources: CkanResource[]
	tags: CkanTag[]
	extras: { key: string; value: string }[]
	groups: []
	relationships_as_subject: []
	relationships_as_object: []
}

export type CkanDatastoreField = {
	id: string
	type: string
	info: {
		label: string
		notes: string
		type_override?: string
		table_name?: string
		propertyURL?: string
		keywords?: string
	}
	schema: {
		native_type: string
		notnull: boolean
		index_name: string | null
		is_index: boolean
		uniquekey: boolean
	}
}

export type CkanDatastoreMetadata = {
	id: string
	count: number
	table_type: string
	size: number
	db_size: number
	idx_size: number
	aliases: string[]
}

export type CkanDatastore = {
	meta: CkanDatastoreMetadata
	fields: CkanDatastoreField[]
}

export type CkanDatastoreCreate = {
	resource_id: string // resource id that the data is going to be stored against
	force?: boolean // set to True to edit a read-only table
	resource?: {
		package_id: string
	} // resource dictionary that is passed to resource_create(). Use instead of resource_id (optional)
	aliases?: string[] // names for read only aliases of the resource. (optional)
	fields?: CkanDatastoreField[] // fields/columns and their extra metadata. (optional)
	delete_fields?: boolean // set to True to remove existing fields not passed
	records?: { [key: string]: string }[] // the data, eg: [{“dob”: “2005”, “some_stuff”: [“a”, “b”]}] (optional)
	include_records?: boolean // return the full values of inserted records (optional, default: False)
	primary_key?: string[] // fields that represent a unique key (optional)
	indexes?: string[] // indexes on table (optional)
	triggers?: { function: string }[] // trigger functions to apply to this table on update/insert. functions may be created with datastore_function_create(). eg: [ {“function”: “trigger_clean_reference”}, {“function”: “trigger_check_codes”}]
	calculate_record_count?: boolean // updates the stored count of records, used to optimize datastore_search in combination with the total_estimation_threshold parameter. If doing a series of requests to change a resource, you only need to set this to True on the last request.
}
