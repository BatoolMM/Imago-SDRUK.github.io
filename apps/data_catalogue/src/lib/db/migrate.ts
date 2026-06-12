import { env } from '$env/dynamic/private'
import { dbMigration } from '$lib/db'
import { log } from '$lib/utils/server/logger'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

export async function runMigration() {
	if (!process.env.DATABASE_URL) {
		log.error('no database has been setup')
		throw Error('no database has been setup')
	}
	log.info('Migration will start now')
	const folder =
		env.NODE_ENV === 'production'
			? '/app/apps/data_catalogue/migrations'
			: './src/lib/db/migrations/'
	await migrate(dbMigration, { migrationsFolder: folder })
		.then(() => log.info('Migration completed'))
		.catch((err) => {
			log.error(`Migration failed`)
			log.error(err)
			return err
		})
}
