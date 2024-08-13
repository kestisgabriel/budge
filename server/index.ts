import app from './app'

Bun.serve({
	// hono server
	fetch: app.fetch
})

console.log('Hello via Bun!')
