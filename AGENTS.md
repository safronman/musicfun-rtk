# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains all application code.
- `src/app/` shared app layers (`api`, `model`, `ui`).
- `src/features/` feature slices (`auth`, `playlists`, `tracks`) with `ui/`, `api/`, and `model/` as needed.
- `src/common/` reusable building blocks (components, hooks, utils, types, schemas, routing, socket).
- Shadcn UI components must be generated directly under `src/common/components` (without `ui` subfolder).
- For `src/common/components`, always import through the barrel `@/common/components` re-export, not direct file paths.
- `src/assets/` and `public/` hold static assets.
- Entry points: `src/main.tsx` and `src/index.css`.
- `lancedb/` exists at repo root and is currently empty.

## Build, Test, and Development Commands
- `pnpm dev` runs the Vite dev server.
- `pnpm build` type-checks via `tsc -b` and creates a production build.
- `pnpm lint` runs ESLint over the repo.
- `pnpm preview` serves the production build locally.
- There is no test script or framework configured yet.
- After each completed task, run `pnpm build` to confirm there are no TypeScript errors.

## Coding Style & Naming Conventions
- TypeScript + React with strict compiler options in `tsconfig.app.json`.
- Path alias `@/*` maps to `src/*`.
- Prettier config: 120 char width, single quotes, no semicolons.
- ESLint uses `@eslint/js`, `typescript-eslint`, `react-hooks`, and `react-refresh` presets.
- Components use `PascalCase` filenames (e.g., `PlaylistsPage.tsx`) and folders; functions and variables use `camelCase`.

## Testing Guidelines
- No tests are present. If you add a test setup, align names with `*.test.ts(x)` or `*.spec.ts(x)` and place tests next to the feature or in a `__tests__` folder.

## Commit & Pull Request Guidelines
- Recent commits follow a short `<scope>: <number>` pattern (e.g., `socket: 7`, `zod: 9`). Keep messages concise and consistent with that style unless the team updates conventions.
- Use Conventional Commits format: `<type>(<scope>): <subject>` (e.g., `docs(agents): add conventional commit rule`).
- PRs should describe the user-facing change, list notable UI updates, and include screenshots or screen recordings for UI changes.
- Never commit or push `TASKS.md` / `task.md`; keep task notes local only.

## Configuration Tips
- Environment variables live in `.env` and `.env.local`; keep secrets out of commits and prefer `.env.local` for machine-specific values.
