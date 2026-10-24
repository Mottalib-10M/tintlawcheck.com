/**
 * Moteur de calcul principal : transmission lumineuse combinée (VLT) et verdict par vitre.
 *
 * Physique : chaque couche laisse passer une fraction de la lumière ; la transmission
 * de l'ensemble est le produit des fractions (film 35 % sur verre 80 % = 0,35 × 0,80 = 28 %).
 * Les lois des États fixent un MINIMUM de VLT (lumière qui passe), pas un maximum d'obscurité.
 *
 * Aucun chiffre de loi n'est écrit ici : les limites arrivent de data/states.json
 * (une valeur par État, avec sa citation), ce module ne fait que calculer.
 */

export type Window = 'windshield' | 'frontSide' | 'backSide' | 'rear';
export type VehicleKind = 'passenger' | 'multipurpose';

/**
 * Une limite : un pourcentage minimum, « any » (aucune limite), « no-film » (aucun film de
 * seconde monte permis, verre d'origine seulement : NJ, VT côté avant) ou null (pas de chiffre dans la loi).
 */
export type Limit = number | 'any' | 'no-film' | null;

export interface WindowRule {
  vlt: Limit;
  note?: string | null;
}

export interface WindshieldRule {
  rule: 'strip' | 'vlt' | 'none';
  strip?: string | null;
  stripInches?: number | null;
  asLine?: boolean | null;
  vlt?: Limit;
}

export interface VehicleRules {
  windshield: WindshieldRule;
  frontSide: WindowRule;
  backSide: WindowRule;
  rear: WindowRule;
}

export interface StateTint {
  code: string;
  name: string;
  passenger: VehicleRules;
  multipurpose: VehicleRules | null;
  /** « combined » = film + verre mesurés ensemble (cas courant) ; « film » = film seul. */
  measuredHow: 'combined' | 'film' | 'unstated';
  /** Tolérance de mesure en points de VLT prévue par la loi, ou null. */
  tolerancePoints: number | null;
  /**
   * Limite des vitres avant qui dépend des vitres arrière (Illinois, 625 ILCS 5/12-503(a-5)) :
   * première ligne dont la VLT arrière la plus basse atteint `rearAtLeast` ; aucune ligne = pas de film à l'avant.
   */
  frontByRear?: Array<{ rearAtLeast: number; front: number }> | null;
  /** VLT minimale du film lui-même sur les vitres avant, en plus de l'ensemble (Californie : 88 %, Cal. Veh. Code § 26708(d)(1)). */
  frontFilmMin?: number | null;
}

export type Verdict = 'legal' | 'tolerance' | 'illegal' | 'no-limit' | 'no-number' | 'strip-only';

export interface WindowResult {
  window: Window;
  combinedVlt: number;
  limit: Limit;
  verdict: Verdict;
  /** Points de VLT au-dessus (+) ou au-dessous (−) de la limite ; null s'il n'y a pas de limite chiffrée. */
  margin: number | null;
  /** Film le plus foncé posable sur ce verre sans passer sous la limite (en %), ou null. */
  darkestFilm: number | null;
}

const clampPct = (v: number): number => {
  if (!Number.isFinite(v)) throw new RangeError('VLT must be a finite number');
  if (v < 0 || v > 100) throw new RangeError('VLT must be between 0 and 100');
  return v;
};

/** Arrondi à 0,1 point, sans écart binaire (28.000000000000004 → 28). */
export const round1 = (v: number): number => Math.round(v * 10 + Number.EPSILON) / 10;

/** VLT combinée de plusieurs couches (verre d'origine, film, second film…), en %. */
export function combinedVlt(...layers: number[]): number {
  if (layers.length === 0) throw new RangeError('at least one layer');
  const fraction = layers.reduce((acc, l) => acc * (clampPct(l) / 100), 1);
  return round1(fraction * 100);
}

/** Film le plus foncé (VLT minimale du film) qui garde l'ensemble au-dessus de la limite. */
export function darkestLegalFilm(limit: number, glassVlt: number): number | null {
  clampPct(limit);
  clampPct(glassVlt);
  if (glassVlt === 0) return null;
  const film = (limit / glassVlt) * 100;
  if (film > 100) return null; // le verre seul est déjà sous la limite
  // arrondi vers le haut au dixième : on ne propose jamais un film qui ferait passer sous la limite
  return Math.ceil(film * 10 - 1e-9) / 10;
}

/** Inversion de la convention « % d'obscurité » parfois utilisée par les vendeurs. */
export const darknessToVlt = (darknessPct: number): number => round1(100 - clampPct(darknessPct));

export function rulesFor(state: StateTint, kind: VehicleKind): VehicleRules {
  return kind === 'multipurpose' && state.multipurpose ? state.multipurpose : state.passenger;
}

export function checkWindow(
  state: StateTint,
  kind: VehicleKind,
  window: Window,
  filmVlt: number,
  glassVlt: number,
  /** Limite imposée par une autre vitre (frontByRear), prioritaire sur le fichier. */
  override?: Limit,
): WindowResult {
  const rules = rulesFor(state, kind);
  const measured = state.measuredHow === 'film' ? round1(clampPct(filmVlt)) : combinedVlt(glassVlt, filmVlt);
  const combined = combinedVlt(glassVlt, filmVlt);

  let limit: Limit;
  if (window === 'windshield') {
    const w = rules.windshield;
    if (w.rule !== 'vlt') {
      return { window, combinedVlt: combined, limit: null, verdict: 'strip-only', margin: null, darkestFilm: null };
    }
    limit = w.vlt ?? null;
  } else {
    limit = override !== undefined ? override : rules[window].vlt;
  }

  if (limit === 'any') {
    return { window, combinedVlt: combined, limit, verdict: 'no-limit', margin: null, darkestFilm: 0 };
  }
  if (limit === 'no-film') {
    const bare = filmVlt >= 100;
    return { window, combinedVlt: combined, limit, verdict: bare ? 'legal' : 'illegal', margin: null, darkestFilm: null };
  }
  if (limit === null) {
    return { window, combinedVlt: combined, limit, verdict: 'no-number', margin: null, darkestFilm: null };
  }

  // Film trop foncé en lui-même (Californie : film d'au moins 88 % sur les vitres avant).
  if (window === 'frontSide' && state.frontFilmMin != null && filmVlt < 100 && filmVlt < state.frontFilmMin) {
    return { window, combinedVlt: combined, limit, verdict: 'illegal', margin: round1(measured - limit), darkestFilm: state.frontFilmMin };
  }
  const margin = round1(measured - limit);
  const tol = state.tolerancePoints ?? 0;
  let verdict: Verdict;
  if (margin >= 0) verdict = 'legal';
  else if (tol > 0 && margin >= -tol) verdict = 'tolerance';
  else verdict = 'illegal';

  let darkestFilm = state.measuredHow === 'film' ? limit : darkestLegalFilm(limit, glassVlt);
  if (window === 'frontSide' && state.frontFilmMin != null && darkestFilm != null) darkestFilm = Math.max(darkestFilm, state.frontFilmMin);
  return { window, combinedVlt: combined, limit, verdict, margin, darkestFilm };
}

export interface CarInput {
  kind: VehicleKind;
  /** VLT du film posé sur chaque vitre (100 = pas de film). */
  film: Record<Window, number>;
  /** VLT du verre d'origine de chaque vitre. */
  glass: Record<Window, number>;
}

/** Limite des vitres avant quand elle dépend de l'arrière (frontByRear), sinon undefined. */
export function frontLimitFromRear(state: StateTint, input: CarInput): Limit | undefined {
  if (!state.frontByRear?.length) return undefined;
  const rearMin = Math.min(combinedVlt(input.glass.backSide, input.film.backSide), combinedVlt(input.glass.rear, input.film.rear));
  const row = state.frontByRear.find((r) => rearMin >= r.rearAtLeast);
  return row ? row.front : 'no-film';
}

export function checkCar(state: StateTint, input: CarInput): WindowResult[] {
  const order: Window[] = ['windshield', 'frontSide', 'backSide', 'rear'];
  const front = frontLimitFromRear(state, input);
  return order.map((w) => checkWindow(state, input.kind, w, input.film[w], input.glass[w], w === 'frontSide' ? front : undefined));
}

/** Verdict global : illégal si une vitre l'est ; « tolérance » si une vitre n'y passe que grâce à elle. */
export function overall(results: WindowResult[]): 'legal' | 'tolerance' | 'illegal' {
  if (results.some((r) => r.verdict === 'illegal')) return 'illegal';
  if (results.some((r) => r.verdict === 'tolerance')) return 'tolerance';
  return 'legal';
}
