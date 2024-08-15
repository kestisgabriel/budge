# BUDGE

React CSR SPA with Bun & Hono server.

-   Bun (runtime & back-end)
-   Hono (TS RPC HTTP)
-   Vite + React
-   Tailwind
-   TypeScript & Zod (validation)
-   Drizzle (ORM)
-   Kinde (auth)
-   TanStack Query, Router, Form (UX and DX for SPA)

-   `bun init`
-   add "scripts": {
    "dev": "bun --watch index.ts"
    }
-   `Bun.serve({})`
-   app.ts
-   `bun add hono`
-   import hono
-   const app = new Hono()
-   app.get("/", c => {
    return c.text("Hello")
    })

`bun drizzle-kit generate` - generates new migration
`bunx drizzle-kit studio` - run local db
`bun migrate.ts` - runs the migration file

## Expense-tracking
