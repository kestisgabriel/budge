import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './server/db/schema',
	out: './db',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DB_URL!
	}
})
