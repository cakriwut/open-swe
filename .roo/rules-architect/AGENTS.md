# Project Architecture Rules (Non-Obvious Only)
- `packages/shared` must be built before other packages can consume it (handled automatically by `yarn build`).
- The `apps/open-swe` application uses three LangGraph graphs: programmer, planner, and manager, configured in `langgraph.json`.
- The `apps/web` application uses Next.js 15 with an experimental `serverActions` body size limit of "10mb".
- GitHub authentication involves custom cookies (`GITHUB_TOKEN_COOKIE`, `GITHUB_INSTALLATION_ID_COOKIE`) and custom `x-github-*` headers, with `verifyGithubUser` from `@openswe/shared/github/verify-user` being central.
- `packages/shared/src/caching.ts` implements a custom cost-saving caching mechanism with specific multipliers and rates.
- `packages/shared/src/open-swe/mcp.ts` defines strict Zod schemas for MCP server configurations and OAuth client providers, implying a rigid structure for extending MCP capabilities.