import type { Transaction } from '$lib/db'
import type { ErrTypes } from '$lib/server/entities/errors'
import type {
	IResourceServiceDto,
	IResourceServiceRequest
} from '$lib/server/entities/models/resources'

export type IResourceService = {
	getResource: ({ id }: { id: string }) => Promise<[ErrTypes, null] | [null, IResourceServiceDto]>
	getResources: ({
		id
	}: {
		id: string
		limit: number
		offset: number
	}) => Promise<[ErrTypes, null] | [null, IResourceServiceDto[]]>
	createResource: ({
		data
	}: {
		data: IResourceServiceRequest
		tx?: Transaction
	}) => Promise<[ErrTypes, null] | [null, IResourceServiceDto]>
	deleteResource: ({ id }: { id: string }) => Promise<[ErrTypes, null] | [null, null]>
}
