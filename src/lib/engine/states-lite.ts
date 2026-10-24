/**
 * Light state records for the browser tools (src/data/states-lite.json, written by scripts/update-data.mjs
 * from the same raw files as states.json): limits, tolerance, first statute, fine, exemption, helmet, radar.
 */
import RAW from '../../data/states-lite.json';
import type { StateTint, VehicleRules } from './tint';

export interface LiteRec extends StateTint {
  detail: {
    statute: Array<{ cite: string; url: string }>;
    penalty: { maxFineUsd: number | null; cite: string | null } | null;
    medicalExemption: { available: boolean | null } | null;
  };
  equipment: {
    helmet: { rule: 'universal' | 'partial' | 'none' | null; ageUnder: number | null; cite: string | null } | null;
    radarDetector: { passengerAllowed: boolean | null; cite: string | null } | null;
  };
}
export const STATES = RAW as unknown as LiteRec[];

const ES_NAMES: Record<string, string> = {
  DC: 'Distrito de Columbia', HI: 'Hawái', LA: 'Luisiana', NC: 'Carolina del Norte', SC: 'Carolina del Sur',
  ND: 'Dakota del Norte', SD: 'Dakota del Sur', NJ: 'Nueva Jersey', NM: 'Nuevo México', NY: 'Nueva York',
  PA: 'Pensilvania', WV: 'Virginia Occidental', MI: 'Míchigan',
};
export const stateName = (s: { code: string; name: string }, lang: 'en' | 'es') => (lang === 'es' ? ES_NAMES[s.code] ?? s.name : s.name);
export function stateByCode(code: string): LiteRec {
  const s = STATES.find((x) => x.code === code);
  if (!s) throw new Error(`Unknown state code: ${code}`);
  return s;
}
/** Rules of a vehicle class; SUVs, vans and pickups fall back on the car rules when the law draws no line. */
export const vehicleRules = (s: StateTint, kind: 'passenger' | 'multipurpose'): VehicleRules => (kind === 'multipurpose' && s.multipurpose ? s.multipurpose : s.passenger);
