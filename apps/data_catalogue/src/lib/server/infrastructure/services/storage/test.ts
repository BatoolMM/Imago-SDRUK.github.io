import type { IStorageService } from '$lib/server/application/services/storage'
import { ok } from '$lib/server/entities/errors'

export const getUploadUrl: IStorageService['getUploadUrl'] = async () => {
	return ok('')
}

export const getDownloadUrl: IStorageService['getDownloadUrl'] = async () => {
	return ok('')
}

export const deleteFile: IStorageService['deleteFile'] = async () => {
	return ok(true)
}

export const testIStorageServiceInfrastructure: IStorageService = {
	getDownloadUrl,
	getUploadUrl,
	deleteFile
}
