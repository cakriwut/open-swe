# Project Debug Rules (Non-Obvious Only)
- Environment variables are loaded from `**/.env` files (configured in `turbo.json` globalDependencies).
- Web App Middleware in `apps/web/src/middleware.ts` handles authentication and redirects based on GitHub user status, which can be a point of failure if not configured correctly.
- `packages/shared/src/caching.ts` contains custom cost-saving calculations and a `tokenDataReducer`, which might require specific debugging if caching issues arise.