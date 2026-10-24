import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt, darkestLegalFilm } from '../../lib/engine/tint';

const C = 'FL';
const F = (h: Helpers) => ({ s: h.S(C), ga: h.S('GA'), al: h.S('AL') });

export default definePage({
  id: 'state-fl',
  group: 'states',
  order: 103,
  state: C,
  tool: { kind: 'tint', props: { film: 35 } },
  mini: { kind: 'mini:darkest', props: { state: 'FL', kind: 1, glass: 75 } },
  related: ['home', 'medical', 'legal-percentage', 'state-ga', 'state-tx', 'by-state'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'florida-tint-laws',
    nav: 'Florida',
    card: 'Florida: 28% on the front sides, 15% behind on a car, 6% behind on an SUV, a 3-point tolerance.',
    title: 'Florida Tint Law 2026: 28% Front, 15% Car or 6% SUV Behind',
    description: 'Florida tint law: 28% on the front side windows, 15% behind the driver of a car and 6% on an SUV or van, glass counted, 3-point tolerance. Check each window.',
    h1: 'Florida tint law: one front limit, two rear limits',
    intro: 'Florida sets a different rear limit for cars and for SUVs and vans. Choose your vehicle type: the calculator applies the right one and multiplies film by glass.',
    resume: (h) => {
      const { s } = F(h);
      return `Florida's tint law, ${s.law} and the sections around it, sets the same front rule for every vehicle and splits the rear rule in two. The front side windows must transmit more than ${s.front} of the light and reflect no more than 25%. Behind the driver, a car must keep more than ${s.back} on the rear side windows and the back window, with a reflectance cap of 35%, while a multipurpose vehicle (an SUV, van or pickup built on a truck chassis) may go down to ${s.mpv?.back ?? h.nc}. The windshield may take a transparent strip above the AS-1 line only. Transmittance is tested on the glass of your own vehicle, so the film and the glass count together, with a 3-point tolerance. Each installation needs a compliance label on the driver's door jamb. A violation is a noncriminal, nonmoving infraction; the state sets a $30 base amount, and county fees and court costs are added.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Is 20% tint legal in Florida?', a: `On the front side windows, no: they need more than ${s.front} with the glass counted, and a 20% film reads about ${h.pc(combinedVlt(75, 20))} on 75% glass. Behind the driver of a car the floor is ${s.back}, so 20% film is legal there on most glass; on an SUV or van the floor is ${s.mpv?.back ?? h.nc}, so 20% is legal behind the driver as well.` },
        { q: 'Why can my SUV be darker than my sedan in Florida?', a: `Florida law treats multipurpose passenger vehicles (built on a truck chassis or with off-road features, ten seats or fewer) apart from cars. Behind the driver they may go down to ${s.mpv?.back ?? h.nc} transmittance, against ${s.back} for a sedan. The front side windows stay at ${s.front} on both, so the calculator changes only the rear rows when you switch vehicle type.` },
        { q: 'Where is the Florida tint compliance sticker?', a: 'Section 316.2955 requires the installer to affix a nonremovable label on the inside of the driver\'s door jamb, stating that the film complies with Florida law and naming the material and the installing business. A car tinted at a shop should have it; a car tinted at home or bought used often does not, which is one more reason to know your real reading.' },
        { q: 'How do I get a medical exemption for tint in Florida?', a: 'The Department of Highway Safety and Motor Vehicles issues medical exemption certificates for lupus, autoimmune diseases and other conditions that require limited light exposure, under section 316.29545. The certificate is tied to one vehicle by its VIN and decal number, cannot be transferred, may carry a fee and can cover the windshield, the front side windows and the windows behind the driver.' },
      ];
    },
    body: (h) => {
      const { s, ga, al } = F(h);
      const mpvBack = s.mpv?.bN as number;
      return `
<h2>Car or SUV: the rear rule changes</h2>
${h.table(['Window', 'Car', 'SUV, van, pickup', 'Reflectance'], [
  ['Windshield', 'transparent strip above AS-1', 'same', 'transparent only'],
  ['Front side', s.front, s.mpv?.front ?? s.front, '25% max'],
  ['Rear side', s.back, s.mpv?.back ?? h.nc, '35% max'],
  ['Back window', s.rear, s.mpv?.rear ?? h.nc, '35% max'],
], 'Florida Statutes sections 316.2952 to 316.2954, read in the 2026 edition.', ['l', 'r', 'r', 'l'])}
<p>The split matters for a buyer comparing films. A sedan owner who wants a uniform dark look behind the driver can go to about ${h.pc(darkestLegalFilm(15, 80) as number)} film on 80% glass, the darkest that still clears ${s.back}. The owner of an SUV has more room: on the same glass, ${h.pc(darkestLegalFilm(mpvBack, 80) as number)} film keeps the reading above ${s.mpv?.back ?? h.nc}. Some SUVs leave the factory with privacy glass behind the driver, darker than ordinary glass; enter your own reading, because a dark film over dark glass can fall under 6%.</p>
<h2>What "more than 28%" means at the roadside</h2>
<p>Florida writes its limits as transmittance "more than" the figure and tests the material as applied to your vehicle, which is the film and the glass together. The law then allows a 3-point tolerance on the reading. On 75% factory glass, a 35% film reads ${h.pc(combinedVlt(75, 35))} and passes; a 30% film reads ${h.pc(combinedVlt(75, 30))}, inside the tolerance; a 25% film reads ${h.pc(combinedVlt(75, 25))} and fails. Try your own glass with the tool below, set to an SUV.</p>
<!--tool:mini:darkest|{"state":"FL","kind":1,"glass":70}-->
<h2>Mirrors, labels and the exemption certificate</h2>
<p>If the back window is made nontransparent, the vehicle must have outside mirrors on both sides. Every installation must carry the installer's compliance label on the driver's door jamb, and selling or installing film that breaks the rules is a second-degree misdemeanor for the business. Drivers with lupus or another condition requiring limited light exposure can apply to the state motor vehicle department for a medical exemption certificate; it follows the vehicle, not the person, so a new car means a new certificate.</p>
<h2>Buying a used car that is already tinted</h2>
<p>A used car bought in Florida comes with whatever film the previous owner chose, and the missing door-jamb label is common. Before you pay, take three readings: the front side window, a rear side window and the back window. If the front reads under 28% even with the 3-point tolerance, budget for removal and new film; if the rear of a sedan reads under 15%, the same applies behind the driver. The seller's word that the tint is legal counts for nothing at a traffic stop: the reading does.</p>
<h2>Florida and its neighbors</h2>
<p>${h.sl('GA')} asks for ${ga.front} on every window of a car and ${h.sl('AL')} for ${al.front}, so a Florida sedan tinted to 15% behind the driver is too dark for both once it crosses the state line. In the other direction, Georgia and Alabama cars meet Florida's front rule. The ${h.a('by-state', 'state-by-state table')} lists all fifty.</p>
<p>The Florida figures here were read in the Florida Statutes on ${s.checked}; the text of sections 316.2953 and 316.2954 is unchanged since 1999.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-florida',
    nav: 'Florida',
    card: 'Florida: 28 % en las laterales delanteras, 15 % atrás en un auto, 6 % atrás en una SUV.',
    title: 'Polarizado en Florida 2026: 28 % adelante, 15 % o 6 % atrás',
    description: 'Polarizado en Florida: 28 % en las laterales delanteras, 15 % detrás del conductor en un auto y 6 % en una SUV o van, con el vidrio y 3 puntos de tolerancia.',
    h1: 'Polarizado en Florida: un límite adelante y dos atrás',
    intro: 'Florida fija un límite trasero distinto para los autos y para las SUV y vans. Elija su tipo de vehículo: la calculadora aplica el correcto y multiplica lámina por vidrio.',
    resume: (h) => {
      const { s } = F(h);
      return `La ley de polarizado de Florida, ${s.law} y las secciones vecinas, fija la misma regla delantera para todos los vehículos y divide en dos la regla trasera. Las laterales delanteras deben transmitir más del ${s.front} de la luz y reflejar como máximo 25 %. Detrás del conductor, un auto debe conservar más de ${s.back} en las laterales traseras y en el vidrio trasero, con un tope de reflectancia de 35 %, mientras que un vehículo de usos múltiples (SUV, van o pickup sobre chasis de camión) puede bajar hasta ${s.mpv?.back ?? h.nc}. En el parabrisas solo cabe una franja transparente sobre la línea AS-1. La transmisión se mide sobre el vidrio de su propio vehículo, así que lámina y vidrio cuentan juntos, con una tolerancia de 3 puntos. Cada instalación necesita una etiqueta de conformidad en el marco de la puerta del conductor. La infracción no es penal ni de circulación; el estado fija un monto base de 30 dólares, al que el condado suma cargos y costas.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Es legal un polarizado de 20 % en Florida?', a: `En las laterales delanteras no: necesitan más de ${s.front} contando el vidrio, y una lámina de 20 % da cerca de ${h.pc(combinedVlt(75, 20))} sobre un vidrio de 75 %. Detrás del conductor de un auto el mínimo es ${s.back}, así que 20 % es legal ahí sobre la mayoría de los vidrios; en una SUV o van el mínimo es ${s.mpv?.back ?? h.nc}, y 20 % también es legal atrás.` },
        { q: '¿Por qué mi SUV puede ser más oscura que mi sedán en Florida?', a: `La ley de Florida trata aparte los vehículos de usos múltiples (sobre chasis de camión o con equipo todoterreno, diez asientos o menos). Detrás del conductor pueden bajar a ${s.mpv?.back ?? h.nc} de transmisión, frente a ${s.back} en un sedán. Las laterales delanteras siguen en ${s.front} en ambos, por eso la calculadora solo cambia las filas traseras al cambiar el tipo de vehículo.` },
        { q: '¿Dónde va la etiqueta de polarizado en Florida?', a: 'La sección 316.2955 obliga al instalador a pegar una etiqueta imborrable en el marco interior de la puerta del conductor, que declare que la lámina cumple la ley de Florida e indique el material y el negocio que la instaló. Un auto polarizado en un taller debería tenerla; uno polarizado en casa o comprado usado a menudo no, otra razón para conocer su lectura real.' },
        { q: '¿Cómo se obtiene una exención médica del polarizado en Florida?', a: 'El Departamento de Seguridad Vial y Vehículos Motorizados emite certificados de exención médica para el lupus, las enfermedades autoinmunes y otras condiciones que exigen limitar la luz, según la sección 316.29545. El certificado va ligado a un vehículo por su VIN y su número de calcomanía, no se transfiere, puede tener un costo y puede cubrir el parabrisas, las laterales delanteras y las ventanas traseras.' },
      ];
    },
    body: (h) => {
      const { s, ga, al } = F(h);
      const mpvBack = s.mpv?.bN as number;
      return `
<h2>Auto o SUV: la regla trasera cambia</h2>
${h.table(['Ventana', 'Auto', 'SUV, van, pickup', 'Reflectancia'], [
  ['Parabrisas', 'franja transparente sobre AS-1', 'igual', 'solo transparente'],
  ['Laterales delanteras', s.front, s.mpv?.front ?? s.front, '25 % máx.'],
  ['Laterales traseras', s.back, s.mpv?.back ?? h.nc, '35 % máx.'],
  ['Vidrio trasero', s.rear, s.mpv?.rear ?? h.nc, '35 % máx.'],
], 'Estatutos de Florida, secciones 316.2952 a 316.2954, leídos en la edición de 2026.', ['l', 'r', 'r', 'l'])}
<p>La diferencia importa al elegir una lámina. El dueño de un sedán que quiere un tono oscuro y parejo detrás del conductor puede llegar a una lámina de unos ${h.pc(darkestLegalFilm(15, 80) as number)} sobre un vidrio de 80 %, la más oscura que sigue por encima de ${s.back}. El dueño de una SUV tiene más margen: sobre el mismo vidrio, una lámina de ${h.pc(darkestLegalFilm(mpvBack, 80) as number)} mantiene la lectura por encima de ${s.mpv?.back ?? h.nc}. Algunas SUV salen de fábrica con vidrio privacy detrás del conductor, más oscuro que el vidrio común; ponga su propia lectura, porque una lámina oscura sobre un vidrio oscuro puede bajar de 6 %.</p>
<h2>Qué significa «más de 28 %» en un control</h2>
<p>Florida escribe sus límites como una transmisión «superior a» la cifra y mide el material aplicado a su vehículo, es decir, lámina y vidrio juntos. La ley admite además una tolerancia de 3 puntos. Sobre un vidrio de fábrica de 75 %, una lámina de 35 % da ${h.pc(combinedVlt(75, 35))} y pasa; una de 30 % da ${h.pc(combinedVlt(75, 30))}, dentro de la tolerancia; una de 25 % da ${h.pc(combinedVlt(75, 25))} y no pasa. Pruebe su propio vidrio con la herramienta de abajo, ajustada a una SUV.</p>
<!--tool:mini:darkest|{"state":"FL","kind":1,"glass":70}-->
<h2>Espejos, etiquetas y certificado de exención</h2>
<p>Si el vidrio trasero deja de ser transparente, el vehículo debe tener espejos exteriores a ambos lados. Cada instalación debe llevar la etiqueta de conformidad del instalador en el marco de la puerta del conductor, y vender o instalar una lámina que no cumple es un delito menor de segundo grado para el negocio. Quien tiene lupus u otra condición que exige limitar la luz puede pedir al departamento estatal de vehículos un certificado de exención médica; va con el vehículo y no con la persona, así que un auto nuevo exige un certificado nuevo.</p>
<h2>Comprar un auto usado que ya viene polarizado</h2>
<p>Un auto usado comprado en Florida llega con la lámina que eligió el dueño anterior, y es frecuente que falte la etiqueta del marco de la puerta. Antes de pagar, tome tres lecturas: la lateral delantera, una lateral trasera y el vidrio trasero. Si la delantera queda por debajo de 28 % incluso con la tolerancia de 3 puntos, calcule el costo de quitarla y poner otra; si atrás, en un sedán, queda por debajo de 15 %, pasa lo mismo detrás del conductor. En un control no cuenta la palabra del vendedor: cuenta la lectura.</p>
<h2>Florida y sus vecinos</h2>
<p>${h.sl('GA')} pide ${ga.front} en todas las ventanas de un auto y ${h.sl('AL')} ${al.front}, así que un sedán de Florida con 15 % detrás del conductor queda demasiado oscuro para ambos al cruzar la frontera estatal. En sentido contrario, los autos de Georgia y Alabama cumplen la regla delantera de Florida. La ${h.a('by-state', 'tabla por estado')} reúne los cincuenta.</p>
<p>Las cifras de Florida de esta página se leyeron en los Estatutos de Florida el ${s.checked}; el texto de las secciones 316.2953 y 316.2954 no cambia desde 1999.</p>`;
    },
  },
});
