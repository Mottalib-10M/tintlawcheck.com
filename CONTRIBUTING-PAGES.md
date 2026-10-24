# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Models: `legal-percentage.ts` (guide with a
51-state table computed by the engine) and `state-il.ts` (state page). The page is built at
`/en/<en.slug>/` and, when `es` is present, at `/es/<es.slug>/`; the hreflang pair, menus, home lists and
sitemap follow by themselves.

## Fields

- `group`: `tint` (tint guides), `states` (one page per state) or `equipment` (helmet, radar detectors).
- `order`: position in its group (guides 1 to 60, states 101 and up in the order of the list).
- `state`: two-letter code on a state page; the tools open on that state.
- `tool`: the main tool, shown right under the H1 (first screen). `{ kind: 'tint', props: { film: 35 } }`
  (full window check) or `{ kind: 'mini:<spec>', props: {...} }`. Every page has one (RECETTE §9.3).
- `mini`: a second, smaller tool (optional). Mini specs, in `src/lib/mini-specs.ts`:
  `stack`, `darkness`, `darkest`, `compare`, `windshield`, `ticket`, `medical`, `helmet`, `radar`.
  Props: `{"state":"TX"}`, `{"state":"CA","b":"AZ"}` (compare), numbers for number fields
  (`glass`, `film`, `film2`, `dark`, `inches`, `age`, `kind` 0 car / 1 SUV, `cmv` 0 / 1).
- In a body, `<!--tool:mini:darkest|{"state":"FL","kind":1,"glass":70}-->` places a tool between paragraphs.
- `related`: 4 to 6 page ids (`home`, guides, `state-xx`).
- `sources`: keys of `src/data/params-2026.json` (`fmvss205`, `nhtsa_70`, `fmcsa_393_60`, `fmcsa_392_71`,
  `fmcsa_390_5`, `fmvss218`). A state page adds its statutes, penalty, helmet and radar sections itself.

## Text rules (checked by `npm run check` and `PAGES_DRAFT=1 npx vitest run tests/pages-text.test.ts`)

- `title` 50 to 60 characters, key term first ("Texas Tint Laws 2026: …"), never "How…" or "What…".
- `description` 150 to 160 characters.
- `resume(h)`: ONE paragraph of at least 130 words that answers the page's question with figures; it is
  shown folded after three lines.
- `faqs(h)`: 3 to 5 questions unique to the page, each answer 40 to 90 words, plain text: use `h.listN`
  and state names, never `h.sl`/`h.list` (answers go into JSON-LD).
- `body(h)`: HTML, `<h2>` sections, at least 600 words on a guide (tables count), 450 on a state page. No `<h1>`.
- No em dash anywhere; use a colon, comma or parentheses. American spelling.
- Spanish: neutral US Spanish ("manejar", "usted"), not a word-for-word translation; percent with a space
  (`35 %`).
- check-unique fails above 30 % shared sentences between two pages: vary structure, angle and comparisons.
- No link to another website than official sources. No tint shop, film brand, insurer or affiliate. Never
  present the site as a police agency or a DMV; no official logo.

## Figures

Never type a state figure: read it through the helpers `h` (`src/lib/helpers.ts`):
`h.S('TX')` gives the record and labels (`front`, `back`, `rear`, `fN`, `mpv`, `wsL`, `wsInches`, `tolL`,
`law` (linked citation), `fineL`, `penLink`, `medLink`, `checked`, `amended`, `nameL`), `h.sl(code)` state
link, `h.a(id, text)` internal link, `h.src(key, text)` federal source link,
`h.table(headers, rows, caption, align)`, `h.rank(fn, dir)`, `h.list(codes)` / `h.listN(codes)`, `h.pc`,
`h.m` (money), `h.nc` ("not confirmed"). Combined readings come from the engine
(`combinedVlt`, `darkestLegalFilm`, `checkWindow` in `src/lib/engine/tint.ts`).

A figure that is not in the data reads "not confirmed", never an estimate. Before writing a comparison
between states ("passes in X and Y"), check it against `src/data/states-lite.json`: limits differ in
whether the glass counts, in tolerance and in SUV rules.

## Data

State rules live in `data/raw/<XX>.json` (one file per state, with citation, URL, how it was read and
quotes). `node scripts/update-data.mjs` rebuilds `src/data/states.json`, `states-lite.json` and
`meta.json`; `--check-links` also checks that every official URL still answers. The workflow
`.github/workflows/update-data.yml` runs it on the 1st of each month and opens an issue if a link died.
