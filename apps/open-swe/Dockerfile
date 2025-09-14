FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install necessary tools
RUN apk add --no-cache git

# Enable Corepack for Yarn
RUN corepack enable

# Copy package.json files and yarn configuration
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY packages/shared/package.json ./packages/shared/
COPY apps/open-swe/package.json ./apps/open-swe/

# Install dependencies but skip workspace builds
# This prevents the premature execution of turbo build
RUN yarn install --mode=skip-build

# Build stage
FROM base AS builder

# Copy source code
COPY packages/shared ./packages/shared/
COPY apps/open-swe ./apps/open-swe/
COPY turbo.json ./turbo.json
COPY langgraph.json ./langgraph.json

# Build shared package first
WORKDIR /app/packages/shared
RUN yarn build

# Build open-swe app
WORKDIR /app/apps/open-swe
RUN yarn build

# Runtime stage
FROM node:20-alpine AS runner

WORKDIR /app
# Enable Corepack for Yarn
RUN corepack enable

# Copy necessary files from builder
COPY --from=builder /app/package.json /app/yarn.lock /app/.yarnrc.yml ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/packages/shared ./packages/shared/
COPY --from=builder /app/apps/open-swe ./apps/open-swe/
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/langgraph.json ./langgraph.json

# Install dependencies in the runner stage
RUN yarn install --mode=skip-build

# Set working directory to open-swe app
WORKDIR /app/apps/open-swe

# Expose port 2024 (as specified in docker-compose.yaml)
EXPOSE 2024

# Start the application
CMD ["yarn", "dev"]