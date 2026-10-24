import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  en: { home: 'Tint check', method: 'How the check works', about: 'About', widget: 'Embed the check', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  es: { home: 'Comprobar polarizado', method: 'Cómo funciona el cálculo', about: 'Quiénes somos', widget: 'Insertar la calculadora', contact: 'Contacto', editorial: 'Política editorial', privacy: 'Privacidad', terms: 'Aviso legal', cookies: 'Cookies' },
};
const GROUP_LABEL: Record<Locale, Record<Group, string>> = {
  en: { tint: 'Tint rules', equipment: 'Other equipment laws', states: 'Tint laws by state' },
  es: { tint: 'Reglas del polarizado', equipment: 'Otras leyes de equipamiento', states: 'Polarizado por estado' },
};
export const GROUPS_ORDER: Group[] = ['tint', 'states', 'equipment'];
export const groupLabel = (g: Group, lang: Locale) => GROUP_LABEL[lang][g];
export const label = (id: string, lang: Locale = 'en') => CORE[lang][id] ?? (lang === 'es' ? pageById(id)?.es?.nav : undefined) ?? pageById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS_ORDER.map((g) => ({ label: GROUP_LABEL[lang][g], links: inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS_ORDER.filter((g) => g !== 'states').map((g) => ({ label: GROUP_LABEL[lang][g], links: inGroup(g, lang) })).filter((c) => c.links.length),
  { label: lang === 'es' ? 'Este sitio' : 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
export const popularLinks = (lang: Locale): NavLink[] => inGroup('states', lang);
