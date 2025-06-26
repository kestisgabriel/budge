# BUDGE

A compact SPA for expense tracking.

## Stack

-   TypeScript, React, Vite
-   Bun + Hono
-   PostgreSQL + Neon + Drizzle
-   React Query
-   TailwindCSS + shadcn/ui
-   Kinde
-   Zod + TanStack Form
-   TanStack Router

## Setup & run the application

-   `bun i && cd client && bun i` - ensure packages are up to date
-   in root: `bun dev` - run server
-   in ./client: `bun dev` - run client

## Environment variables
Authentication and data persistance beyond client-side storage is currently dependant on API Keys from Kinde, Drizzle and Neon stored in .env. That functionality will not work when running the app locally, unless you store your own keys in .env at root.

## Updating the database

`bun drizzle-kit generate` - generates new migration

`bun migrate.ts` - runs the migration file

`bunx drizzle-kit studio` - runs the ORM DB GUI locally
