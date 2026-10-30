# Release workflow

Push a tag exactly matching `v` followed by the version in `package.json`, for
example `v2.4.8` for package version `2.4.8`. A different tag fails before
dependency installation. Package and lockfile versions must also agree.

The workflow installs the locked dependency graph with `npm ci --ignore-scripts`,
then explicitly runs lint, TypeScript, repository checks, the production build,
regression tests, the warning-label coverage gate and the dependency audit.
The generated bundle and source map must reproduce the committed assets.

Build and artifact verification run with read-only repository permissions.
Only the publishing job receives `contents: write`. That job downloads the
tested artifact by its immutable artifact ID; it does not check out the
repository or install packages. All actions use full commit SHA references.

A separate read-only job downloads the artifact and verifies the JavaScript
file's SHA-256 against the build output. Both downloads fail on artifact digest
mismatches, and missing upload or release files are errors.

Pull requests changing release inputs exercise the build and artifact handoff.
Manual workflow runs exercise the same path. Only a tag-push event can publish
a GitHub release; pull requests and manual runs cannot publish one. The release
asset remains named `meteoswiss-weather-card.js` and release notes are generated
by GitHub.

Run `node --test tests/release-tag.test.mjs` to check matching tags and rejection
of a different version, a branch ref, a pull-request ref and a missing ref. The
full regression suite also runs these cases. Tests validate the guards without
creating tags or publishing releases.

References:

- [GitHub Actions security guidance](https://docs.github.com/en/actions/reference/security/secure-use)
- [npm ci and ignore-scripts](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
