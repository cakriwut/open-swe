FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install necessary tools
RUN apk add --no-cache git

# Enable Corepack for Yarn
RUN corepack enable

# Copy package.json files and yarn configuration
COPY package.json .yarnrc.yml ./
COPY .yarn ./.yarn
COPY packages/shared/package.json ./packages/shared/
COPY apps/web/package.json ./apps/web/

# Install dependencies but skip workspace builds
# This prevents the premature execution of turbo build
RUN yarn install --mode=skip-build

# Build stage
FROM base AS builder

# Copy source code
COPY packages/shared ./packages/shared/
COPY apps/web ./apps/web/

# Build shared package
WORKDIR /app/packages/shared
RUN yarn build

# Build web app
WORKDIR /app/apps/web
RUN yarn build

# Runtime stage
FROM node:20-alpine AS runner

WORKDIR /app
# Enable Corepack for Yarn
RUN corepack enable

# Copy necessary files from builder
COPY --from=builder /app/package.json /app/.yarnrc.yml ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/packages/shared ./packages/shared/
COPY --from=builder /app/apps/web ./apps/web/

# Install dependencies in the runner stage
RUN yarn install --mode=skip-build

# Set working directory to web app
WORKDIR /app/apps/web

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "dev"]