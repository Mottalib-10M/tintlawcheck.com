import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import type { Limit } from '../../lib/engine/tint';

type W = 'frontSide' | 'backSide' | 'rear';
const codes = (h: Helpers, w: W, test: (l: Limit) => boolean) => h.STATES.filter((s) => test(s.passenger[w].vlt)).map((s) => s.code);
const num = (l: Limit, lo: number, hi: number) => typeof l === 'number' && l >= lo && l <= hi;
const BANDS: Array<[string, string, (l: Limit) => boolean]> = [
  ['No film at all', 'Ninguna lámina', (l) => l === 'no-film'],
  ['70%', '70 %', (l) => num(l, 70, 100)],
  ['50%', '50 %', (l) => num(l, 50, 69)],
  ['35%', '35 %', (l) => num(l, 35, 49)],
  ['30% to 33%', '30 a 33 %', (l) => num(l, 30, 34)],
  ['27% to 28%', '27 a 28 %', (l) => num(l, 26, 29)],
  ['24% to 25%', '24 a 25 %', (l) => num(l, 21, 25)],
  ['20%', '20 %', (l) => num(l, 0, 20)],
];
const F = (h: Helpers) => {
  const front = BANDS.map(([en, es, t]) => ({ label: h.es ? es : en, c: codes(h, 'frontSide', t) }));
  const anyRear = codes(h, 'rear', (l) => l === 'any');
  const anyBack = codes(h, 'backSide', (l) => l === 'any');
  const mpvOwn = h.STATES.filter((s) => s.multipurpose).map((s) => s.code);
  const darkRear = h.rank((s) => (typeof s.passenger.rear.vlt === 'number' ? s.passenger.rear.vlt : null)).slice(0, 4);
  const tol = h.STATES.filter((s) => s.tolerancePoints).map((s) => s.code);
  return { front, anyRear, anyBack, mpvOwn, darkRear, tol, n: h.STATES.length, mi: h.S('MI') };
};

export default definePage({
  id: 'by-state', group: 'tint', order: 2,
  tool: { kind: 'mini:compare', props: { state: 'TX', b: 'CA' } },
  mini: { kind: 'mini:darkest' },
  related: ['home', 'legal-percentage', 'state-tx', 'state-ca', 'state-fl', 'state-ny'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'tint-laws-by-state', nav: 'Tint laws by state',
    card: 'The 50 states and DC grouped by the darkest front tint they allow, with the rear rules and SUV exceptions.',
    title: 'Tint Laws by State 2026: Front Limits From No Film to 20%',
    description: 'Tint laws by state for 2026: the 50 states and DC grouped by front side window limit, from no film at all to 20%, with rear rules and SUV exceptions cited.',
    h1: 'Window tint laws by state: who allows what on the front doors',
    intro: 'Pick two states to compare their limits window by window, or read the groups below: every state is placed by the darkest front side window its statute allows on a car.',
    resume: (h) => {
      const f = F(h);
      const g = (i: number) => f.front[i].c.length;
      return `Across the ${f.n} jurisdictions read for this site, the front side windows are where the laws differ most. ${g(3)} states set the front limit at 35%, the most common figure. ${g(1)} jurisdictions ask for 70%, the same figure federal rules require of new glass in the driver's view, and ${g(0)}, ${h.list(f.front[0].c)}, allow no film at all on the front side windows. At the other end, ${h.list(f.front[7].c)} goes down to 20%. Behind the driver the picture changes: ${f.anyRear.length} states let the back window of a car take any darkness, usually on condition of two outside mirrors, and ${f.mpvOwn.length} write a separate rule for SUVs, vans and pickups. ${f.tol.length} statutes write a measurement tolerance, from 3 to 9 points. Most states measure film and glass together, so the film you buy must be lighter than the number in the law. Each state page cites the section read, with the date it was checked.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Which states allow the darkest front window tint?', a: `${h.listN(f.front[7].c)} allows 20% on the front side windows of a car, the lowest figure in the ${f.n} jurisdictions read. Next come ${h.listN(f.front[6].c)} at 24% or 25%. These figures are for film and glass together in most of these states, so the film itself must be lighter than the limit.` },
        { q: 'Which states ban tint on the front side windows?', a: `${h.listN(f.front[0].c)} allow no aftermarket film on the front side windows of a car, except under a medical exemption. Michigan allows a strip at the top of those windows only. Owners moving to one of these states with tinted front doors must remove the film to drive there legally.` },
        { q: 'Is 35% tint legal in every state?', a: `No. 35% is the most common limit, set by ${f.front[3].c.length} states, but most of them count the glass, so a 35% film reads lower once applied. ${f.front[1].c.length} jurisdictions ask for 70% on the front, ${f.front[2].c.length} ask for 50%, and three allow no film there. Check the destination state before a long trip.` },
        { q: 'Do tint laws apply to out-of-state cars?', a: 'The statutes speak of vehicles operated on the state\'s roads and generally do not exempt visitors. A car tinted to its home state\'s limit can therefore be cited elsewhere, which is why the comparison tool lists both limits side by side.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `
<h2>States grouped by front side window limit</h2>
<p>The table places every jurisdiction by the lowest light transmission its statute allows on the front side windows of a passenger car. Click a state with its own page for the full rule; for the others, the calculator on the ${h.a('home', 'home page')} opens their statute.</p>
${h.table(['Front limit', 'States', 'Count'], f.front.map((b) => [b.label, h.list(b.c), b.c.length]), `Front side windows of a passenger car in the ${f.n} jurisdictions read (50 states and DC). Limits are for film and glass together unless the statute measures the film alone.`, ['l', 'l', 'r'])}
<p>A few rules do not fit a single number. California allows only clear film of at least 88% on the front doors, on top of the 70% total. Illinois ties the front limit to the rear windows: 35% if no rear window is below 35%, 50% if none is below 30%, and no front tint otherwise. Michigan allows no film on the front side windows except a strip along the top. The calculator applies each of these rules.</p>
<h2>The rear of the car is usually freer</h2>
<p>${f.anyRear.length} jurisdictions let the back window of a car take any darkness, and ${f.anyBack.length} do the same for the rear side windows. The common condition is a pair of outside mirrors giving a view to the rear. Where the rear does have a number, the darkest figures for a car are in ${h.list(f.darkRear.map((s) => s.code))}, at ${f.darkRear.map((s) => h.lim(s.passenger.rear.vlt)).join(', ')} respectively.</p>
<h2>SUVs, vans and pickups</h2>
<p>${f.mpvOwn.length} statutes write a separate rule for multipurpose passenger vehicles. In most of them the windows behind the driver are free, which is why factory privacy glass is legal on an SUV in states that ban the same darkness on a sedan. The front side windows almost never get this exemption. Pick the vehicle type in the calculator to apply the right rule.</p>
<h2>Compare the darkest film by state</h2>
<p>The legal film depends on your glass as well as the limit. Choose a state, a vehicle type and your glass reading to see the darkest film for each window:</p>
<!--tool:mini:darkest|{"state":"FL","kind":0,"glass":75}-->
<h2>Tolerance, reflection and the windshield</h2>
<p>${f.tol.length} statutes give officers a measurement margin, usually 3 points; Virginia and Nevada write 7 and South Dakota 9. Most states also cap reflectance, often at 20%, 25% or 35%, and ban mirror finishes. On the windshield, the usual rule is a strip along the top, measured either in inches or down to the AS-1 line marked on the glass; a few states ask for 70% on the whole windshield instead, and ${h.a('windshield', 'the windshield guide')} compares them.</p>
<h2>How the figures were read</h2>
<p>Each state's figures come from its statute or regulation, read on the official legislature or code site when it answered, and otherwise on an archived copy of that official page or a reproduction of the code, as each state page says. Michigan is the case to note: the official legislature site refused our connections on the day of the check, so section 257.709 was read in a published reproduction marked current as of January 1, 2025, and no later amendment was found. Its figures stay marked with that caveat until the official text can be read. The ${h.a('method', 'method page')} explains how the calculator turns these texts into a verdict.</p>`;
    },
  },
  es: {
    slug: 'leyes-de-polarizado-por-estado', nav: 'Leyes por estado',
    card: 'Los 50 estados y DC agrupados según el polarizado delantero más oscuro que permiten, con las reglas traseras y las SUV.',
    title: 'Leyes de polarizado por estado 2026: de cero lámina a 20 %',
    description: 'Leyes de polarizado por estado 2026: los 50 estados y DC agrupados por el límite de las laterales delanteras, de cero lámina a 20 %, con reglas traseras y SUV.',
    h1: 'Leyes de polarizado por estado: quién permite qué en las puertas delanteras',
    intro: 'Elija dos estados para comparar sus límites ventana por ventana, o lea los grupos de abajo: cada estado aparece según la lateral delantera más oscura que su ley permite en un auto.',
    resume: (h) => {
      const f = F(h);
      const g = (i: number) => f.front[i].c.length;
      return `En las ${f.n} jurisdicciones leídas para este sitio, las laterales delanteras son donde más difieren las leyes. ${g(3)} estados fijan el límite delantero en 35 %, la cifra más común. ${g(1)} jurisdicciones piden 70 %, la misma cifra que las normas federales exigen al vidrio nuevo en el campo de visión del conductor, y ${g(0)}, ${h.list(f.front[0].c)}, no permiten ninguna lámina en las laterales delanteras. En el otro extremo, ${h.list(f.front[7].c)} baja hasta 20 %. Detrás del conductor el panorama cambia: ${f.anyRear.length} estados dejan que el vidrio trasero de un auto lleve cualquier oscuridad, casi siempre con la condición de dos espejos exteriores, y ${f.mpvOwn.length} escriben una regla aparte para las SUV, vans y pickups. ${f.tol.length} leyes escriben una tolerancia de medición, de 3 a 9 puntos. La mayoría de los estados mide lámina y vidrio juntos, así que la lámina que compra debe ser más clara que la cifra de la ley. Cada página de estado cita la sección leída, con la fecha de la revisión.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿Qué estados permiten el polarizado delantero más oscuro?', a: `${h.listN(f.front[7].c)} permite 20 % en las laterales delanteras de un auto, la cifra más baja de las ${f.n} jurisdicciones leídas. Después vienen ${h.listN(f.front[6].c)} con 24 o 25 %. En la mayoría de estos estados las cifras valen para lámina y vidrio juntos, así que la lámina misma debe ser más clara que el límite.` },
        { q: '¿Qué estados prohíben el polarizado en las laterales delanteras?', a: `${h.listN(f.front[0].c)} no permiten lámina añadida en las laterales delanteras de un auto, salvo con una exención médica. Michigan solo admite una franja en la parte alta de esas ventanas. Quien se muda a uno de estos estados con las puertas delanteras polarizadas debe quitar la lámina para circular legalmente.` },
        { q: '¿Es legal el polarizado de 35 % en todos los estados?', a: `No. El 35 % es el límite más común, fijado por ${f.front[3].c.length} estados, pero la mayoría cuenta el vidrio, así que una lámina de 35 % mide menos una vez aplicada. ${f.front[1].c.length} jurisdicciones piden 70 % adelante, ${f.front[2].c.length} piden 50 %, y tres no permiten lámina ahí. Revise el estado de destino antes de un viaje largo.` },
        { q: '¿Las leyes de polarizado se aplican a los autos de otro estado?', a: 'Las leyes hablan de los vehículos que circulan por las vías del estado y en general no eximen a los visitantes. Un auto polarizado al límite de su estado puede recibir una multa en otro, por eso la herramienta de comparación muestra los dos límites.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `
<h2>Estados agrupados por el límite de las laterales delanteras</h2>
<p>La tabla coloca cada jurisdicción según la transmisión de luz más baja que su ley permite en las laterales delanteras de un auto de pasajeros. Haga clic en un estado con página propia para ver la regla completa; para los demás, la calculadora de la ${h.a('home', 'página principal')} abre su ley.</p>
${h.table(['Límite delantero', 'Estados', 'Número'], f.front.map((b) => [b.label, h.list(b.c), b.c.length]), `Laterales delanteras de un auto de pasajeros en las ${f.n} jurisdicciones leídas (50 estados y DC). Límites para lámina y vidrio juntos salvo que la ley mida la lámina sola.`, ['l', 'l', 'r'])}
<p>Algunas reglas no caben en una sola cifra. California solo admite en las puertas delanteras una lámina transparente de al menos 88 %, además del 70 % total. Illinois une el límite delantero a las ventanas traseras: 35 % si ninguna trasera baja de 35 %, 50 % si ninguna baja de 30 %, y nada adelante en otro caso. Michigan no admite lámina en las laterales delanteras salvo una franja en la parte alta. La calculadora aplica cada una de estas reglas.</p>
<h2>La parte trasera suele ser más libre</h2>
<p>${f.anyRear.length} jurisdicciones dejan que el vidrio trasero de un auto lleve cualquier oscuridad, y ${f.anyBack.length} hacen lo mismo con las laterales traseras. La condición habitual es un par de espejos exteriores con vista hacia atrás. Donde la parte trasera tiene cifra, las más oscuras para un auto están en ${h.list(f.darkRear.map((s) => s.code))}, con ${f.darkRear.map((s) => h.lim(s.passenger.rear.vlt)).join(', ')} respectivamente.</p>
<h2>SUV, vans y pickups</h2>
<p>${f.mpvOwn.length} leyes escriben una regla aparte para los vehículos de usos múltiples. En la mayoría, las ventanas detrás del conductor quedan libres, y por eso el vidrio privado de fábrica es legal en una SUV en estados que prohíben esa oscuridad en un sedán. Las laterales delanteras casi nunca tienen esta exención. Elija el tipo de vehículo en la calculadora para aplicar la regla correcta.</p>
<h2>Compare la lámina más oscura por estado</h2>
<p>La lámina legal depende de su vidrio además del límite. Elija un estado, un tipo de vehículo y la lectura de su vidrio para ver la lámina más oscura de cada ventana:</p>
<!--tool:mini:darkest|{"state":"FL","kind":0,"glass":75}-->
<h2>Tolerancia, reflejo y parabrisas</h2>
<p>${f.tol.length} leyes dan a los agentes un margen de medición, casi siempre de 3 puntos; Virginia y Nevada escriben 7 y Dakota del Sur 9. La mayoría de los estados también limita la reflectancia, a menudo a 20, 25 o 35 %, y prohíbe los acabados espejo. En el parabrisas, la regla habitual es una franja en la parte alta, medida en pulgadas o hasta la línea AS-1 marcada en el vidrio; unos pocos estados piden 70 % en todo el parabrisas, y ${h.a('windshield', 'la guía del parabrisas')} los compara.</p>
<h2>Cómo se leyeron las cifras</h2>
<p>Las cifras de cada estado vienen de su ley o reglamento, leídos en el sitio oficial de la legislatura o del código cuando respondía, y si no en una copia archivada de esa página oficial o en una reproducción del código, como indica cada página de estado. Michigan es el caso a señalar: el sitio oficial de la legislatura rechazó nuestras conexiones el día de la revisión, así que la sección 257.709 se leyó en una reproducción publicada marcada como vigente al 1 de enero de 2025, y no se encontró ninguna reforma posterior. Sus cifras llevan esa reserva hasta que pueda leerse el texto oficial. La ${h.a('method', 'página de metodología')} explica cómo la calculadora convierte estos textos en un veredicto.</p>`;
    },
  },
});
