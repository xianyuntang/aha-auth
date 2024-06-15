# Base image
FROM node:20.9.0-alpine AS base

# Builder dependencies
FROM base AS builder-deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY prepare.sh ./
COPY package.json package-lock.json ./
RUN npm ci

# Build the source code
FROM base AS builder
WORKDIR /app
COPY --from=builder-deps /app/node_modules ./node_modules/
COPY . ./
RUN npm run frontend:build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/apps/frontend/public ./public/
COPY --from=builder /app/apps/frontend/.next/standalone/node_modules ./node_modules/
COPY --from=builder /app/apps/frontend/.next/standalone/apps/frontend ./
COPY --from=builder /app/apps/frontend/.next/static ./.next/static/

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]