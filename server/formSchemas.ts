import { z } from 'zod'

export const expenseSchema = z.object({
	id: z.number().int().positive().min(1),
	title: z
		.string()
		.min(3, {
			message: 'Title must be at least 3 characters'
		})
		.max(100, {
			message: 'Title can not exceed 100 characters'
		}),
	amount: z.string().regex(/^\d+$/, 'Amount must be a positive number')
})

export const createExpenseSchema = expenseSchema.omit({ id: true })
