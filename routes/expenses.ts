import { Hono } from "hono";

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
