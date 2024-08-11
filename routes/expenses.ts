import { Hono } from "hono";

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

// exprense routes defined
export const expensesRoute = new Hono()
	.get("/", (c) => {
		return c.json({ expenses: [] });
	})
	.post("/", (c) => {
		return c.json({});
	});

// TODO:
// delete
// put
