/** llms.txt (RECETTE §21): what the site is, where its figures come from, its main pages. Built from the data. */
import type { APIRoute } from 'astro';
import { PAGES } from '../lib/guides';
import { route } from '../i18n/routes';
import { SITE_URL, LAST_UPDATED } from '../data/site-config';
import { STATES, META } from '../lib/engine/states';
export const GET: APIRoute = () => {
  const lines = [
    '# Tint Law Check',
    '',
    `> Window tint limits of the ${STATES.length} US jurisdictions (50 states and DC), in English and Spanish, read in each state's vehicle code: minimum visible light transmission (VLT) of the windshield strip, front side, rear side and back windows, separate rules for SUVs and vans, meter tolerance, medical exemption and fine, each linked to its statute section (checked ${META.newestCheck}). A calculator multiplies the film by the factory glass, as a tint meter reads them, and checks each window. Also: motorcycle helmet and radar detector rules by state. Published by Radif Partners; no film sales, no installer referrals. Updated ${LAST_UPDATED}.`,
    '',
    '## Tools and guides (English)',
    `- [Window tint check](${SITE_URL}${route('home', 'en')}): film × glass against the chosen state's statute.`,
    ...PAGES.map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`),
    '',
    '## En español',
    `- [Comprobar el polarizado](${SITE_URL}${route('home', 'es')})`,
    ...PAGES.filter((p) => p.es).map((p) => `- [${p.es!.nav}](${SITE_URL}${route(p.id, 'es')}): ${p.es!.card}`),
    '',
    '## Method',
    `- [How the check works](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
