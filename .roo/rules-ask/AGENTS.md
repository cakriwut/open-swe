# Project Documentation Rules (Non-Obvious Only)
- The `packages/shared/src/index.ts` is a no-op file, meaning direct imports from sub-modules are the convention, which is counter-intuitive for a shared package.
- `apps/web/src/middleware.ts` handles authentication and redirects based on GitHub user status, which is a critical flow not immediately obvious from file names.
- `langgraph.json` defines the entry points for `programmer`, `planner`, and `manager` graphs, as well as authentication and HTTP server entry points.
- `packages/shared/src/open-swe/mcp.ts` defines Zod schemas for `McpServerConfig` and `oAuthClientProviderSchema`, which are essential for understanding MCP server and OAuth client provider configurations.