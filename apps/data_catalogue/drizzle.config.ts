import { defineConfig } from 'drizzle-kit'
import { env } from './src/lib/db/envs'

export default defineConfig({
	schema: './src/lib/db/schema/index.ts',
	out: './src/lib/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL
		// password: env.DB_PASSWORD,
		// user: env.DB_USER,
		// port: env.DB_PORT,
		// database: env.DB_NAME,
		// host: env.DB_HOST,
		// ssl: env.DB_SSL
	},
	verbose: false,
	strict: true
})
