import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt, darkestLegalFilm } from '../../lib/engine/tint';

const C = 'NC';
const F = (h: Helpers) => ({ s: h.S(C), va: h.S('VA'), sc: h.S('SC'), tn: h.S('TN'), ga: h.S('GA') });

export default definePage({
  id: 'state-nc',
  group: 'states',
  order: 105,
  state: C,
  tool: { kind: 'tint', props: { film: 40 } },
  mini: { kind: 'mini:stack', props: { glass: 78, film: 45, film2: 100 } },
  related: ['home', 'state-va', 'state-tn', 'state-ga', 'percentage', 'medical'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'north-carolina-tint-laws',
    nav: 'North Carolina',
    card: 'North Carolina: 35% on every window of a car, a meter reading above 32% always passes.',
    title: 'North Carolina Tint Laws 2026: 35%, and 32% on the Meter',
    description: 'North Carolina tint laws: 35% total light transmission on every car window, a meter reading above 32% presumed legal, SUVs free behind the driver. Check yours.',
    h1: 'North Carolina tint laws: 35% on the whole car, read on the meter',
    intro: 'North Carolina counts the window as tinted, glass included. Enter the film and the glass: the calculator applies the 35% rule and the 32% meter threshold to each window.',
    resume: (h) => {
      const { s } = F(h);
      return `North Carolina sets one figure for the whole car and measures it on the finished window. Under ${s.law}, the total light transmission of a tinted window must be at least ${s.front}, and reflectance may not exceed 20%. The statute adds a rule that matters at the roadside: a window that measures more than 32% on a light meter approved by the Commissioner is conclusively presumed to comply. On a passenger car the rule covers the front side windows, the rear side windows and the back window. Multipurpose vehicles, a group the law says includes minivans and pickup trucks, are exempt behind the driver. On the windshield, tint may run down to ${s.wsInches} inches from the top or to the AS1 line, whichever is longer, and clear UV film is allowed on the whole glass. Because the glass counts, a 35% film is already too dark on most cars: on 78% glass it reads ${h.pc(combinedVlt(78, 35))}. Driving with, or applying, illegal tint is a Class 3 misdemeanor, with a defense if the film is removed within 15 days.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What tint percentage is legal in North Carolina?', a: `At least ${s.front} total light transmission on every window of a car, film and glass together, with reflectance of 20% or less. A meter reading above 32% is conclusively presumed legal. On 78% factory glass that allows a film down to about ${h.pc(darkestLegalFilm(32, 78) as number)}, which in practice means a 45% film rather than the 35% people ask for.` },
        { q: 'Can I fix a North Carolina tint charge after the stop?', a: 'Yes. Section 20-127(e) makes it a defense to the misdemeanor if the owner removes the film or replaces it with a compliant one within 15 days of the charge and gets a compliance certificate from the Division of Motor Vehicles or the State Highway Patrol. Keep the certificate and bring it to court.' },
        { q: 'Is limo tint legal on a North Carolina SUV or pickup?', a: `Behind the driver, yes. The windows to the rear of the driver of a multipurpose vehicle, which the law defines to include minivans and pickup trucks, are exempt from the 35% and 20% limits. The front side windows keep the ${s.front} rule, and red, yellow and amber film stays banned on every vehicle.` },
        { q: 'How long does a North Carolina medical tint permit last?', a: 'Five years. The Division of Motor Vehicles issues a medical exception permit for photosensitivity to visible light after a written application with the doctor\'s evaluation form. The permit names the vehicle, the windows and the levels, must stay in the vehicle, and comes with a sticker for the lower left corner of the back window.' },
      ];
    },
    body: (h) => {
      const { s, va, sc, tn, ga } = F(h);
      return `
<h2>Why 35% film fails on a 35% law</h2>
<p>The statute speaks of "the total light transmission of the tinted window", which is film and glass together. Factory side glass is not clear: it lets through a share of the light below 100% before any film goes on. The table shows what common films give once the glass is counted, and how each one reads against the 32% meter threshold:</p>
${h.table(['Film', 'On 75% glass', 'On 85% glass', 'North Carolina car'], [
  ['50%', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50)), 'legal'],
  ['45%', h.pc(combinedVlt(75, 45)), h.pc(combinedVlt(85, 45)), 'legal on both'],
  ['40%', h.pc(combinedVlt(75, 40)), h.pc(combinedVlt(85, 40)), 'too dark on 75%, above 32% on 85%'],
  ['35%', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35)), 'too dark'],
  ['20%', h.pc(combinedVlt(75, 20)), h.pc(combinedVlt(85, 20)), 'too dark'],
], 'Readings computed as film × glass; the 35% rule and the 32% presumption come from N.C. Gen. Stat. 20-127(b)(1).', ['l', 'r', 'r', 'l'])}
<p>A second film on top of an old one multiplies again. Try it below: enter your glass, the film already there and the one you plan to add.</p>
<!--tool:mini:stack|{"glass":78,"film":45,"film2":80}-->
<h2>What the officer can ask</h2>
<p>The statute requires the driver of a vehicle with tinted windows to lower the window when approached by a law enforcement officer. The meter reading then decides: above 32%, the window is taken as compliant without further argument; at 32% or below, the charge rests on the 35% rule.</p>
<h2>Cars and multipurpose vehicles</h2>
<p>On a sedan, coupe or hatchback, the back window and the rear side windows follow the same 35% as the front doors. A multipurpose vehicle is exempt behind the driver, and the law states that this group includes minivans and pickup trucks. The rear window of a vehicle built to haul property is also exempt. Red, yellow and amber film stays banned everywhere, and the film must be nonreflective.</p>
<h2>Windshield</h2>
<p>Tint may run along the top of the windshield down to ${s.wsInches} inches or to the AS1 line, whichever is longer. Since S.L. 2025-47, clear film that blocks ultraviolet light without tinting may cover the rest of the windshield. A medical permit does not change the windshield rule.</p>
<h2>Medical permit and penalty</h2>
<p>The Division of Motor Vehicles grants medical exception permits for photosensitivity to visible light, valid five years, up to four at a time. The holder gets a sticker for the lower left corner of the back window; driving without it displayed is a $200 infraction. For everyone else, driving with or applying non-compliant tint is a Class 3 misdemeanor. The statute does not write a fine amount for it, so this site shows the fine as ${s.fineL}.</p>
<h2>Around North Carolina</h2>
<p>${h.sl('VA')} asks for ${va.front} on the front doors, ${h.sl('SC')} for ${sc.front}, ${h.sl('TN')} for ${tn.front} and ${h.sl('GA')} for ${ga.front}. A car tinted to the North Carolina line passes in all four on the rear windows, but not on the front doors in Virginia. Figures read in the General Statutes on ${s.checked}, from an archived copy of the official page because ncleg.gov refused our connection that day.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-carolina-del-norte',
    nav: 'Carolina del Norte',
    card: 'Carolina del Norte: 35 % en todas las ventanas de un auto; con el medidor, más de 32 % pasa.',
    title: 'Polarizado en Carolina del Norte 2026: 35 % y 32 % al medir',
    description: 'Polarizado en Carolina del Norte: 35 % de transmisión total en todas las ventanas, más de 32 % en el medidor se presume legal y las SUV quedan libres atrás.',
    h1: 'Polarizado en Carolina del Norte: 35 % en todo el auto, medido en la ventana',
    intro: 'Carolina del Norte mide la ventana ya polarizada, con el vidrio incluido. Ponga la lámina y el vidrio: la calculadora aplica la regla del 35 % y el umbral de 32 % a cada ventana.',
    resume: (h) => {
      const { s } = F(h);
      return `Carolina del Norte fija una sola cifra para todo el auto y la mide en la ventana terminada. Según ${s.law}, la transmisión total de luz de una ventana polarizada debe ser de al menos ${s.front}, y la reflectancia no puede pasar del 20 %. La ley añade una regla que pesa en un control: una ventana que mide más de 32 % con un medidor aprobado por el Comisionado se presume, sin prueba en contrario, conforme. En un auto de pasajeros la regla cubre las laterales delanteras, las laterales traseras y el vidrio trasero. Los vehículos de usos múltiples, un grupo que según la ley incluye las minivans y las pickups, quedan exentos detrás del conductor. En el parabrisas, el polarizado puede bajar hasta ${s.wsInches} pulgadas desde arriba o hasta la línea AS1, lo que sea más largo, y una lámina transparente contra los rayos UV se permite en todo el vidrio. Como el vidrio cuenta, una lámina de 35 % ya es demasiado oscura en la mayoría de los autos: sobre un vidrio de 78 % da ${h.pc(combinedVlt(78, 35))}. Manejar con un polarizado ilegal, o aplicarlo, es un delito menor de clase 3, con una defensa si la lámina se quita en 15 días.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Qué porcentaje de polarizado es legal en Carolina del Norte?', a: `Al menos ${s.front} de transmisión total en todas las ventanas de un auto, lámina y vidrio juntos, con una reflectancia de 20 % o menos. Una lectura de más de 32 % en el medidor se presume legal. Sobre un vidrio de fábrica de 78 %, eso permite una lámina de hasta unos ${h.pc(darkestLegalFilm(32, 78) as number)}, es decir, en la práctica una lámina de 45 % y no la de 35 % que muchos piden.` },
        { q: '¿Se puede corregir un cargo por polarizado en Carolina del Norte?', a: 'Sí. La sección 20-127(e) da una defensa frente al delito si el dueño quita la lámina o la cambia por una conforme dentro de los 15 días siguientes al cargo y obtiene un certificado de conformidad de la División de Vehículos Motorizados o de la Patrulla de Carreteras. Guarde el certificado y llévelo al tribunal.' },
        { q: '¿Es legal el polarizado muy oscuro en una SUV o pickup en Carolina del Norte?', a: `Detrás del conductor, sí. Las ventanas detrás del conductor de un vehículo de usos múltiples, que la ley define incluyendo las minivans y las pickups, quedan fuera de los límites de 35 % y 20 %. Las laterales delanteras conservan la regla de ${s.front}, y las láminas rojas, amarillas o ámbar siguen prohibidas en todos los vehículos.` },
        { q: '¿Cuánto dura un permiso médico de polarizado en Carolina del Norte?', a: 'Cinco años. La División de Vehículos Motorizados emite un permiso de excepción médica por fotosensibilidad a la luz visible tras una solicitud escrita con el formulario de evaluación del médico. El permiso indica el vehículo, las ventanas y los niveles, debe ir en el vehículo y viene con una calcomanía para la esquina inferior izquierda del vidrio trasero.' },
      ];
    },
    body: (h) => {
      const { s, va, sc, tn, ga } = F(h);
      return `
<h2>Por qué una lámina de 35 % no pasa con una ley de 35 %</h2>
<p>La ley habla de «la transmisión total de luz de la ventana polarizada», es decir, lámina y vidrio juntos. El vidrio lateral de fábrica no es transparente del todo: deja pasar menos del 100 % de la luz antes de cualquier lámina. La tabla muestra lo que dan algunas láminas comunes una vez contado el vidrio, y cómo queda cada una frente al umbral de 32 %:</p>
${h.table(['Lámina', 'Vidrio de 75 %', 'Vidrio de 85 %', 'Auto en Carolina del Norte'], [
  ['50 %', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50)), 'legal'],
  ['45 %', h.pc(combinedVlt(75, 45)), h.pc(combinedVlt(85, 45)), 'legal en los dos'],
  ['40 %', h.pc(combinedVlt(75, 40)), h.pc(combinedVlt(85, 40)), 'muy oscuro con 75 %, más de 32 % con 85 %'],
  ['35 %', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35)), 'muy oscuro'],
  ['20 %', h.pc(combinedVlt(75, 20)), h.pc(combinedVlt(85, 20)), 'muy oscuro'],
], 'Lecturas calculadas como lámina × vidrio; la regla de 35 % y la presunción de 32 % vienen de N.C. Gen. Stat. 20-127(b)(1).', ['l', 'r', 'r', 'l'])}
<p>Una segunda lámina sobre una vieja vuelve a multiplicar. Pruébelo abajo: ponga su vidrio, la lámina que ya tiene y la que piensa añadir.</p>
<!--tool:mini:stack|{"glass":78,"film":45,"film2":80}-->
<h2>Lo que puede pedir el agente</h2>
<p>La ley obliga al conductor de un vehículo con ventanas polarizadas a bajar la ventana cuando se acerca un agente. Luego decide la lectura del medidor: por encima de 32 %, la ventana se da por conforme sin más discusión; con 32 % o menos, el cargo se apoya en la regla del 35 %.</p>
<h2>Autos y vehículos de usos múltiples</h2>
<p>En un sedán, un cupé o un hatchback, el vidrio trasero y las laterales traseras siguen el mismo 35 % que las puertas delanteras. Un vehículo de usos múltiples queda exento detrás del conductor, y la ley dice que ese grupo incluye las minivans y las pickups. El vidrio trasero de un vehículo hecho para llevar carga también queda exento. Las láminas rojas, amarillas o ámbar siguen prohibidas en todas partes, y la lámina debe ser no reflectante.</p>
<h2>Parabrisas</h2>
<p>El polarizado puede ir en la parte alta del parabrisas hasta ${s.wsInches} pulgadas o hasta la línea AS1, lo que sea más largo. Desde la ley S.L. 2025-47, una lámina transparente que bloquea los rayos ultravioleta sin oscurecer puede cubrir el resto del parabrisas. Un permiso médico no cambia la regla del parabrisas.</p>
<h2>Permiso médico y sanción</h2>
<p>La División de Vehículos Motorizados concede permisos de excepción médica por fotosensibilidad a la luz visible, válidos cinco años, hasta cuatro a la vez. El titular recibe una calcomanía para la esquina inferior izquierda del vidrio trasero; manejar sin mostrarla es una infracción de 200 dólares. Para los demás, manejar con un polarizado no conforme o aplicarlo es un delito menor de clase 3. La ley no fija un monto de multa para ese caso, así que este sitio muestra la multa como ${s.fineL}.</p>
<h2>Alrededor de Carolina del Norte</h2>
<p>${h.sl('VA')} pide ${va.front} en las puertas delanteras, ${h.sl('SC')} ${sc.front}, ${h.sl('TN')} ${tn.front} y ${h.sl('GA')} ${ga.front}. Un auto polarizado al límite de Carolina del Norte pasa en los cuatro en las ventanas traseras, pero no en las puertas delanteras en Virginia. Cifras leídas en los Estatutos Generales el ${s.checked}, en una copia archivada de la página oficial porque ncleg.gov rechazó la conexión ese día.</p>`;
    },
  },
});
