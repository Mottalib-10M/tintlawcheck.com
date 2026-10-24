/**
 * Main tool: state + vehicle + film and factory glass of each window → the VLT a meter reads
 * (film × glass), the verdict of each window against the state's statute, the margin and the
 * darkest film the glass can take. Every limit comes from src/data/states.json through the engine.
 * First render = build defaults; a shared link is applied after mount (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { STATES, stateByCode, stateName } from '../../lib/engine/states-lite';
import { checkCar, overall, frontLimitFromRear, type CarInput, type VehicleKind, type Window, type WindowResult } from '../../lib/engine/tint';
import { limitLabel } from '../../lib/labels';
import { pct } from '../../lib/format-l';
import { readNote } from '../../lib/read-note';
import { readParams, num, str, updateURL } from '../../lib/url-state';

const T = {
  en: {
    state: 'State', vehicle: 'Vehicle', car: 'Car', mpv: 'SUV, van, pickup',
    film: { frontSide: 'Front side film', backSide: 'Rear side film', rear: 'Back window film' },
    glass: { frontSide: 'Front side factory glass', backSide: 'Rear side factory glass', rear: 'Back window factory glass' },
    filmHelp: '100 = no film', glassHelp: 'FMVSS 205 minimum: 70', glassHelpMpv: 'Privacy glass: its own reading',
    win: { windshield: 'Windshield', frontSide: 'Front side', backSide: 'Rear side', rear: 'Back window' },
    head: { legal: 'Legal in', tolerance: 'Legal only with the tolerance in', illegal: 'Too dark for the law in' },
    measured: 'Meter reads', limit: 'Law', verdict: 'Result',
    v: { legal: 'legal', tolerance: 'tolerance', illegal: 'too dark', 'no-limit': 'any', 'no-number': 'no figure', 'strip-only': 'strip only' },
    darkest: 'Darkest film on this glass', none: 'none', anyFilm: 'any film', ws: 'Windshield', law: 'Statute', checked: 'checked',
    unstated: 'The statute does not say how the window is measured; we use film × glass, the reading a meter gives.',
    filmOnly: 'This state measures the film alone: the glass does not count.',
    il: (l: string) => `Illinois ties the front limit to the rear windows: with these rear windows the front side limit is ${l}.`,
  },
  es: {
    state: 'Estado', vehicle: 'Vehículo', car: 'Auto', mpv: 'SUV, van, pickup',
    film: { frontSide: 'Lámina laterales delanteras', backSide: 'Lámina laterales traseras', rear: 'Lámina del vidrio trasero' },
    glass: { frontSide: 'Vidrio de fábrica delantero', backSide: 'Vidrio de fábrica trasero', rear: 'Vidrio de fábrica del medallón' },
    filmHelp: '100 = sin lámina', glassHelp: 'Mínimo FMVSS 205: 70', glassHelpMpv: 'Vidrio privacy: su propia lectura',
    win: { windshield: 'Parabrisas', frontSide: 'Laterales delanteras', backSide: 'Laterales traseras', rear: 'Vidrio trasero' },
    head: { legal: 'Legal en', tolerance: 'Legal solo con la tolerancia en', illegal: 'Demasiado oscuro para la ley en' },
    measured: 'Lectura', limit: 'Ley', verdict: 'Resultado',
    v: { legal: 'legal', tolerance: 'tolerancia', illegal: 'muy oscuro', 'no-limit': 'libre', 'no-number': 'sin cifra', 'strip-only': 'solo franja' },
    darkest: 'Lámina más oscura sobre este vidrio', none: 'ninguna', anyFilm: 'cualquiera', ws: 'Parabrisas', law: 'Ley', checked: 'revisada el',
    unstated: 'La ley no dice cómo se mide la ventana; usamos lámina × vidrio, la lectura que da un medidor.',
    filmOnly: 'Este estado mide la lámina sola: el vidrio no cuenta.',
    il: (l: string) => `Illinois ata el límite delantero a las ventanas traseras: con estas ventanas traseras, el límite delantero es ${l}.`,
  },
} as const;

const WINS: Exclude<Window, 'windshield'>[] = ['frontSide', 'backSide', 'rear'];
const KEYS = { frontSide: ['f1', 'g1'], backSide: ['f2', 'g2'], rear: ['f3', 'g3'] } as const;
const tone = { legal: 'text-emerald-800', tolerance: 'text-amber-800', illegal: 'text-red-800', 'no-limit': 'text-emerald-800', 'no-number': 'text-navy-700', 'strip-only': 'text-navy-700' } as const;

interface Props { lang?: 'en' | 'es'; state?: string; idPrefix?: string; film?: number; statePages?: Record<string, string> }

export default function TintCheck({ lang = 'en', state = 'TX', idPrefix = 'c', film = 35, statePages = {} }: Props) {
  const L = T[lang];
  const [code, setCode] = useState(state);
  const [kind, setKind] = useState<VehicleKind>('passenger');
  const [f, setF] = useState<Record<string, number>>({ frontSide: film, backSide: film, rear: film });
  const [g, setG] = useState<Record<string, number>>({ frontSide: 70, backSide: 70, rear: 70 });
  useEffect(() => {
    const u = readParams(window.location.search);
    const c = str(u, 'state', state); if (STATES.some((s) => s.code === c)) setCode(c);
    if (str(u, 'v', '') === 'mpv') setKind('multipurpose');
    const nf: Record<string, number> = {}; const ng: Record<string, number> = {};
    for (const w of WINS) { nf[w] = Math.min(100, Math.max(0, num(u, KEYS[w][0], film))); ng[w] = Math.min(100, Math.max(1, num(u, KEYS[w][1], 70))); }
    setF(nf); setG(ng);
  }, []);
  useEffect(() => { updateURL({ state: code, v: kind === 'multipurpose' ? 'mpv' : undefined, f1: f.frontSide, f2: f.backSide, f3: f.rear, g1: g.frontSide, g2: g.backSide, g3: g.rear }); }, [code, kind, f, g]);

  const st = stateByCode(code);
  const input: CarInput = useMemo(() => ({ kind, film: { windshield: 100, ...f } as Record<Window, number>, glass: { windshield: 70, ...g } as Record<Window, number> }), [kind, f, g]);
  const res = useMemo(() => checkCar(st, input), [st, input]);
  const all = overall(res);
  const byWin = (w: Window) => res.find((r) => r.window === w) as WindowResult;
  const ilFront = frontLimitFromRear(st, input);
  const law = st.detail.statute[0];
  const statePage = statePages[code];
  const show = (r: WindowResult) => (r.verdict === 'no-limit' || r.verdict === 'strip-only' ? '' : pct(r.combinedVlt, lang));
  const darkest = (r: WindowResult) => (r.limit === 'any' ? L.anyFilm : r.limit === 'no-film' ? L.none : r.darkestFilm == null ? (r.limit === null ? '–' : L.none) : pct(r.darkestFilm, lang));
  const wsRes = byWin('windshield');
  const ws = (kind === 'multipurpose' && st.multipurpose ? st.multipurpose : st.passenger).windshield;

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-state`} label={L.state} value={code} onChange={setCode} options={STATES.map((s) => ({ value: s.code, label: stateName(s, lang) }))} />
        <Toggle id={`${idPrefix}-kind`} label={L.vehicle} value={kind} onChange={(v) => setKind(v as VehicleKind)} options={[{ value: 'passenger', label: L.car }, { value: 'multipurpose', label: L.mpv }]} />
        {WINS.map((w) => [
          <NumberField key={`f-${w}`} id={`${idPrefix}-${KEYS[w][0]}`} label={L.film[w]} value={f[w]} onChange={(x) => setF((o) => ({ ...o, [w]: x }))} unit="%" max={100} decimals={0} help={L.filmHelp} />,
          <NumberField key={`g-${w}`} id={`${idPrefix}-${KEYS[w][1]}`} label={L.glass[w]} value={g[w]} onChange={(x) => setG((o) => ({ ...o, [w]: x }))} unit="%" min={1} max={100} decimals={0} help={w === 'frontSide' ? L.glassHelp : L.glassHelpMpv} />,
        ])}
        <div className="sticky bottom-0 z-10 -mx-1 rounded-lg border border-accent-200 bg-white/95 px-3 py-2 text-sm shadow-sm sm:col-span-2 lg:hidden" aria-hidden="true">
          <span className="text-navy-700">{L.head[all]} {stateName(st, lang)}: </span><span className={`font-semibold ${tone[all]}`}>{pct(byWin('frontSide').combinedVlt, lang)} {L.win.frontSide.toLowerCase()}</span>
        </div>
      </form>
      <div data-resultat aria-live="polite" className="rounded-xl border border-accent-200 bg-accent-50/60 p-4">
        <p className="text-sm font-medium text-navy-600">{L.head[all]} {stateName(st, lang)}</p>
        <p className={`mt-1 text-3xl font-bold ${tone[all]}`}>{pct(byWin('frontSide').combinedVlt, lang)} <span className="text-base font-medium text-navy-700">{L.win.frontSide.toLowerCase()}</span></p>
        <table className="mt-3 w-full text-sm">
          <thead><tr className="text-left text-xs uppercase tracking-wide text-navy-600"><th className="py-1 font-semibold" scope="col"> </th><th className="py-1 pl-3 text-right font-semibold" scope="col">{L.measured}</th><th className="py-1 pl-3 text-right font-semibold" scope="col">{L.limit}</th><th className="py-1 pl-3 text-right font-semibold" scope="col">{L.verdict}</th></tr></thead>
          <tbody className="divide-y divide-navy-200">
            {WINS.map((w) => { const r = byWin(w); return (
              <tr key={w}><td className="py-1.5 pr-2 text-navy-700">{L.win[w]}</td><td className="tabular-nums py-1.5 pl-3 text-right text-navy-900">{show(r) || '–'}</td><td className="tabular-nums py-1.5 pl-3 text-right text-navy-900">{limitLabel(r.limit, lang)}</td><td className={`py-1.5 pl-3 text-right font-semibold ${tone[r.verdict]}`}>{L.v[r.verdict]}</td></tr>
            ); })}
          </tbody>
        </table>
        <p className="mt-3 text-sm text-navy-700">{L.darkest}: {WINS.map((w) => `${L.win[w].toLowerCase()} ${darkest(byWin(w))}`).join(' · ')}</p>
        <p className="mt-2 text-sm text-navy-700">{L.ws}: {ws.rule === 'vlt' && ws.vlt != null ? `${pct(ws.vlt as number, lang)} min.` : ws.rule === 'none' ? L.none : `${ws.asLine ? 'AS-1' : ''}${ws.asLine && ws.stripInches ? ' / ' : ''}${ws.stripInches ? `${ws.stripInches} in.` : ''}` || L.v['strip-only']}{wsRes.verdict === 'strip-only' ? '' : ''}</p>
        {ilFront !== undefined && <p className="mt-2 text-xs text-navy-700">{L.il(limitLabel(ilFront, lang))}</p>}
        {st.measuredHow === 'unstated' && <p className="mt-2 text-xs text-navy-600">{L.unstated}</p>}
        {st.measuredHow === 'film' && <p className="mt-2 text-xs text-navy-600">{L.filmOnly}</p>}
        {law && <p className="mt-2 text-xs text-navy-600">{L.law}: <a href={law.url} target="_blank" rel="nofollow noopener noreferrer" className="underline">{law.cite}</a>{statePage ? <> · <a href={statePage} className="underline">{stateName(st, lang)}</a></> : null}</p>}
        {st.read && <p data-lecture={st.read.how} className={`mt-1 text-xs ${st.read.how === 'unconfirmed' ? 'font-medium text-amber-800' : 'text-navy-600'}`}>{readNote(st.read, lang)}</p>}
      </div>
    </div>
  );
}
