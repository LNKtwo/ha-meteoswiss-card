import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readdirSync, rmSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const run = randomUUID();
const tests = readdirSync(new URL('../tests/', import.meta.url))
  .filter(name => name.endsWith('.test.mjs'))
  .sort((left, right) => left.localeCompare(right, 'en'))
  .map(name => fileURLToPath(new URL(`../tests/${name}`, import.meta.url)));
const result = spawnSync(process.execPath, [require.resolve('c8/bin/c8.js'),
  '--all', '--include=src/utils/warning-labels.ts', '--exclude-after-remap',
  '--reporter=text', '--reporter=lcov', '--check-coverage',
  '--lines=90', '--functions=100', '--branches=80',
  process.execPath, '--test', ...tests,
], { stdio: 'inherit', env: { ...process.env, WARNING_COVERAGE_RUN: run } });
// c8 needs the generated source maps until its child process has exited.
const directory = new URL('../node_modules/', import.meta.url);
for (const name of readdirSync(directory)) {
  if (name.startsWith(`.warning-tests-${run}-`)) rmSync(join(directory.pathname, name), { recursive: true });
}
process.exitCode = result.status ?? 1;
