import { z } from 'zod'

export const expenseSchema = z.object({
	id: z.number().int().positive().min(1),
	title: z.string().min(3).max(100),
	amount: z.string()
})

export const createExpenseSchema = expenseSchema.omit({ id: true })
