# Contributing

Thanks for taking the time to contribute. This document describes how the project is set up and how to get a change
merged.

## Prerequisites

- [Node.js](https://nodejs.org/) as pinned in [`.node-version`](./.node-version). Any version manager that reads that
  file works (`fnm`, `nvm`, `nodenv`).
- [Bun](https://bun.sh/) is optional. It is only needed to run the Bun checks locally; CI runs them for every pull
  request anyway.

## Getting started

```bash
git clone https://github.com/Akurganow/array-functions.git
cd array-functions
npm ci
```

## Scripts

| Command | What it does |
| ------- | ------------ |
| `npm run check` | Runs everything below in order: lint, typecheck, tests, build and package checks. |
| `npm run lint` / `npm run lint:fix` | [Biome](https://biomejs.dev/): lint, formatting and import order in one pass. Warnings fail the check (`info`-level diagnostics do not). |
| `npm run format` | Rewrites files with the Biome formatter (tabs, single quotes, semicolons only where ASI needs them). |
| `npm run typecheck` | `tsc --noEmit` over sources, tests and the TypeScript config files. |
| `npm test` / `npm run test:watch` | Unit and type tests with [Vitest](https://vitest.dev/) on Node.js. |
| `npm run test:coverage` | The same with V8 coverage. Coverage must stay at 100 %. |
| `npm run test:bun` | The same test files on Bun's built-in runner (`bun test`). |
| `npm run build` | Builds ESM, CommonJS and type declarations into `dist/` with [tsdown](https://tsdown.dev/). |
| `npm run check:package` | Validates the published package with [publint](https://publint.dev/) and [Are the types wrong?](https://arethetypeswrong.github.io/). |
| `npm run smoke` | Loads the built package on Node.js and Bun and exercises every export. |

## How the cross-runtime tests work

All test files live in `__tests__/` and import `describe`, `test` and `expect` from `vitest`:

- **Node.js** runs them with Vitest directly.
- **Bun** rewrites `vitest` imports to `bun:test` on the fly, so `bun test` runs the same files unchanged.

Stick to the common subset of the Jest-style API (`toBe`, `toEqual`, `toThrow`, `toHaveLength`, ...) so the files keep
working on both runners. Type-level tests live in `__tests__/*.test-d.ts` and run under Vitest only. Vitest's
`typecheck` mode is still marked experimental upstream and prints a warning on every run; that is expected.

`noSkippedTests` is an error, so `.skip` (`describe.skip`, `test.skip`, `it.skip`) does not pass CI. A test that is
planned but not written yet goes in as `test.todo('…')`, which the rule and the coverage threshold both allow; a test
that must be disabled needs a fix or a deletion, not a skip.

## Toolchain notes

- Biome is configured from its `recommended` preset plus the `project` and `test` domains. Recommended rules that
  would otherwise only warn (unused code, `any`, non-null assertions, type-only imports/exports) are raised to errors.
  On top of the preset, a few rules that are not recommended by default are enabled as errors: `noImportCycles`,
  `noUndeclaredDependencies` (dev dependencies may only be imported from `__tests__/` and from the root
  `tsdown.config.ts` / `vitest.config.ts`; a new root config file that imports a dev dependency has to be added to the
  `devDependencies` globs in `biome.json`), `noEnum`, `noCommonJs`, `noParameterAssign`, `noConsole` (allowed in
  `scripts/`), `noReExportAll`, `noInferrableTypes`, `useAsConstAssertion` and `noSkippedTests`. Two mechanisms
  enforce this: a rule set to `error` in `biome.json` is an explicit project policy and fails even a plain
  `biome lint`; `--error-on-warnings` in the `lint` script and in CI is the safety net that also blocks the recommended
  rules that stay at their default `warn` level (`useConst`, `useTemplate`, …) without listing each of them. The `all`
  preset is not used: on this code base it reports framework-specific rules (Qwik), style rules that contradict the
  module layout (`noDefaultExport`, `noMagicNumbers`) and false positives; strictness is added rule by rule instead.
  `nursery` rules are not enabled because they are excluded from Biome's semantic versioning. The Biome version is
  pinned exactly, as its docs recommend, because even patch releases can change formatting.
- `typescript` is the native TypeScript 7 compiler. It is used for type-checking only (`tsc --noEmit`). Because
  `isolatedDeclarations` is enabled, tsdown generates the declaration bundle with its own Oxc generator, so the
  published `.d.ts` files do not depend on the TypeScript version. `npm run typecheck` guarantees the declarations are
  valid: a missing annotation on an export fails both `typecheck` (TS9013) and `build` (TS9007).

## Adding a function

1. Create `src/functionName.ts` with a single default export, an explicit return type (`isolatedDeclarations` requires
   it for everything that is exported) and a JSDoc comment that documents parameters, return value, thrown errors and
   at least one example.
2. Re-export it from `src/index.ts`.
3. Add `__tests__/functionName.test.ts`. Cover the happy path, edge cases (empty input, single element) and that the
   input is not mutated.
4. Document it in `README.md` and add the export to `scripts/smoke.mjs`.
5. Run `npm run check`.

## Commit messages

The changelog is generated from commit messages, so please follow
[Conventional Commits](https://www.conventionalcommits.org/): `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`.
A `feat` bumps the minor version, a `fix` the patch version, and a `BREAKING CHANGE:` footer the major version.

## Pull requests

- Open the pull request against `main`.
- CI runs lint, typecheck, the Node.js (active LTS and latest) and Bun (two most recent minor lines) test matrix on
  Linux, macOS and Windows, and a package verification job. All of them must pass.
- Dependency updates are proposed weekly by [Dependabot](https://docs.github.com/en/code-security/dependabot) with a
  14-day cooldown after each release; they are reviewed and merged by hand. Biome and TypeScript are excluded from the
  grouped PR and updated one at a time.

## Releasing

Releases are cut from `main` with [release-it](https://github.com/release-it/release-it):

```bash
cp .env.example .env   # add a GitHub token with `repo` scope
npm run release
```

release-it runs `npm run check`, bumps the version, updates `CHANGELOG.md`, creates a git tag and publishes a GitHub
release. Publishing the release triggers the [`Publish`](./.github/workflows/publish.yml) workflow, which builds the
package again and runs `npm publish --provenance` using
[npm trusted publishing](https://docs.npmjs.com/trusted-publishers). No npm token is stored anywhere.

One-time setup for trusted publishing: on npmjs.com, open the package settings, add a **GitHub Actions** trusted
publisher for `Akurganow/array-functions` with the workflow file `publish.yml` and the environment `npm`, and create a
matching `npm` environment in the GitHub repository settings.
