#!/usr/bin/env node
/**
 * Données du site : règles de teinte et d'équipement des 50 États + DC.
 *
 * Source : codes des États (textes de loi, domaine public — Georgia v. Public.Resource.Org, 590 U.S. 255 (2020) ;
 * les lois fédérales et l'eCFR sont des œuvres du gouvernement fédéral, 17 U.S.C. § 105).
 * Il n'existe pas d'API : chaque État est relevé à la main, section par section, dans data/raw/<XX>.json
 * (citation, URL officielle, extrait verbatim de la ligne qui donne le chiffre, date du relevé).
 *
 * Ce script :
 *   1. lit data/raw/*.json et contrôle le schéma (51 fichiers, bornes 0-100, une citation + une URL par règle) ;
 *   2. écrit src/data/states.json (forme attendue par src/lib/engine/tint.ts) et src/data/meta.json (date de la donnée) ;
 *   3. avec --check-links, vérifie que chaque URL officielle répond encore (HEAD puis GET), et liste les mortes.
 * Il échoue (code 1) au moindre défaut : un chiffre sans source ne sort pas.
 *
 * Usage : node scripts/update-data.mjs [--check-links]
 * Cron prévu (phase 2, .github/workflows/update-data.yml) : le 1er de chaque mois, --check-links, puis build ;
 * relecture complète des 51 codes chaque année en juillet (date d'effet la plus fréquente des lois votées).
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RAW = join(ROOT, 'data', 'raw');
const CODES = 'AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(' ');
const WINDOWS = ['frontSide', 'backSide', 'rear'];

const errors = [];
const warnings = [];
const err = (c, m) => errors.push(`${c}: ${m}`);
const warn = (c, m) => warnings.push(`${c}: ${m}`);

function limit(c, where, v) {
  if (v === 'any' || v === 'no-film' || v === null) return v;
  if (typeof v === 'string' && /^\d+(\.\d+)?$/.test(v)) v = Number(v);
  if (typeof v !== 'number' || !Number.isFinite(v) || v < 0 || v > 100) {
    err(c, `${where}: VLT invalide (${JSON.stringify(v)})`);
    return null;
  }
  return v;
}

function vehicle(c, where, v) {
  if (!v) return null;
  const ws = v.windshield ?? {};
  const rule = ['strip', 'vlt', 'none'].includes(ws.rule) ? ws.rule : 'strip';
  const out = {
    windshield: {
      rule,
      strip: ws.strip ?? null,
      stripInches: typeof ws.stripInches === 'number' ? ws.stripInches : null,
      asLine: ws.asLine ?? null,
      vlt: rule === 'vlt' ? limit(c, `${where}.windshield`, ws.vlt) : null,
      reflective: ws.reflective ?? null,
    },
  };
  for (const w of WINDOWS) {
    if (!v[w]) err(c, `${where}.${w} manquant`);
    out[w] = { vlt: limit(c, `${where}.${w}`, v[w]?.vlt ?? null), note: v[w]?.note ?? null };
  }
  return out;
}

function measured(s) {
  const t = String(s ?? '').toLowerCase();
  if (t.includes('combined') || t.includes('glass')) return 'combined';
  if (t.includes('film alone') || t === 'film') return 'film';
  return 'unstated';
}

function hasSource(c, name, o) {
  if (!o) return;
  if (!o.cite) warn(c, `${name}: pas de citation`);
  if (!o.url) warn(c, `${name}: pas d'URL`);
}

const files = readdirSync(RAW).filter((f) => /^[A-Z]{2}\.json$/.test(f));
const states = [];
for (const code of CODES) {
  if (!files.includes(`${code}.json`)) {
    err(code, 'fichier data/raw manquant');
    continue;
  }
  let r;
  try {
    r = JSON.parse(readFileSync(join(RAW, `${code}.json`), 'utf8'));
  } catch (e) {
    err(code, `JSON illisible (${e.message})`);
    continue;
  }
  const t = r.tint ?? {};
  if (!Array.isArray(t.statute) || !t.statute.length || !t.statute.every((s) => s.cite && s.url)) {
    err(code, 'tint.statute : citation + URL obligatoires');
  }
  if (!Array.isArray(t.quotes) || !t.quotes.length) err(code, 'tint.quotes : extrait verbatim obligatoire');
  // Provenance de la lecture : site officiel en direct, copie archivée datée de la page officielle, ou non confirmé.
  const rd = r.read ?? {};
  if (!['official', 'archive', 'unconfirmed'].includes(rd.how) || !/^\d{4}-\d{2}-\d{2}$/.test(rd.date ?? '') || !rd.host) err(code, 'read : how/date/host obligatoires');
  if (rd.how === 'unconfirmed' && !(rd.noteEn && rd.noteEs)) err(code, 'read : note EN/ES obligatoire si non confirmé');
  // Relais non officiels interdits comme source (FindLaw interdit la reprise ; Justia, public.law, onecle = relais).
  if (/findlaw|justia|public\.law|onecle|law\.cornell/i.test(JSON.stringify(r))) err(code, 'relais non officiel cité (FindLaw/Justia/public.law/onecle/Cornell)');
  const passenger = vehicle(code, 'passenger', t.passenger);
  if (!passenger) err(code, 'tint.passenger manquant');
  const tol = t.tolerance && typeof t.tolerance.points === 'number' ? t.tolerance.points : null;
  for (const k of ['helmet', 'handheldPhone', 'studdedTires']) {
    if (!r[k]) warn(code, `${k} absent`);
    else hasSource(code, k, r[k]);
  }
  states.push({
    code,
    name: r.name,
    passenger,
    multipurpose: vehicle(code, 'multipurpose', t.multipurpose),
    measuredHow: measured(t.measuredHow),
    tolerancePoints: tol,
    frontByRear: Array.isArray(t.frontByRear) ? t.frontByRear : null,
    frontFilmMin: typeof t.frontFilmMin === 'number' ? t.frontFilmMin : null,
    detail: {
      statute: t.statute ?? [],
      reflectivity: t.reflectivity ?? null,
      tolerance: t.tolerance ?? null,
      colorsBanned: t.colorsBanned ?? [],
      dualMirrors: t.dualMirrors ?? null,
      certificateOrSticker: t.certificateOrSticker ?? null,
      medicalExemption: t.medicalExemption ?? null,
      penalty: t.penalty ?? null,
      lastAmended: t.lastAmended ?? null,
    },
    equipment: {
      helmet: r.helmet ?? null,
      handheldPhone: r.handheldPhone ?? null,
      studdedTires: r.studdedTires ?? null,
      radarDetector: r.radarDetector ?? null,
      underglow: r.underglow ?? null,
      liftHeight: r.liftHeight ?? null,
    },
    checkedOn: r.checkedOn ?? null,
    read: r.read ?? null,
    openQuestions: r.openQuestions ?? [],
  });
  if (!r.checkedOn) err(code, 'checkedOn manquant');
}

if (process.argv.includes('--check-links')) {
  const urls = new Set();
  for (const s of states) {
    s.detail.statute.forEach((x) => x.url && urls.add(x.url));
    if (s.detail.medicalExemption?.url) urls.add(s.detail.medicalExemption.url);
    if (s.detail.penalty?.url) urls.add(s.detail.penalty.url);
    Object.values(s.equipment).forEach((e) => e?.url && urls.add(e.url));
  }
  const ua = { 'user-agent': 'Mozilla/5.0 (data check; Radif Partners)' };
  for (const u of urls) {
    let ok = false;
    let status = 0;
    for (const method of ['HEAD', 'GET']) {
      try {
        const res = await fetch(u, { method, headers: ua, redirect: 'follow', signal: AbortSignal.timeout(20000) });
        status = res.status;
        if (res.ok) { ok = true; break; }
      } catch (e) { status = e.name; }
    }
    // 403/429 = robot refusé (courant sur les sites des législatures) : signalé, pas bloquant
    if (!ok) (status === 403 || status === 429 ? warn : err)('lien', `${status} ${u}`);
    await new Promise((r) => setTimeout(r, 300));
  }
}

/** Light copy for the browser tools: only what TintCheck and the mini-tools read (no notes, no quotes). */
const lite = states.map((s) => {
  const v = (x) => x && { windshield: { rule: x.windshield.rule, stripInches: x.windshield.stripInches, asLine: x.windshield.asLine, vlt: x.windshield.vlt }, frontSide: { vlt: x.frontSide.vlt }, backSide: { vlt: x.backSide.vlt }, rear: { vlt: x.rear.vlt } };
  const h = s.equipment.helmet, r = s.equipment.radarDetector, p = s.detail.penalty, m = s.detail.medicalExemption;
  return {
    code: s.code, name: s.name, read: s.read, passenger: v(s.passenger), multipurpose: v(s.multipurpose), measuredHow: s.measuredHow, tolerancePoints: s.tolerancePoints, frontByRear: s.frontByRear, frontFilmMin: s.frontFilmMin,
    detail: { statute: s.detail.statute.slice(0, 1).map((x) => ({ cite: x.cite, url: x.url })), penalty: p && { maxFineUsd: p.maxFineUsd, cite: p.cite }, medicalExemption: m && { available: m.available } },
    equipment: { helmet: h && { rule: h.rule, ageUnder: h.ageUnder, cite: h.cite }, radarDetector: r && { passengerAllowed: r.passengerAllowed, cite: r.cite } },
  };
});
writeFileSync(join(ROOT, 'src', 'data', 'states-lite.json'), JSON.stringify(lite) + '\n');

const dates = states.map((s) => s.checkedOn).filter(Boolean).sort();
writeFileSync(join(ROOT, 'src', 'data', 'states.json'), JSON.stringify(states, null, 1) + '\n');
writeFileSync(
  join(ROOT, 'src', 'data', 'meta.json'),
  JSON.stringify({ states: states.length, oldestCheck: dates[0] ?? null, newestCheck: dates.at(-1) ?? null, builtOn: dates.at(-1) ?? null }, null, 1) + '\n',
);

warnings.forEach((w) => console.warn('avert.', w));
errors.forEach((e) => console.error('ERREUR', e));
console.log(`${states.length} États écrits, ${errors.length} erreur(s), ${warnings.length} avertissement(s)`);
process.exit(errors.length ? 1 : 0);
