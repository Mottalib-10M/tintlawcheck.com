/**
 * Mini-tools of the guides (RECETTE §9.3): one subject = one calculation, always through the engine
 * (`lib/engine/tint.ts`) and the state file, never a second formula. Both languages here.
 */
import type { MiniSpec } from './mini-types';
import { STATES, stateName, vehicleRules } from './engine/states-lite';
import { combinedVlt, darkestLegalFilm, darknessToVlt, round1, type Limit } from './engine/tint';
import { limitLabel } from './labels';
import { money, pct } from './format-l';

type L = 'en' | 'es';
const opts = (lang: L) => STATES.map((s, i) => ({ value: String(i), label: stateName(s, lang) }));
const at = (v: Record<string, number>, k = 'state') => STATES[Math.max(0, Math.min(STATES.length - 1, Math.round(v[k] ?? 0)))];
export const stateIdx = (code: string) => Math.max(0, STATES.findIndex((s) => s.code === code));
const DEF = stateIdx('TX');
const W = (lang: L) => (lang === 'es'
  ? { nc: 'no confirmado', state: 'Estado', yes: 'Sí', no: 'No', front: 'Laterales delanteras', back: 'Laterales traseras', rear: 'Vidrio trasero', car: 'Auto', mpv: 'SUV, van o pickup', vehicle: 'Vehículo' }
  : { nc: 'not confirmed', state: 'State', yes: 'Yes', no: 'No', front: 'Front side windows', back: 'Rear side windows', rear: 'Back window', car: 'Car', mpv: 'SUV, van or pickup', vehicle: 'Vehicle' });
const kindOpts = (lang: L) => [{ value: '0', label: W(lang).car }, { value: '1', label: W(lang).mpv }];
/** Darkest film on a glass for a limit, as a label. */
const darkestL = (l: Limit, glass: number, lang: L) => {
  if (l === 'any') return lang === 'es' ? 'cualquier lámina' : 'any film';
  if (l === 'no-film') return lang === 'es' ? 'ninguna lámina' : 'no film';
  if (l === null) return W(lang).nc;
  const d = darkestLegalFilm(l, glass);
  return d == null ? (lang === 'es' ? 'ninguna: el vidrio ya está bajo el límite' : 'none: the glass is already below the limit') : pct(d, lang);
};

const SPECS: Record<string, (lang: L) => MiniSpec> = {
  /** Window tint percentage: layers multiply. */
  stack: (lang) => ({
    title: lang === 'es' ? 'Porcentaje real de varias capas' : 'Real percentage of stacked layers', cta: lang === 'es' ? 'Comprobar cada ventana en su estado' : 'Check every window in your state', ctaPage: 'home',
    inputs: [
      { id: 'glass', label: lang === 'es' ? 'Vidrio de fábrica' : 'Factory glass', def: 75, unit: '%', max: 100 },
      { id: 'film', label: lang === 'es' ? 'Lámina' : 'Film', def: 35, unit: '%', max: 100 },
      { id: 'film2', label: lang === 'es' ? 'Segunda lámina (100 = ninguna)' : 'Second film (100 = none)', def: 100, unit: '%', max: 100 },
    ],
    run: (v) => {
      const g = Math.max(0, Math.min(100, v.glass)), f = Math.max(0, Math.min(100, v.film)), f2 = Math.max(0, Math.min(100, v.film2));
      const c = combinedVlt(g, f, f2);
      return {
        head: [lang === 'es' ? 'VLT combinada (lo que lee el medidor)' : 'Combined VLT (what a meter reads)', pct(c, lang)],
        rows: [
          [lang === 'es' ? 'Luz bloqueada' : 'Light blocked', pct(round1(100 - c), lang)],
          [lang === 'es' ? 'Diferencia con la lámina sola' : 'Below the film alone', pct(round1(f - c), lang)],
          [lang === 'es' ? 'Cálculo' : 'Formula', `${g} × ${f}${f2 < 100 ? ` × ${f2}` : ''} / 100${f2 < 100 ? '²' : ''}`],
        ],
      };
    },
  }),
  /** "% darkness" as some sellers write it, turned into VLT. */
  darkness: (lang) => ({
    title: lang === 'es' ? 'De «% de oscuridad» a VLT' : 'From "% dark" to VLT', cta: lang === 'es' ? 'Ver el límite de su estado' : 'See your state\'s limit', ctaPage: 'legal-percentage',
    inputs: [{ id: 'dark', label: lang === 'es' ? 'Oscuridad anunciada' : 'Darkness advertised', def: 80, unit: '%', max: 100 }],
    run: (v) => {
      const vlt = darknessToVlt(Math.max(0, Math.min(100, v.dark)));
      const ok = STATES.filter((s) => { const l = s.passenger.frontSide.vlt; return l === 'any' || (typeof l === 'number' && combinedVlt(70, vlt) >= l); }).length;
      return {
        head: [lang === 'es' ? 'VLT de esa lámina' : 'VLT of that film', pct(vlt, lang)],
        rows: [
          [lang === 'es' ? 'Sobre un vidrio de 70 %' : 'On 70% glass', pct(combinedVlt(70, vlt), lang)],
          [lang === 'es' ? 'Estados donde pasa adelante (auto)' : 'States where it passes in front (car)', `${ok} / ${STATES.length}`],
        ],
      };
    },
  }),
  /** Legal tint percentage: darkest film per window for a state and a glass. */
  darkest: (lang) => ({
    title: lang === 'es' ? 'Lámina más oscura permitida en su auto' : 'Darkest legal film for your car', cta: lang === 'es' ? 'Comprobar mi polarizado' : 'Check my tint', ctaPage: 'home',
    inputs: [
      { id: 'state', label: W(lang).state, def: DEF, options: opts(lang) },
      { id: 'kind', label: W(lang).vehicle, def: 0, options: kindOpts(lang) },
      { id: 'glass', label: lang === 'es' ? 'Vidrio de fábrica' : 'Factory glass', def: 75, unit: '%', max: 100 },
    ],
    run: (v) => {
      const s = at(v), r = vehicleRules(s, v.kind === 1 ? 'multipurpose' : 'passenger'), g = Math.max(1, Math.min(100, v.glass)), w = W(lang);
      const film = s.measuredHow === 'film';
      const d = (l: Limit) => (film && typeof l === 'number' ? pct(l, lang) : darkestL(l, g, lang));
      return {
        head: [`${w.front} · ${stateName(s, lang)}`, d(r.frontSide.vlt)],
        rows: [[w.back, d(r.backSide.vlt)], [w.rear, d(r.rear.vlt)], [lang === 'es' ? 'Límite delantero de la ley' : 'Front limit in the law', limitLabel(r.frontSide.vlt, lang)]],
        note: s.frontByRear ? (lang === 'es' ? 'Illinois: el límite delantero depende de las ventanas traseras (35 % si ninguna baja del 35 %).' : 'Illinois: the front limit depends on the rear windows (35% if none is below 35%).') : undefined,
      };
    },
  }),
  /** Two states side by side (moving, road trip). */
  compare: (lang) => ({
    title: lang === 'es' ? 'Comparar dos estados' : 'Compare two states', cta: lang === 'es' ? 'Comprobar mi auto' : 'Check my car', ctaPage: 'home',
    inputs: [
      { id: 'state', label: lang === 'es' ? 'Estado actual' : 'Current state', def: stateIdx('CA'), options: opts(lang) },
      { id: 'b', label: lang === 'es' ? 'Estado de destino' : 'Destination state', def: DEF, options: opts(lang) },
    ],
    run: (v) => {
      const a = at(v), b = at(v, 'b'), w = W(lang);
      const fa = a.passenger.frontSide.vlt, fb = b.passenger.frontSide.vlt;
      const stricter = typeof fa === 'number' && typeof fb === 'number' ? (fb > fa ? b : fb < fa ? a : null) : null;
      return {
        head: [`${w.front}: ${stateName(a, lang)} / ${stateName(b, lang)}`, `${limitLabel(fa, lang)} / ${limitLabel(fb, lang)}`],
        rows: [
          [w.back, `${limitLabel(a.passenger.backSide.vlt, lang)} / ${limitLabel(b.passenger.backSide.vlt, lang)}`],
          [w.rear, `${limitLabel(a.passenger.rear.vlt, lang)} / ${limitLabel(b.passenger.rear.vlt, lang)}`],
          [lang === 'es' ? 'Más estricto adelante' : 'Stricter in front', stricter ? stateName(stricter, lang) : (lang === 'es' ? 'igual o sin cifra' : 'same or no figure')],
        ],
      };
    },
  }),
  /** Windshield: strip depth against the statute. */
  windshield: (lang) => ({
    title: lang === 'es' ? '¿Su franja del parabrisas es legal?' : 'Is your windshield strip legal?', cta: lang === 'es' ? 'Comprobar las demás ventanas' : 'Check the other windows', ctaPage: 'home',
    inputs: [
      { id: 'state', label: W(lang).state, def: DEF, options: opts(lang) },
      { id: 'inches', label: lang === 'es' ? 'Altura de la franja' : 'Strip depth', def: 5, unit: 'in', max: 60, decimals: 1 },
    ],
    run: (v) => {
      const s = at(v), ws = s.passenger.windshield, inch = Math.max(0, v.inches), w = W(lang);
      let verdict: string;
      if (ws.rule === 'none') verdict = lang === 'es' ? 'Ninguna lámina permitida' : 'No film allowed';
      else if (ws.rule === 'vlt') verdict = lang === 'es' ? `Todo el parabrisas a ${pct(ws.vlt as number, lang)} como mínimo` : `Whole windshield at ${pct(ws.vlt as number, lang)} or more`;
      else if (ws.stripInches != null) verdict = inch <= ws.stripInches ? (lang === 'es' ? 'Dentro del límite' : 'Within the limit') : (lang === 'es' ? 'Demasiado baja' : 'Too deep');
      else if (ws.asLine) verdict = lang === 'es' ? 'Hasta la línea AS-1' : 'Down to the AS-1 line';
      else verdict = w.nc;
      return {
        head: [lang === 'es' ? `Parabrisas en ${stateName(s, lang)}` : `Windshield in ${stateName(s, lang)}`, verdict],
        rows: [
          [lang === 'es' ? 'Pulgadas permitidas' : 'Inches allowed', ws.stripInches != null ? `${ws.stripInches} in` : '–'],
          [lang === 'es' ? 'Línea AS-1 como tope' : 'AS-1 line as the limit', ws.asLine ? w.yes : w.no],
          ...(ws.stripInches != null && ws.asLine ? [[lang === 'es' ? 'Regla' : 'Rule', lang === 'es' ? 'lo que quede más arriba' : 'whichever is higher'] as [string, string]] : []),
        ],
      };
    },
  }),
  /** Ticket: highest fine written in the law, tolerance, front limit. */
  ticket: (lang) => ({
    title: lang === 'es' ? 'Multa por polarizado en su estado' : 'Tint ticket in your state', cta: lang === 'es' ? 'Ver si mi polarizado pasa' : 'See if my tint passes', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), p = s.detail.penalty, w = W(lang);
      return {
        head: [lang === 'es' ? 'Multa máxima escrita en la ley' : 'Highest fine written in the law', p?.maxFineUsd != null ? money(p.maxFineUsd, lang) : (lang === 'es' ? 'sin cifra leída' : 'no figure read')],
        rows: [
          [w.front, limitLabel(s.passenger.frontSide.vlt, lang)],
          [lang === 'es' ? 'Tolerancia de medición' : 'Meter tolerance', s.tolerancePoints ? `${s.tolerancePoints} ${lang === 'es' ? 'puntos' : 'points'}` : (lang === 'es' ? 'ninguna escrita' : 'none written')],
          [lang === 'es' ? 'Ley' : 'Statute', p?.cite ?? s.detail.statute[0]?.cite ?? w.nc],
        ],
      };
    },
  }),
  /** Medical exemption: provided by the statute or not. */
  medical: (lang) => ({
    title: lang === 'es' ? '¿Su estado prevé una exención médica?' : 'Does your state allow a medical exemption?', cta: lang === 'es' ? 'Comprobar mi polarizado' : 'Check my tint', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), m = s.detail.medicalExemption, w = W(lang);
      return {
        head: [lang === 'es' ? `Exención médica en ${stateName(s, lang)}` : `Medical exemption in ${stateName(s, lang)}`, m?.available === true ? w.yes : m?.available === false ? (lang === 'es' ? 'No en la ley' : 'Not in the law') : w.nc],
        rows: [
          [lang === 'es' ? 'Límite delantero sin exención' : 'Front limit without it', limitLabel(s.passenger.frontSide.vlt, lang)],
          [lang === 'es' ? 'Ley leída' : 'Statute read', s.detail.statute[0]?.cite ?? w.nc],
        ],
      };
    },
  }),
  /** Motorcycle helmet: required for this rider? */
  helmet: (lang) => ({
    title: lang === 'es' ? '¿Tiene que llevar casco?' : 'Do you have to wear a helmet?', cta: lang === 'es' ? 'Ver la tabla de los 50 estados' : 'See the 50-state table', ctaPage: 'helmet',
    inputs: [
      { id: 'state', label: W(lang).state, def: DEF, options: opts(lang) },
      { id: 'age', label: lang === 'es' ? 'Edad del motociclista' : 'Rider age', def: 30, unit: lang === 'es' ? 'años' : 'yrs', max: 110 },
    ],
    run: (v) => {
      const s = at(v), h = s.equipment.helmet, age = Math.round(v.age), w = W(lang);
      let head: string;
      if (!h || h.rule == null) head = w.nc;
      else if (h.rule === 'universal') head = lang === 'es' ? 'Sí, para todos' : 'Yes, every rider';
      else if (h.rule === 'none') head = lang === 'es' ? 'No lo exige la ley' : 'Not required by law';
      else head = h.ageUnder != null && age < h.ageUnder ? (lang === 'es' ? `Sí, menor de ${h.ageUnder}` : `Yes, under ${h.ageUnder}`) : (lang === 'es' ? 'No por la edad' : 'Not by age');
      return {
        head: [lang === 'es' ? `Casco en ${stateName(s, lang)}` : `Helmet in ${stateName(s, lang)}`, head],
        rows: [
          [lang === 'es' ? 'Regla' : 'Rule', h?.rule === 'universal' ? (lang === 'es' ? 'universal' : 'universal') : h?.rule === 'partial' ? (lang === 'es' ? 'según la edad' : 'by age') : h?.rule === 'none' ? (lang === 'es' ? 'ninguna' : 'none') : w.nc],
          [lang === 'es' ? 'Edad límite' : 'Age threshold', h?.ageUnder != null ? String(h.ageUnder) : '–'],
          [lang === 'es' ? 'Ley' : 'Statute', h?.cite ?? w.nc],
        ],
        note: h?.rule === 'partial' && age >= (h.ageUnder ?? 0) ? (lang === 'es' ? 'Algunos estados piden además un curso, un seguro o años de licencia: lea la condición en la tabla.' : 'Some states also ask for a course, an insurance policy or years of license: read the condition in the table.') : undefined,
      };
    },
  }),
  /** Radar detector: allowed in this vehicle? */
  radar: (lang) => ({
    title: lang === 'es' ? '¿Puede llevar un detector de radar?' : 'Can you use a radar detector?', cta: lang === 'es' ? 'Comprobar el polarizado de su auto' : 'Check your car\'s tint', ctaPage: 'home',
    inputs: [
      { id: 'state', label: W(lang).state, def: stateIdx('VA'), options: opts(lang) },
      { id: 'cmv', label: W(lang).vehicle, def: 0, options: [{ value: '0', label: lang === 'es' ? 'Auto o camioneta personal' : 'Personal car or truck' }, { value: '1', label: lang === 'es' ? 'Vehículo comercial de 10 001 lb o más' : 'Commercial vehicle of 10,001 lb or more' }] },
    ],
    run: (v) => {
      const s = at(v), r = s.equipment.radarDetector, w = W(lang);
      const cmv = v.cmv === 1;
      const ok = cmv ? false : r?.passengerAllowed;
      return {
        head: [lang === 'es' ? `Detector de radar en ${stateName(s, lang)}` : `Radar detector in ${stateName(s, lang)}`, ok === true ? (lang === 'es' ? 'Permitido' : 'Allowed') : ok === false ? (lang === 'es' ? 'Prohibido' : 'Banned') : w.nc],
        rows: [
          [lang === 'es' ? 'Regla aplicada' : 'Rule applied', cmv ? '49 CFR § 392.71' : r?.cite ?? (lang === 'es' ? 'sin ley estatal que lo prohíba' : 'no state ban found')],
          [lang === 'es' ? 'Camiones comerciales, en todo el país' : 'Commercial trucks, nationwide', lang === 'es' ? 'prohibido (49 CFR § 392.71)' : 'banned (49 CFR § 392.71)'],
        ],
      };
    },
  }),
};
export function getSpec(kind: string, lang: L = 'en'): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini spec ${kind}`);
  return f(lang);
}
export const SPEC_KINDS = Object.keys(SPECS);
