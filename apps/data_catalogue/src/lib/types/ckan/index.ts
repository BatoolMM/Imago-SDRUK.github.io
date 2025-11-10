export type CkanTag = {
	display_name: string
	id: string
	name: string
	state: 'active' | 'draft'
	vocabulary_id: string | null
}

export type CkanResource = {
	cache_last_updated?: string | null
	cache_url?: string | null
	created: string
	datastore_active: false
	description: string
	format: string
	hash: string
	id: string
	last_modified?: string | null
	metadata_modified: string
	mimetype?: string | null
	mimetype_inner?: string | null
	name: string
	package_id: string
	position: 0
	resource_type?: string | null
	size?: string | null
	state: string
	url?: string
	url_type: string
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
