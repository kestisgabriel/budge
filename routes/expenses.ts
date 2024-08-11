import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

type Expense = {
	id: number;
	title: string;
	amount: number;
};

const dummyExpenses: Expense[] = [
	{ id: 1, title: "Groceries", amount: 120.5 },
	{ id: 2, title: "Rent", amount: 950.0 },
	{ id: 3, title: "Utilities", amount: 75.3 },
];

const createExpenseSchema = z.object({
	title: z.string(),
	amount: z.number(),
});

// expense routes defined
export const expensesRoute = new Hono()
	.get("/", (c) => {
		return c.json({ expenses: dummyExpenses });
	})
	.post("/", zValidator("json", createExpenseSchema), async (c) => {
		const expense = await c.req.valid("json");
		dummyExpenses.push({ ...expense, id: dummyExpenses.length + 1 });
		return c.json(expense);
	})
	.get("/:id{[0-9]+}", (c) => {
		const id = Number.parseInt(c.req.param("id"));
		const expense = dummyExpenses.find((expense) => expense.id === id);
		if (!expense) {
			return c.notFound();
		}
		return c.json(expense);
	});

// TODO:
// delete
// put
