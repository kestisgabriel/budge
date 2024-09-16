import {
	text,
	numeric,
	pgTable,
	serial,
	index,
	timestamp,
	date,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenses = pgTable(
	'expenses',
	{
		id: serial('id').primaryKey(),
		userId: text('user_id').notNull(),
		title: text('title').notNull(),
		amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
		date: date('date').notNull(),
		createdAt: timestamp('created-at').defaultNow(),
	},
	(expenses) => {
		return {
			userIdIndex: index('name_idx').on(expenses.userId),
		};
	},
);

// Schema for inserting an expense into DB - used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses, {
	id: z.number().int().positive().min(1),
	title: z.string().min(3, {
		message: 'Title must be at least 3 characters',
	}),
	amount: z.string().regex(/^\d+$/, 'Amount must be a positive number'),
	date: z
		.string()
		.regex(
			/^\d{4}-\d{2}-\d{2}$/,
			'Something is wrong with the date picker, sorry. Please try again.',
		),
});
export const selectExpensesSchema = createSelectSchema(expenses);
