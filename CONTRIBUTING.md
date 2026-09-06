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

Releases are automatic and split into two [release-it](https://github.com/release-it/release-it) runs, so that the
part that can fail after the tag exists can simply be re-run:

1. [`Release`](./.github/workflows/release.yml) runs on every push to `main`: `npm ci` and `npm run check` first,
   then `release-it --ci` computes the bump from the conventional commits since the last tag with
   `@release-it/conventional-changelog`, updates `CHANGELOG.md`, commits, tags and pushes to `main`. `chore`, `docs`
   and similar commits alone do not produce a release, and release-it exits without doing anything when there is
   nothing to release. The release commit it pushes contains nothing releasable, so the run it triggers is a no-op.
2. [`Publish`](./.github/workflows/publish.yml) runs when that tag is pushed: `npm publish` through
   [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) (provenance is attached automatically, no npm
   token is stored anywhere), then `release-it --no-increment` creates the GitHub release for the tag from the same
   conventional commits. The run refuses a tag whose commit is not on `main` or whose name is not the version in
   `package.json`. Both steps are safe to repeat: a version that is already on the registry and a GitHub release
   that already exists are skipped, so a failed run is fixed by re-running it from the Actions tab. The `latest`
   dist-tag only ever moves forward: a version below the highest one already on the registry is published under
   the `legacy` dist-tag. Publish runs execute one at a time; GitHub keeps only one queued run per workflow, so if
   a publish is held up while several tags arrive, re-run the cancelled one.

A release therefore consists of merging a pull request. `npm run release` runs the same release-it configuration
from a machine with a GitHub token in `.env` (see `.env.example`); it pushes the tag and creates the GitHub release,
and the `Publish` workflow still does the npm publish, so the package is always published with provenance from CI.

One-time setup:

- **npm trusted publishing**: on npmjs.com, open the package settings, add a **GitHub Actions** trusted publisher for
  `Akurganow/array-functions` with the workflow file `publish.yml` and the environment `npm`, and create a matching
  `npm` environment in the GitHub repository settings.
- **`RELEASE_TOKEN`**: `main` is protected, and the default `GITHUB_TOKEN` cannot push the release commit and tag to
  it. Create a fine-grained personal access token restricted to this repository with *Contents: read and write* and
  nothing else (the token owner must be allowed to bypass the branch rule) and store it as the `RELEASE_TOKEN`
  repository secret. The `Release` workflow hands it to git only for the push step, after dependencies are installed
  and the checks have run; the GitHub release and the npm publish do not use it.
- **Tag protection** (recommended): add a ruleset for tags matching `*.*.*` that lets only the owner of
  `RELEASE_TOKEN` create them. The `Publish` workflow already refuses a tag whose commit is not on `main`; the
  ruleset keeps hand-made release tags from being pushed in the first place.
