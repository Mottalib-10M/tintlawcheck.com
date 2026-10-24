/** Writing helpers handed to every page: links, state figures read from the data, tables, sources. */
import { route, hasRoute, ROUTES, type Locale } from '../i18n/routes';
import { STATES, stateByCode, stateName, vehicleRules, limitNum, META, type StateRec } from './engine/states';
import type { Limit } from './engine/tint';
import { formatNumberL, money, pct, dateL } from './format-l';
import P from '../data/params-2026.json';
import { limitLabel } from './labels';
export { limitLabel };

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = [], lang: Locale = 'en') {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export function helpers(lang: Locale, strict = false) {
  const es = lang === 'es';
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !process.env.PAGES_DRAFT) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const statePage = (code: string) => `state-${code.toLowerCase()}`;
  /** Link to a state's own page in this language when it exists, else its name. */
  const sl = (code: string, text?: string) => { const s = stateByCode(code); const n = text ?? stateName(s, lang); return hasRoute(statePage(code), lang) ? a(statePage(code), n) : n; };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const m = (n: number) => money(n, lang);
  const num = (n: number, d = 0) => formatNumberL(n, lang, d);
  const pc = (x: number) => pct(x, lang);
  const lim = (l: Limit) => limitLabel(l, lang);
  const nc = es ? 'no confirmado' : 'not confirmed';
  const S = (code: string) => {
    const s = stateByCode(code);
    const car = s.passenger;
    const mpv = s.multipurpose;
    const ws = car.windshield;
    const law = s.detail.statute[0];
    const pen = s.detail.penalty;
    const med = s.detail.medicalExemption;
    const sameMpv = !mpv || (['frontSide', 'backSide', 'rear'] as const).every((w) => mpv[w].vlt === car[w].vlt);
    const wsL = ws.rule === 'vlt'
      ? (es ? `${pct(ws.vlt as number, lang)} como mínimo en todo el parabrisas` : `at least ${pct(ws.vlt as number, lang)} across the windshield`)
      : ws.rule === 'none'
        ? (es ? 'ninguna lámina' : 'no film')
        : ws.stripInches && ws.asLine
          ? (es ? `franja sobre la línea AS-1 o en las ${ws.stripInches} pulgadas superiores` : `strip above the AS-1 line or in the top ${ws.stripInches} inches`)
          : ws.stripInches
            ? (es ? `franja en las ${ws.stripInches} pulgadas superiores` : `strip in the top ${ws.stripInches} inches`)
            : ws.asLine
              ? (es ? 'franja sobre la línea AS-1' : 'strip above the AS-1 line')
              : (es ? 'franja superior (sin medida en pulgadas)' : 'top strip (no inch figure)');
    return {
      ...s, s, nameL: stateName(s, lang),
      front: lim(car.frontSide.vlt), back: lim(car.backSide.vlt), rear: lim(car.rear.vlt),
      fN: car.frontSide.vlt, bN: car.backSide.vlt, rN: car.rear.vlt,
      mpv: sameMpv ? null : { front: lim(mpv!.frontSide.vlt), back: lim(mpv!.backSide.vlt), rear: lim(mpv!.rear.vlt), fN: mpv!.frontSide.vlt, bN: mpv!.backSide.vlt, rN: mpv!.rear.vlt },
      wsL, wsInches: ws.stripInches ?? null, wsAs: !!ws.asLine, wsRule: ws.rule, wsVlt: ws.vlt ?? null,
      tol: s.tolerancePoints, tolL: s.tolerancePoints ? (es ? `${num(s.tolerancePoints)} puntos` : `${num(s.tolerancePoints)} points`) : (es ? 'ninguna escrita' : 'none written'),
      law: law ? ext(law.url, law.cite) : nc, lawCite: law?.cite ?? '', lawUrl: law?.url ?? '',
      fine: pen?.maxFineUsd ?? null, fineL: pen?.maxFineUsd != null ? money(pen.maxFineUsd, lang) : nc,
      penLink: pen?.url ? ext(pen.url, pen.cite ?? law?.cite ?? '') : (pen?.cite ?? ''),
      medical: med?.available ?? null, medLink: med?.url ? ext(med.url, es ? 'texto de la exención' : 'exemption text') : '',
      colors: s.detail.colorsBanned, refl: s.detail.reflectivity, combined: s.measuredHow === 'combined',
      checked: dateL(s.checkedOn, lang), amended: s.detail.lastAmended,
    };
  };
  return {
    lang, es, a, sl, ext, src, m, num, pc, lim, nc, S, STATES, META, limitNum,
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al, lang),
    date: (iso: string) => dateL(iso, lang), stateName: (s: StateRec) => stateName(s, lang), vehicleRules,
    /** States sorted by a numeric field (nulls dropped). */
    rank: (f: (s: StateRec) => number | null, dir: 1 | -1 = 1) => STATES.filter((s) => f(s) != null).sort((x, y) => dir * ((f(x) as number) - (f(y) as number))),
    /** States matching a test, as a list of linked names ("Texas, Florida and Ohio"). */
    /** Same list without links (FAQ answers go into JSON-LD as plain text). */
    listN: (codes: string[]) => { const n = codes.map((c) => stateName(stateByCode(c), lang)); return n.length < 2 ? n.join('') : `${n.slice(0, -1).join(', ')} ${es ? (/^(?:I|Hi)/.test(n.at(-1)!) ? 'e' : 'y') : 'and'} ${n.at(-1)}`; },
    list: (codes: string[]) => { const n = codes.map((c) => sl(c)); return n.length < 2 ? n.join('') : `${n.slice(0, -1).join(', ')} ${es ? (/^(?:<a[^>]*>)?(?:I|Hi)/.test(n.at(-1)!) ? 'e' : 'y') : 'and'} ${n.at(-1)}`; },
    P,
  };
}
export type Helpers = ReturnType<typeof helpers>;
