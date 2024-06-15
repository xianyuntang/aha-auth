# Base image
FROM node:20.9.0-alpine AS base

# Install builder dependencies
FROM base AS builder-deps
WORKDIR /app

ARG NPM_AUTH_TOKEN

COPY package.json package-lock.json ./
COPY prepare.sh ./prepare.sh

RUN npm ci

# Install runner dependencies
FROM base AS runnder-deps
WORKDIR /app

ARG NPM_AUTH_TOKEN

ENV NODE_ENV production

COPY package.json package-lock.json ./
COPY prepare.sh ./prepare.sh

RUN npm ci

# Build the source code
FROM base AS builder
WORKDIR /app

COPY --from=builder-deps /app/node_modules ./node_modules/
COPY . ./

RUN npm run backend:build

# Setup runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=runnder-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/backend ./
COPY --from=builder /app/apps/backend/start.sh /app/start.sh

CMD ["./start.sh"]
