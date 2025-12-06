import { integer, pgTable, uuid, text, index, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'
import { DateTime } from 'luxon'
import { users } from './users'

const status_enum = pgEnum('status_enum', ['published', 'archived', 'draft'])
const reuse = () => ({
	created_by: uuid()
		.references(() => users.id, { onDelete: 'no action' })
		.notNull(),
	updated_by: uuid()
		.references(() => users.id, { onDelete: 'no action' })
		.notNull(),
	status: status_enum().default('draft').notNull(),
	created_at: timestamp({
		mode: 'date',
		precision: 3,
		withTimezone: true
	})
		.defaultNow()
		.notNull(),
	updated_at: timestamp({
		mode: 'date',
		precision: 3,
		withTimezone: true
	})
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => DateTime.now().toBSON()),
	deleted_at: timestamp({
		mode: 'date',
		precision: 3,
		withTimezone: true
	})
		.defaultNow()
		.notNull()
})

export const resources = pgTable(
	'resources',
	{
		id: uuid().primaryKey().defaultRandom(),
		url: text().notNull().unique(),
		...reuse()
	},
	(table) => [
		index('resource_published_idx')
			.on(table.status)
			.where(sql`${table.status} = 'published'`)
	]
)

export const resource_versions = pgTable('resource_versions', {
	id: uuid().primaryKey().defaultRandom(),
	title: text().notNull(),
	downloads: integer().default(0).notNull(),
	url: text(),
	description: text(),
	changelog: text(),
	resource: uuid()
		.notNull()
		.references(() => resources.id),
	...reuse()
})

export const resources_resource_versions = relations(resources, ({ many }) => ({
	versions: many(resource_versions)
}))

export const resource_versions_resources = relations(resource_versions, ({ one }) => ({
	resource: one(resources, {
		fields: [resource_versions.resource],
		references: [resources.id]
	})
}))
