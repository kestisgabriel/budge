import type { z } from 'zod';
import { insertExpensesSchema } from './db/schema/expenses';

export const createExpenseSchema = insertExpensesSchema.omit({
	userId: true,
	createdAt: true,
	id: true,
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;
