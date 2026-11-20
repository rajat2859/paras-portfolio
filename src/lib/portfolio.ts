export interface ResolvedProjectLink {
  isConfigured: boolean;
  href: string | null;
  placeholderNote: string;
}

export interface SectionOffset {
  id: string;
  top: number;
}

const PLACEHOLDER_PATTERNS = [
  /^CONFIGURE_/i,
  /^REPLACE_/i,
  /^TODO/i,
  /^https?:\/\/(www\.)?example\.com/i,
  /^https?:\/\/github\.com\/your-username/i,
  /^#$/,
];

/**
 * Determines whether a configured project URL is still an editable placeholder
 * rather than a live published destination.
 */
export function isPlaceholderUrl(url: string | undefined | null): boolean {
  if (!url) return true;
  const trimmed = url.trim();
  if (!trimmed) return true;
  if (PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(trimmed))) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol !== 'https:' && parsed.protocol !== 'http:';
  } catch {
    return true;
  }
}

/**
 * Resolves whether a project action link should navigate externally or open
 * the project overview sheet with a configurable placeholder notice.
 */
export function resolveProjectLink(
  url: string | undefined | null,
  fieldKey: 'liveUrl' | 'sourceUrl'
): ResolvedProjectLink {
  if (isPlaceholderUrl(url)) {
    return {
      isConfigured: false,
      href: null,
      placeholderNote: `Editable placeholder (${fieldKey} in src/data/projects.ts). Replace with the live URL when deployed.`,
    };
  }

  return {
    isConfigured: true,
    href: url!.trim(),
    placeholderNote: '',
  };
}

/**
 * Formats a clean RFC-compliant mailto URI with optional subject and body.
 */
export function buildMailtoHref(
  email: string,
  subject?: string,
  body?: string
): string {
  const cleanEmail = email.trim();
  const params = new URLSearchParams();
  if (subject && subject.trim()) {
    params.set('subject', subject.trim());
  }
  if (body && body.trim()) {
    params.set('body', body.trim());
  }
  const query = params.toString().replace(/\+/g, '%20');
  return query ? `mailto:${cleanEmail}?${query}` : `mailto:${cleanEmail}`;
}

/**
 * Formats a clean tel: URI retaining digits and optional leading +.
 */
export function buildTelHref(phone: string): string {
  const cleaned = phone.trim().replace(/(?!^\+)[^\d]/g, '');
  return `tel:${cleaned}`;
}

/**
 * Formats a 10-digit Indian mobile number for clear typographic readability.
 */
export function formatDisplayPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone.trim();
}

/**
 * Determines which navigation section is currently active based on scroll position.
 */
export function getActiveSectionId(
  scrollY: number,
  sections: SectionOffset[],
  offsetBuffer = 160
): string {
  if (sections.length === 0) return 'home';

  const sorted = [...sections].sort((a, b) => a.top - b.top);
  const threshold = scrollY + offsetBuffer;
  let active = sorted[0].id;

  for (const section of sorted) {
    if (threshold >= section.top) {
      active = section.id;
    } else {
      break;
    }
  }

  return active;
}
