# Warning display contract

The card consumes Home Assistant entities. It does not call the MeteoSwiss App
API or select an API version. A numeric warning family must not be interpreted
using an unrelated source's catalogue.

## Structured alert attributes

For an entity with an `alerts` array, family labels are resolved in this order:

1. The viewing user's language in
   `attributes.warning_labels[language].types[String(alert.warn_type)]`.
2. An English label in the same supplied catalogue, with a semantic DE/EN
   translation where available.
3. The supplied `alert.warn_type_name`, with a semantic DE/EN translation for
   known English names used by older integrations.
4. The event's supplied `title`, or an unknown-family label retaining the code.

The optional catalogue has this shape:

```json
{
  "warning_labels": {
    "de": {
      "types": { "12": "Trockenheit" },
      "levels": { "4": "Stufe 4 – grosse Gefahr" }
    },
    "en": {
      "types": { "12": "Drought" },
      "levels": { "4": "Level 4 – high danger" }
    }
  }
}
```

The integration owns the catalogue. French and Italian labels supplied in this
shape are also respected for warning families and levels; this does not add a
complete French or Italian translation of the rest of the card.
`selectedLanguage` takes precedence over `language`, including locale variants
such as `de-CH`.

Icons follow the semantic English catalogue label, or the older integration's
English family name when no catalogue label is used. An unresolved or ambiguous
family gets a neutral alert icon. The card never guesses that a bare code 12
means either drought or avalanche. In particular, older input labelled `Wind`
with code 4 stays Wind, while a catalogue explicitly labelling code 4 as
Slippery Roads is displayed accordingly.

Levels 1–5 retain their existing colours. Supplied localized level names take
precedence; older entities retain the DE/EN severity fallback. Missing or invalid
levels get a neutral colour instead of an invented level 3.

`description` is retained as the event-specific provider text, rendered as
escaped plain text. Expanding shows the complete text; the collapsed preview
can truncate it. No generic safety advice or local prohibition is substituted,
including when the description is absent. Validity labels use the card's
translation, and dates use the selected locale and HA time zone. Missing or
invalid bounds are omitted.

## Availability and other entity formats

- A valid `off` state with an empty `alerts` array is an all-clear.
- `unknown`, `unavailable`, or an explicit failed `data_status` displays a data
  availability message. Retained attributes are not presented as current alerts.
- A configured entity that is missing displays the availability message in both
  the full card and standalone warning card.
- Older `on` entities without structured details retain a generic active-warning
  indicator. Outlooks and the separate `upcoming_alerts` array are not promoted
  to active warnings. The integration owns active/upcoming timing.
- Malformed structured alert lists display a data availability message.
- Ranked primary/secondary/tertiary entities and legacy `warning_levels` arrays
  retain their own rendering paths and supplied labels. An unavailable primary
  cannot produce an all-clear in the standalone card.

## API evidence and limits

The original companion integration uses App `/v1/plzDetail`; the maintained
fork uses `/v3/plzDetail`. Its [documented comparison and signed-app catalogue](https://github.com/martins-netizen/ha-meteoswiss/blob/development/docs/WARNING_CODES.md)
and [captured v3 warning fields](https://github.com/martins-netizen/ha-meteoswiss/blob/development/tests/fixtures/warnings_v3_830200.json)
establish drought as type 12 in that v3 data flow. The paired capture shows an
additional v3 drought warning and an unchanged forest-fire warning. It does not
establish every historical v1 mapping or prove a general API renumbering.

The tests use explicitly synthetic HA inputs for both older semantic names and
the optional v3 catalogue, not a live warning feed or a claim about current
hazard conditions. They also cover ranked and legacy-array inputs.

Run `npm ci --ignore-scripts`, `npm run lint`, `npm run type-check`,
`npm run build`, and `npm run test:coverage`. The tests use the actual Vite
toolchain, Lit templates and translation utilities. Content tests inspect
template values; component tests exercise both cards and expand/collapse in
Happy DOM using the complete production bundle. DOM emulation is not a
real-browser or Home Assistant live acceptance test.

The new warning-label module has a coverage gate of 90% lines, 100% functions
and 80% branches. This is a module-level gate, not a claim about whole-card
coverage. The full regression suite always runs with it.

The unused incompatible ESLint import plugin is removed, so the locked graph
installs with normal npm peer checks. Compatible lockfile updates repair the
development-tool advisories found during setup. CI tests Node 22 and 24, checks
lint, TypeScript, metadata and committed build reproducibility, audits all
dependencies, and adds CodeQL plus official HACS frontend validation.

Automatic SonarQube Cloud analysis uses `.sonarcloud.properties`; the repository
must also be imported into the owner's SonarQube Cloud organization. The file
alone does not establish a configured or successful external analysis. HACS's
repository-level checks also require Issues and repository topics to be enabled.

Automatic analysis does not import coverage reports: the c8 coverage gate runs
in CI and its percentages are not a SonarQube Cloud coverage result. SonarQube
Cloud reads `.sonarcloud.properties` from the default branch, so the initial
baseline can still contain generated-code findings until that configuration is
present there and a new analysis has run. See the
[automatic analysis documentation](https://docs.sonarsource.com/sonarqube-cloud/analyzing-source-code/automatic-analysis).
