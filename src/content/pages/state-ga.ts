import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt, darkestLegalFilm } from '../../lib/engine/tint';

const C = 'GA';
const F = (h: Helpers) => ({ s: h.S(C), fl: h.S('FL'), sc: h.S('SC'), tn: h.S('TN'), nc: h.S('NC') });

export default definePage({
  id: 'state-ga',
  group: 'states',
  order: 104,
  state: C,
  tool: { kind: 'tint', props: { film: 50 } },
  mini: { kind: 'mini:medical', props: { state: 'GA' } },
  related: ['home', 'state-fl', 'state-nc', 'state-tn', 'ticket', 'medical'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'georgia-tint-laws',
    nav: 'Georgia',
    card: 'Georgia: 32% plus or minus 3 on every window of a car, free behind the driver of an SUV.',
    title: 'Georgia Tint Laws 2026: 32% on Every Window of a Car',
    description: 'Georgia tint laws: 32% light transmission with the glass on every window of a car, SUVs free behind the driver, 20% reflectance, a 6-inch windshield strip.',
    h1: 'Georgia tint laws: 32% all around, with a 3-point margin',
    intro: 'Georgia measures the film and the glass together and allows 3 points either way. Enter both: the calculator shows whether each window lands inside the margin.',
    resume: (h) => {
      const { s } = F(h);
      return `Georgia uses one number for the whole car. Under ${s.law}, film and glass together must let through ${s.front} of the light, plus or minus 3%, on the front side windows, the rear side windows and the back window of a passenger car, and may reflect no more than 20%. Multipurpose vehicles (SUVs, vans, pickups) keep the ${s.front} rule on the windows beside the driver but are exempt behind the driver. On the windshield, only a transparent item that is not red or amber may sit in the uppermost ${s.wsInches} inches. With the glass counted, a 35% film fails on most cars: on 75% glass it reads ${h.pc(combinedVlt(75, 35))}, under the 29% floor of the tolerance. Operating a car with illegal tint, or installing it, is a misdemeanor, and Georgia's general misdemeanor fine reaches ${s.fineL}. A 2026 bill to move the limits did not become law, so these figures stand.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What is the darkest legal tint on a Georgia car?', a: `On every window of a passenger car the floor is ${s.front} with the glass counted, and the 3-point margin brings the reading an officer accepts down to 29%. On 75% factory glass that means a film of about ${h.pc(darkestLegalFilm(29, 75) as number)} at the very edge, or ${h.pc(darkestLegalFilm(32, 75) as number)} to stay on the limit itself. A 35% film is the usual choice and still fails on darker glass.` },
        { q: 'Did Georgia change its tint law in 2026?', a: 'Not as of October 2026. House Bill 1022 of the 2025-2026 session would have changed the light transmission limits and banned electric tint; it passed the House in February 2026, but its last recorded action was a Senate reading in March and it did not become law. Code section 40-8-73.1 keeps the 32% rule written in 2005.' },
        { q: 'Can a Georgia SUV have limo tint behind the driver?', a: `Yes. Section 40-8-73.1(c)(6) exempts the windows behind the driver of a multipurpose passenger vehicle, which covers SUVs, vans and most pickups, so any darkness is legal there. The two front side windows keep the ${s.front} plus or minus 3 rule, and red or amber film stays banned. A sedan does not get this exemption: its rear windows follow the same 32% as the front.` },
        { q: 'How do I apply for a Georgia medical tint exemption?', a: 'The Department of Public Safety may grant an exemption on application, supported by a written statement from a licensed physician or certified optometrist that the person must be shielded from the sun. It covers vehicles the person owns or regularly rides in, under conditions set by DPS. Keep the approval in the vehicle.' },
      ];
    },
    body: (h) => {
      const { s, fl, sc, tn, nc } = F(h);
      return `
<h2>The plus-or-minus rule in practice</h2>
<p>Georgia writes its limit as "32 percent, plus or minus 3 percent", which gives a working floor of 29% for the meter. The combined reading is what matters, because the statute measures the material and the glazing as applied. Here is what common films give on two typical glass readings:</p>
${h.table(['Film', 'On 70% glass', 'On 80% glass', 'Georgia car'], [
  ['50%', h.pc(combinedVlt(70, 50)), h.pc(combinedVlt(80, 50)), 'legal'],
  ['45%', h.pc(combinedVlt(70, 45)), h.pc(combinedVlt(80, 45)), 'legal'],
  ['40%', h.pc(combinedVlt(70, 40)), h.pc(combinedVlt(80, 40)), 'within the margin on 70%, legal on 80%'],
  ['35%', h.pc(combinedVlt(70, 35)), h.pc(combinedVlt(80, 35)), 'too dark on 70%, within the margin on 80%'],
  ['20%', h.pc(combinedVlt(70, 20)), h.pc(combinedVlt(80, 20)), 'too dark'],
], 'Readings computed as film × glass; the 32% limit and its 3-point margin come from O.C.G.A. 40-8-73.1(b)(2).', ['l', 'r', 'r', 'l'])}
<p>The table shows why a "legal in Georgia" film bought by its label is not a safe bet: the same 35% roll passes on one car and fails on another. Measure the bare glass, or enter 70% to stay on the cautious side.</p>
<h2>Sedans and SUVs are treated differently</h2>
<p>For a passenger car, every window behind the windshield carries the same rule. For a multipurpose passenger vehicle, the law keeps the rule on the windows to the right and left of the driver and exempts everything behind. A family moving from a sedan to an SUV can therefore go darker at the back without breaking the law, but never on the front doors.</p>
<h2>Checking a car you already own</h2>
<p>If your car came tinted, the label alone tells you little, because nobody knows how many layers sit on the glass. A tint meter at an inspection lane or a film shop gives the combined reading in seconds. Compare it with 29%, the bottom of the margin: a reading of 30% or 31% passes, while 28% does not, whatever the installer wrote on the invoice. Ask for the reading on each door, since a single replaced window often carries a different film from the rest of the car.</p>
<h2>Windshield, color and reflection</h2>
<p>Nothing that reduces light transmission may be put on the windshield, except a transparent item in the top ${s.wsInches} inches that is neither red nor amber. On the other windows, the film may not reflect more than 20% of the light, which rules out mirror finishes. A medical exemption is available through the Department of Public Safety; the tool below shows the rule for Georgia and lets you compare any other state.</p>
<!--tool:mini:medical|{"state":"GA"}-->
<h2>Penalty</h2>
<p>Driving with illegal tint and installing it are both misdemeanors under section 40-8-73.1(h). The statute does not write its own amount; the general misdemeanor rule of section 17-10-3 caps the fine at ${s.fineL}, and the amount actually set is left to the court.</p>
<h2>Around Georgia</h2>
<p>Next door, ${h.sl('FL')} allows ${fl.back} behind the driver of a car, ${h.sl('SC')} asks for ${sc.front} on every window, ${h.sl('TN')} for ${tn.front} and ${h.sl('NC')} for ${nc.front}. A Georgia car tinted down to the 32% limit passes in Florida and South Carolina, but can read too dark for the 35% rules of Tennessee and North Carolina. Figures read in the Official Code of Georgia on ${s.checked}; the official code site was not reachable that day, so the wording was read in the current-law text reproduced by the 2026 bill.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-georgia',
    nav: 'Georgia',
    card: 'Georgia: 32 % con 3 puntos de margen en todas las ventanas de un auto; SUV libre atrás.',
    title: 'Polarizado en Georgia 2026: 32 % en todas las ventanas, ±3',
    description: 'Ley de polarizado en Georgia: 32 % de transmisión con el vidrio en todas las ventanas de un auto, SUV libres atrás, 20 % de reflectancia y franja de 6 pulgadas.',
    h1: 'Polarizado en Georgia: 32 % en todo el auto, con 3 puntos de margen',
    intro: 'Georgia mide la lámina y el vidrio juntos y admite 3 puntos de diferencia. Ponga los dos datos: la calculadora le muestra si cada ventana queda dentro del margen.',
    resume: (h) => {
      const { s } = F(h);
      return `Georgia usa una sola cifra para todo el auto. Según ${s.law}, lámina y vidrio juntos deben dejar pasar el ${s.front} de la luz, con 3 % de margen hacia arriba o hacia abajo, en las laterales delanteras, las laterales traseras y el vidrio trasero de un auto de pasajeros, y no pueden reflejar más de 20 %. Los vehículos de usos múltiples (SUV, vans, pickups) conservan la regla del ${s.front} en las ventanas junto al conductor, pero quedan exentos detrás del conductor. En el parabrisas solo cabe un elemento transparente, ni rojo ni ámbar, en las ${s.wsInches} pulgadas superiores. Como el vidrio cuenta, una lámina de 35 % no pasa en la mayoría de los autos: sobre un vidrio de 75 % da ${h.pc(combinedVlt(75, 35))}, por debajo del piso de 29 % de la tolerancia. Manejar con un polarizado ilegal, o instalarlo, es un delito menor, y la multa general de esos delitos en Georgia llega a ${s.fineL}. Un proyecto de 2026 para cambiar los límites no se convirtió en ley, así que estas cifras siguen vigentes.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuál es el polarizado más oscuro legal en un auto en Georgia?', a: `En todas las ventanas de un auto de pasajeros el mínimo es ${s.front} contando el vidrio, y el margen de 3 puntos baja a 29 % la lectura que acepta un agente. Sobre un vidrio de fábrica de 75 %, eso da una lámina de unos ${h.pc(darkestLegalFilm(29, 75) as number)} al borde del margen, o ${h.pc(darkestLegalFilm(32, 75) as number)} para quedarse en el límite mismo. La lámina de 35 % es la elección habitual y aun así no pasa sobre un vidrio más oscuro.` },
        { q: '¿Cambió Georgia su ley de polarizado en 2026?', a: 'No, a octubre de 2026. El proyecto de ley 1022 de la sesión 2025-2026 habría cambiado los límites de transmisión y prohibido el polarizado eléctrico; pasó la Cámara en febrero de 2026, pero su última acción registrada fue una lectura en el Senado en marzo y no se convirtió en ley. La sección 40-8-73.1 mantiene la regla del 32 % escrita en 2005.' },
        { q: '¿Una SUV en Georgia puede llevar polarizado muy oscuro atrás?', a: `Sí. La sección 40-8-73.1(c)(6) exime las ventanas detrás del conductor de un vehículo de usos múltiples, lo que incluye las SUV, las vans y la mayoría de las pickups, así que cualquier oscuridad es legal ahí. Las dos laterales delanteras siguen con la regla de ${s.front} más o menos 3, y las láminas rojas o ámbar siguen prohibidas. Un sedán no tiene esta exención: sus ventanas traseras siguen el 32 %.` },
        { q: '¿Cómo se pide una exención médica del polarizado en Georgia?', a: 'El Departamento de Seguridad Pública puede conceder una exención por solicitud, con una declaración escrita de un médico con licencia o de un optometrista certificado de que la persona debe protegerse del sol. Cubre los vehículos que la persona posee o en los que viaja con frecuencia, con las condiciones que fija el departamento. Guarde la aprobación en el vehículo.' },
      ];
    },
    body: (h) => {
      const { s, fl, sc, tn, nc } = F(h);
      return `
<h2>La regla del «más o menos» en la práctica</h2>
<p>Georgia escribe su límite como «32 por ciento, más o menos 3 por ciento», lo que da un piso práctico de 29 % para el medidor. Lo que cuenta es la lectura combinada, porque la ley mide el material y el vidrio tal como quedan aplicados. Esto es lo que dan algunas láminas comunes sobre dos lecturas de vidrio:</p>
${h.table(['Lámina', 'Vidrio de 70 %', 'Vidrio de 80 %', 'Auto en Georgia'], [
  ['50 %', h.pc(combinedVlt(70, 50)), h.pc(combinedVlt(80, 50)), 'legal'],
  ['45 %', h.pc(combinedVlt(70, 45)), h.pc(combinedVlt(80, 45)), 'legal'],
  ['40 %', h.pc(combinedVlt(70, 40)), h.pc(combinedVlt(80, 40)), 'en el margen con 70 %, legal con 80 %'],
  ['35 %', h.pc(combinedVlt(70, 35)), h.pc(combinedVlt(80, 35)), 'muy oscuro con 70 %, en el margen con 80 %'],
  ['20 %', h.pc(combinedVlt(70, 20)), h.pc(combinedVlt(80, 20)), 'muy oscuro'],
], 'Lecturas calculadas como lámina × vidrio; el límite de 32 % y su margen de 3 puntos vienen de O.C.G.A. 40-8-73.1(b)(2).', ['l', 'r', 'r', 'l'])}
<p>La tabla muestra por qué una lámina comprada como «legal en Georgia» por su etiqueta no es una apuesta segura: el mismo rollo de 35 % pasa en un auto y no en otro. Mida el vidrio sin lámina, o ponga 70 % para quedarse del lado prudente.</p>
<h2>Sedanes y SUV no se tratan igual</h2>
<p>En un auto de pasajeros, todas las ventanas detrás del parabrisas llevan la misma regla. En un vehículo de usos múltiples, la ley mantiene la regla en las ventanas a la derecha y a la izquierda del conductor y exime todo lo que queda detrás. Una familia que pasa de un sedán a una SUV puede, por tanto, oscurecer más la parte trasera sin romper la ley, pero nunca las puertas delanteras.</p>
<h2>Revisar un auto que ya tiene</h2>
<p>Si su auto vino polarizado, la etiqueta dice poco, porque nadie sabe cuántas capas hay sobre el vidrio. Un medidor de polarizado en un taller de láminas da la lectura combinada en segundos. Compárela con 29 %, el fondo del margen: una lectura de 30 % o 31 % pasa, mientras que 28 % no, diga lo que diga la factura del instalador. Pida la lectura en cada puerta, porque una sola ventana cambiada suele llevar otra lámina distinta del resto del auto.</p>
<h2>Parabrisas, color y reflejo</h2>
<p>En el parabrisas no se puede poner nada que reduzca la transmisión de luz, salvo un elemento transparente en las ${s.wsInches} pulgadas superiores que no sea rojo ni ámbar. En las demás ventanas, la lámina no puede reflejar más del 20 % de la luz, lo que excluye los acabados espejo. Hay una exención médica a través del Departamento de Seguridad Pública; la herramienta de abajo muestra la regla de Georgia y permite comparar con otro estado.</p>
<!--tool:mini:medical|{"state":"GA"}-->
<h2>Sanción</h2>
<p>Manejar con un polarizado ilegal y también instalarlo son delitos menores según la sección 40-8-73.1(h). La ley no fija su propio monto; la regla general de la sección 17-10-3 limita la multa a ${s.fineL}, y el monto concreto lo decide el tribunal.</p>
<h2>Alrededor de Georgia</h2>
<p>Al lado, ${h.sl('FL')} permite ${fl.back} detrás del conductor de un auto, ${h.sl('SC')} pide ${sc.front} en todas las ventanas, ${h.sl('TN')} ${tn.front} y ${h.sl('NC')} ${nc.front}. Un auto de Georgia polarizado hasta el límite de 32 % pasa en Florida y Carolina del Sur, pero puede resultar muy oscuro para la regla de 35 % de Tennessee y Carolina del Norte. Cifras leídas en el Código Oficial de Georgia el ${s.checked}; ese día el sitio oficial del código no respondía, así que el texto se leyó en la versión vigente reproducida por el proyecto de 2026.</p>`;
    },
  },
});
