# Project Coding Rules (Non-Obvious Only)
- Always use Yarn 3.5.1 with node-modules linker.
- Import modules from `packages/shared` using the `@openswe/shared` namespace with specific module paths (e.g., `@openswe/shared/open-swe/types`). The `packages/shared/src/index.ts` is a no-op, so direct imports from sub-modules are the convention.
- Console logging is prohibited in `apps/open-swe` (ESLint error); use the `createLogger` function instead.
- `tsconfig.json` sets `strictPropertyInitialization: false` and `strictFunctionTypes: false`.
- `@typescript-eslint/no-explicit-any` is disabled (set to `0`) in `apps/web/eslint.config.js`.
- `singleAttributePerLine: true` and `prettier-plugin-tailwindcss` are used in `apps/web/prettier.config.js`.
- `getInstallationToken` in `packages/shared/src/github/auth.ts` handles JWT generation and GitHub API calls, including converting escaped newlines in the private key.
- `packages/shared/src/open-swe/utils/config.ts` filters configurable fields based on `x_open_swe_ui_config.type !== "hidden"` or specific keys ("apiKeys", "reviewPullNumber", "customFramework").