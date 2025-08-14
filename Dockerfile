# Stage 1: Build with all dependencies
FROM node:18.20.1-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Minimal production image
FROM node:18.20.1-alpine
WORKDIR /app

# Required files
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/messages ./messages
COPY . .

# Clean up
RUN npm prune --omit=dev

# Runtime config
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000
CMD ["npm", "start"]
