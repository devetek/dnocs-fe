// utils/userAgent.ts

export const KNOWN_BROWSER = [
  'chrome',
  'chromium',
  'edge',
  'firefox',
  'safari',
  'opera',
] as const;

export type KnownBrowser = (typeof KNOWN_BROWSER)[number];

export type UserAgentInfo = {
  raw: string;
  isolatedRfc7231: string; // The full "Product/Version" string
} & (
  | { identified: 'bot'; botName: string; botVersion?: string }
  | {
      identified: 'user';
      known?: KnownBrowser;
      browserName: string;
      browserVersion?: string;
      os?: string;
    }
  | { identified: 'unknown' }
);

/**
 * Lightweight UA Parser
 * Prioritizes: Bots -> Specific Forks (Edge/Opera) -> Chromium -> Chrome -> Firefox -> Safari
 */
export const parseUserAgent = (uaString: string): UserAgentInfo => {
  if (!uaString) {
    return { raw: '', isolatedRfc7231: 'Empty/0.0', identified: 'unknown' };
  }

  const raw = uaString;
  const ua = raw.toLowerCase();

  // --- 1. DETECT BOTS ---
  // Matches "Name/Version" where Name contains bot/spider/crawl
  const botRegex =
    /([a-zA-Z0-9\-_]*(?:bot|spider|crawl|slurp|facebook|whatsapp)[a-zA-Z0-9\-_]*)\/([\d.]+)/i;
  const botMatch = raw.match(botRegex);

  // Fallback for bots without versions (e.g. "GenericBot")
  if (!botMatch && /bot|spider|crawl/i.test(ua)) {
    return {
      raw,
      isolatedRfc7231: 'GenericBot/0.0',
      identified: 'bot',
      botName: 'Generic Bot',
      botVersion: undefined,
    };
  }

  if (botMatch) {
    return {
      raw,
      isolatedRfc7231: botMatch[0],
      identified: 'bot',
      botName: botMatch[1]!,
      botVersion: botMatch[2],
    };
  }

  // --- 2. DETECT OS (Simple Heuristic) ---
  let os: string | undefined = undefined;
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  // --- 3. DETECT BROWSERS ---
  // Helper to extract version safely
  const getVersion = (pattern: RegExp) => (raw.match(pattern) || [])[1];

  // A. Edge (Chromium based)
  if (ua.includes('edg')) {
    const version = getVersion(/edg\/([\d.]+)/i);
    return {
      raw,
      isolatedRfc7231: `Edg/${version || '0.0'}`,
      identified: 'user',
      known: 'edge',
      browserName: 'Edge',
      browserVersion: version,
      os,
    };
  }

  // B. Opera
  if (ua.includes('opr') || ua.includes('opera')) {
    const version = getVersion(/(?:opr|opera)\/([\d.]+)/i);
    return {
      raw,
      isolatedRfc7231: `Opera/${version || '0.0'}`,
      identified: 'user',
      known: 'opera',
      browserName: 'Opera',
      browserVersion: version,
      os,
    };
  }

  // C. Other Chromium-based (Samsung, Yandex, UC) - NOT in 'KnownBrowser' list
  // We check these *before* Chrome to avoid misidentifying them as Chrome.
  if (ua.includes('samsungbrowser'))
    return mkUser('Samsung Internet', /samsungbrowser\/([\d.]+)/i);
  if (ua.includes('yabrowser')) return mkUser('Yandex', /yabrowser\/([\d.]+)/i);
  if (ua.includes('ucbrowser'))
    return mkUser('UC Browser', /ucbrowser\/([\d.]+)/i);

  // D. Explicit Chromium (Open Source builds, often Linux)
  if (ua.includes('chromium')) {
    const version = getVersion(/chromium\/([\d.]+)/i);
    return {
      raw,
      isolatedRfc7231: `Chromium/${version || '0.0'}`,
      identified: 'user',
      known: 'chromium',
      browserName: 'Chromium',
      browserVersion: version,
      os,
    };
  }

  // E. Chrome (Standard Google Chrome)
  if (ua.includes('chrome') || ua.includes('crios')) {
    // crios is Chrome on iOS
    const version = getVersion(/(?:chrome|crios)\/([\d.]+)/i);
    return {
      raw,
      isolatedRfc7231: `Chrome/${version || '0.0'}`,
      identified: 'user',
      known: 'chrome',
      browserName: 'Chrome',
      browserVersion: version,
      os,
    };
  }

  // F. Firefox
  if (ua.includes('firefox') || ua.includes('fxios')) {
    const version = getVersion(/(?:firefox|fxios)\/([\d.]+)/i);
    return {
      raw,
      isolatedRfc7231: `Firefox/${version || '0.0'}`,
      identified: 'user',
      known: 'firefox',
      browserName: 'Firefox',
      browserVersion: version,
      os,
    };
  }

  // G. Safari (Must be checked LAST as Chrome/Edge often include "Safari" in string)
  if (ua.includes('safari')) {
    const version = getVersion(/version\/([\d.]+)/i);
    return {
      raw,
      isolatedRfc7231: `Safari/${version || '0.0'}`,
      identified: 'user',
      known: 'safari',
      browserName: 'Safari',
      browserVersion: version,
      os,
    };
  }

  // --- 4. UNKNOWN ---
  return {
    raw,
    isolatedRfc7231: 'Unknown/0.0',
    identified: 'unknown',
  };

  // Helper for non-known users to keep code DRY
  function mkUser(name: string, regex: RegExp): UserAgentInfo {
    const version = getVersion(regex);
    return {
      raw,
      isolatedRfc7231: `${name.replace(/\s+/g, '')}/${version || '0.0'}`,
      identified: 'user',
      known: undefined, // Explicitly undefined as it's not in your KnownBrowser union
      browserName: name,
      browserVersion: version,
      os,
    };
  }
};
