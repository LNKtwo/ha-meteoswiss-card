import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const json = async path => JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
const pkg = await json('package.json');
const lock = await json('package-lock.json');
const hacs = await json('hacs.json');
assert.equal(pkg.version, lock.version, 'Package and lock versions must agree');
assert.equal(pkg.version, lock.packages[''].version, 'Lock root version must agree');
assert.equal(hacs.filename, 'meteoswiss-weather-card.js');
assert.equal(hacs.content_in_root, true);
await access(new URL(`../${hacs.filename}`, import.meta.url));
const english = await json('src/translations/en.json');
const german = await json('src/translations/de.json');
function keys(object, prefix = '') {
  return Object.entries(object).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === 'object' ? keys(value, path) : [path];
  }).sort((left, right) => left.localeCompare(right, 'en'));
}
assert.deepEqual(keys(english), keys(german), 'DE and EN translation keys must agree');
console.log('Package, lock, HACS metadata and translation keys are consistent.');
