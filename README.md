# BUDGE

A compact and highly performant CSR SPA project for expense tracking.

## Features

-   CRUD api
-   form validation
-   authenticated routes

## Stack

TypeScript // language
Vite + React // client bundler & framework
Bun + Hono // server-side runtime & framework
PostgreSQL + Neon + Drizzle // database & ORM
Kinde // user auth
TailwindCSS + shadcn // user interface styling
Zod + TanStack Form // form validation
TanStack Query // SPA state management
TanStack Router // client-side SPA routing

### Stack description

Hono is a server-side framework with a similar API to ExpressJS but with the benefits of being runtime-agnostic, faster, lighter, whilst providing a modern and more feature-rich DX.
Bun is a new JavaScript runtime built in Zig which vastly outperforms NodeJS.
Vite is a bundler for React with an emphasis on performance.

## Setup & run the application

`bun i && cd client && bun i` - ensure packages are up to date
_in root directory_: `bun dev` - run server
_in /client directory_: `bun dev` - run client

Authentication and data persistance beyond client-side storage is dependant on environment variables retrieved from Kinde and Drizzle - and will not work when running the app locally.

## Contributing to the repository

`bun run c` - runs a QoL shell script prompting you for a commit message before commiting. Shorthand for `git add . && git commit -m $commit_message`

### Updating the database

`bun drizzle-kit generate` - generates new migration
`bun migrate.ts` - runs the migration file

`bunx drizzle-kit studio` - runs the ORM DB GUI locally
