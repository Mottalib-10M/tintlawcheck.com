import { describe, expect, it } from 'vitest';
import states from '../src/data/states.json';
import { checkCar, type StateTint } from '../src/lib/engine/tint';

const all = states as unknown as StateTint[];
const by = (c: string) => all.find((s) => s.code === c)!;

describe('data/states.json (relevé des 51 codes, 2026-10-24)', () => {
  it('contient les 50 États et DC, une fois chacun', () => {
    expect(all).toHaveLength(51);
    expect(new Set(all.map((s) => s.code)).size).toBe(51);
  });
  it('reprend les chiffres cités des lois (extraits dans data/raw)', () => {
    expect(by('TX').passenger.frontSide.vlt).toBe(25); // Tex. Transp. Code § 547.613
    expect(by('CA').passenger.frontSide.vlt).toBe(70); // Cal. Veh. Code § 26708.5
    expect(by('FL').passenger.backSide.vlt).toBe(15); // Fla. Stat. § 316.2953
    expect(by('LA').passenger.frontSide.vlt).toBe(25); // Act 143 of 2025
    expect(by('NJ').passenger.frontSide.vlt).toBe('no-film'); // N.J.S.A. 39:3-74
  });
  it('le moteur tourne sur chaque État sans erreur', () => {
    const glass = { windshield: 70, frontSide: 70, backSide: 70, rear: 70 };
    const film = { windshield: 100, frontSide: 50, backSide: 35, rear: 20 };
    for (const s of all) {
      expect(() => checkCar(s, { kind: 'passenger', glass, film })).not.toThrow();
      expect(() => checkCar(s, { kind: 'multipurpose', glass, film })).not.toThrow();
    }
  });
});

describe('règles particulières relues en phase 2 (2026-10-24)', () => {
  const glass = { windshield: 70, frontSide: 70, backSide: 70, rear: 70 };
  const front = (code: string, film: Partial<Record<'frontSide' | 'backSide' | 'rear', number>>, g = glass) =>
    checkCar(by(code), { kind: 'passenger', glass: g, film: { windshield: 100, frontSide: 100, backSide: 100, rear: 100, ...film } })[1];
  it('Illinois : 35 % devant seulement si aucune vitre arrière sous 35 % (625 ILCS 5/12-503(a-5))', () => {
    const g = { windshield: 100, frontSide: 100, backSide: 100, rear: 100 };
    expect(front('IL', { frontSide: 40, backSide: 50, rear: 50 }, g).verdict).toBe('legal');
    expect(front('IL', { frontSide: 40, backSide: 32, rear: 50 }, g).limit).toBe(50);
    expect(front('IL', { frontSide: 40, backSide: 32, rear: 50 }, g).verdict).toBe('illegal');
    expect(front('IL', { frontSide: 60, backSide: 20, rear: 50 }, g).limit).toBe('no-film');
  });
  it('Michigan : aucun film sur les vitres avant, hors bande du haut (MCL 257.709(1)(a))', () => {
    expect(by('MI').passenger.frontSide.vlt).toBe('no-film');
    expect(front('MI', { frontSide: 70 }).verdict).toBe('illegal');
    expect(front('MI', {}).verdict).toBe('legal');
    expect(by('MI').passenger.backSide.vlt).toBe('any');
  });
  it('Californie : film avant de 88 % au moins et ensemble de 70 % (Cal. Veh. Code § 26708(d))', () => {
    expect(front('CA', { frontSide: 70 }, { ...glass, frontSide: 100 }).verdict).toBe('illegal');
    expect(front('CA', { frontSide: 90 }, { ...glass, frontSide: 80 }).verdict).toBe('legal');
    expect(front('CA', { frontSide: 90 }, { ...glass, frontSide: 75 }).verdict).toBe('illegal');
  });
  it('Texas : 24,5 % passe par la tolérance de 3 points (§ 547.613(d))', () => {
    const r = front('TX', { frontSide: 35 });
    expect(r.combinedVlt).toBe(24.5);
    expect(r.verdict).toBe('tolerance');
  });
});

describe('provenance de la lecture (relecture officielle du 2026-10-24)', () => {
  type R = { code: string; read: { how: string; date: string; host: string } };
  const recs = states as unknown as R[];
  const how = (h: string) => recs.filter((s) => s.read?.how === h).map((s) => s.code).sort();
  it('chaque État dit comment il a été lu : site officiel, copie archivée datée ou non confirmé', () => {
    for (const s of recs) {
      expect(['official', 'archive', 'unconfirmed']).toContain(s.read.how);
      expect(s.read.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    expect(how('official')).toHaveLength(32);
    expect(how('archive')).toHaveLength(17);
    expect(how('unconfirmed')).toEqual(['AR', 'TN']);
  });
  it('aucun relais non officiel (FindLaw, Justia, public.law, onecle, Cornell) dans les données', () => {
    expect(JSON.stringify(states)).not.toMatch(/findlaw|justia|public\.law|onecle|law\.cornell/i);
  });
  it('valeurs relues sur le texte officiel', () => {
    expect([by('IN').passenger.frontSide.vlt, by('IN').passenger.backSide.vlt, by('IN').passenger.rear.vlt]).toEqual([30, 'any', 30]); // IC 9-19-19-4, Indiana Code 2025
    expect(by('HI').passenger.frontSide.vlt).toBe(35); // HRS 291-21.5, Act 129 (2025)
    expect(by('MA').passenger.frontSide.vlt).toBe(35); // M.G.L. c. 90 § 9D
    expect(by('CO').passenger.frontSide.vlt).toBe(27); // C.R.S. 42-4-227 (2024)
    expect(by('CA').passenger.backSide.vlt).toBe('any'); // Cal. Veh. Code § 26708(b)(4)
  });
});
