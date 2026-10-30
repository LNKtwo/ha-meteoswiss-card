import { readFile } from 'node:fs/promises';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const expected = `refs/tags/v${version}`;

if (process.env.GITHUB_REF === expected) {
  console.log(`Release tag matches package version ${version}.`);
} else {
  console.error(`Release requires tag ${expected}.`);
  process.exitCode = 1;
}
