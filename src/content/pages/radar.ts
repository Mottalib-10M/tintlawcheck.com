import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const banned = h.STATES.filter((s) => s.equipment.radarDetector?.passengerAllowed === false);
  const allowed = h.STATES.filter((s) => s.equipment.radarDetector?.passengerAllowed === true).map((s) => s.code);
  const unk = h.STATES.filter((s) => s.equipment.radarDetector?.passengerAllowed == null).map((s) => s.code);
  return { banned, allowed, unk, n: h.STATES.length };
};

export default definePage({
  id: 'radar', group: 'equipment', order: 2,
  tool: { kind: 'mini:radar', props: { state: 'VA', cmv: 0 } },
  mini: { kind: 'mini:radar' },
  related: ['home', 'helmet', 'state-va', 'windshield', 'ticket', 'by-state'],
  sources: ['fmcsa_392_71', 'fmcsa_390_5'],
  en: {
    slug: 'radar-detector-laws-by-state', nav: 'Radar detectors',
    card: 'Where radar detectors are banned in private cars, the federal ban for commercial trucks, and what counts as possession.',
    title: 'Radar Detector Laws by State 2026: Where They Are Banned',
    description: 'Radar detector laws by state, 2026: Virginia and DC ban them in private cars, and a federal rule bans them in commercial vehicles of 10,001 pounds or more.',
    h1: 'Radar detector laws by state: where they are banned',
    intro: 'Pick a state and a vehicle type: the tool says whether a radar detector is allowed and which rule applies. The sections below explain the two local bans and the federal rule for trucks.',
    resume: (h) => {
      const f = F(h);
      return `Radar detectors are legal in private cars in most of the United States. Of the ${f.n} jurisdictions read for this site, ${f.banned.length} ban them in private vehicles: ${h.list(f.banned.map((s) => s.code))}. Virginia's statute, section 46.2-1079, bans operating a vehicle equipped with a radar or laser detector, using one and selling one, and treats the presence of a detector as prima facie evidence of a violation unless it has no power source and is not readily accessible to anyone in the vehicle. The District of Columbia regulates radar detectors and jammers in section 736 of title 18 of its municipal regulations. For the other ${f.allowed.length} states, no state statute banning detectors was found. Commercial vehicles are a separate case everywhere: federal rule 49 CFR 392.71 forbids a driver to use a radar detector in a commercial motor vehicle, or to operate one that is equipped with or contains a detector, and the federal definition covers vehicles of 10,001 pounds or more used in interstate commerce, among others. This page covers detectors, which only receive signals; jammers and the rules on mounting devices on the windshield were not read for this site.`;
    },
    faqs: (h) => [
      { q: 'Are radar detectors illegal in Virginia?', a: 'Yes. Section 46.2-1079 bans operating a motor vehicle equipped with a radar or laser detector, using one and selling one in Virginia. A detector found in the vehicle is prima facie evidence of a violation unless it has no power source and is not readily accessible to the occupants. The violation carries no demerit points.' },
      { q: 'Can truck drivers use a radar detector?', a: 'No, not in a commercial motor vehicle. Federal rule 49 CFR 392.71 says no driver shall use a radar detector in a commercial motor vehicle, or operate one equipped with or containing a detector, and forbids motor carriers to permit it. The rule applies in every state, including those that allow detectors in private cars.' },
      { q: 'Which vehicles count as commercial for the radar detector ban?', a: 'Those that meet the federal definition in 49 CFR 390.5: a vehicle used in interstate commerce with a weight rating or weight of 10,001 pounds or more, one designed or used to carry more than 8 passengers for pay or more than 15 without pay, or one carrying placarded hazardous material. A private pickup used only for personal trips is not covered.' },
      { q: 'Can I drive through Virginia with a radar detector in the car?', a: 'Only if it is disconnected and stowed. Because the Virginia statute treats a detector in the vehicle as prima facie evidence, the safe course for a driver passing through is to unplug it, remove any power source and put it where no one in the car can reach it, such as the trunk.' },
    ],
    body: (h) => {
      const f = F(h);
      return `
<h2>Where detectors are banned</h2>
${h.table(['Jurisdiction', 'Private cars', 'Commercial vehicles', 'Rule'], [
  ...f.banned.map((s) => [h.sl(s.code), 'banned', 'banned', s.equipment.radarDetector?.url ? h.ext(s.equipment.radarDetector.url, s.equipment.radarDetector.cite ?? '') : (s.equipment.radarDetector?.cite ?? h.nc)]),
  [`The other ${f.allowed.length} states`, 'no state ban found', 'banned', h.src('fmcsa_392_71', '49 CFR 392.71')],
], 'Private-car rules read in each state\'s code for this site; the commercial-vehicle ban is federal and applies in every state.', ['l', 'l', 'l', 'l'])}
<p>The states where no state ban was found are: ${h.list(f.allowed)}. In each of them, the federal rule still applies to commercial vehicles.</p>
<h2>Virginia in detail</h2>
<p>Virginia's rule is the broadest. Section 46.2-1079 covers three acts: operating a motor vehicle equipped with a radar or laser detection device, using one, and selling one. The presence of a device in a vehicle is prima facie evidence of a violation. The statute carves out a device that has no power source and is not readily accessible, which is why the advice for anyone crossing the state is to unplug the device and stow it out of reach. A violation is a traffic offense that carries no demerit points; the fine amount was not read for this site and is shown as not confirmed. Virginia is also one of the states read for this site where officers may not stop a car for window tint alone, a different rule covered on the ${h.sl('VA', 'Virginia tint page')}.</p>
<h2>The District of Columbia</h2>
<p>Section 736 of title 18 of the District of Columbia Municipal Regulations, titled "Radar detectors and jammers", sits in the chapter on motor vehicle equipment. Treat a detector as banned when driving in the District, including on a short trip across from Maryland or Virginia.</p>
<h2>Commercial motor vehicles</h2>
<p>The federal rule, ${h.src('fmcsa_392_71', '49 CFR 392.71')}, has two parts: no driver shall use a radar detector in a commercial motor vehicle or operate one that is equipped with or contains a detector, and no motor carrier shall require or permit a driver to do so. The definition of a commercial motor vehicle in ${h.src('fmcsa_390_5', '49 CFR 390.5')} covers vehicles used on a highway in interstate commerce that have a weight rating or weight of 10,001 pounds or more, that are designed or used to carry more than 8 passengers including the driver for pay or more than 15 without pay, or that carry placarded hazardous material. Check a vehicle type here:</p>
<!--tool:mini:radar|{"state":"TX","cmv":1}-->
<h2>What this page does not cover</h2>
<p>Three related questions fall outside the texts read for this site. First, jammers, which transmit rather than receive: the District's section title names them, but federal rules on jammers were not read here. Second, mounting: states limit what may be placed on a windshield, and those rules were not read state by state, so this page does not say where a detector may sit. Third, local rules on military bases or private roads. For tint on the windshield, the ${h.a('windshield', 'windshield guide')} gives each state's strip rule.</p>
<h2>How the figures were read</h2>
<p>For each state, the vehicle code was searched for a section on radar or laser detectors. Where none was found, the state is listed as "no state ban found" rather than "legal", because absence from the code is not a written permission. The federal rule was read in the Electronic Code of Federal Regulations as of October 1, 2026.</p>`;
    },
  },
  es: {
    slug: 'detectores-de-radar-por-estado', nav: 'Detectores de radar',
    card: 'Dónde están prohibidos los detectores de radar en autos particulares, la prohibición federal para camiones comerciales y qué cuenta como tenencia.',
    title: 'Detectores de radar por estado 2026: dónde están prohibidos',
    description: 'Detectores de radar por estado 2026: Virginia y el Distrito de Columbia los prohíben en autos particulares, y una norma federal en los vehículos comerciales.',
    h1: 'Leyes de detectores de radar por estado: dónde están prohibidos',
    intro: 'Elija un estado y un tipo de vehículo: la herramienta dice si se permite un detector de radar y qué regla se aplica. Las secciones de abajo explican las dos prohibiciones locales y la norma federal para camiones.',
    resume: (h) => {
      const f = F(h);
      return `Los detectores de radar son legales en los autos particulares en casi todo Estados Unidos. De las ${f.n} jurisdicciones leídas para este sitio, ${f.banned.length} los prohíben en vehículos particulares: ${h.list(f.banned.map((s) => s.code))}. La ley de Virginia, la sección 46.2-1079, prohíbe manejar un vehículo equipado con un detector de radar o láser, usarlo y venderlo, y trata la presencia de un detector como prueba prima facie de la infracción salvo que no tenga fuente de energía y no esté al alcance de nadie en el vehículo. El Distrito de Columbia regula los detectores y los inhibidores de radar en la sección 736 del título 18 de su reglamento municipal. Para los otros ${f.allowed.length} estados no se encontró ninguna ley estatal que prohíba los detectores. Los vehículos comerciales son un caso aparte en todas partes: la norma federal 49 CFR 392.71 prohíbe a un conductor usar un detector de radar en un vehículo comercial, o manejar uno que lo tenga instalado o a bordo, y la definición federal cubre, entre otros, los vehículos de 10 001 libras o más usados en el comercio interestatal. Esta página trata de los detectores, que solo reciben señales; los inhibidores y las reglas sobre aparatos en el parabrisas no se leyeron para este sitio.`;
    },
    faqs: (h) => [
      { q: '¿Son ilegales los detectores de radar en Virginia?', a: 'Sí. La sección 46.2-1079 prohíbe manejar un vehículo equipado con un detector de radar o láser, usarlo y venderlo en Virginia. Un detector encontrado en el vehículo es prueba prima facie de la infracción salvo que no tenga fuente de energía y no esté al alcance de los ocupantes. La infracción no suma puntos de demérito.' },
      { q: '¿Los camioneros pueden usar un detector de radar?', a: 'No, no en un vehículo comercial. La norma federal 49 CFR 392.71 dice que ningún conductor usará un detector de radar en un vehículo comercial, ni manejará uno que lo tenga instalado o a bordo, y prohíbe a las empresas de transporte permitirlo. La regla se aplica en todos los estados, incluidos los que permiten los detectores en autos particulares.' },
      { q: '¿Qué vehículos cuentan como comerciales para la prohibición de los detectores?', a: 'Los que cumplen la definición federal de 49 CFR 390.5: un vehículo usado en el comercio interestatal con un peso nominal o real de 10 001 libras o más, uno diseñado o usado para llevar más de 8 pasajeros con pago o más de 15 sin pago, o uno que lleva materiales peligrosos señalizados. Una pickup particular de uso personal no está cubierta.' },
      { q: '¿Puedo cruzar Virginia con un detector de radar en el auto?', a: 'Solo si está desconectado y guardado. Como la ley de Virginia trata un detector en el vehículo como prueba prima facie, lo prudente para un conductor de paso es desenchufarlo, quitarle toda fuente de energía y ponerlo donde nadie en el auto pueda alcanzarlo, como el maletero.' },
    ],
    body: (h) => {
      const f = F(h);
      return `
<h2>Dónde están prohibidos los detectores</h2>
${h.table(['Jurisdicción', 'Autos particulares', 'Vehículos comerciales', 'Regla'], [
  ...f.banned.map((s) => [h.sl(s.code), 'prohibido', 'prohibido', s.equipment.radarDetector?.url ? h.ext(s.equipment.radarDetector.url, s.equipment.radarDetector.cite ?? '') : (s.equipment.radarDetector?.cite ?? h.nc)]),
  [`Los otros ${f.allowed.length} estados`, 'sin prohibición estatal encontrada', 'prohibido', h.src('fmcsa_392_71', '49 CFR 392.71')],
], 'Reglas para autos particulares leídas en el código de cada estado para este sitio; la prohibición para vehículos comerciales es federal y vale en todos los estados.', ['l', 'l', 'l', 'l'])}
<p>Los estados sin prohibición son: ${h.list(f.allowed)}.</p>
<h2>Virginia en detalle</h2>
<p>La regla de Virginia es la más amplia. La sección 46.2-1079 cubre tres actos: manejar un vehículo equipado con un aparato de detección de radar o láser, usarlo y venderlo. La presencia de un aparato en un vehículo es prueba prima facie de la infracción. La ley excluye un aparato sin fuente de energía y que no esté al alcance, y por eso el consejo para quien cruza el estado es desenchufarlo y guardarlo fuera del alcance. Una infracción es una falta de tránsito sin puntos de demérito; el monto de la multa no se leyó para este sitio y se muestra como no confirmado. Virginia es además uno de los estados leídos para este sitio donde los agentes no pueden detener un auto solo por el polarizado, otra regla que trata la ${h.sl('VA', 'página de Virginia')}.</p>
<h2>El Distrito de Columbia</h2>
<p>La sección 736 del título 18 del Reglamento Municipal del Distrito de Columbia, titulada «Radar detectors and jammers», está en el capítulo del equipamiento de los vehículos. Considere el detector prohibido cuando maneje en el Distrito, incluso en un trayecto corto desde Maryland o Virginia.</p>
<h2>Vehículos comerciales</h2>
<p>La norma federal, ${h.src('fmcsa_392_71', '49 CFR 392.71')}, tiene dos partes: ningún conductor usará un detector de radar en un vehículo comercial ni manejará uno que lo tenga instalado o a bordo, y ninguna empresa de transporte exigirá ni permitirá que un conductor lo haga. La definición de vehículo comercial en ${h.src('fmcsa_390_5', '49 CFR 390.5')} cubre los vehículos usados en una vía en el comercio interestatal que tienen un peso nominal o real de 10 001 libras o más, que están diseñados o se usan para llevar más de 8 pasajeros con el conductor por pago o más de 15 sin pago, o que llevan materiales peligrosos señalizados. Revise un tipo de vehículo aquí:</p>
<!--tool:mini:radar|{"state":"TX","cmv":1}-->
<h2>Lo que esta página no cubre</h2>
<p>Tres cuestiones cercanas quedan fuera de los textos leídos para este sitio. Primero, los inhibidores, que emiten en lugar de recibir: el título de la sección del Distrito los nombra, pero las normas federales sobre inhibidores no se leyeron aquí. Segundo, el montaje: los estados limitan lo que puede ponerse en un parabrisas, y esas reglas no se leyeron estado por estado, así que esta página no dice dónde puede ir un detector. Tercero, las reglas locales de bases militares o vías privadas. Para el polarizado del parabrisas, la ${h.a('windshield', 'guía del parabrisas')} da la regla de la franja de cada estado.</p>
<h2>Cómo se leyeron las cifras</h2>
<p>Para cada estado se buscó en el código de vehículos una sección sobre detectores de radar o láser. Cuando no se encontró ninguna, el estado aparece como «sin prohibición estatal encontrada» y no como «legal», porque la ausencia en el código no es un permiso escrito. La norma federal se leyó en el Código Electrónico de Regulaciones Federales vigente al 1 de octubre de 2026.</p>`;
    },
  },
});
