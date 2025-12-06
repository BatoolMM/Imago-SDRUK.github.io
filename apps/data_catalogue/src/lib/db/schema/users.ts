import {
	pgTable,
	uuid,
	varchar,
	jsonb,
	uniqueIndex,
	index,
	pgEnum,
	timestamp
} from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'
import { DateTime } from 'luxon'
import { answers } from './questions'

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
		email: varchar({ length: 320 }).notNull(),
		name: varchar({ length: 100 }).notNull(),
		preferences: jsonb('preferences').$type<{
			notifications: boolean
		}>(),
		status: user_status_enum().default('draft').notNull(),
		...timestamps
	},
	(table) => [
		uniqueIndex('users_email_unique').on(table.email),
		index('users_active_idx')
			.on(table.email)
			.where(sql`${table.status} = 'active'`)
	]
)

// NOTE: this breaks shared timestamps
// export const userAnswers = relations(users, ({ many }) => ({
// 	answers: many(answers)
// }))
