import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
	id: z.number().int().positive().min(1),
	title: z.string().min(3).max(100),
	amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const createExpenseSchema = expenseSchema.omit({ id: true });

const dummyExpenses: Expense[] = [
	{ id: 1, title: "Groceries", amount: 120.5 },
	{ id: 2, title: "Rent", amount: 950.0 },
	{ id: 3, title: "Utilities", amount: 75.3 },
];

// expense routes defined
export const expensesRoute = new Hono()
	.get("/", (c) => {
		return c.json({ expenses: dummyExpenses });
	})
	.post("/", zValidator("json", createExpenseSchema), async (c) => {
		const expense = await c.req.valid("json");
		dummyExpenses.push({ ...expense, id: dummyExpenses.length + 1 });
		c.status(201);
		return c.json(expense);
	})
	.get("/total-spent", (c) => {
		const totalSpent = dummyExpenses.reduce(
			(acc, expense) => acc + expense.amount,
			0
		);
		return c.json({ totalSpent });
	})
	.get("/:id{[0-9]+}", (c) => {
		const id = Number.parseInt(c.req.param("id"));
		const expense = dummyExpenses.find((expense) => expense.id === id);
		if (!expense) {
			return c.notFound();
		}
		return c.json(expense);
	})
	.delete("/:id{[0-9]+}", (c) => {
		const id = Number.parseInt(c.req.param("id"));
		const index = dummyExpenses.findIndex((expense) => expense.id === id);
		if (index === -1) {
			return c.notFound();
		}
		const deletedExpense = dummyExpenses.splice(index, 1)[0];
		return c.json({ expense: deletedExpense });
	});

// TODO:
// put
