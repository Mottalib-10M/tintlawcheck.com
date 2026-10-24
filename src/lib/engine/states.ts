/**
 * The 51 state records (50 states + DC), built by `scripts/update-data.mjs` from `data/raw/<XX>.json`.
 * Every figure here was read in the state's vehicle code; the citation and the official URL travel with it.
 */
import RAW from '../../data/states.json';
import META_RAW from '../../data/meta.json';
import type { StateTint, Limit } from './tint';

export interface Statute { cite: string; url: string; readVia?: string | null }
export interface Equip { cite?: string | null; url?: string | null; [k: string]: unknown }
export interface StateRec extends StateTint {
  detail: {
    statute: Statute[];
    reflectivity: { front?: string | null; back?: string | null } | null;
    tolerance: { points: number; cite: string } | null;
    colorsBanned: string[];
    dualMirrors: string | null;
    certificateOrSticker: string | null;
    medicalExemption: { available: boolean | null; text: string | null; url: string | null } | null;
    penalty: { text: string | null; maxFineUsd: number | null; cite: string | null; url: string | null } | null;
    lastAmended: string | null;
  };
  equipment: {
    helmet: { rule: 'universal' | 'partial' | 'none' | null; ageUnder: number | null; conditions: string | null; cite: string | null; url: string | null } | null;
    radarDetector: { passengerAllowed: boolean | null; note: string | null; cite: string | null; url: string | null } | null;
    [k: string]: unknown;
  };
  checkedOn: string;
  openQuestions: string[];
}

export const STATES = RAW as unknown as StateRec[];
export const META = META_RAW as { states: number; oldestCheck: string; newestCheck: string; builtOn: string };

export { stateName, vehicleRules } from './states-lite';

export function stateByCode(code: string): StateRec {
  const s = STATES.find((x) => x.code === code);
  if (!s) throw new Error(`Unknown state code: ${code}`);
  return s;
}
export const stateIndex = (code: string) => STATES.findIndex((s) => s.code === code);

/** Numeric value of a limit for sorting: "any" = 0, no film = 100, unknown = null. */
export const limitNum = (l: Limit): number | null => (l === 'any' ? 0 : l === 'no-film' ? 100 : l);
