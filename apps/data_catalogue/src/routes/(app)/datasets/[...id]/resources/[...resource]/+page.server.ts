import { SERVER_ERRORS } from '$lib/globals/server.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { getFields } from '@imago/ui'
import { error } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	const data = await locals.ckan.request(get('resource_show', { id: params.resource }))

	if (Array.isArray(data.result) || !data.result || !data.success) {
		return error(...SERVER_ERRORS[404])
	}
	const result = getFields(data.result, [
		'format',
		'id',
		'mimetype',
		'mimetype_inner',
		'name',
		'package_id',
		'last_modified',
		'hash',
		'download_url',
		'description',
		'state',
		'size',
		'created',
		'url'
	])
	// if (!locals.session) {
	// const client = loadStorageClient()
	// result.url = getSignedDownloadUrl({ ...client, filename: result.id })
	// result.download_url = getSignedDownloadUrl({ ...client, filename: result.id })
	// }
	return { data: { ...data, result } }
}

//  cache_last_updated: null,
//     cache_url: null,
//     created: '2017-07-13T07:32:13.970143',
//     datastore_active: false,
//     description: 'ESRI Shapefile',
//     download_url: 'https://s3.dualstack.us-east-1.amazonaws.com/production-raw-data-api/ISO3/BDI/roads/lines/hotosm_bdi_roads_lines_shp.zip',
//     format: 'SHP',
//     hash: '"78b45beee4bc336094964642f0464e3c-6"',
//     hdx_rel_url: 'https://s3.dualstack.us-east-1.amazonaws.com/production-raw-data-api/ISO3/BDI/roads/lines/hotosm_bdi_roads_lines_shp.zip',
//     id: 'e63d0e3d-5b0c-43ac-89f1-03178f3e3ee8',
//     last_modifed: '2024-04-05T18:04:26.576156',
//     last_modified: '2025-11-03T17:07:06.059706',
//     metadata_modified: '2025-11-03T17:10:37.967887',
//     microdata: false,
//     mimetype: null,
//     mimetype_inner: null,
//     name: 'hotosm_bdi_roads_lines_shp.zip',
//     package_id: 'e5483c2f-7bb1-4909-8989-3037b54b60c3',
//     position: 0,
//     resource_type: 'api',
//     shape_info: '[{"state": "processing", "message": "The processing of the geo-preview has started", "layer_id": "None", "error_type": "None", "error_class": "None", "timestamp": "2025-08-01T14:06:07.232469"}, {"state": "success", "message": "Import successful", "layer_id": "pre_e63d0e3d_5b0c_43ac_
// 89f1_03178f3e3ee8", "error_type": "None", "error_class": "None", "bounding_box": "BOX(28.9988681 -4.4676264,30.8844888 -2.319611)", "layer_fields": [{"field_name": "ogc_fid", "data_type": "integer"}, {"field_name": "name", "data_type": "character varying"}, {"field_name": "name_en", "data_type": "ch
// aracter varying"}, {"field_name": "highway", "data_type": "character varying"}, {"field_name": "surface", "data_type": "character varying"}, {"field_name": "smoothness", "data_type": "character varying"}, {"field_name": "width", "data_type": "character varying"}, {"field_name": "lanes", "data_type":
//  "character varying"}, {"field_name": "oneway", "data_type": "character varying"}, {"field_name": "bridge", "data_type": "character varying"}, {"field_name": "layer", "data_type": "character varying"}, {"field_name": "source", "data_type": "character varying"}, {"field_name": "name_fr", "data_type":
//  "character varying"}, {"field_name": "name_rn", "data_type": "character varying"}, {"field_name": "osm_id", "data_type": "numeric"}, {"field_name": "osm_type", "data_type": "character varying"}, {"field_name": "wkb_geometry", "data_type": "USER-DEFINED"}], "timestamp": "2025-08-01T14:13:23.594951"}
// , {"state": "processing", "message": "The processing of the geo-preview has started", "layer_id": "None", "error_type": "None", "error_class": "None", "timestamp": "2025-09-02T17:34:34.874605"}, {"state": "success", "message": "Import successful", "layer_id": "pre_e63d0e3d_5b0c_43ac_89f1_03178f3e3ee
// 8", "error_type": "None", "error_class": "None", "bounding_box": "BOX(28.9988681 -4.4676264,30.8844888 -2.319611)", "layer_fields": [{"field_name": "ogc_fid", "data_type": "integer"}, {"field_name": "name", "data_type": "character varying"}, {"field_name": "name_en", "data_type": "character varying"
// }, {"field_name": "highway", "data_type": "character varying"}, {"field_name": "surface", "data_type": "character varying"}, {"field_name": "smoothness", "data_type": "character varying"}, {"field_name": "width", "data_type": "character varying"}, {"field_name": "lanes", "data_type": "character vary
// ing"}, {"field_name": "oneway", "data_type": "character varying"}, {"field_name": "bridge", "data_type": "character varying"}, {"field_name": "layer", "data_type": "character varying"}, {"field_name": "source", "data_type": "character varying"}, {"field_name": "name_fr", "data_type": "character vary
// ing"}, {"field_name": "name_rn", "data_type": "character varying"}, {"field_name": "osm_id", "data_type": "numeric"}, {"field_name": "osm_type", "data_type": "character varying"}, {"field_name": "wkb_geometry", "data_type": "USER-DEFINED"}], "timestamp": "2025-09-02T17:35:40.522085"}, {"state": "pro
// cessing", "message": "The processing of the geo-preview has started", "layer_id": "None", "error_type": "None", "error_class": "None", "timestamp": "2025-09-05T03:53:19.848669"}, {"state": "success", "message": "Import successful", "layer_id": "pre_e63d0e3d_5b0c_43ac_89f1_03178f3e3ee8", "error_type"
// : "None", "error_class": "None", "bounding_box": "BOX(28.9988681 -4.4676264,30.8844888 -2.319611)", "layer_fields": [{"field_name": "ogc_fid", "data_type": "integer"}, {"field_name": "name", "data_type": "character varying"}, {"field_name": "name_en", "data_type": "character varying"}, {"field_name"
// : "highway", "data_type": "character varying"}, {"field_name": "surface", "data_type": "character varying"}, {"field_name": "smoothness", "data_type": "character varying"}, {"field_name": "width", "data_type": "character varying"}, {"field_name": "lanes", "data_type": "character varying"}, {"field_n
// ame": "oneway", "data_type": "character varying"}, {"field_name": "bridge", "data_type": "character varying"}, {"field_name": "layer", "data_type": "character varying"}, {"field_name": "source", "data_type": "character varying"}, {"field_name": "name_fr", "data_type": "character varying"}, {"field_n
// ame": "name_rn", "data_type": "character varying"}, {"field_name": "osm_id", "data_type": "numeric"}, {"field_name": "osm_type", "data_type": "character varying"}, {"field_name": "wkb_geometry", "data_type": "USER-DEFINED"}], "timestamp": "2025-09-05T04:03:56.349982"}, {"state": "processing", "messa
// ge": "The processing of the geo-preview has started", "layer_id": "None", "error_type": "None", "error_class": "None", "timestamp": "2025-10-01T08:46:24.378166"}, {"state": "success", "message": "Import successful", "layer_id": "pre_e63d0e3d_5b0c_43ac_89f1_03178f3e3ee8", "error_type": "None", "error
// _class": "None", "bounding_box": "BOX(28.9988681 -4.4676264,30.8844888 -2.319611)", "layer_fields": [{"field_name": "ogc_fid", "data_type": "integer"}, {"field_name": "name", "data_type": "character varying"}, {"field_name": "name_en", "data_type": "character varying"}, {"field_name": "highway", "da
// ta_type": "character varying"}, {"field_name": "surface", "data_type": "character varying"}, {"field_name": "smoothness", "data_type": "character varying"}, {"field_name": "width", "data_type": "character varying"}, {"field_name": "lanes", "data_type": "character varying"}, {"field_name": "oneway",
// "data_type": "character varying"}, {"field_name": "bridge", "data_type": "character varying"}, {"field_name": "layer", "data_type": "character varying"}, {"field_name": "source", "data_type": "character varying"}, {"field_name": "name_fr", "data_type": "character varying"}, {"field_name": "name_rn",
//  "data_type": "character varying"}, {"field_name": "osm_id", "data_type": "numeric"}, {"field_name": "osm_type", "data_type": "character varying"}, {"field_name": "wkb_geometry", "data_type": "USER-DEFINED"}], "timestamp": "2025-10-01T08:49:04.468795"}, {"state": "processing", "message": "The proces
// sing of the geo-preview has started", "layer_id": "None", "error_type": "None", "error_class": "None", "timestamp": "2025-11-03T17:07:06.315450"}, {"state": "success", "message": "Import successful", "layer_id": "pre_e63d0e3d_5b0c_43ac_89f1_03178f3e3ee8", "error_type": "None", "error_class": "None",
//  "bounding_box": "BOX(28.9988681 -4.4676264,30.8844888 -2.319611)", "layer_fields": [{"field_name": "ogc_fid", "data_type": "integer"}, {"field_name": "name", "data_type": "character varying"}, {"field_name": "name_en", "data_type": "character varying"}, {"field_name": "highway", "data_type": "chara
// cter varying"}, {"field_name": "surface", "data_type": "character varying"}, {"field_name": "smoothness", "data_type": "character varying"}, {"field_name": "width", "data_type": "character varying"}, {"field_name": "lanes", "data_type": "character varying"}, {"field_name": "oneway", "data_type": "ch
// aracter varying"}, {"field_name": "bridge", "data_type": "character varying"}, {"field_name": "layer", "data_type": "character varying"}, {"field_name": "source", "data_type": "character varying"}, {"field_name": "name_fr", "data_type": "character varying"}, {"field_name": "name_rn", "data_type": "c
// haracter varying"}, {"field_name": "osm_id", "data_type": "numeric"}, {"field_name": "osm_type", "data_type": "character varying"}, {"field_name": "wkb_geometry", "data_type": "USER-DEFINED"}], "timestamp": "2025-11-03T17:10:37.591740"}]',
//     size: 48554170,
//     state: 'active',
//     url: 'https://s3.dualstack.us-east-1.amazonaws.com/production-raw-data-api/ISO3/BDI/roads/lines/hotosm_bdi_roads_lines_shp.zip',
//     url_type: 'api'
//   }
