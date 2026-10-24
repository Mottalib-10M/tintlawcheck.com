/**
 * Editorial rules of every page file, checked without a build (RECETTE §7, §11, §21; CONTRIBUTING-PAGES.md):
 * title 50–60, description 150–160, citable block ≥ 130 words, 3–5 FAQ of 40–90 words, unique questions,
 * body ≥ 600 words on a guide and ≥ 450 on a state page, no em dash.
 */
import { describe, expect, it } from 'vitest';
import { PAGES } from '../src/lib/guides';
import { helpers } from '../src/lib/helpers';

const words = (html: string) => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const draft = (t: string) => t === 'stub';

describe.each(['en', 'es'] as const)('pages (%s)', (lang) => {
  const h = helpers(lang, true);
  const seen = new Map<string, string>();
  for (const p of PAGES) {
    const T = lang === 'es' ? p.es : p.en;
    if (!T || draft(T.title)) continue;
    it(`${p.id}`, () => {
      expect.soft(T.title.length, `title "${T.title}"`).toBeGreaterThanOrEqual(50);
      expect.soft(T.title.length, `title "${T.title}"`).toBeLessThanOrEqual(60);
      expect.soft(T.description.length, `description "${T.description}"`).toBeGreaterThanOrEqual(150);
      expect.soft(T.description.length, `description "${T.description}"`).toBeLessThanOrEqual(160);
      const resume = T.resume(h);
      expect.soft(words(resume), 'resume words').toBeGreaterThanOrEqual(130);
      const faqs = T.faqs(h);
      expect.soft(faqs.length).toBeGreaterThanOrEqual(3);
      expect.soft(faqs.length).toBeLessThanOrEqual(5);
      for (const f of faqs) {
        const n = words(f.a);
        expect.soft(n, `answer to "${f.q}" has ${n} words`).toBeGreaterThanOrEqual(40);
        expect.soft(n, `answer to "${f.q}" has ${n} words`).toBeLessThanOrEqual(90);
        expect.soft(seen.get(f.q), `question "${f.q}" also on ${seen.get(f.q)}`).toBeUndefined();
        seen.set(f.q, p.id);
      }
      const body = T.body(h);
      expect.soft(words(body), 'body words').toBeGreaterThanOrEqual(p.group === 'states' ? 450 : 600);
      for (const t of [T.title, T.description, T.h1, T.intro, T.card, resume, body, ...faqs.flatMap((f) => [f.q, f.a])]) expect(t, 'em dash').not.toMatch(/—/);
      expect.soft(body).not.toMatch(/<h1/);
    });
  }
});
