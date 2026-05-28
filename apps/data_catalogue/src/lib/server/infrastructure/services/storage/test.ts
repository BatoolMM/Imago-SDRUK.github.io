import type { IStorageService } from '$lib/server/application/services/storage'

export const getUploadUrl: IStorageService['getUploadUrl'] = async () => {
	return ''
}

export const getDownloadUrl: IStorageService['getDownloadUrl'] = async () => {
	return ''
}

export const deleteFile = async () => {
	return true
}

export const testIStorageServiceInfrastructure: IStorageService = {
	getDownloadUrl,
	getUploadUrl,
	deleteFile
}
