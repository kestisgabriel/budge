import {
	text,
	numeric,
	pgTable,
	serial,
	uniqueIndex,
	varchar,
	index
} from 'drizzle-orm/pg-core'

export const expenses = pgTable(
	'countries',
	{
		id: serial('id').primaryKey(),
		userId: text('user_id').notNull(),
		title: text('title').notNull(),
		amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
		name: varchar('name', { length: 256 })
	},
	(expenses) => {
		return {
			userIdIndex: index('name_idx').on(expenses.userId)
		}
	}
)
