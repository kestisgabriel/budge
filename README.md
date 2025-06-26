# BUDGE

A compact SPA for expense tracking.

## Stack

-   TypeScript // language
-   Vite + React // client bundler & framework
-   Bun + Hono // server-side runtime & framework
-   PostgreSQL + Neon + Drizzle // database & ORM
-   React Query // state
-   TailwindCSS + shadcn/ui // user interface styling
-   Kinde // user auth
-   Zod + TanStack Form // form validation
-   TanStack Router // client-side routing

## Setup & run the application

-   `bun i && cd client && bun i` - ensure packages are up to date
-   _in root directory_: `bun dev` - run server
-   _in /client directory_: `bun dev` - run client

_IMPORTANT_
Authentication and data persistance beyond client-side storage is currently dependant on API Keys from Kinde, Drizzle and Neon stored in environment variables. That functionality will not work when running the app locally, unless you store your own keys in a .env at root.

## Updating the database

`bun drizzle-kit generate` - generates new migration

`bun migrate.ts` - runs the migration file

`bunx drizzle-kit studio` - runs the ORM DB GUI locally
