/**
 * How each state's text was read on the day of the check, in the page language:
 * on the official site, on a dated archived copy of the official page, or not confirmed.
 * The date of an archived copy is the date of the copy, never the day of reading.
 */
import { dateL, type L } from './format-l';

export interface ReadInfo {
  how: 'official' | 'archive' | 'unconfirmed';
  date: string;
  host: string;
  docEn?: string;
  docEs?: string;
  noteEn?: string;
  noteEs?: string;
}

export function readNote(r: ReadInfo | null | undefined, lang: L): string {
  if (!r) return '';
  const es = lang === 'es';
  const d = dateL(r.date, lang);
  const doc = es ? r.docEs : r.docEn;
  if (r.how === 'official') return es ? `Leído el ${d} en el sitio oficial ${r.host}${doc ? ` (${doc})` : ''}.` : `Read on ${d} on the official site ${r.host}${doc ? ` (${doc})` : ''}.`;
  if (r.how === 'archive') return es ? `Leído en una copia archivada (web.archive.org) de la página oficial de ${r.host}, fechada el ${d}${doc ? ` (${doc})` : ''}; el sitio oficial no respondía a la lectura automática.` : `Read on an archived copy (web.archive.org) of the official page on ${r.host}, dated ${d}${doc ? ` (${doc})` : ''}; the official site did not answer automated reading.`;
  return (es ? 'No confirmado en un texto oficial. ' : 'Not confirmed on an official text. ') + ((es ? r.noteEs : r.noteEn) ?? '');
}
