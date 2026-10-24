import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { checkWindow, combinedVlt, darkestLegalFilm, type Window } from '../../lib/engine/tint';

const GLASS = 75;
const cell = (h: Helpers, code: string, w: Window) => {
  const s = h.STATES.find((x) => x.code === code)!;
  const r = checkWindow(s, 'passenger', w, 100, GLASS);
  if (r.limit === 'any') return h.es ? 'cualquiera' : 'any';
  if (r.limit === 'no-film') return h.es ? 'ninguna' : 'none allowed';
  if (r.limit === null) return h.nc;
  return r.darkestFilm == null ? (h.es ? 'ninguna (vidrio bajo el límite)' : 'none (glass below the limit)') : h.pc(r.darkestFilm);
};
const F = (h: Helpers) => {
  const front = h.STATES.map((s) => ({ c: s.code, l: s.passenger.frontSide.vlt }));
  const n35 = front.filter((x) => x.l === 35).length;
  return { n: h.STATES.length, n35 };
};

export default definePage({
  id: 'legal-percentage', group: 'tint', order: 3,
  tool: { kind: 'mini:darkest', props: { state: 'TX', kind: 0, glass: 75 } },
  mini: { kind: 'mini:stack' },
  related: ['home', 'percentage', 'by-state', 'state-tx', 'state-ca', 'state-fl'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'legal-tint-percentage', nav: 'Legal tint percentage',
    card: 'The darkest film you can legally buy for each window in every state, worked out on real factory glass.',
    title: 'Legal Tint Percentage 2026: Darkest Film Allowed by State',
    description: 'Legal tint percentage for 2026: the darkest film you can put on each window in every state once the factory glass is counted, from no film to any darkness.',
    h1: 'Legal tint percentage: the darkest film you can actually buy',
    intro: 'The legal percentage in the law is not the film to buy. Pick your state, vehicle and glass: the tool gives the darkest film each window can take without falling below the limit.',
    resume: (h) => {
      const f = F(h);
      return `The "legal tint percentage" printed in a statute is a minimum share of light that must pass through the window, and in most states that share is measured on the finished window, film and glass together. Factory glass already blocks part of the light, so the film has to be lighter than the number in the law. The rule of thumb is a division: darkest film = legal limit ÷ glass reading. On ${GLASS}% glass, a 35% limit allows a film of about ${h.pc(darkestLegalFilm(35, GLASS) as number)}, a 50% limit about ${h.pc(darkestLegalFilm(50, GLASS) as number)}, and a 70% limit about ${h.pc(darkestLegalFilm(70, GLASS) as number)}. ${f.n35} states set 35% on the front side windows, so a "35% film" sold as legal is in fact too dark on most cars there. The table below works out the darkest film for every window in the ${f.n} jurisdictions on ${GLASS}% glass, without counting any tolerance, which is the cautious reading. Enter your own glass in the tool to get your figures.`;
    },
    faqs: (h) => [
      { q: 'How do I calculate the darkest legal tint for my car?', a: `Divide the state's limit by your glass reading and multiply by 100. On ${GLASS}% glass with a 35% limit: 35 ÷ ${GLASS} × 100 = ${h.pc(darkestLegalFilm(35, GLASS) as number)}. Any film at or above that figure keeps the window legal. A film shop's meter gives the glass reading in seconds; without it, 70% is the cautious value to enter.` },
      { q: 'Why is my 35% tint illegal in a 35% state?', a: `Because the state measures the window, not the film. Your glass let through less than 100% before the film went on, so the window now reads below 35%: on ${GLASS}% glass, a 35% film gives ${h.pc(combinedVlt(GLASS, 35))}. Only a state that measures the film alone, or a written tolerance, would make that window pass.` },
      { q: 'Does the tolerance change the legal percentage?', a: 'It changes the reading an officer accepts, not the limit. A 3-point tolerance on a 35% limit means a meter reading of 32% is still accepted. Choosing film for the bottom of the margin leaves no room for error; it is safer to aim for the limit itself, because glass readings can vary from one door to the next.' },
      { q: 'What percentage is legal on the back window?', a: 'In many states, any. Eighteen jurisdictions let the back window of a car take any darkness, usually with two outside mirrors. Where a number applies, it is often the same as the rear side windows. The table gives the darkest film for the back window in each state, and the calculator applies the mirror condition.' },
    ],
    body: (h) => {
      const rows = h.STATES.map((s) => [h.sl(s.code), cell(h, s.code, 'frontSide'), cell(h, s.code, 'backSide'), cell(h, s.code, 'rear')]);
      return `
<h2>Darkest legal film by state, on ${GLASS}% glass</h2>
<p>For each window of a passenger car, the darkest film that keeps the window at or above the state limit once applied to glass that transmits ${GLASS}%. "Any" means the statute sets no number for that window; "none allowed" means no aftermarket film is allowed there.</p>
${h.table(['State', 'Front side', 'Rear side', 'Back window'], rows, `Computed as limit ÷ ${GLASS}% glass, without tolerance, from each state's statute as read for this site. California's front film must also be at least 88%; Illinois shows its 35% case (no rear window below 35%). SUVs, vans and pickups often have their own rule behind the driver.`, ['l', 'r', 'r', 'r'])}
<h2>Why the glass matters so much</h2>
<p>Federal standard ${h.src('fmvss205', 'FMVSS 205')} requires the glass in the driver's field of view to transmit at least 70%, and federal regulators have long pointed out that aftermarket film can take a window below that figure (${h.src('nhtsa_70', 'NHTSA interpretation letter')}). Each layer multiplies: a window is the product of its glass and every film on it. The same film therefore gives different readings on different cars, and two films stacked on one window can fall far below what either one shows alone. Try your own stack here:</p>
<!--tool:mini:stack|{"glass":78,"film":50,"film2":80}-->
<h2>Darkness or transmission?</h2>
<p>Film is often sold by the share of light it blocks ("20% tint" can mean 20% transmission or 20% darkness, depending on the shop). The laws always speak of light transmission, the share that passes. Before you buy, confirm that the figure on the box is the visible light transmission. The ${h.a('percentage', 'tint percentage guide')} explains the conversion and shows a chart of common films.</p>
<h2>Reading the table with your own car</h2>
<p>The table uses ${GLASS}% glass because it sits between the 70% federal minimum and clear glass, but your car can be lighter or darker. If your glass reads higher, the darkest film gets a little darker; if lower, it gets lighter, and on glass already under the limit no film is legal at all. For a sedan, the three columns apply as shown. For an SUV, van or pickup, many states free the windows behind the driver; the tool at the top of the page lets you switch vehicle type and enter your glass.</p>
<h2>What the table does not include</h2>
<p>It leaves out three things a full check needs. First, the reflectance limits, which many states write as a maximum share of reflected light. Second, the windshield, which follows a separate strip or percentage rule. Third, the measurement tolerance, which some states add to the reading. The ${h.a('home', 'full calculator')} checks all of them for one car at a time.</p>`;
    },
  },
  es: {
    slug: 'porcentaje-de-polarizado-legal', nav: 'Porcentaje legal',
    card: 'La lámina más oscura que puede comprar legalmente para cada ventana en cada estado, calculada sobre un vidrio de fábrica real.',
    title: 'Porcentaje de polarizado legal 2026: la lámina por estado',
    description: 'Porcentaje de polarizado legal 2026: la lámina más oscura que admite cada ventana en cada estado una vez contado el vidrio de fábrica, de cero a cualquier tono.',
    h1: 'Porcentaje de polarizado legal: la lámina más oscura que de verdad puede comprar',
    intro: 'El porcentaje legal de la ley no es la lámina que debe comprar. Elija su estado, su vehículo y su vidrio: la herramienta da la lámina más oscura que cada ventana admite sin bajar del límite.',
    resume: (h) => {
      const f = F(h);
      return `El «porcentaje de polarizado legal» escrito en una ley es una parte mínima de luz que debe atravesar la ventana, y en la mayoría de los estados esa parte se mide en la ventana terminada, lámina y vidrio juntos. El vidrio de fábrica ya bloquea parte de la luz, así que la lámina debe ser más clara que la cifra de la ley. La regla práctica es una división: lámina más oscura = límite legal ÷ lectura del vidrio. Sobre un vidrio de ${GLASS} %, un límite de 35 % permite una lámina de unos ${h.pc(darkestLegalFilm(35, GLASS) as number)}, un límite de 50 % unos ${h.pc(darkestLegalFilm(50, GLASS) as number)}, y uno de 70 % unos ${h.pc(darkestLegalFilm(70, GLASS) as number)}. ${f.n35} estados fijan 35 % en las laterales delanteras, así que una «lámina de 35 %» vendida como legal es en realidad demasiado oscura en la mayoría de los autos de esos estados. La tabla de abajo calcula la lámina más oscura de cada ventana en las ${f.n} jurisdicciones sobre un vidrio de ${GLASS} %, sin contar tolerancia, que es la lectura prudente. Ponga su propio vidrio en la herramienta para obtener sus cifras.`;
    },
    faqs: (h) => [
      { q: '¿Cómo calculo el polarizado legal más oscuro para mi auto?', a: `Divida el límite del estado entre la lectura de su vidrio y multiplique por 100. Con un vidrio de ${GLASS} % y un límite de 35 %: 35 ÷ ${GLASS} × 100 = ${h.pc(darkestLegalFilm(35, GLASS) as number)}. Toda lámina igual o más clara mantiene la ventana legal. El medidor de un taller da la lectura del vidrio en segundos; sin ella, 70 % es el valor prudente.` },
      { q: '¿Por qué mi polarizado de 35 % es ilegal en un estado de 35 %?', a: `Porque el estado mide la ventana, no la lámina. Su vidrio ya dejaba pasar menos del 100 % antes de la lámina, así que la ventana mide ahora menos de 35 %: sobre un vidrio de ${GLASS} %, una lámina de 35 % da ${h.pc(combinedVlt(GLASS, 35))}. Solo un estado que mide la lámina sola, o una tolerancia escrita, haría pasar esa ventana.` },
      { q: '¿La tolerancia cambia el porcentaje legal?', a: 'Cambia la lectura que acepta un agente, no el límite. Una tolerancia de 3 puntos sobre un límite de 35 % significa que una lectura de 32 % en el medidor se sigue aceptando. Elegir la lámina para el fondo del margen no deja sitio al error; es más seguro apuntar al límite mismo, porque las lecturas de vidrio pueden cambiar de una puerta a otra.' },
      { q: '¿Qué porcentaje es legal en el vidrio trasero?', a: 'En muchos estados, cualquiera. Dieciocho jurisdicciones dejan que el vidrio trasero de un auto lleve cualquier oscuridad, casi siempre con dos espejos exteriores. Donde hay cifra, suele ser la misma que la de las laterales traseras. La tabla da la lámina más oscura del vidrio trasero en cada estado, y la calculadora aplica la condición de los espejos.' },
    ],
    body: (h) => {
      const rows = h.STATES.map((s) => [h.sl(s.code), cell(h, s.code, 'frontSide'), cell(h, s.code, 'backSide'), cell(h, s.code, 'rear')]);
      return `
<h2>Lámina legal más oscura por estado, sobre un vidrio de ${GLASS} %</h2>
<p>Para cada ventana de un auto de pasajeros, la lámina más oscura que mantiene la ventana en el límite del estado o por encima una vez aplicada a un vidrio que transmite ${GLASS} %. «Cualquiera» significa que la ley no fija cifra para esa ventana; «ninguna» significa que no se admite lámina añadida ahí.</p>
${h.table(['Estado', 'Lateral delantera', 'Lateral trasera', 'Vidrio trasero'], rows, `Calculado como límite ÷ vidrio de ${GLASS} %, sin tolerancia, a partir de la ley de cada estado leída para este sitio. En California la lámina delantera debe además ser de al menos 88 %; Illinois muestra su caso de 35 % (ninguna trasera por debajo de 35 %). Las SUV, vans y pickups suelen tener su propia regla detrás del conductor.`, ['l', 'r', 'r', 'r'])}
<h2>Por qué el vidrio pesa tanto</h2>
<p>La norma federal ${h.src('fmvss205', 'FMVSS 205')} exige que el vidrio del campo de visión del conductor transmita al menos 70 %, y los reguladores federales señalan desde hace tiempo que una lámina añadida puede bajar la ventana por debajo de esa cifra (${h.src('nhtsa_70', 'carta de interpretación de la NHTSA')}). Cada capa multiplica: una ventana es el producto de su vidrio y de cada lámina. La misma lámina da por tanto lecturas distintas en autos distintos, y dos láminas superpuestas pueden quedar muy por debajo de lo que muestra cada una sola. Pruebe su propia combinación aquí:</p>
<!--tool:mini:stack|{"glass":78,"film":50,"film2":80}-->
<h2>¿Oscuridad o transmisión?</h2>
<p>La lámina se vende a menudo por la parte de luz que bloquea («polarizado de 20 %» puede significar 20 % de transmisión o 20 % de oscuridad, según el taller). Las leyes siempre hablan de transmisión de luz, la parte que pasa. Antes de comprar, confirme que la cifra de la caja es la transmisión de luz visible. La ${h.a('percentage', 'guía del porcentaje de polarizado')} explica la conversión y muestra una tabla de láminas comunes.</p>
<h2>Leer la tabla con su propio auto</h2>
<p>La tabla usa un vidrio de ${GLASS} % porque queda entre el mínimo federal de 70 % y un vidrio claro, pero su auto puede ser más claro o más oscuro. Si su vidrio mide más, la lámina más oscura puede ser algo más oscura; si mide menos, más clara, y sobre un vidrio que ya está por debajo del límite no hay lámina legal. En un sedán, las tres columnas valen tal como aparecen. En una SUV, van o pickup, muchos estados liberan las ventanas detrás del conductor; la herramienta de arriba le permite cambiar el tipo de vehículo y poner su vidrio.</p>
<h2>Lo que la tabla no incluye</h2>
<p>Deja fuera tres cosas que necesita una revisión completa. Primero, los límites de reflectancia, que muchos estados escriben como una parte máxima de luz reflejada. Segundo, el parabrisas, que sigue una regla aparte de franja o de porcentaje. Tercero, la tolerancia de medición, que algunos estados suman a la lectura. La ${h.a('home', 'calculadora completa')} revisa todo eso para un auto a la vez.</p>`;
    },
  },
});
