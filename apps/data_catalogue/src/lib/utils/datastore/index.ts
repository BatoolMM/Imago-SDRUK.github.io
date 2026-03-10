import type { CkanDatastore, CkanDatastoreCreate, CkanDatastoreField } from '$lib/types/ckan'
import type { CSVW, CSVWColumn, CSVWTable } from '$lib/types/csvw'

const SPLIT_CHAR = '@'

const handleColumnToFieldID = ({
	name,
	table,
	split
}: {
	name: string
	table: string
	split: string
}) => `${name}${split}${table}`

const handleFieldIDToColumnName = ({ id, split }: { id: string; split: string }) =>
	id.split(split)[0]

export const testCSVW: CSVW = {
	'@context': 'http://www.w3.org/ns/csvw',
	'@type': 'TableGroup',
	tables: [
		{
			'dc:title': 'table_1',
			keywords: '',
			tableSchema: {
				columns: [
					{
						name: 'column_1',
						dataType: 'text',
						description: '',
						title: '',
						propertyURL: ''
					},
					{
						name: 'column_2',
						dataType: 'text',
						description: '',
						title: '',
						propertyURL: ''
					}
				]
			}
		},
		{
			'dc:title': 'table_2',
			keywords: '',
			tableSchema: {
				columns: [
					{
						name: 'column_3',
						dataType: 'text',
						description: '',
						title: '',
						propertyURL: ''
					}
				]
			}
		}
	]
}

const CSVWColumnToDatastoreField = ({
	column,
	table,
	keywords
}: {
	column: CSVWColumn
	table: string
	keywords: string
}): CkanDatastoreField => ({
	id: handleColumnToFieldID({ name: column.name, table, split: SPLIT_CHAR }),
	type: column.dataType,
	info: {
		label: column.title,
		notes: column.description,
		propertyURL: column.propertyURL,
		table_name: table,
		keywords
	},
	schema: {
		native_type: column.dataType,
		notnull: false,
		index_name: null,
		is_index: false,
		uniquekey: false
	}
})

export function csvwToDatastore({
	id,
	csvw,
	force
}: {
	csvw: CSVW
	id: string
	force?: boolean
}): CkanDatastoreCreate[] {
	const columns = csvw.tables.map((table) => {
		const column: CkanDatastoreCreate['fields'] = table.tableSchema.columns.map((column) => {
			return CSVWColumnToDatastoreField({
				column,
				table: table['dc:title'],
				keywords: table.keywords
			})
		})
		return {
			resource_id: id,
			fields: column,
			force,
			filters: {
				title: table['dc:title'],
				keywords: table.keywords
			}
		}
	})
	return columns
}

const datastoreFieldToCSVWColumn = (field: CkanDatastoreField): CSVWColumn => ({
	name: handleFieldIDToColumnName({ id: field.id, split: SPLIT_CHAR }),
	dataType: field.type,
	description: field.info.notes,
	title: field.info.label,
	propertyURL: String(field.info.propertyURL)
})

export function datastoreToCsvw(datastore: CkanDatastore): CSVW {
	const tables = datastore.fields.reduce((acc, field) => {
		const table = field.info.table_name
		if (!table) {
			return acc
		}
		const table_index = acc.findIndex((t) => t['dc:title'] === field.info.table_name)
		if (table_index !== -1) {
			acc[table_index].tableSchema.columns.push(datastoreFieldToCSVWColumn(field))
			return acc
		}
		acc.push({
			'dc:title': table,
			keywords: '',
			tableSchema: {
				columns: [datastoreFieldToCSVWColumn(field)]
			}
		})
		return acc
	}, [] as CSVWTable[])
	return {
		'@context': 'http://www.w3.org/ns/csvw',
		'@type': 'TableGroup',
		tables
	}
}
