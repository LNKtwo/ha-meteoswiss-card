import { html, TemplateResult } from 'lit';
import { get as _t } from 'lit-translate';
import { marked } from 'marked';
import { warningDate, warningPresentation } from './warning-labels';

function sanitizeHtml(dirty: string): string {
  const template = document.createElement('template');
  template.innerHTML = dirty;
  template.content
    .querySelectorAll('script,style,iframe,object,embed,form,meta,base')
    .forEach(el => el.remove());
  template.content.querySelectorAll('*').forEach(el => {
    Array.from(el.attributes).forEach(attr => {
      if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
    });
    if (el.tagName === 'A') {
      const href = el.getAttribute('href') ?? '';
      if (!/^https?:\/\//i.test(href)) el.removeAttribute('href');
    }
  });
  const div = document.createElement('div');
  div.appendChild(template.content);
  return div.innerHTML;
}
import type {
  HassEntity,
  RankedWarningAttributes,
  MeteoSwissWarning,
} from '../types/home-assistant';

export function rankedIconColorToCSS(iconColor: string): string {
  const map: Record<string, string> = {
    yellow: '#f6c90e',
    orange: '#e17055',
    red: '#007AFF',
    violet: '#8e44ad',
    gray: 'var(--disabled-text-color, #9e9e9e)',
  };
  return map[iconColor?.toLowerCase()] ?? 'var(--primary-text-color, #fff)';
}

export function renderRankedSlot(
  entity: HassEntity,
  slotId: string,
  openWarnings: Record<string, boolean>,
  toggle: (id: string) => void,
  effectiveAdditional = 0
): TemplateResult | null {
  const attrs = entity.attributes as RankedWarningAttributes & Record<string, any>;
  if (!attrs.has_warning) return null;

  const color = rankedIconColorToCSS(attrs.icon_color);
  const icon = attrs.icon || 'mdi:alert';
  const label = attrs.warning_type || attrs.level_name || entity.state;
  const isOpen = !!openWarnings[slotId];
  const hasContent = !!(attrs.html_text || attrs.text || attrs.links?.length);

  return html`
    <li style="margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <ha-icon icon="${icon}" style="color: ${color}; flex-shrink: 0;"></ha-icon>
        <div
          style="flex: 1; min-width: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px;"
        >
          <span style="font-weight: bold;">${label}</span>
          ${
            attrs.level_name
              ? html`<span style="font-size: 12px; opacity: 0.8;">(${attrs.level_name})</span>`
              : ''
          }
          ${
            effectiveAdditional > 0
              ? html`<span
                  style="font-size: 12px; opacity: 0.75;"
                  title="${_t('warning.warnings_additional', { count: effectiveAdditional })}"
                >
                  +${effectiveAdditional}
                </span>`
              : ''
          }
        </div>
        ${
          hasContent
            ? html`
                <button
                  @click=${() => toggle(slotId)}
                  style="background:none;border:none;cursor:pointer;color:var(--primary-text-color,#fff);font-size:16px;flex-shrink:0;"
                  title="${isOpen ? _t('collapse') : _t('expand')}"
                  aria-label="${isOpen ? _t('collapse') : _t('expand')}"
                >
                  <ha-icon icon="${isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon>
                </button>
              `
            : ''
        }
      </div>
      ${
        isOpen
          ? html`
              <div style="margin-top: 6px; font-size: 13px; opacity: 0.85;">
                ${
                  attrs.valid_from || attrs.valid_to
                    ? html`
                        <div style="margin-bottom: 4px;">
                          ${
                            attrs.valid_from
                              ? html`<strong>${_t('warning.valid_from')}: </strong>${new Date(
                                    attrs.valid_from
                                  ).toLocaleString()}&nbsp;`
                              : ''
                          }
                          ${
                            attrs.valid_to
                              ? html`<strong>${_t('warning.valid_to')}: </strong>${new Date(
                                    attrs.valid_to
                                  ).toLocaleString()}`
                              : ''
                          }
                        </div>
                      `
                    : ''
                }
                ${
                  attrs.html_text
                    ? html`<div
                        style="line-height: 1.4; margin-bottom: 4px;"
                        .innerHTML="${sanitizeHtml(attrs.html_text)}"
                      ></div>`
                    : attrs.text
                      ? html`<div style="line-height: 1.4; margin-bottom: 4px;">${attrs.text}</div>`
                      : ''
                }
                ${
                  attrs.links?.length
                    ? html`
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                          ${attrs.links.map(
                            (l: { url: string; text: string; alt_url?: string }) => html`
                              <a
                                href="${l.url.startsWith('http') ? l.url : (l.alt_url ?? l.url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                style="color: var(--primary-text-color, #fff); text-decoration: underline; display: flex; align-items: center; gap: 4px;"
                              >
                                <ha-icon icon="mdi:link-variant" style="font-size: 14px;"></ha-icon>
                                ${l.text}
                              </a>
                            `
                          )}
                        </div>
                      `
                    : ''
                }
              </div>
            `
          : ''
      }
    </li>
  `;
}

export function renderRankedWarnings(
  primaryEntity: HassEntity,
  secondaryEntity: HassEntity | null | undefined,
  tertiaryEntity: HassEntity | null | undefined,
  openWarnings: Record<string, boolean>,
  toggle: (id: string) => void
): TemplateResult | null {
  const primaryAttrs = primaryEntity.attributes as RankedWarningAttributes & Record<string, any>;
  if (!primaryAttrs.has_warning) return null;

  const containerClass =
    (
      {
        red: 'danger',
        violet: 'danger',
        orange: 'severe',
        yellow: 'warning',
      } as Record<string, string>
    )[primaryAttrs.icon_color?.toLowerCase()] ?? 'info';

  const secondaryActive = !!(secondaryEntity?.attributes as any)?.has_warning;
  const tertiaryActive = !!(tertiaryEntity?.attributes as any)?.has_warning;
  const rawAdditional = primaryAttrs.additional_warning_count ?? 0;
  const effectiveAdditional = Math.max(
    rawAdditional - (secondaryActive ? 1 : 0) - (tertiaryActive ? 1 : 0),
    0
  );
  const totalCount = 1 + rawAdditional;
  const title =
    totalCount === 1
      ? _t('warning.weather_warning')
      : _t('warning.weather_warnings', { count: totalCount });

  const slots = [
    renderRankedSlot(primaryEntity, 'primary', openWarnings, toggle, effectiveAdditional),
    secondaryEntity ? renderRankedSlot(secondaryEntity, 'secondary', openWarnings, toggle) : null,
    tertiaryEntity ? renderRankedSlot(tertiaryEntity, 'tertiary', openWarnings, toggle) : null,
  ].filter(Boolean);

  return html`
    <div class="warning-section ${containerClass}">
      <strong>${title}</strong>
      <ul style="margin: 6px 0 0 0; padding-left: 18px;">
        ${slots}
      </ul>
    </div>
  `;
}

export function renderLegacyWarnings(
  warningEntity: HassEntity,
  openWarnings: Record<string, boolean>,
  toggle: (id: string) => void
): TemplateResult | null {
  const warnings: MeteoSwissWarning[] = [];
  if (
    warningEntity.attributes.warning_levels &&
    Array.isArray(warningEntity.attributes.warning_levels)
  ) {
    for (let i = 0; i < warningEntity.attributes.warning_levels.length; i++)
      warnings.push({
        id: `warning_${i}`,
        title: warningEntity.attributes.warning_levels[i],
        level: warningEntity.attributes.warning_levels[i],
        type: warningEntity.attributes.warning_types[i],
        description: warningEntity.attributes.warning_texts[i],
        valid_from: warningEntity.attributes.warning_valid_from[i],
        valid_to: warningEntity.attributes.warning_valid_to[i],
        link: warningEntity.attributes.warning_links[i],
        regions: [],
        phenomena: [],
      });
  }
  if (warnings.length === 0) return null;

  const maxLevel = Math.max(...warnings.map(w => w.level || 0));
  const containerClass =
    maxLevel >= 4 ? 'danger' : maxLevel >= 3 ? 'severe' : maxLevel >= 2 ? 'warning' : 'info';

  const levelToColor = (level: number): string => {
    if (level >= 4) return '#007AFF';
    if (level >= 3) return '#e17055';
    if (level >= 2) return '#f6c90e';
    return 'var(--primary-text-color, #fff)';
  };

  const typeToIcon: Record<string, string> = {
    storm: 'mdi:weather-lightning',
    thunderstorms: 'mdi:weather-lightning-rainy',
    rain: 'mdi:weather-pouring',
    snow: 'mdi:snowflake',
    wind: 'mdi:weather-windy',
    fog: 'mdi:weather-fog',
    heat: 'mdi:weather-sunny-alert',
    heat_waves: 'mdi:thermometer-high',
    cold: 'mdi:snowflake-alert',
    frost: 'mdi:snowflake-thermometer',
    thaw: 'mdi:thermometer-high',
    flood: 'mdi:waves-arrow-up',
    drought: 'mdi:water-off',
    avalanches: 'mdi:snowflake-alert',
    slippery_roads: 'mdi:car-brake-alert',
    forest_fires: 'mdi:fire-alert',
    earthquakes: 'mdi:pulse',
    default: 'mdi:alert',
  };

  return html`
    <div class="warning-section ${containerClass}">
      <strong>${_t('warning.weather_warning')}</strong>
      <ul style="margin: 6px 0 0 0; padding-left: 18px;">
        ${warnings.map(
          w => html`
            <li style="margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <ha-icon
                  icon="${typeToIcon[w.type?.toLowerCase?.()] || typeToIcon.default}"
                  style="color: ${levelToColor(w.level)};"
                ></ha-icon>
                <span style="font-weight: bold;">${w.title}</span>
                ${
                  w.link
                    ? html`
                        <a
                          href="${w.link}"
                          target="_blank"
                          rel="noopener noreferrer"
                          style="color: var(--primary-text-color, #fff); text-decoration: underline; display: flex; align-items: center;"
                        >
                          <ha-icon icon="mdi:link-variant" style="font-size: 16px;"></ha-icon>
                        </a>
                      `
                    : ''
                }
                <button
                  @click=${() => toggle(w.id)}
                  style="background:none;border:none;cursor:pointer;color:var(--primary-text-color,#fff);font-size:16px;"
                  title="${openWarnings[w.id] ? _t('collapse') : _t('expand')}"
                  aria-label="${openWarnings[w.id] ? _t('collapse') : _t('expand')}"
                >
                  <ha-icon
                    icon="${openWarnings[w.id] ? 'mdi:chevron-up' : 'mdi:chevron-down'}"
                  ></ha-icon>
                </button>
              </div>
              ${
                openWarnings[w.id] && w.description
                  ? html`
                      <div>
                        <strong>${_t('warning.valid_from')}: </strong>
                        ${w.valid_from ? new Date(w.valid_from).toLocaleString() : _t('unknown')}
                        <strong>${_t('warning.valid_to')}: </strong>
                        ${w.valid_to ? new Date(w.valid_to).toLocaleString() : _t('unknown')}
                      </div>
                      <div
                        style="font-size: 14px; line-height: 1.4; margin-top: 4px;"
                        .innerHTML="${sanitizeHtml(String(marked.parse(w.description || '')))}"
                      ></div>
                    `
                  : ''
              }
            </li>
          `
        )}
      </ul>
    </div>
  `;
}

export function renderWarningsUnavailable(): TemplateResult {
  return html`<div class="no-warnings" role="status">${_t('warning.warnings_unavailable')}</div>`;
}

function warningUnavailable(entity: HassEntity): boolean {
  return entity.state === 'unavailable' || entity.state === 'unknown'
    || entity.attributes?.data_status === 'unavailable'
    || entity.attributes?.data_status === 'unknown';
}

export function renderWarningSection(
  warningEntity: HassEntity | null | undefined,
  primaryEntity: HassEntity | null | undefined,
  secondaryEntity: HassEntity | null | undefined,
  tertiaryEntity: HassEntity | null | undefined,
  openWarnings: Record<string, boolean>,
  toggle: (id: string) => void,
  hass?: any
): TemplateResult | null {
  // Check availability before attributes: HA can retain last-good warnings.
  if (primaryEntity && warningUnavailable(primaryEntity)) return renderWarningsUnavailable();
  // 1. Ranked model (primary/secondary/tertiary entities)
  if (primaryEntity && primaryEntity.attributes?.has_warning !== undefined) {
    return renderRankedWarnings(
      primaryEntity,
      secondaryEntity,
      tertiaryEntity,
      openWarnings,
      toggle
    );
  }
  if (warningEntity && warningUnavailable(warningEntity)) return renderWarningsUnavailable();
  // 2. Legacy model (single warning entity with warning_levels)
  if (warningEntity && warningEntity.attributes?.warning_levels) {
    return renderLegacyWarnings(warningEntity, openWarnings, toggle);
  }
  // 3. LNKtwo/ha-meteoswiss model
  if (warningEntity && (warningEntity.state === 'on' || warningEntity.attributes?.alerts !== undefined)) {
    return renderMeteoSwissWarnings(warningEntity, openWarnings, toggle, hass);
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════
// LNKtwo/ha-meteoswiss Warning Renderer
// binary_sensor.meteoswiss_{station}_any_alert
// Attributes: active_alerts_count, alerts: [{warn_type, warn_level, warn_type_name,
//   warn_level_name, title, description, valid_from, valid_to, alert_id, outlook, ...}]
// ═══════════════════════════════════════════════════════════════
function renderMeteoSwissWarnings(
  warningEntity: HassEntity,
  openWarnings: Record<string, boolean>,
  toggle: (id: string) => void,
  hass?: any
): TemplateResult | null {
  const attrs = warningEntity.attributes as Record<string, any>;
  const rawAlerts: unknown = attrs.alerts ?? [];
  if (!Array.isArray(rawAlerts)
    || rawAlerts.some(a => !a || typeof a !== 'object' || Array.isArray(a))) {
    return renderWarningsUnavailable();
  }
  // The integration owns active/upcoming timing. A valid off state must not
  // become an active warning merely because an empty alerts array is truthy.
  if (warningEntity.state === 'off') return null;
  const alerts = rawAlerts.filter(a => !a.outlook);
  if (alerts.length === 0) {
    if (rawAlerts.length > 0) return null; // Outlooks are not active warnings.
    if (warningEntity.state !== 'on') return renderWarningsUnavailable();
    // Older integrations can signal an active warning without details.
    const count = typeof attrs.active_alerts_count === 'number'
      && Number.isInteger(attrs.active_alerts_count) && attrs.active_alerts_count > 0
      ? attrs.active_alerts_count : 0;
    return html`
      <div class="ms-section" style="margin: 10px 16px;">
        <div style="display:flex;align-items:center;gap:8px;padding:12px;border-radius:10px;background:#f6c90e15;">
          <ha-icon icon="mdi:alert" style="color:#f6c90e;flex-shrink:0;"></ha-icon>
          <div style="flex:1;font-size:13px;">${_t('warning.weather_warning')}${count > 0 ? ` (${count})` : ''}</div>
        </div>
      </div>
    `;
  }

  const levelColors: Record<number, string> = {
    1: '#4CAF50', 2: '#f6c90e', 3: '#FF9800', 4: '#f44336', 5: '#9C27B0',
  };
  return html`
    <div style="margin: 10px 16px;">
      ${alerts.map((alert, idx) => {
        const id = `ms_alert_${idx}`;
        const { typeName, levelName, icon, level } = warningPresentation(alert, attrs, hass);
        const color = level !== null ? levelColors[level] : '#9e9e9e';
        // Keep the event-specific provider text. A severity level alone cannot
        // establish a local prohibition or justify substituting generic advice.
        const description = typeof alert.description === 'string' ? alert.description : '';
        const isOpen = !!openWarnings[id];
        const validFrom = warningDate(alert.valid_from ?? alert.start, hass);
        const validTo = warningDate(alert.valid_to === 'None' ? alert.end : (alert.valid_to ?? alert.end), hass);
        return html`
          <div style="
            display: flex; align-items: flex-start; gap: 10px;
            padding: 12px; border-radius: 10px; margin-bottom: 8px;
            background: ${color}18; border-left: 4px solid ${color};
          ">
            <ha-icon icon="${icon}" style="color:${color};flex-shrink:0;margin-top:2px;--mdc-icon-size:24px;"></ha-icon>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:600;font-size:14px;color:${color};">${typeName}</div>
              <div style="font-size:12px;opacity:0.8;margin-top:2px;">${levelName}</div>
              ${validFrom || validTo ? html`
                <div style="font-size:11px;opacity:0.65;margin-top:3px;">
                  ${validFrom ? html`${_t('warning.valid_from')}: ${validFrom}` : ''}
                  ${validTo ? html` ${_t('warning.valid_to')}: ${validTo}` : ''}
                </div>` : ''}
              ${description && isOpen ? html`
                <div style="font-size:12px;margin-top:8px;line-height:1.5;opacity:0.85;white-space:pre-wrap;border-top:1px solid ${color}33;padding-top:6px;">${description}</div>
              ` : ''}
              ${!isOpen && description ? html`
                <div style="font-size:11px;margin-top:4px;opacity:0.6;">${description.substring(0, 80)}${description.length > 80 ? '…' : ''}</div>
              ` : ''}
            </div>
            ${description ? html`
              <button @click=${() => toggle(id)}
                title="${isOpen ? _t('collapse') : _t('expand')}"
                aria-label="${isOpen ? _t('collapse') : _t('expand')}"
                aria-expanded="${isOpen}"
                style="background:none;border:none;cursor:pointer;color:inherit;flex-shrink:0;padding:4px;">
                <ha-icon icon="${isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon>
              </button>` : ''}
          </div>
        `;
      })}
    </div>
  `;
}
