import { drizzle, NodePgTransaction } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema/'
import { env } from './envs'
import type { ExtractTablesWithRelations } from 'drizzle-orm'

/**
 * NOTE: send pool with 1 connection as client currently hangs forever
 **/
const client = new Pool({
	user: env?.DB_USER,
	password: env?.DB_PASSWORD,
	database: env?.DB_NAME,
	host: env?.DB_HOST,
	port: env?.DB_PORT,
	max: 1,
	ssl: env?.DB_SSL && env?.DB_SSL === 'true' ? true : false,
	connectionTimeoutMillis: 1000 * 10
})

const pool = new Pool({
	user: env?.DB_USER,
	password: env?.DB_PASSWORD,
	database: env?.DB_NAME,
	host: env?.DB_HOST,
	port: env?.DB_PORT,
	max:
		(env?.DB_MIGRATING && env?.DB_MIGRATING === 'true') ||
		(env?.DB_SEEDING && env?.DB_SEEDING === 'true')
			? 1
			: undefined,
	ssl: env?.DB_SSL && env?.DB_SSL === 'true' ? true : false,
	connectionTimeoutMillis: 1000 * 10
})

export const db = drizzle({
	client: pool,
	schema,
	logger: false
})

export const dbMock = drizzle.mock({
	schema,
	logger: false
})

export const dbMigration = drizzle({
	client,
	logger: true
})

export type Transaction = NodePgTransaction<
	typeof schema,
	ExtractTablesWithRelations<typeof schema>
>
