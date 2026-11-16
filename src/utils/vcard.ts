import type { ContactProfile } from '../data/cardData';

/**
 * Escapes special characters per RFC 2426 (vCard 3.0).
 */
function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

export interface VCardOptions {
  includeOfficeTel?: boolean;
}

/**
 * Builds an RFC 2426 vCard 3.0 string with explicit UTF-8 charset annotations
 * on Korean fields so both iOS Contacts and Android/Samsung Contacts decode
 * Korean characters cleanly without mojibake.
 * Prioritizes the personal mobile number (TYPE=CELL;TYPE=PREF).
 */
export function buildVCardString(
  profile: ContactProfile,
  options: VCardOptions = {},
): string {
  const { includeOfficeTel = true } = options;

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N;CHARSET=UTF-8:${escapeVCardValue('박')};${escapeVCardValue('상용')};;;`,
    `FN;CHARSET=UTF-8:${escapeVCardValue(profile.name)}`,
    `ORG;CHARSET=UTF-8:${escapeVCardValue(profile.organization)}`,
    `TITLE;CHARSET=UTF-8:${escapeVCardValue(profile.title)}`,
    `TEL;TYPE=CELL;TYPE=PREF:${profile.mobile}`,
    ...(includeOfficeTel ? [`TEL;TYPE=WORK:${profile.tel}`] : []),
    `EMAIL;TYPE=INTERNET;TYPE=WORK:${profile.email}`,
    `ADR;TYPE=WORK;CHARSET=UTF-8:;;${escapeVCardValue(profile.address)};;;;${escapeVCardValue('대한민국')}`,
    `URL:${profile.url}`,
    `NOTE;CHARSET=UTF-8:${escapeVCardValue(`${profile.organization} ${profile.title} · 개인번호 ${profile.mobile}`)}`,
    'END:VCARD',
  ];

  return `${lines.join('\r\n')}\r\n`;
}

export function downloadVCard(
  profile: ContactProfile,
  options: VCardOptions = {},
): void {
  const vcardContent = buildVCardString(profile, options);
  const blob = new Blob([vcardContent], {
    type: 'text/vcard;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = profile.fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Allow mobile browsers time to initiate file handoff before revoking.
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 4000);
}
