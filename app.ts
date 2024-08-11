import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

// logger middleware
app.use(logger());

// c: context object = handles http requests and responses
app.get("/", (c) => c.text("Hono!"));

export default app;
