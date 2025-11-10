import { env } from '$env/dynamic/private'
import {
	BlobServiceClient,
	newPipeline,
	BlobSASPermissions,
	generateBlobSASQueryParameters,
	StorageSharedKeyCredential,
	type BlobItem
} from '@azure/storage-blob'
const ONE_MEGABYTE = 1024 * 1024
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 }
const ONE_MINUTE = 60 * 1000

const getBlobName = (str: string) => {
	// Use a random number to generate a unique file name,
	// removing "0." from the start of the string.
	const identifier = Math.random().toString().replace(/0\./, '')
	return `${identifier}-${str}`
}

export const loadStorageClient = (): { client: BlobServiceClient; container_name: string } => {
	const sharedKeyCredential = new StorageSharedKeyCredential(
		env.STORAGE_AZURE_ACCOUNT_NAME,
		env.STORAGE_AZURE_ACCOUNT_KEY
	)
	const pipeline = newPipeline(sharedKeyCredential)
	return {
		client: new BlobServiceClient(
			`https://${env.STORAGE_AZURE_ACCOUNT_NAME}.blob.core.windows.net`,
			pipeline
		),
		container_name: env.STORAGE_AZURE_CONTAINER
	}
}

export const getFiles = async ({
	client,
	container_name
}: {
	client: BlobServiceClient
	container_name: string
}) => {
	try {
		const container_client = client.getContainerClient(container_name)
		const list_blobs = container_client.listBlobsFlat()
		const blobs: Partial<BlobItem>[] = []
		for await (const blob of list_blobs) {
			blobs.push({ name: blob.name, properties: blob.properties, metadata: blob.metadata })
			console.log(`Blob: ${blob.name}`)
		}
		return {
			blobs,
			container_name
		}
	} catch (err) {
		console.log(err)
		return {
			blobs: [],
			container_name
		}
	}
}

export function createSASReadString({
	container_name,
	duration = 5,
	client
}: {
	duration?: number
	client: BlobServiceClient
	container_name: string
}) {
	const permissions = new BlobSASPermissions()
	permissions.read = true

	const now = new Date()
	const expiry_datetime = new Date(now.setMinutes(now.getMinutes() + duration))
	const blob_sas = {
		containerName: container_name,
		permissions,
		expiresOn: expiry_datetime
	}
	if ('accountName' in client.credential) {
		return generateBlobSASQueryParameters(blob_sas, client.credential)
	}
}

export function getSignedDownloadUrl({
	client,
	container_name,
	filename
}: {
	client: BlobServiceClient
	container_name: string
	filename: string
}) {
	const container_client = client.getContainerClient(container_name)
	const blob_client = container_client.getBlockBlobClient(filename)
	return blob_client.url + '?' + createSASReadString({ client, container_name })
}

export async function getSignedUploadUrl({
	filename,
	client,
	container_name,
	duration = 5
}: {
	client: BlobServiceClient
	container_name: string
	filename: string
	duration?: number
}) {
	const permissions = new BlobSASPermissions()
	permissions.write = true

	const now = new Date()
	const expiry_datetime = new Date(now.setMinutes(now.getMinutes() + duration))
	const blob_sas = {
		containerName: container_name,
		permissions,
		expiresOn: expiry_datetime
	}
	const container_client = client.getContainerClient(container_name)
	const blob_client = container_client.getBlockBlobClient(filename)
	return await blob_client.generateSasUrl(blob_sas)
}

export async function deleteBlob({
	filename,
	client,
	container_name
}: {
	client: BlobServiceClient
	container_name: string
	filename: string
}) {
	const container_client = client.getContainerClient(container_name)
	const blob_client = container_client.getBlockBlobClient(filename)
	const res = await blob_client.deleteIfExists({ deleteSnapshots: 'include' })
	return res
}

export function cleanResourceURL({
	url
}: {
	url?: string
}): { valid: true; url: URL } | { valid: false } {
	if (!url) {
		return { valid: false }
	}
	const _url = new URL(url)
	_url.search = ''
	return { valid: true, url: _url }
}

export function resourceIdFromURL({
	url
}: {
	url?: string
}): { valid: true; id: string } | { valid: false } {
	const clean_url = cleanResourceURL({ url })
	if (!clean_url.valid) {
		return { valid: false }
	}
	if (clean_url.url.hostname !== `${env.STORAGE_AZURE_ACCOUNT_NAME}.blob.core.windows.net`) {
		return { valid: false }
	}
	const pathname = clean_url.url.pathname.split('/')
	if (pathname.length !== 3) {
		return { valid: false }
	}
	return { valid: true, id: pathname[2] }
}

// const uploadFile = async ({file}: {file: File}) => {
// 	const blobName = getBlobName(file.name)
// const stream = Readable.toWeb(createReadStream(file_path)) as BodyInit
//
// 	const containerClient = blobServiceClient.getContainerClient(containerName2)
// 	const blockBlobClient = containerClient.getBlockBlobClient(blobName)
//
// 	try {
// 		await blockBlobClient.uploadStream(stream, uploadOptions.bufferSize, uploadOptions.maxBuffers, {
// 			blobHTTPHeaders: { blobContentType: 'image/jpeg' }
// 		})
// 		res.render('success', { message: 'File uploaded to Azure Blob storage.' })
// 	} catch (err) {
// 		res.render('error', { message: err.message })
// 	}
// }
