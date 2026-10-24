/** Labels shared by the tools and the pages (no import of the page registry: safe in client bundles). */
import type { Limit } from './engine/tint';
import { pct } from './format-l';

/** Label of a VLT limit in a page language. */
export function limitLabel(l: Limit, lang: 'en' | 'es'): string {
  if (l === 'any') return lang === 'es' ? 'cualquier oscuridad' : 'any darkness';
  if (l === 'no-film') return lang === 'es' ? 'sin lámina' : 'no film';
  if (l === null) return lang === 'es' ? 'sin cifra en la ley' : 'no figure in the law';
  return pct(l, lang);
}
