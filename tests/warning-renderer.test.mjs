import assert from 'node:assert/strict';
import { after, before, beforeEach, test } from 'node:test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { build } from 'vite';

// Compile the actual renderer with the existing Vite toolchain. Lit itself is
// used, not a replacement renderer or a copied implementation of the logic.
const root = fileURLToPath(new URL('../', import.meta.url));
let temporaryDirectory;
let renderWarningSection;
let warningPresentation;
let warningDate;
let use;

before(async () => {
  // lit-translate broadcasts language changes on the browser event target.
  // No DOM rendering or HTML sanitization is simulated by this target.
  globalThis.window = new EventTarget();
  temporaryDirectory = await mkdtemp(join(root, 'node_modules', `.warning-tests-${process.env.WARNING_COVERAGE_RUN ?? 'local'}-`));
  await build({
    configFile: false,
    root,
    logLevel: 'silent',
    // The public exports re-export these exact utilities. Avoid importing the
    // package's unrelated legacy DOM directives in a Node content test.
    resolve: { alias: { 'lit-translate': join(root, 'node_modules/lit-translate/util.js') } },
    build: {
      sourcemap: 'inline',
      outDir: temporaryDirectory,
      lib: {
        entry: {
          'warning-renderer': 'src/utils/warning-renderer.ts',
          'warning-labels': 'src/utils/warning-labels.ts',
          'translate': 'node_modules/lit-translate/util.js',
        },
        formats: ['es'],
        fileName: (_format, entryName) => `${entryName}.mjs`,
      },
      rollupOptions: { external: ['lit', 'marked'] },
    },
  });
  ({ renderWarningSection } = await import(pathToFileURL(join(temporaryDirectory, 'warning-renderer.mjs'))));
  ({ warningPresentation, warningDate } = await import(pathToFileURL(join(temporaryDirectory, 'warning-labels.mjs'))));
  const translationModule = await import(pathToFileURL(join(temporaryDirectory, 'translate.mjs')));
  use = translationModule.use;
  const translations = {};
  for (const language of ['de', 'en']) {
    translations[language] = JSON.parse(await readFile(join(root, `src/translations/${language}.json`), 'utf8'));
  }
  translationModule.registerTranslateConfig({ loader: language => translations[language] });
});

beforeEach(async () => { await use('de'); });
after(async () => {
  if (temporaryDirectory && !process.env.WARNING_COVERAGE_RUN) {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
  delete globalThis.window;
});

// Inspect Lit's template values for content assertions. DOM escaping and click
// behavior can additionally be checked in a browser; this is not an HTML parser.
function content(value) {
  if (value == null || typeof value === 'function') return '';
  if (Array.isArray(value)) return value.map(content).join('');
  if (typeof value === 'object' && value.strings) {
    return value.strings.reduce((result, part, index) => result + part + content(value.values[index]), '');
  }
  return String(value);
}

const hass = { selectedLanguage: 'de-CH', language: 'en', config: { time_zone: 'Europe/Zurich' } };
const labels = {
  de: {
    types: { 0: 'Wind', 4: 'Strassenglätte', 5: 'Frost', 8: 'Lawinen', 10: 'Waldbrand', 12: 'Trockenheit' },
    levels: { 4: 'Stufe 4 – grosse Gefahr' },
  },
  en: {
    types: { 0: 'Wind', 4: 'Slippery Roads', 5: 'Frost', 8: 'Avalanches', 10: 'Forest Fire', 12: 'Drought' },
    levels: { 4: 'Level 4 – high danger' },
  },
  fr: { types: { 12: 'Sécheresse' }, levels: { 4: 'Danger fort' } },
  it: { types: { 12: 'Siccità' }, levels: { 4: 'Pericolo forte' } },
};

function alert(overrides = {}) {
  return {
    alert_id: 'synthetic-warning', warn_type: 12, warn_type_name: 'Drought',
    warn_level: 4, warn_level_name: 'Level 4 - High danger',
    description: 'Event-specific provider text.', outlook: false,
    valid_from: '2026-10-30T17:00:00Z', valid_to: null,
    ...overrides,
  };
}

function entity(state, attributes = {}) {
  return { entity_id: 'binary_sensor.test_weather_alert', state, attributes };
}

function render(state = 'on', alerts = [alert()], attributes = {}, options = {}) {
  return renderWarningSection(entity(state, { alerts, ...attributes }), null, null, null,
    options.open ?? { ms_alert_0: true }, () => {}, options.hass ?? hass);
}

test('v3 catalogue gives drought its supplied label, level and semantic icon', () => {
  const result = content(render('on', [alert()], { warning_labels: labels }));
  assert.match(result, /Trockenheit/);
  assert.match(result, /Stufe 4 – grosse Gefahr/);
  assert.match(result, /mdi:water-off/);
  assert.doesNotMatch(result, /Lawine|Lawinengefahr/);
});

for (const [code, name, expected] of [[0, 'Wind', 'Wind'], [4, 'Slippery Roads', 'Strassenglätte'],
  [5, 'Frost', 'Frost'], [8, 'Avalanches', 'Lawinen']]) {
  test(`v3 catalogue preserves family ${code} (${name})`, () => {
    assert.equal(warningPresentation(alert({ warn_type: code, warn_type_name: name }),
      { warning_labels: labels }, hass).typeName, expected);
  });
}

test('original integration wind code 4 is translated by its supplied name', () => {
  const result = warningPresentation(alert({ warn_type: 4, warn_type_name: 'Wind' }), {}, hass);
  assert.equal(result.typeName, 'Wind');
  assert.equal(result.icon, 'mdi:weather-windy');
});

test('original integration ground frost is not reinterpreted as fog', () => {
  const result = warningPresentation(alert({ warn_type: 5, warn_type_name: 'Ground Frost' }), {}, hass);
  assert.equal(result.typeName, 'Bodenfrost');
  assert.equal(result.icon, 'mdi:snowflake-thermometer');
});

test('the same numeric code can retain a different explicitly supplied family', () => {
  // This is a compatibility case, not evidence that v1 assigns 12 to avalanches.
  const result = warningPresentation(alert({ warn_type_name: 'Avalanche' }), {}, hass);
  assert.equal(result.typeName, 'Lawinen');
  assert.equal(result.icon, 'mdi:snowflake-alert');
});

test('source catalogue wins over a conflicting old name and supplies the icon', () => {
  const result = warningPresentation(alert({ warn_type_name: 'Avalanche' }),
    { warning_labels: labels }, hass);
  assert.equal(result.typeName, 'Trockenheit');
  assert.equal(result.icon, 'mdi:water-off');
});

for (const [language, expected] of [['en-GB', 'Drought'], ['fr-CH', 'Sécheresse'], ['it-CH', 'Siccità']]) {
  test(`selected ${language} catalogue takes precedence over HA's base language`, () => {
    assert.equal(warningPresentation(alert(), { warning_labels: labels },
      { selectedLanguage: language, language: 'de' }).typeName, expected);
  });
}

test('missing selected language uses the provider semantic name without a numeric guess', () => {
  assert.equal(warningPresentation(alert(), {}, { language: 'fr' }).typeName, 'Drought');
});

test('unknown provider names remain intact and receive a neutral icon', () => {
  const result = warningPresentation(alert({ warn_type: 99, warn_type_name: 'New provider hazard' }), {}, hass);
  assert.equal(result.typeName, 'New provider hazard');
  assert.equal(result.icon, 'mdi:alert');
});

test('a code alone cannot manufacture a hazard family', () => {
  const result = warningPresentation(alert({ warn_type_name: undefined }), {}, hass);
  assert.equal(result.typeName, 'Unbekannte Warnungsart (12)');
  assert.equal(result.icon, 'mdi:alert');
});

test('missing names can retain a supplied event title', () => {
  assert.equal(warningPresentation(alert({ warn_type_name: '', title: 'Original event title' }), {}, hass).typeName,
    'Original event title');
});

test('a catalogue without an English semantic name gets a neutral icon', () => {
  const result = warningPresentation(alert({ warn_type_name: 'Avalanche' }),
    { warning_labels: { de: labels.de } }, hass);
  assert.equal(result.typeName, 'Trockenheit');
  assert.equal(result.icon, 'mdi:alert');
});

test('malformed catalogue groups cannot supply a label from a string or array', () => {
  for (const types of ['Not a catalogue', ['Wind']]) {
    const result = warningPresentation(alert({ warn_type: 0, warn_type_name: 'Wind' }),
      { warning_labels: { de: { types } } }, hass);
    assert.equal(result.typeName, 'Wind');
  }
});

test('an unfamiliar name cannot resolve through an inherited object property', () => {
  assert.equal(warningPresentation(alert({ warn_type_name: 'constructor' }), {}, hass).typeName,
    'constructor');
});

test('failure and recovery follow the new source state instead of retaining an all-clear', () => {
  assert.equal(render('off', [], { data_status: 'current' }), null);
  assert.match(content(render('unavailable', [], { data_status: 'unavailable' })), /nicht verfügbar/);
  assert.match(content(render('on', [alert()], { data_status: 'current' })), /Trockenheit/);
  assert.equal(render('off', [], { data_status: 'current' }), null);
});

test('forest fire original text is never replaced with a blanket prohibition', () => {
  const description = 'Follow the current measures published by the canton.\nOriginal second line.';
  const result = content(render('on', [alert({ warn_type: 10, warn_type_name: 'Forest Fire', description })]));
  assert.ok(result.includes(description));
  assert.doesNotMatch(result, /Offenes Feuer streng verboten/);
});

test('missing descriptions do not generate advice or a details button', () => {
  const result = content(render('on', [alert({ description: undefined })]));
  assert.doesNotMatch(result, /<button|Verbot|Empfehlung/);
});

test('collapsed details preview the original text', () => {
  const description = 'Provider text '.repeat(12);
  const result = content(render('on', [alert({ description })], {}, { open: {} }));
  assert.ok(result.includes(description.substring(0, 80) + '…'));
  assert.ok(!result.includes(description));
});

test('a successful empty off state is an all-clear', () => {
  assert.equal(render('off', []), null);
});

test('an off state does not display retained alert details as active', () => {
  assert.equal(render('off', [alert()]), null);
});

test('upcoming alerts do not become active warnings', () => {
  assert.equal(render('off', [], { upcoming_alerts: [alert()], upcoming_alerts_count: 1 }), null);
});

test('outlooks are not shown as active warnings', () => {
  assert.equal(render('on', [alert({ outlook: true })]), null);
});

test('older on-only entities retain a generic active-warning indicator', () => {
  const result = content(renderWarningSection(entity('on'), null, null, null, {}, () => {}, hass));
  assert.match(result, /Wetterwarnung aktiv/);
  assert.doesNotMatch(result, /Trockenheit|Lawine|Stufe 3/);
});

for (const state of ['unknown', 'unavailable']) {
  test(`${state} cannot be mistaken for an all-clear or a retained active warning`, () => {
    const result = content(render(state, [alert()]));
    assert.match(result, /Warnungsdaten nicht verfügbar/);
    assert.doesNotMatch(result, /Keine aktiven|Trockenheit/);
  });
}

test('an explicit failed source status suppresses stale active attributes', () => {
  assert.match(content(render('on', [alert()], { data_status: 'unavailable' })), /Warnungsdaten nicht verfügbar/);
});

for (const value of [{}, [null], ['not an alert']]) {
  test(`malformed alerts ${JSON.stringify(value)} produce a data-status message`, () => {
    assert.match(content(render('on', value)), /Warnungsdaten nicht verfügbar/);
  });
}

test('invalid or absent levels are not promoted to level 3', () => {
  for (const warn_level of [undefined, null, 0, 9, NaN, true, '4']) {
    const result = warningPresentation(alert({ warn_level, warn_level_name: undefined }), {}, hass);
    assert.equal(result.level, null);
    assert.equal(result.levelName, 'Unbekannte Gefahrenstufe');
  }
});

test('an English provider level remains available to older integrations', () => {
  const result = warningPresentation(alert(), {}, { language: 'en' });
  assert.equal(result.levelName, 'Level 4 - High danger');
});

test('validity follows the selected locale and configured HA time zone', async () => {
  await use('en');
  const result = content(render('on', [alert()], {}, { hass: { ...hass, selectedLanguage: 'en-GB' } }));
  assert.match(result, /Valid from/);
  assert.match(result, /18:00/);
  assert.doesNotMatch(result, /von | bis |Invalid Date/);
});

test('missing and invalid validity bounds do not display Invalid Date', () => {
  assert.equal(warningDate('None', hass), '');
  assert.equal(warningDate(null, hass), '');
  assert.equal(warningDate('not a date', hass), '');
});

test('ranked warnings retain their own supplied labels', () => {
  const primary = entity('warning', { has_warning: true, warning_type: 'Ranked provider label',
    level_name: 'Ranked level', icon_color: 'orange', icon: 'mdi:alert' });
  const result = content(renderWarningSection(null, primary, null, null, {}, () => {}, hass));
  assert.match(result, /Ranked provider label/);
  assert.match(result, /Ranked level/);
});

test('unavailable ranked primary data does not become an all-clear', () => {
  const primary = entity('unavailable', { has_warning: false });
  assert.match(content(renderWarningSection(null, primary, null, null, {}, () => {}, hass)),
    /Warnungsdaten nicht verfügbar/);
});

test('legacy warning arrays keep their own rendering path', () => {
  const legacy = entity('on', { warning_levels: [2], warning_types: ['wind'],
    warning_texts: ['Legacy original text'], warning_valid_from: [null],
    warning_valid_to: [null], warning_links: ['https://example.org/warning'] });
  const result = content(renderWarningSection(legacy, null, null, null, {}, () => {}, hass));
  assert.match(result, /mdi:weather-windy/);
  assert.match(result, /https:\/\/example.org\/warning/);
});
