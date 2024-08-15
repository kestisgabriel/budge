import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { getUser } from '../kinde'
import { db } from '../db'
import { expenses as expenseTable } from '../db/schema/expenses'
import { eq } from 'drizzle-orm'

const expenseSchema = z.object({
	id: z.number().int().positive().min(1),
	title: z.string().min(3).max(100),
	amount: z.string()
})

type Expense = z.infer<typeof expenseSchema>

const createExpenseSchema = expenseSchema.omit({ id: true })

const dummyExpenses: Expense[] = [
	{ id: 1, title: 'Groceries', amount: '120.5' },
	{ id: 2, title: 'Rent', amount: '950.0' },
	{ id: 3, title: 'Utilities', amount: '75.3' }
]

// expense routes defined
export const expensesRoute = new Hono()
	.get('/', getUser, async (c) => {
		const user = c.var.user

		const expenses = await db
			.select()
			.from(expenseTable)
			.where(eq(expenseTable.userId, user.id))
		return c.json({ expenses: expenses })
	})
	.post('/', getUser, zValidator('json', createExpenseSchema), async (c) => {
		const expense = await c.req.valid('json')
		const user = c.var.user

		const result = await db
			.insert(expenseTable)
			.values({
				...expense,
				userId: user.id
			})
			.returning()

		c.status(201)
		return c.json(result)
	})
	.get('/total-spent', getUser, async (c) => {
		const totalSpent = dummyExpenses.reduce(
			(acc, expense) => acc + +expense.amount,
			0
		)
		return c.json({ totalSpent })
	})
	.get('/:id{[0-9]+}', getUser, (c) => {
		const id = Number.parseInt(c.req.param('id'))
		const expense = dummyExpenses.find((expense) => expense.id === id)
		if (!expense) {
			return c.notFound()
		}
		return c.json(expense)
	})
	.delete('/:id{[0-9]+}', getUser, (c) => {
		const id = Number.parseInt(c.req.param('id'))
		const index = dummyExpenses.findIndex((expense) => expense.id === id)
		if (index === -1) {
			return c.notFound()
		}
		const deletedExpense = dummyExpenses.splice(index, 1)[0]
		return c.json({ expense: deletedExpense })
	})

// TODO:
// put
