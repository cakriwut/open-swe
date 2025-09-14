# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## General Rules & Conventions

- **Package Manager**: Use Yarn 3.5.1 with node-modules linker.
- **Turbo Orchestration**: All general commands (build, lint, format, test, dev, clean, format:check, lint:fix) are run from the repository root using Turbo.
- **Shared Package Imports**: Import modules from `packages/shared` using the `@openswe/shared` namespace with specific module paths (e.g., `@openswe/shared/open-swe/types`). The `packages/shared/src/index.ts` is a no-op, so direct imports from sub-modules are the convention.
- **Shared Package Build Order**: `packages/shared` must be built before other packages can consume it (handled automatically by `yarn build`).
- **Environment Variables**: Loaded from `**/.env` files (configured in `turbo.json` globalDependencies).
- **Console Logging**: Prohibited in `apps/open-swe` (ESLint error); use the `createLogger` function instead.
- **TypeScript Strictness Deviations**: `tsconfig.json` sets `strictPropertyInitialization: false` and `strictFunctionTypes: false`.
- **ESLint `any` type**: `@typescript-eslint/no-explicit-any` is disabled (set to `0`) in `apps/web/eslint.config.js`.
- **Prettier Formatting**: `singleAttributePerLine: true` and `prettier-plugin-tailwindcss` are used in `apps/web/prettier.config.js`.
- **GitHub Authentication**: Custom flow using `GITHUB_TOKEN_COOKIE`, `GITHUB_INSTALLATION_ID_COOKIE`, `verifyGithubUser` from `@openswe/shared/github/verify-user`, and custom `x-github-*` headers. `getInstallationToken` in `packages/shared/src/github/auth.ts` handles JWT generation and GitHub API calls.
- **MCP Server Configuration**: `packages/shared/src/open-swe/mcp.ts` defines Zod schemas for `McpServerConfig` (stdio and streamable HTTP) and `oAuthClientProviderSchema` with specific required properties for OAuth client providers.
- **Graph Configuration UI**: `packages/shared/src/open-swe/utils/config.ts` filters configurable fields based on `x_open_swe_ui_config.type !== "hidden"` or specific keys ("apiKeys", "reviewPullNumber", "customFramework").
- **Next.js Server Actions**: `apps/web/next.config.mjs` sets an experimental `serverActions` body size limit of "10mb".
- **Web App Middleware**: `apps/web/src/middleware.ts` handles authentication and redirects based on GitHub user status.
- **Caching Cost Calculation**: `packages/shared/src/caching.ts` contains custom cost-saving calculations and a `tokenDataReducer`.