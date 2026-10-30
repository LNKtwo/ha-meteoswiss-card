import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const script = fileURLToPath(new URL('../scripts/check-release-tag.mjs', import.meta.url));

function check(ref) {
  const env = { ...process.env };
  delete env.GITHUB_REF;
  if (ref !== undefined) env.GITHUB_REF = ref;
  return spawnSync(process.execPath, [script], { env, encoding: 'utf8' });
}

test('a release tag matching the package version is accepted', () => {
  const result = check(`refs/tags/v${version}`);
  assert.equal(result.status, 0, result.stderr);
});

for (const [name, ref] of [
  ['different version', `refs/tags/v${version}-wrong`],
  ['branch with a matching name', `refs/heads/v${version}`],
  ['pull request merge ref', 'refs/pull/1/merge'],
  ['missing ref', undefined],
]) {
  test(`release rejects ${name}`, () => {
    const result = check(ref);
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /Release requires tag refs\/tags\/v/);
  });
}
