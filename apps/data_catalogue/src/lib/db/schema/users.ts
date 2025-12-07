import { pgTable, uuid, jsonb, index, pgEnum, timestamp } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { DateTime } from 'luxon'

export const user_status_enum = pgEnum('user_status_enum', [
	'preregister',
	'active',
	'archived',
	'draft',
	'suspended'
])

const timestamps = {
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
}

export const users = pgTable(
	'users',
	{
		id: uuid().primaryKey().defaultRandom(),
		preferences: jsonb('preferences').$type<{
			notifications: boolean
		}>(),
		status: user_status_enum().default('draft').notNull(),
		...timestamps
	},
	(table) => [
		index('users_active_idx')
			.on(table.id)
			.where(sql`${table.status} = 'active'`)
	]
)

// NOTE: this breaks shared timestamps
// export const userAnswers = relations(users, ({ many }) => ({
// 	answers: many(answers)
// }))
