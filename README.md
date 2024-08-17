# BUDGE

A compact and highly performant CSR SPA project for expense tracking.

## Features

-   CRUD api
-   form validation
-   authenticated routes

## Stack

-   TypeScript // language
-   Vite + React // client bundler & framework
-   Bun + Hono // server-side runtime & framework
-   PostgreSQL + Neon + Drizzle // database & ORM
-   React Query // state
-   TailwindCSS + shadcn // user interface styling
-   Kinde // user auth
-   Zod + TanStack Form // form validation
-   TanStack Router // client-side routing

## Setup & run the application

-   `bun i && cd client && bun i` - ensure packages are up to date
-   _in root directory_: `bun dev` - run server
-   _in /client directory_: `bun dev` - run client

Authentication and data persistance beyond client-side storage is dependant on environment variables retrieved from Kinde and Drizzle - and will not work when running the app locally.

## Updating the database

`bun drizzle-kit generate` - generates new migration

`bun migrate.ts` - runs the migration file

`bunx drizzle-kit studio` - runs the ORM DB GUI locally

## Contributing

`bun run c` - QoL shell script that prompts for a commit message before commiting.
Shorthand for `git add . && git commit -m $commit_message`
