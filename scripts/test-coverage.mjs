import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readdirSync, rmSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const run = randomUUID();
const result = spawnSync(process.execPath, [require.resolve('c8/bin/c8.js'),
  '--all', '--include=src/utils/warning-labels.ts', '--exclude-after-remap',
  '--reporter=text', '--reporter=lcov', '--check-coverage',
  '--lines=90', '--functions=100', '--branches=80',
  process.execPath, '--test', 'tests/warning-renderer.test.mjs', 'tests/warning-cards.test.mjs',
], { stdio: 'inherit', env: { ...process.env, WARNING_COVERAGE_RUN: run } });
// c8 needs the generated source maps until its child process has exited.
const directory = new URL('../node_modules/', import.meta.url);
for (const name of readdirSync(directory)) {
  if (name.startsWith(`.warning-tests-${run}-`)) rmSync(join(directory.pathname, name), { recursive: true });
}
process.exitCode = result.status ?? 1;
