import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

// logger middleware
app.use(logger());

// c: context object = handles http requests and responses
app.get("/", (c) => c.text("Hono!"));

// if /api/expenses, expensesRoute handles http request
app.route("/api/expenses", expensesRoute);
export default app;
