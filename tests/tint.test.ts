import { describe, expect, it } from 'vitest';
import {
  checkCar,
  checkWindow,
  combinedVlt,
  darkestLegalFilm,
  darknessToVlt,
  overall,
  type StateTint,
} from '../src/lib/engine/tint';

// État fictif pour tester le moteur seul (les vraies limites sont testées sur data/states.json).
const demo: StateTint = {
  code: 'ZZ',
  name: 'Demo',
  measuredHow: 'combined',
  tolerancePoints: 3,
  passenger: {
    windshield: { rule: 'strip', strip: 'above AS-1 line', stripInches: 5, asLine: true },
    frontSide: { vlt: 35 },
    backSide: { vlt: 35 },
    rear: { vlt: 35 },
  },
  multipurpose: {
    windshield: { rule: 'strip', strip: 'above AS-1 line', stripInches: 5, asLine: true },
    frontSide: { vlt: 35 },
    backSide: { vlt: 'any' },
    rear: { vlt: 'any' },
  },
};

describe('combinedVlt', () => {
  it('multiplie les transmissions', () => {
    expect(combinedVlt(80, 35)).toBe(28);
    expect(combinedVlt(80, 5)).toBe(4);
    expect(combinedVlt(80, 70)).toBe(56);
    expect(combinedVlt(100, 100)).toBe(100);
  });
  it('accepte plusieurs couches', () => {
    expect(combinedVlt(80, 50, 50)).toBe(20);
  });
  it('refuse les valeurs hors 0-100', () => {
    expect(() => combinedVlt(120, 35)).toThrow(RangeError);
    expect(() => combinedVlt(-1)).toThrow(RangeError);
    expect(() => combinedVlt(Number.NaN)).toThrow(RangeError);
    expect(() => combinedVlt()).toThrow(RangeError);
  });
});

describe('darkestLegalFilm', () => {
  it('donne le film le plus foncé qui reste au-dessus de la limite', () => {
    expect(darkestLegalFilm(35, 80)).toBe(43.8); // 35 / 0,80 = 43,75 → arrondi vers le haut
    expect(darkestLegalFilm(70, 70)).toBe(100);
  });
  it('rend null si le verre seul est sous la limite', () => {
    expect(darkestLegalFilm(70, 60)).toBeNull();
  });
});

describe('darknessToVlt', () => {
  it('inverse la convention « % d’obscurité »', () => {
    expect(darknessToVlt(65)).toBe(35);
  });
});

describe('checkWindow', () => {
  it('légal au-dessus de la limite', () => {
    const r = checkWindow(demo, 'passenger', 'frontSide', 50, 80);
    expect(r.combinedVlt).toBe(40);
    expect(r.verdict).toBe('legal');
    expect(r.margin).toBe(5);
  });
  it('dans la tolérance', () => {
    const r = checkWindow(demo, 'passenger', 'frontSide', 40, 80); // 32 %
    expect(r.verdict).toBe('tolerance');
    expect(r.margin).toBe(-3);
  });
  it('illégal au-delà de la tolérance', () => {
    const r = checkWindow(demo, 'passenger', 'frontSide', 35, 80); // 28 %
    expect(r.verdict).toBe('illegal');
  });
  it('le film de 35 % seul est illégal une fois posé sur un verre de 80 %', () => {
    expect(checkWindow({ ...demo, tolerancePoints: null }, 'passenger', 'frontSide', 35, 80).verdict).toBe('illegal');
  });
  it('règle « film seul »', () => {
    const r = checkWindow({ ...demo, measuredHow: 'film' }, 'passenger', 'frontSide', 35, 80);
    expect(r.verdict).toBe('legal');
    expect(r.darkestFilm).toBe(35);
  });
  it('véhicule polyvalent : arrière sans limite', () => {
    expect(checkWindow(demo, 'multipurpose', 'rear', 5, 20).verdict).toBe('no-limit');
    expect(checkWindow(demo, 'passenger', 'rear', 5, 20).verdict).toBe('illegal');
  });
  it('pare-brise : bande seulement', () => {
    expect(checkWindow(demo, 'passenger', 'windshield', 70, 80).verdict).toBe('strip-only');
  });
  it('aucun film permis (NJ, VT à l’avant)', () => {
    const s: StateTint = { ...demo, passenger: { ...demo.passenger, frontSide: { vlt: 'no-film' } } };
    expect(checkWindow(s, 'passenger', 'frontSide', 70, 80).verdict).toBe('illegal');
    expect(checkWindow(s, 'passenger', 'frontSide', 100, 80).verdict).toBe('legal');
  });
  it('limite absente de la loi', () => {
    const s: StateTint = { ...demo, passenger: { ...demo.passenger, backSide: { vlt: null } } };
    expect(checkWindow(s, 'passenger', 'backSide', 20, 80).verdict).toBe('no-number');
  });
  it('sans règle polyvalente, on retombe sur la règle des voitures', () => {
    const s: StateTint = { ...demo, multipurpose: null };
    expect(checkWindow(s, 'multipurpose', 'rear', 5, 20).verdict).toBe('illegal');
  });
});

describe('checkCar / overall', () => {
  it('verdict global', () => {
    const glass = { windshield: 80, frontSide: 80, backSide: 80, rear: 80 };
    const ok = checkCar(demo, { kind: 'passenger', glass, film: { windshield: 100, frontSide: 50, backSide: 50, rear: 50 } });
    expect(overall(ok)).toBe('legal');
    const ko = checkCar(demo, { kind: 'passenger', glass, film: { windshield: 100, frontSide: 50, backSide: 20, rear: 50 } });
    expect(overall(ko)).toBe('illegal');
  });
});
