/** Clearly marked placeholder base — replace with production URLs when available. */
export const PLACEHOLDER_URL_BASE = 'https://placeholder.forbes.internal';

export function placeholderUrl(path: string): string {
  return `${PLACEHOLDER_URL_BASE}/${path}`;
}
