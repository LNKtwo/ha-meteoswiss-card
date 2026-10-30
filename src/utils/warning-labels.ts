// Warning numbers belong to the integration's source catalogue. Do not infer
// their meaning from another API version or from the card's historical table.
type WarningData = Record<string, any>;

interface WarningFamily {
  de: string;
  en: string;
  icon: string;
}

const FAMILIES: Record<string, WarningFamily> = {
  wind: { de: 'Wind', en: 'Wind', icon: 'mdi:weather-windy' },
  thunderstorm: { de: 'Gewitter', en: 'Thunderstorm', icon: 'mdi:weather-lightning-rainy' },
  rain: { de: 'Regen', en: 'Rain', icon: 'mdi:weather-pouring' },
  snow: { de: 'Schnee', en: 'Snow', icon: 'mdi:snowflake' },
  frost: { de: 'Frost', en: 'Frost', icon: 'mdi:snowflake-thermometer' },
  ground_frost: { de: 'Bodenfrost', en: 'Ground Frost', icon: 'mdi:snowflake-thermometer' },
  slippery_roads: { de: 'Strassenglätte', en: 'Slippery Roads', icon: 'mdi:car-brake-alert' },
  black_ice: { de: 'Glätte', en: 'Black Ice', icon: 'mdi:snowflake-alert' },
  road_conditions: { de: 'Strassenverhältnisse', en: 'Road Conditions', icon: 'mdi:car-brake-alert' },
  thaw: { de: 'Tauwetter', en: 'Thaw', icon: 'mdi:thermometer-high' },
  heat: { de: 'Hitze', en: 'Heat', icon: 'mdi:weather-sunny-alert' },
  cold: { de: 'Kälte', en: 'Cold', icon: 'mdi:thermometer-low' },
  fog: { de: 'Nebel', en: 'Fog', icon: 'mdi:weather-fog' },
  forest_fire: { de: 'Waldbrand', en: 'Forest Fire', icon: 'mdi:fire-alert' },
  flood: { de: 'Hochwasser', en: 'Flood', icon: 'mdi:waves-arrow-up' },
  avalanche: { de: 'Lawinen', en: 'Avalanches', icon: 'mdi:snowflake-alert' },
  earthquake: { de: 'Erdbeben', en: 'Earthquakes', icon: 'mdi:pulse' },
  drought: { de: 'Trockenheit', en: 'Drought', icon: 'mdi:water-off' },
};

const ALIASES: Record<string, string> = {
  thunderstorms: 'thunderstorm',
  snowfall: 'snow',
  forest_fires: 'forest_fire',
  floods: 'flood',
  avalanches: 'avalanche',
  earthquakes: 'earthquake',
};

const LEVELS: Record<number, { de: string; en: string }> = {
  1: { de: 'Keine oder geringe Gefahr', en: 'Level 1 - No/minor danger' },
  2: { de: 'Mässige Gefahr', en: 'Level 2 - Moderate danger' },
  3: { de: 'Markante Gefahr', en: 'Level 3 - Significant danger' },
  4: { de: 'Grosse Gefahr', en: 'Level 4 - High danger' },
  5: { de: 'Sehr grosse Gefahr', en: 'Level 5 - Very high danger' },
};

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function family(name: string | undefined): WarningFamily | undefined {
  const key = name?.trim().toLowerCase().replace(/[\s-]+/g, '_') ?? '';
  const canonicalKey = Object.hasOwn(ALIASES, key) ? ALIASES[key] : key;
  return Object.hasOwn(FAMILIES, canonicalKey) ? FAMILIES[canonicalKey] : undefined;
}

function catalogueLabel(
  attributes: WarningData,
  language: string,
  group: 'types' | 'levels',
  code: unknown
): string | undefined {
  if (typeof code !== 'number' || !Number.isInteger(code)) return undefined;
  const values = attributes.warning_labels?.[language]?.[group];
  if (!values || typeof values !== 'object' || Array.isArray(values)) return undefined;
  return text(values[String(code)]);
}

export function warningLocale(hass?: WarningData): string {
  return text(hass?.selectedLanguage) || text(hass?.language) || 'en';
}

export function warningPresentation(
  alert: WarningData,
  attributes: WarningData,
  hass?: WarningData
): { typeName: string; levelName: string; icon: string; level: number | null } {
  const language = warningLocale(hass).toLowerCase().split(/[-_]/)[0];
  const fallbackLanguage = language === 'de' ? 'de' : 'en';
  const rawName = text(alert.warn_type_name);
  const localizedName = catalogueLabel(attributes, language, 'types', alert.warn_type);
  const englishName = catalogueLabel(attributes, 'en', 'types', alert.warn_type);
  // The English catalogue identifies the icon semantically, even if old
  // warn_type_name data disagrees with a supplied, source-specific catalogue.
  const semanticFamily = family(englishName || rawName);
  const code = typeof alert.warn_type === 'number' && Number.isInteger(alert.warn_type)
    ? ` (${alert.warn_type})` : '';
  const typeName = localizedName
    || (englishName ? (semanticFamily?.[fallbackLanguage] || englishName)
      : (family(rawName)?.[fallbackLanguage] || rawName))
    || text(alert.title)
    || `${language === 'de' ? 'Unbekannte Warnungsart' : 'Unknown warning type'}${code}`;
  const rawLevel = alert.warn_level ?? alert.level;
  const level = typeof rawLevel === 'number' && Number.isInteger(rawLevel)
    && rawLevel >= 1 && rawLevel <= 5 ? rawLevel : null;
  const levelName = catalogueLabel(attributes, language, 'levels', level)
    || (level !== null && language === 'de' ? LEVELS[level].de : undefined)
    || text(alert.warn_level_name)
    || (level !== null ? LEVELS[level].en
      : (language === 'de' ? 'Unbekannte Gefahrenstufe' : 'Unknown danger level'));
  // Without an English catalogue, a translated label may describe another
  // family than the old name. Use a neutral icon instead of guessing a code.
  const icon = localizedName && !englishName
    ? 'mdi:alert' : (semanticFamily?.icon || 'mdi:alert');
  return { typeName, levelName, icon, level };
}

export function warningDate(value: unknown, hass?: WarningData): string {
  if ((typeof value !== 'string' && typeof value !== 'number') || value === 'None') return '';
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return '';
  try {
    return date.toLocaleString(warningLocale(hass), {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
      timeZone: hass?.config?.time_zone,
    });
  } catch {
    return date.toISOString();
  }
}
