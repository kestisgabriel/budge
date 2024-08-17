# Stage 1: Build client
FROM oven/bun:1 AS builder
WORKDIR /budge

# Copy package files and install dependencies
COPY package*.json bun.lockb ./
RUN bun install

# Copy the rest of the application
COPY . .

# Build client
WORKDIR /budge/client
RUN bun run build

# Stage 2: Production
FROM oven/bun:1-slim
WORKDIR /budge

# Copy built client files
COPY --from=builder /budge/client/dist ./client/dist

# Copy server files
COPY --from=builder /budge/server ./server

# Copy package files and drizzle output
COPY --from=builder /budge/package*.json ./
COPY --from=builder /budge/db ./db
COPY --from=builder /budge/bun.lockb ./

# Install production dependencies
RUN bun install --production

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]