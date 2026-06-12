export type Session = {
	id: string
	identity: {
		id: string
		first_name: string
		last_name: string
		email: string
	}
	active: boolean
	expires_at: string
	verified: boolean
	redirect_browser_to?: string
}

declare const IdentityStateEnum: {
	readonly Active: 'active'
	readonly Inactive: 'inactive'
	readonly UnknownDefaultOpenApi: '11184809'
}

type IdentityStateEnum = (typeof IdentityStateEnum)[keyof typeof IdentityStateEnum]

declare const IdentityCredentialsTypeEnum: {
	readonly Password: 'password'
	readonly Oidc: 'oidc'
	readonly Totp: 'totp'
	readonly LookupSecret: 'lookup_secret'
	readonly Webauthn: 'webauthn'
	readonly Code: 'code'
	readonly Passkey: 'passkey'
	readonly Profile: 'profile'
	readonly Saml: 'saml'
	readonly Deviceauthn: 'deviceauthn'
	readonly LinkRecovery: 'link_recovery'
	readonly CodeRecovery: 'code_recovery'
	readonly UnknownDefaultOpenApi: '11184809'
}
type IdentityCredentialsTypeEnum =
	(typeof IdentityCredentialsTypeEnum)[keyof typeof IdentityCredentialsTypeEnum]

declare const VerifiableIdentityAddressViaEnum: {
	readonly Email: 'email'
	readonly Sms: 'sms'
	readonly UnknownDefaultOpenApi: '11184809'
}
type VerifiableIdentityAddressViaEnum =
	(typeof VerifiableIdentityAddressViaEnum)[keyof typeof VerifiableIdentityAddressViaEnum]

type RecoveryIdentityAddress = {
	break_glass_for_organization?: string | null
	created_at?: Date
	id?: string
	updated_at?: Date
	value: string
	via: string
}

type IdentityCredentials = {
	config?: object
	created_at?: Date
	identifiers?: string[]
	type?: IdentityCredentialsTypeEnum
	updated_at?: Date
	version?: number
}

type VerifiableIdentityAddress = {
	created_at?: Date
	id?: string
	status: string
	updated_at?: Date
	value: string
	verified: boolean
	verified_at?: Date
	via: VerifiableIdentityAddressViaEnum
}

export type Identity = {
	created_at?: Date
	credentials?: {
		[key: string]: IdentityCredentials
	}
	external_id?: string
	id: string
	metadata_admin?: object | null
	metadata_public?: object | null
	organization_id?: string | null
	recovery_addresses?: RecoveryIdentityAddress[]
	schema_id: string
	schema_url: string
	state?: IdentityStateEnum
	state_changed_at?: Date
	traits: {
		name: {
			first: string
			last: string
		}
		email: string
	}
	updated_at?: Date
	verifiable_addresses?: VerifiableIdentityAddress[]
}

interface IdentityWithCredentials {
	lookup_secret?: {
		config?: {
			codes: {
				code?: string
				used_at?: Date
			}[]
		}
	}
	oidc?: {
		config?: {
			providers?: {
				organization?: string | null
				provider: string
				subject: string
				use_auto_link?: boolean
			}[]
		}
	}
	passkey?: {
		config?: {
			credentials?: {
				added_at?: Date
				attestation?: {
					authenticator_data?: number[]
					client_dataJSON?: number[]
					client_data_hash?: number[]
					object?: number[]
					public_key_algorithm?: number
				}
				attestation_type?: string
				authenticator?: {
					aaguid?: number[]
					clone_warning?: boolean
					sign_count?: number
				}
				display_name?: string
				flags?: {
					backup_eligible?: boolean
					backup_state?: boolean
					user_present?: boolean
					user_verified?: boolean
				}
				id?: number[]
				is_passwordless?: boolean
				public_key?: number[]
				transport?: string[]
			}[]
			user_handle?: number[]
		}
	}
	password?: {
		config?: {
			hashed_password?: string
			password?: string
			use_password_migration_hook?: boolean
		}
	}
	saml?: {
		config?: {
			providers?: {
				organization?: string | null
				provider: string
				subject: string
			}[]
		}
	}
	totp?: {
		config?: {
			totp_url?: string
		}
	}
	webauthn?: {
		config?: {
			credentials?: {
				added_at?: Date
				attestation?: {
					authenticator_data?: number[]
					client_dataJSON?: number[]
					client_data_hash?: number[]
					object?: number[]
				}
				public_key_algorithm?: number
				attestation_type?: string
				authenticator?: {
					aaguid?: number[]
					clone_warning?: boolean
					sign_count?: number
				}
				display_name?: string
				flags?: {
					backup_eligible?: boolean
					backup_state?: boolean
					user_present?: boolean
					user_verified?: boolean
				}
				id?: number[]
				is_passwordless?: boolean
				public_key?: number[]
				transport?: string[]
			}[]
			user_handle?: number[]
		}
	}
}

declare const CreateIdentityBodyStateEnum: {
	readonly Active: 'active'
	readonly Inactive: 'inactive'
	readonly UnknownDefaultOpenApi: '11184809'
}
type CreateIdentityBodyStateEnum =
	(typeof CreateIdentityBodyStateEnum)[keyof typeof CreateIdentityBodyStateEnum]
export type CreateIdentityBody = {
	credentials?: IdentityWithCredentials
	external_id?: string
	metadata_admin?: unknown | null
	metadata_public?: unknown | null
	organization_id?: string | null
	recovery_addresses?: RecoveryIdentityAddress[]
	schema_id: string
	state?: CreateIdentityBodyStateEnum
	traits: {
		name: {
			first: string
			last: string
		}
		email: string
	}
	verifiable_addresses?: VerifiableIdentityAddress[]
}
