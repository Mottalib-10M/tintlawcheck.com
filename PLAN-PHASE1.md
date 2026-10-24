# us-window-tint — plan du site (phase 1, 2026-10-24)

Requêtes visées : liste fermée `reports/niches-2026-10-24/kp-us.txt`, bloc US4 (28 requêtes, anglais).
Langues : en (principale) + es (hispanophones des États-Unis) ; chaque page existe dans les deux langues.
Moteur principal : `src/lib/tint.ts` (VLT combinée = produit des transmissions, verdict par vitre, tolérance,
film le plus foncé autorisé), tests `src/lib/tint.test.ts` (16 tests, vitest 4, verts). Données : `data/states.json`
produit par `scripts/update-data.mjs` à partir de `data/raw/<XX>.json` (51 relevés de loi) + `data/federal.json`.

Verre d'origine : aucune valeur « typique » non sourcée. Le champ est saisi par l'usager ; la valeur par défaut est
70 % pour le pare-brise et les vitres avant (minimum de la norme fédérale FMVSS 205 / lettre NHTSA 1985-0320 :
hypothèse prudente, dite comme telle), 100 % (= « je ne sais pas, calcul film seul ») ailleurs, avec un bouton
« verre teinté d'usine (privacy glass) : saisissez la valeur mesurée ».

## Pages (31 par langue, 62 au total ; réserve de 16 pages ≤ 100)

| # | URL en (es) | Requête visée | Simulateur de la page |
|---|---|---|---|
| 1 | `/en/` (`/es/`) | window tint laws · tint laws | Calculateur complet en tête : État + type de véhicule + film et verre par vitre → VLT combinée, verdict par vitre, marge, film le plus foncé autorisé |
| 2 | `/en/tint-laws-by-state/` | tint laws by state | Carte/tableau des 51 États (avant / arrière / lunette / réflectivité) + comparateur de deux États (déménagement) |
| 3 | `/en/legal-tint-percentage/` | legal tint · legal tint percentage | État + verre → film le plus foncé légal pour chaque vitre |
| 4 | `/en/window-tint-percentage/` | window tint percentage · tint percentage chart | Empilement de couches (verre, film, second film) → VLT ; convertisseur « % d'obscurité » ↔ VLT ; nuancier 5/20/35/50/70 |
| 5 | `/en/windshield-tint-laws/` | windshield tint laws | État + hauteur de la bande (pouces) ou VLT du pare-brise → conforme ? (ligne AS-1, bande de N pouces) |
| 6 | `/en/tint-ticket/` | tint ticket | État + nombre d'infractions → amende et classe de l'infraction selon la loi citée ; correction possible (« fix-it ticket ») si la loi la prévoit |
| 7 | `/en/medical-exemption-window-tint/` | medical exemption window tint | État → exemption prévue ?, qui signe, quelles vitres, où déposer, limite dérogatoire |
| 8-19 | `/en/<state>-tint-laws/` : texas, florida, california, georgia, north-carolina, ohio, arizona, tennessee, virginia, illinois, pennsylvania, new-york | « <state> tint laws » (12 requêtes de la liste) | Calculateur complet préréglé sur l'État, réponse en 120 mots en tête, règles spéciales (SUV, tolérance, autocollant, miroirs), amende |
| 20 | `/en/motorcycle-helmet-laws-by-state/` | motorcycle helmet laws by state | État + âge + ancienneté du permis + assurance → casque obligatoire ? |
| 21 | `/en/lift-kit-laws-by-state/` | lift kit laws by state | État + hauteur saisie (cadre, pare-chocs ou phares) → sous la limite écrite dans la loi ? (États sans chiffre : « pas de limite chiffrée ») |
| 22 | `/en/underglow-laws-by-state/` | underglow laws by state | État + couleur + clignotant + en circulation → interdit / permis selon la loi |
| 23 | `/en/radar-detector-laws-by-state/` | radar detector laws by state | État + type de véhicule (voiture, utilitaire > 10 001 lb, commercial) → permis ? (fédéral 49 CFR 392.71 + VA, DC) |
| 24 | `/en/studded-tire-laws-by-state/` | studded tire laws by state | État + date → pneus cloutés permis aujourd'hui ? jours restants de la saison |
| 25 | `/en/hands-free-driving-laws-by-state/` | hands free driving laws by state | État + âge / permis provisoire → téléphone en main permis ? amende de la 1re infraction |
| 26-31 | about, method (méthode de calcul), sources, legal notice, privacy, 404 | — | méthode : calculateur de démonstration (exemple 35 % sur 80 %) ; les autres : pages de service |

Pages es : mêmes 31 (slugs espagnols : `/es/leyes-de-polarizado-por-estado/`, `/es/porcentaje-de-polarizado-legal/`,
`/es/porcentaje-de-polarizado/`, `/es/polarizado-del-parabrisas/`, `/es/multa-por-polarizado/`,
`/es/exencion-medica-polarizado/`, `/es/polarizado-en-texas/`…, `/es/ley-del-casco-por-estado/`…). Le texte espagnol
est écrit pour un hispanophone qui conduit aux États-Unis (vocabulaire : « polarizado », « lámina », « llantas »),
jamais une traduction mot à mot ; les citations de loi restent en anglais.

Réserve (seulement si le relevé KP la justifie, phase 2) : 8 États les plus peuplés hors liste (michigan,
new-jersey, washington, massachusetts, indiana, maryland, colorado, minnesota) × 2 langues = 16 pages → 78 pages.
Les 39 autres États sont couverts par le calculateur et le tableau de la page 2 (longue traîne par l'outil).

## Défaut des concurrents visé (dans le compte rendu seulement, jamais sur le site)

raynofilm.com (en tête) : tableaux statiques et carte image, aucune citation de loi, bandeau vers ses poseurs ;
truelineautomotive.com : « 2025 Legal Guide », Texas/Floride/Washington classés dans deux niveaux contradictoires ;
aucun calculateur de VLT combinée dans le SERP (recherche faite le 2026-10-24) ; pages parasites piratées
(camaramedellin.com.co, carmi.illinois.gov) sur « texas tint laws ».

## État de la donnée (2026-10-24)

- `data/raw/` : 51 relevés (50 États + DC), chacun avec citation, URL officielle, extraits verbatim, `checkedOn`,
  `openQuestions`. `node scripts/update-data.mjs` → 51 États, 0 erreur, 27 avertissements (équipements sans URL).
- Valeur `no-film` ajoutée (NJ, VT : aucun film à l'avant hors dérogation médicale), gérée par le moteur et testée.
- **À reprendre en phase 2 (audit RECETTE §17.4)** : Michigan (MCL 257.709 illisible : legislature.mi.gov refuse la
  connexion, miroirs en 403, Wayback en 429 ; vitres avant = null, ne pas publier de chiffre avant lecture) ;
  Indiana (copie 2016, amendement P.L.164-2018 non lu ; « windshield vlt 30 » à vérifier contre la bande AS-1) ;
  Arkansas (lu sur FindLaw à jour de mars 2024 ; URL officielle = accès public Lexis lié par arkleg) ; Delaware
  (50 % voté le 2026-08-17, date d'effet à lire) ; Hawaï (Act 129 de 2025, date d'effet) ; amendes non chiffrées
  dans 16 États (affichées « classe de l'infraction » sans montant) ; casque/téléphone/pneus cloutés nuls pour NM,
  RI (partiel), VT, TN, MA, DC, HI, MS, MI ; rehausse et néons : peu de chiffres, la page n'affiche que les États
  dont la loi donne une règle.
- Tests : `src/lib/tint.test.ts` (17) + `src/lib/states-data.test.ts` (3) = 20 verts. En phase 2, les déplacer dans
  `tests/` (motif `tests/**/*.test.ts` de la trame).
