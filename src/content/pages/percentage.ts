import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { checkWindow, combinedVlt, type Window } from '../../lib/engine/tint';

const FILMS = [5, 15, 20, 35, 50, 70, 80];
const GLASS = 75;
/** Number of jurisdictions where a film passes on a window of a car (tolerance counted), on GLASS glass. */
const passCount = (h: Helpers, film: number, w: Window) =>
  h.STATES.filter((s) => { const v = checkWindow(s, 'passenger', w, film, GLASS).verdict; return v === 'legal' || v === 'tolerance' || v === 'no-limit'; }).length;

export default definePage({
  id: 'percentage', group: 'tint', order: 4,
  tool: { kind: 'mini:stack', props: { glass: 75, film: 35, film2: 100 } },
  mini: { kind: 'mini:darkness' },
  related: ['home', 'legal-percentage', 'by-state', 'windshield', 'state-tx', 'state-ca'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'window-tint-percentage', nav: 'Tint percentage',
    card: 'What 5%, 20%, 35% or 50% tint really means once the film sits on factory glass, with a chart.',
    title: 'Window Tint Percentage 2026: What 5% to 80% Really Means',
    description: 'Window tint percentage explained: what 5%, 20%, 35%, 50% and 70% film give on factory glass, a chart of combined readings and how many states allow each one.',
    h1: 'Window tint percentage: what the number on the film really means',
    intro: 'Enter your glass and the film you are considering: the tool multiplies them and shows the reading a meter would give, the figure every state law is written against.',
    resume: (h) => `A window tint percentage is the share of visible light that a film lets through, called visible light transmission or VLT. A 5% film lets through 5% of the light and is very dark; a 70% film lets through 70% and is barely visible. The number on the box describes the film alone. Once it sits on a window, the light passes through the glass and the film in turn, so the window's reading is the product of the two: a 35% film on ${GLASS}% factory glass reads ${h.pc(combinedVlt(GLASS, 35))}, and a 20% film on the same glass reads ${h.pc(combinedVlt(GLASS, 20))}. State laws set a minimum for that combined reading in most cases, which is why the same film can be legal on one car and illegal on another. Some shops quote darkness instead, the share of light blocked: "80% tint" in that sense is a 20% film. The chart below gives the combined reading of common films on two glass readings and the number of the ${h.STATES.length} jurisdictions where each one passes on a car's front side windows.`,
    faqs: (h) => [
      { q: 'Is 5% or 35% tint darker?', a: 'Five percent is darker. The percentage is the light that passes through, so a lower number means a darker film. A 5% film, often called limo tint, lets through one twentieth of the light. A 35% film lets through about a third. On the same glass, the 5% window reads seven times darker than the 35% one.' },
      { q: 'What does 20% tint look like on a car?', a: `On ${GLASS}% factory glass a 20% film reads ${h.pc(combinedVlt(GLASS, 20))}, which makes the cabin hard to see into from outside in daylight. On the front side windows of a car it passes in none of the ${h.STATES.length} jurisdictions read on that glass, not even New Mexico at 20%, when its limit is read cautiously as film and glass together. Behind the driver it is legal in many more, especially on SUVs, vans and pickups.` },
      { q: 'What tint percentage is best for heat?', a: 'The percentage measures visible light only, not heat. Two films with the same VLT can block very different amounts of infrared and ultraviolet energy, depending on the material. Manufacturers publish separate figures for total solar energy rejected and UV blocked; compare those for heat, and keep the VLT within your state limit.' },
      { q: 'Can I put a second film over my existing tint?', a: `You can, but the readings multiply again. On ${GLASS}% glass, a 50% film over an old 50% film reads ${h.pc(combinedVlt(GLASS, 50, 50))}, which fails in most states on the front side windows. The tool at the top of this page takes a second film for exactly this case.` },
    ],
    body: (h) => {
      const rows = FILMS.map((f) => [`${h.pc(f)}`, h.pc(100 - f), h.pc(combinedVlt(70, f)), h.pc(combinedVlt(85, f)), `${passCount(h, f, 'frontSide')} / ${h.STATES.length}`, `${passCount(h, f, 'rear')} / ${h.STATES.length}`]);
      return `
<h2>Tint percentage chart</h2>
<p>Each row is a common film. The middle columns give the window's reading once the film is on glass that transmits 70% (the federal minimum for new glass in the driver's view) or 85%. The last two columns count the jurisdictions, out of ${h.STATES.length}, where that film passes on a car's front side windows and back window when applied to ${GLASS}% glass, with any written tolerance counted.</p>
${h.table(['Film VLT', 'Darkness', 'On 70% glass', 'On 85% glass', 'Front doors pass', 'Back window pass'], rows, `Readings computed as film × glass. Counts apply each state's statute as read for this site to a passenger car with ${GLASS}% glass; "any darkness" counts as a pass.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<h2>Transmission or darkness</h2>
<p>The laws speak of transmission, the light that passes. Many shops and online listings speak of darkness, the light blocked, and some use both on the same page. A "35% tint" can therefore mean a 35% film or a 65% one. Convert any advertised number before you buy:</p>
<!--tool:mini:darkness|{"dark":80}-->
<h2>Why factory glass changes the result</h2>
<p>Federal standard ${h.src('fmvss205', 'FMVSS 205')} sets 70% as the minimum light transmittance for glass needed for driving visibility, and the windows of new cars are built to meet it. Many cars also come with darker privacy glass behind the driver, which is allowed because those windows are not requisite for driving visibility. When you add film, the reading of the window is the glass multiplied by the film. The federal regulator has written that adding film can take a window below the federal level (${h.src('nhtsa_70', 'NHTSA interpretation')}), and state laws then decide what is allowed.</p>
<h2>Percentages on the windshield</h2>
<p>The windshield follows its own rule in every state. Most allow a strip of film along the top only, measured in inches or down to the AS-1 line printed on the glass, and the percentage of that strip is often not limited at all. A few states set a percentage for the whole windshield instead, usually 70%. A tint percentage bought for the side windows therefore says nothing about the windshield; the ${h.a('windshield', 'windshield guide')} gives the rule for each state.</p>
<h2>How to read your own window</h2>
<p>A tint meter, which many film shops and some inspection stations own, clamps over the glass and gives the combined reading in a second. Measure the bare glass first, before the film goes on, and keep the figure: it lets you compute the darkest legal film for your car with the ${h.a('legal-percentage', 'legal percentage table')}. If the car already has film, the meter reads glass and film together, which is what an officer would see.</p>
<h2>Common films and where they end up</h2>
<p>On ${GLASS}% glass, very dark films, 5% to 15%, are legal on the front side windows of a car in no state, and on the back window only where the law sets no number or a very low one. 20% film fails on the front everywhere once the glass is counted, even under New Mexico's 20% limit read cautiously. 35% film is a frequent request, yet on that glass it passes on the front only in the ${passCount(h, 35, 'frontSide')} states whose limit is lower, and fails in every state that sets 35%. 50% and 70% films pass on the front in most states, and only clear film passes in the states that ask for 70% total. Check the ${h.a('by-state', 'state-by-state groups')} for the exact limits.</p>`;
    },
  },
  es: {
    slug: 'porcentaje-de-polarizado', nav: 'Porcentaje de polarizado',
    card: 'Qué significa de verdad un polarizado de 5, 20, 35 o 50 % una vez puesto sobre el vidrio de fábrica, con una tabla.',
    title: 'Porcentaje de polarizado 2026: qué significa de 5 a 80 %',
    description: 'Porcentaje de polarizado: lo que dan las láminas de 5, 20, 35, 50 y 70 % sobre el vidrio de fábrica, una tabla de lecturas y cuántos estados las admiten.',
    h1: 'Porcentaje de polarizado: lo que de verdad significa la cifra de la lámina',
    intro: 'Ponga su vidrio y la lámina que piensa poner: la herramienta los multiplica y muestra la lectura que daría un medidor, la cifra con la que se escriben todas las leyes estatales.',
    resume: (h) => `Un porcentaje de polarizado es la parte de luz visible que deja pasar una lámina, llamada transmisión de luz visible o VLT. Una lámina de 5 % deja pasar el 5 % de la luz y es muy oscura; una de 70 % deja pasar el 70 % y apenas se ve. La cifra de la caja describe la lámina sola. Una vez puesta en una ventana, la luz atraviesa el vidrio y la lámina una tras otro, así que la lectura de la ventana es el producto de los dos: una lámina de 35 % sobre un vidrio de fábrica de ${GLASS} % da ${h.pc(combinedVlt(GLASS, 35))}, y una de 20 % sobre el mismo vidrio da ${h.pc(combinedVlt(GLASS, 20))}. Las leyes estatales fijan en la mayoría de los casos un mínimo para esa lectura combinada, y por eso la misma lámina puede ser legal en un auto e ilegal en otro. Algunos talleres hablan de oscuridad, la parte de luz bloqueada: un «polarizado de 80 %» en ese sentido es una lámina de 20 %. La tabla de abajo da la lectura combinada de láminas comunes sobre dos vidrios y el número de las ${h.STATES.length} jurisdicciones en las que cada una pasa en las laterales delanteras de un auto.`,
    faqs: (h) => [
      { q: '¿Qué es más oscuro, un polarizado de 5 % o de 35 %?', a: 'El de 5 % es más oscuro. El porcentaje es la luz que pasa, así que una cifra más baja indica una lámina más oscura. Una lámina de 5 %, que muchos llaman polarizado de limusina, deja pasar la vigésima parte de la luz. Una de 35 % deja pasar cerca de un tercio. Sobre el mismo vidrio, la ventana de 5 % es siete veces más oscura que la de 35 %.' },
      { q: '¿Cómo se ve un polarizado de 20 % en un auto?', a: `Sobre un vidrio de fábrica de ${GLASS} %, una lámina de 20 % da ${h.pc(combinedVlt(GLASS, 20))}, lo que hace difícil ver el interior desde fuera de día. En las laterales delanteras de un auto no pasa en ninguna de las ${h.STATES.length} jurisdicciones leídas con ese vidrio, ni siquiera en Nuevo México con 20 %, si su límite se lee con prudencia como lámina y vidrio juntos. Detrás del conductor es legal en muchas más, sobre todo en SUV, vans y pickups.` },
      { q: '¿Qué porcentaje de polarizado es mejor contra el calor?', a: 'El porcentaje mide solo la luz visible, no el calor. Dos láminas con la misma VLT pueden bloquear cantidades muy distintas de energía infrarroja y ultravioleta, según el material. Los fabricantes publican cifras aparte para la energía solar total rechazada y los rayos UV bloqueados; compare esas cifras para el calor, y mantenga la VLT dentro del límite de su estado.' },
      { q: '¿Puedo poner una segunda lámina sobre mi polarizado actual?', a: `Puede, pero las lecturas vuelven a multiplicarse. Sobre un vidrio de ${GLASS} %, una lámina de 50 % sobre otra vieja de 50 % da ${h.pc(combinedVlt(GLASS, 50, 50))}, lo que no pasa en la mayoría de los estados en las laterales delanteras. La herramienta de arriba admite una segunda lámina justo para este caso.` },
    ],
    body: (h) => {
      const rows = FILMS.map((f) => [`${h.pc(f)}`, h.pc(100 - f), h.pc(combinedVlt(70, f)), h.pc(combinedVlt(85, f)), `${passCount(h, f, 'frontSide')} / ${h.STATES.length}`, `${passCount(h, f, 'rear')} / ${h.STATES.length}`]);
      return `
<h2>Tabla de porcentajes de polarizado</h2>
<p>Cada fila es una lámina común. Las columnas del medio dan la lectura de la ventana una vez puesta la lámina sobre un vidrio que transmite 70 % (el mínimo federal para el vidrio nuevo del campo de visión del conductor) u 85 %. Las dos últimas columnas cuentan las jurisdicciones, de ${h.STATES.length}, en las que esa lámina pasa en las laterales delanteras y en el vidrio trasero de un auto, aplicada sobre un vidrio de ${GLASS} %, con la tolerancia escrita incluida.</p>
${h.table(['VLT de la lámina', 'Oscuridad', 'Vidrio de 70 %', 'Vidrio de 85 %', 'Pasa adelante', 'Pasa en el trasero'], rows, `Lecturas calculadas como lámina × vidrio. Los conteos aplican la ley de cada estado, leída para este sitio, a un auto de pasajeros con vidrio de ${GLASS} %; «cualquier oscuridad» cuenta como aprobado.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<h2>Transmisión u oscuridad</h2>
<p>Las leyes hablan de transmisión, la luz que pasa. Muchos talleres y anuncios en línea hablan de oscuridad, la luz bloqueada, y algunos usan las dos en la misma página. Un «polarizado de 35 %» puede significar así una lámina de 35 % o una de 65 %. Convierta cualquier cifra anunciada antes de comprar:</p>
<!--tool:mini:darkness|{"dark":80}-->
<h2>Por qué el vidrio de fábrica cambia el resultado</h2>
<p>La norma federal ${h.src('fmvss205', 'FMVSS 205')} fija 70 % como transmisión mínima del vidrio necesario para la visibilidad al manejar, y las ventanas de los autos nuevos se fabrican para cumplirla. Muchos autos traen además un vidrio privado más oscuro detrás del conductor, permitido porque esas ventanas no son necesarias para la visibilidad al manejar. Cuando añade una lámina, la lectura de la ventana es el vidrio multiplicado por la lámina. El regulador federal ha escrito que añadir una lámina puede bajar una ventana por debajo del nivel federal (${h.src('nhtsa_70', 'interpretación de la NHTSA')}), y luego las leyes estatales deciden lo que se permite.</p>
<h2>Porcentajes en el parabrisas</h2>
<p>El parabrisas sigue su propia regla en todos los estados. La mayoría solo admite una franja de lámina en la parte alta, medida en pulgadas o hasta la línea AS-1 impresa en el vidrio, y el porcentaje de esa franja muchas veces no está limitado. Unos pocos estados fijan en cambio un porcentaje para todo el parabrisas, casi siempre 70 %. Un porcentaje de polarizado elegido para las laterales no dice nada del parabrisas; la ${h.a('windshield', 'guía del parabrisas')} da la regla de cada estado.</p>
<h2>Cómo medir su propia ventana</h2>
<p>Un medidor de polarizado, que tienen muchos talleres de láminas y algunas estaciones de inspección, se coloca sobre el vidrio y da la lectura combinada en un segundo. Mida primero el vidrio sin lámina, antes de ponerla, y guarde la cifra: le permite calcular la lámina legal más oscura para su auto con la ${h.a('legal-percentage', 'tabla del porcentaje legal')}. Si el auto ya tiene lámina, el medidor lee vidrio y lámina juntos, que es lo que vería un agente.</p>
<h2>Láminas comunes y dónde terminan</h2>
<p>Sobre un vidrio de ${GLASS} %, las láminas muy oscuras, de 5 a 15 %, no son legales en las laterales delanteras de un auto en ningún estado, y en el vidrio trasero solo donde la ley no fija cifra o fija una muy baja. La lámina de 20 % no pasa adelante en ningún estado una vez contado el vidrio, ni siquiera con el límite de 20 % de Nuevo México leído con prudencia. La de 35 % se pide a menudo, y aun así con ese vidrio solo pasa adelante en los ${passCount(h, 35, 'frontSide')} estados de límite más bajo, y no pasa en ningún estado que fija 35 %. Las de 50 y 70 % pasan adelante en la mayoría de los estados, y solo una lámina clara pasa en los estados que piden 70 % en total. Revise los ${h.a('by-state', 'grupos por estado')} para ver los límites exactos.</p>`;
    },
  },
});
