import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt } from '../../lib/engine/tint';

const C = 'CA';
const F = (h: Helpers) => ({ s: h.S(C), az: h.S('AZ'), nv: h.S('NV'), or: h.S('OR') });

export default definePage({
  id: 'state-ca',
  group: 'states',
  order: 102,
  state: C,
  tool: { kind: 'tint', props: { film: 88 } },
  mini: { kind: 'mini:compare', props: { state: 'CA', b: 'AZ' } },
  related: ['home', 'medical', 'windshield', 'state-az', 'state-tx', 'by-state'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'california-tint-laws',
    nav: 'California',
    card: 'California: only clear 88% film in front, 70% with the glass, any darkness behind the driver.',
    title: 'California Tint Laws 2026: Only Clear 88% Film on the Front',
    description: 'California tint laws: front side windows take only clear film of 88% or more, 70% with the glass; rear windows any shade with two mirrors. Check your car free.',
    h1: 'California tint laws: why the front windows stay clear',
    intro: 'California counts the film alone and the film with the glass. Enter both and the calculator applies the two tests of Vehicle Code section 26708.',
    resume: (h) => {
      const { s } = F(h);
      return `California is among the strictest states for the front side windows. Under ${s.law}, the only film allowed on the windows beside the driver and front passenger is clear, colorless, UV-blocking material with a visible light transmittance of at least 88%, and the glass and film together must still meet the 70% federal minimum. That rules out every tinted film sold by darkness, including a "70%" one: on 80% glass a 70% film reads ${h.pc(combinedVlt(80, 70))}. Behind the driver the law steps aside: the rear side windows are exempt, and the back window can take any shade if the car has outside mirrors on both sides showing 200 feet to the rear. The windshield may carry a transparent strip whose bottom edge stays at least 29 inches above the undepressed driver's seat. A first violation is an infraction with a base fine of up to $100, rising to ${s.fineL} for a third within a year.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Is 70% tint legal on the front windows in California?', a: 'No. California does not judge front film by its own darkness alone: the film must transmit at least 88% of visible light and be clear and colorless, and the window with the film must still pass 70%. A film labeled 70% fails the first test outright. Clear UV or heat-rejection film of 88% or more, with the installer\'s certificate in the car, is the legal option.' },
        { q: 'What paper must I keep in the car for California front film?', a: 'For clear film on the front side windows, section 26708(d) asks for a certificate signed by the installing business, or by the manufacturer if you installed it yourself, stating that the film meets the 88% and 70% rules. Keep it in the vehicle. It is the first thing to show if an officer questions the front windows.' },
        { q: 'Can I have dark tint behind the driver in California?', a: `Yes. Side windows to the rear of the driver are exempt from section 26708(a), so any shade is legal there, and the back window is exempt when the car has outside mirrors on both the left and right sides giving a view of at least 200 feet to the rear. Red and amber film stay banned on every window, as on the windshield strip.` },
        { q: 'How does the California medical exemption for tint work?', a: `There is no DMV permit. With a letter from a licensed physician and surgeon or an optometrist, the driver or front passenger may use removable sun screens on the front side windows (green, gray or neutral smoke, at least 35% transmittance), but not during darkness. A dermatologist's certificate allows clear UV film on any window. ${s.medLink ? 'The exemption text is in section 26708.' : ''}` },
      ];
    },
    body: (h) => {
      const { s, az, nv, or } = F(h);
      return `
<h2>Two tests on the front side windows</h2>
<p>Most states give one number for the front side windows. California gives two, and a film must pass both. First, the material itself must have a minimum visible light transmittance of 88% and be clear, colorless and transparent. Second, the material with the glass must meet the 70% minimum of federal standard ${h.src('fmvss205', 'FMVSS 205')}. The second test is the one people forget: on a window that already transmits 78%, an 88% film reads ${h.pc(combinedVlt(78, 88))} and fails, while on 85% glass it reads ${h.pc(combinedVlt(85, 88))} and passes. Only a measurement of your own bare glass tells you which case you are in.</p>
${h.table(['Window', 'Rule in California', 'Condition'], [
  ['Windshield', 'transparent strip on the topmost portion', 'bottom edge at least 29 in. above the undepressed driver\'s seat; not red or amber'],
  ['Front side', 'clear film, at least 88% alone and 70% with the glass', 'installer certificate kept in the vehicle'],
  ['Rear side', s.back, 'exempt from section 26708(a)'],
  ['Back window', s.rear, 'outside mirrors on both sides, 200-foot view'],
], 'California rules apply to cars, SUVs, vans and pickups alike.', ['l', 'l', 'l'])}
<h2>What the calculator does with a California car</h2>
<p>Enter the film's own percentage and the glass reading. The calculator marks a front film below 88% as too dark even when the combined figure would clear 70%, because section 26708(d)(1) sets the film minimum separately. For the windows behind the driver it shows "any", since the law sets no percentage there. The 29-inch windshield rule is measured from the seat rather than from the top of the glass, so the calculator lists it but cannot measure it for you.</p>
<h2>Fines and the fix</h2>
<p>A tint violation is an infraction. Vehicle Code section 42001 sets the base fine at up to $100 for a first offense, $200 for a second within a year and ${s.fineL} for a third within a year, and penalty assessments are added on top of the base fine, so the amount on the notice is higher. The ${h.a('ticket', 'tint ticket guide')} compares fines across states and lists those whose law writes a way to fix the defect.</p>
<h2>Crossing into a neighboring state</h2>
<p>A car tinted to the California limit is legal almost everywhere, because few states are stricter in front. The reverse is not true. A car from ${h.sl('AZ')} may carry ${az.front} on the front side windows, from ${h.sl('NV')} ${nv.front}, from ${h.sl('OR')} ${or.front}; once it is registered in California, those films have to come off. Compare any two states with the tool below.</p>
<!--tool:mini:compare|{"state":"CA","b":"NV"}-->
<p>The California rules on this page were read in the Vehicle Code (sections 26708, 26708.2, 26708.5 and 42001) on ${s.checked}. The official site blocked automated reading that day, so the text was read on a copy updated on January 1, 2026; the links point to the official sections.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-california',
    nav: 'California',
    card: 'California: adelante solo lámina transparente de 88 %, 70 % con el vidrio; atrás cualquier tono.',
    title: 'Polarizado en California 2026: lámina clara de 88 % adelante',
    description: 'Polarizado en California: adelante solo lámina clara de 88 % o más y 70 % con el vidrio; atrás cualquier tono con dos espejos. Compruebe su auto gratis aquí.',
    h1: 'Polarizado en California: por qué las ventanas delanteras son claras',
    intro: 'California mide la lámina sola y la lámina con el vidrio. Ponga los dos datos y la calculadora aplica las dos pruebas de la sección 26708 del Código de Vehículos.',
    resume: (h) => {
      const { s } = F(h);
      return `California está entre los estados más estrictos con las ventanas laterales delanteras. Según ${s.law}, la única lámina permitida junto al conductor y al pasajero delantero es un material transparente, sin color y con filtro UV, que deje pasar al menos el 88 % de la luz visible, y la ventana con la lámina debe seguir cumpliendo el mínimo federal de 70 %. Eso excluye toda lámina vendida por su oscuridad, incluso una de «70 %»: sobre un vidrio de 80 % da ${h.pc(combinedVlt(80, 70))}. Detrás del conductor la ley se aparta: las laterales traseras están exentas y el vidrio trasero admite cualquier tono si el auto tiene espejos exteriores a ambos lados con vista de 200 pies hacia atrás. En el parabrisas cabe una franja transparente cuyo borde inferior quede al menos 29 pulgadas por encima del asiento del conductor sin hundir. La primera infracción tiene una multa base de hasta 100 dólares, que sube a ${s.fineL} en la tercera dentro de un año.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Es legal un polarizado de 70 % adelante en California?', a: 'No. California no juzga la lámina delantera solo por su oscuridad: la lámina debe dejar pasar al menos el 88 % de la luz visible y ser transparente y sin color, y la ventana con la lámina debe seguir dando 70 %. Una lámina marcada 70 % no pasa la primera prueba. La opción legal es una lámina clara de control UV o de calor de 88 % o más, con el certificado del instalador en el auto.' },
        { q: '¿Qué documento debo llevar en el auto en California por la lámina delantera?', a: 'Para una lámina clara en las laterales delanteras, la sección 26708(d) pide un certificado firmado por el negocio que la instaló, o por el fabricante si usted la puso, que declare que cumple las reglas del 88 % y del 70 %. Guárdelo en el vehículo: es lo primero que conviene mostrar si un agente pregunta por las ventanas delanteras.' },
        { q: '¿Puedo llevar polarizado oscuro detrás del conductor en California?', a: 'Sí. Las ventanas laterales detrás del conductor están exentas de la sección 26708(a), así que cualquier tono es legal ahí, y el vidrio trasero queda exento si el auto tiene espejos exteriores a la izquierda y a la derecha con vista de al menos 200 pies hacia atrás. Las láminas rojas y ámbar siguen prohibidas en todas las ventanas y en la franja del parabrisas.' },
        { q: '¿Cómo funciona la exención médica del polarizado en California?', a: `No hay un permiso del DMV. Con una carta de un médico cirujano con licencia o de un optometrista, el conductor o el pasajero delantero pueden usar pantallas solares removibles en las laterales delanteras (verde, gris o humo neutro, al menos 35 % de transmisión), pero no de noche. Un certificado de un dermatólogo permite una lámina UV transparente en cualquier ventana. ${s.medLink ? 'El texto de la exención está en la sección 26708.' : ''}` },
      ];
    },
    body: (h) => {
      const { s, az, nv, or } = F(h);
      return `
<h2>Dos pruebas en las laterales delanteras</h2>
<p>La mayoría de los estados dan una sola cifra para las laterales delanteras. California da dos, y la lámina debe pasar ambas. Primero, el material debe tener por sí solo una transmisión de luz visible mínima de 88 % y ser claro, sin color y transparente. Segundo, el material junto con el vidrio debe alcanzar el mínimo de 70 % de la norma federal ${h.src('fmvss205', 'FMVSS 205')}. La segunda prueba es la que se olvida: en una ventana que ya transmite 78 %, una lámina de 88 % da ${h.pc(combinedVlt(78, 88))} y no pasa, mientras que sobre un vidrio de 85 % da ${h.pc(combinedVlt(85, 88))} y pasa. Solo una medición de su propio vidrio sin lámina le dice en qué caso está.</p>
${h.table(['Ventana', 'Regla en California', 'Condición'], [
  ['Parabrisas', 'franja transparente en la parte más alta', 'borde inferior a 29 pulgadas o más sobre el asiento del conductor sin hundir; ni roja ni ámbar'],
  ['Laterales delanteras', 'lámina clara, 88 % sola y 70 % con el vidrio', 'certificado del instalador en el vehículo'],
  ['Laterales traseras', s.back, 'exentas de la sección 26708(a)'],
  ['Vidrio trasero', s.rear, 'espejos exteriores a ambos lados, vista de 200 pies'],
], 'En California las reglas valen igual para autos, SUV, vans y pickups.', ['l', 'l', 'l'])}
<h2>Lo que hace la calculadora con un auto de California</h2>
<p>Ponga el porcentaje propio de la lámina y la lectura del vidrio. La calculadora marca como demasiado oscura una lámina delantera de menos de 88 % aunque la cifra combinada supere el 70 %, porque la sección 26708(d)(1) fija aparte el mínimo de la lámina. Para las ventanas detrás del conductor muestra «libre», ya que la ley no pone porcentaje ahí. La regla de las 29 pulgadas del parabrisas se mide desde el asiento y no desde el borde del vidrio, así que la calculadora la indica pero no puede medirla por usted.</p>
<h2>Multas y corrección</h2>
<p>Una infracción de polarizado es una «infraction». La sección 42001 del Código de Vehículos fija la multa base en hasta 100 dólares la primera vez, 200 dólares la segunda dentro de un año y ${s.fineL} la tercera dentro de un año, y a la multa base se suman cargos adicionales, de modo que el monto del aviso es mayor. La ${h.a('ticket', 'guía de multas')} compara las multas de los estados y señala aquellos cuya ley prevé una forma de corregir el defecto.</p>
<h2>Al cruzar a un estado vecino</h2>
<p>Un auto polarizado al límite de California es legal casi en todas partes, porque pocos estados son más estrictos adelante. Al revés no es así. Un auto de ${h.sl('AZ')} puede llevar ${az.front} en las laterales delanteras, uno de ${h.sl('NV')} ${nv.front} y uno de ${h.sl('OR')} ${or.front}; una vez registrado en California, esas láminas tienen que salir. Compare dos estados con la herramienta de abajo.</p>
<!--tool:mini:compare|{"state":"CA","b":"NV"}-->
<p>Las reglas de California de esta página se leyeron en el Código de Vehículos (secciones 26708, 26708.2, 26708.5 y 42001) el ${s.checked}. Ese día el sitio oficial bloqueaba la lectura automática, así que el texto se leyó en una copia actualizada al 1 de enero de 2026; los enlaces llevan a las secciones oficiales.</p>`;
    },
  },
});
