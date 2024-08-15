import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import { expensesRoute } from './routes/expenses'
import { authRoute } from './routes/auth'

const app = new Hono()

// logger middleware
app.use(logger())

// if /api/expenses, expensesRoute handles http request
const apiRoutes = app
	.basePath('/api')
	.route('/expenses', expensesRoute)
	.route('/login', authRoute)

app.get('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes
