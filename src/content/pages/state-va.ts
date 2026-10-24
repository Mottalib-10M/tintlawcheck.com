import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt, darkestLegalFilm } from '../../lib/engine/tint';

const C = 'VA';
const F = (h: Helpers) => ({ s: h.S(C), md: h.S('MD'), dc: h.S('DC'), nc: h.S('NC'), wv: h.S('WV'), ky: h.S('KY') });

export default definePage({
  id: 'state-va',
  group: 'states',
  order: 109,
  state: C,
  tool: { kind: 'tint', props: { film: 70 } },
  mini: { kind: 'mini:compare', props: { state: 'VA', b: 'NC' } },
  related: ['home', 'state-nc', 'state-tn', 'radar', 'medical', 'legal-percentage'],
  sources: ['fmvss205', 'nhtsa_70', 'fmcsa_392_71'],
  en: {
    slug: 'virginia-tint-laws',
    nav: 'Virginia',
    card: 'Virginia: 50% front, 35% behind the driver, a 7-point margin and no stop for tint alone.',
    title: 'Virginia Tint Laws 2026: 50% Front, 35% Rear, 7-Point Margin',
    description: 'Virginia tint laws: 50% on the front side windows and 35% behind the driver, film and glass together, a 7-point margin, and no traffic stop for tint alone.',
    h1: 'Virginia tint laws: 50% front, 35% rear, read with a 7-point margin',
    intro: 'Virginia counts the whole window and gives officers a 7-point margin. Enter the film and the glass: the calculator checks the front doors against 50% and the rear against 35%.',
    resume: (h) => {
      const { s } = F(h);
      return `Virginia has two numbers and a 7-point margin written into the law. Under ${s.law}, film on the front side windows may not bring the total light transmittance of the window below ${s.front}, and film on the rear side windows and back window may not bring it below ${s.back}. Officers' measurements are given a tolerance of minus 7 percentage points, so the meter must show 43% on the front and 28% behind. On multipurpose vehicles and pickup trucks the windows behind the driver may go below 35%. On every window, reflectance is capped at 20% and holographic or prism effects are banned, and a car needs a mirror on each side showing 200 feet to the rear before any film goes on. On the windshield, film may only replace the maker's sunshield at the top, and since a 2026 amendment clear film is allowed if the glass stays within federal standard FMVSS 205. Since 2020 an officer may not stop a car for tint alone. For the driver, a violation is a traffic infraction with no demerit points; for an installer, a Class 3 misdemeanor.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What tint can I put on the front doors in Virginia?', a: `Film that keeps the window at ${s.front} or more, glass included. With the 7-point margin, the meter floor is 43%, so on 80% factory glass the darkest film is about ${h.pc(darkestLegalFilm(43, 80) as number)} at the edge of the margin, or ${h.pc(darkestLegalFilm(50, 80) as number)} to stay on the limit itself. In practice that means a 60% or 70% film.` },
        { q: 'Can Virginia police stop me for window tint?', a: 'No, not for tint alone. Since 2020 the statute says no law enforcement officer shall stop a motor vehicle for a violation of section 46.2-1052. An officer who stops a car for another reason can still measure the tint and write it up, and a court may dismiss the charge on proof that the windows now comply.' },
        { q: 'Is clear windshield film legal in Virginia?', a: 'Yes, since a 2026 amendment. Clear film may be applied to the windshield as long as it is kept in a condition consistent with federal standard 49 C.F.R. 571.205, which requires at least 70% light transmittance in the driver\'s field of view. Tinted film still may only replace the manufacturer\'s sunshield in the uppermost area.' },
        { q: 'What does a Virginia medical tint authorization allow?', a: 'Written authorization from the DMV Commissioner, granted on a signed statement from a licensed physician or optometrist, allows all windows to go down to 35%, and the windshield to 70% below the top 5 inches or the AS-1 line. It must be kept in the vehicle and lasts while the condition persists or until the vehicle is sold.' },
      ];
    },
    body: (h) => {
      const { s, md, dc, nc, wv, ky } = F(h);
      return `
<h2>Two limits, one wide margin</h2>
<p>The statute writes the margin into the law itself: "such measurements made by law-enforcement officers shall be given a tolerance of minus seven percentage points." That makes Virginia unusually forgiving at the meter, but only for the reading, not for the film you choose. The table shows common films on 80% factory glass:</p>
${h.table(['Film', 'Combined on 80% glass', 'Front doors (50%, meter 43%)', 'Rear windows (35%, meter 28%)'], [
  ['70%', h.pc(combinedVlt(80, 70)), 'legal', 'legal'],
  ['60%', h.pc(combinedVlt(80, 60)), 'within the margin', 'legal'],
  ['50%', h.pc(combinedVlt(80, 50)), 'too dark', 'legal'],
  ['40%', h.pc(combinedVlt(80, 40)), 'too dark', 'within the margin'],
  ['35%', h.pc(combinedVlt(80, 35)), 'too dark', 'too dark'],
], 'Readings computed as film × glass; limits and the 7-point tolerance come from Va. Code 46.2-1052(C) and (E).', ['l', 'r', 'l', 'l'])}
<h2>SUVs, vans and pickups</h2>
<p>Subsection H lets the rear side windows and back window of a multipurpose passenger vehicle or a pickup truck go below 35%. The front doors keep the 50% rule, and the 20% reflectance cap applies everywhere. A sedan does not get this exemption, so its rear windows stay at 35%.</p>
<h2>Mirrors before film</h2>
<p>Virginia requires a mirror on each side of the vehicle giving the driver a view at least 200 feet to the rear before any tinting film is applied to any window. Current cars have both mirrors, but an older vehicle or a modified one may not.</p>
<h2>Medical authorization</h2>
<p>Section 46.2-1053 lets the DMV Commissioner authorize darker film for a person with a medical condition, on a signed statement from a licensed physician or optometrist. All windows may then go down to 35%, and the windshield to 70% below the top 5 inches or the AS-1 line. The authorization stays in the vehicle and ends when the condition does or when the vehicle is sold.</p>
<h2>Going to North Carolina or Maryland</h2>
<p>A car tinted to the Virginia limits is lighter on the front than its neighbors require, but the rear can differ. Compare Virginia with any state here:</p>
<!--tool:mini:compare|{"state":"VA","b":"MD"}-->
<p>${h.sl('MD')} asks for ${md.front} on every window of a car, ${h.sl('DC')} for ${dc.front} on the front, ${h.sl('NC')} for ${nc.front}, ${h.sl('WV')} for ${wv.front} and ${h.sl('KY')} for ${ky.front} on the front doors.</p>
<h2>Penalty</h2>
<p>For the driver, a tint violation is a traffic infraction that carries no demerit points. The section does not write a fine amount, so this site shows the fine as ${s.fineL}. For an installer, a first offense is a Class 3 misdemeanor and a later one a Class 2 misdemeanor. Virginia is also one of the two places in this site's data that ban radar detectors in private cars; the ${h.a('radar', 'radar detector page')} has the details.</p>
<p>Figures read on the Virginia Legislative Information System on ${s.checked}, including the 2026 amendment on clear windshield film.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-virginia',
    nav: 'Virginia',
    card: 'Virginia: 50 % adelante, 35 % atrás, 7 puntos de margen y ninguna parada solo por el polarizado.',
    title: 'Polarizado en Virginia 2026: 50 % adelante y 35 % atrás',
    description: 'Polarizado en Virginia: 50 % en las laterales delanteras y 35 % atrás, lámina y vidrio juntos, 7 puntos de margen y ninguna parada solo por el polarizado.',
    h1: 'Polarizado en Virginia: 50 % adelante, 35 % atrás, con 7 puntos de margen',
    intro: 'Virginia cuenta toda la ventana y da a los agentes un margen de 7 puntos. Ponga la lámina y el vidrio: la calculadora compara las puertas delanteras con el 50 % y la parte trasera con el 35 %.',
    resume: (h) => {
      const { s } = F(h);
      return `Virginia tiene dos cifras y un margen de 7 puntos escrito en la ley. Según ${s.law}, la lámina en las laterales delanteras no puede bajar la transmisión total de luz de la ventana por debajo de ${s.front}, y la lámina en las laterales traseras y el vidrio trasero no puede bajarla de ${s.back}. Las mediciones de los agentes tienen una tolerancia de menos 7 puntos porcentuales, así que el medidor debe marcar 43 % adelante y 28 % atrás. En los vehículos de usos múltiples y las pickups, las ventanas detrás del conductor pueden bajar de 35 %. En todas las ventanas, la reflectancia tiene un tope de 20 % y los efectos holográficos o de prisma están prohibidos, y un auto necesita un espejo a cada lado con vista de 200 pies hacia atrás antes de poner cualquier lámina. En el parabrisas, la lámina solo puede reemplazar la franja de fábrica en la parte alta, y desde una reforma de 2026 se admite una lámina transparente si el vidrio sigue cumpliendo la norma federal FMVSS 205. Desde 2020 un agente no puede detener un auto solo por el polarizado. Para el conductor, una infracción es una falta de tránsito sin puntos; para un instalador, un delito menor de clase 3.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Qué polarizado puedo poner en las puertas delanteras en Virginia?', a: `Una lámina que mantenga la ventana en ${s.front} o más, con el vidrio incluido. Con el margen de 7 puntos, el piso del medidor es 43 %, así que sobre un vidrio de fábrica de 80 % la lámina más oscura es de unos ${h.pc(darkestLegalFilm(43, 80) as number)} al borde del margen, o ${h.pc(darkestLegalFilm(50, 80) as number)} para quedarse en el límite. En la práctica, eso es una lámina de 60 % o 70 %.` },
        { q: '¿La policía de Virginia puede detenerme por el polarizado?', a: 'No solo por el polarizado. Desde 2020 la ley dice que ningún agente detendrá un vehículo por una infracción de la sección 46.2-1052. Un agente que detiene el auto por otro motivo sí puede medir el polarizado y anotarlo, y un tribunal puede anular el cargo con la prueba de que las ventanas ya cumplen.' },
        { q: '¿Es legal una lámina transparente en el parabrisas en Virginia?', a: 'Sí, desde una reforma de 2026. Se puede aplicar una lámina transparente al parabrisas siempre que se mantenga conforme a la norma federal 49 C.F.R. 571.205, que exige al menos 70 % de transmisión de luz en el campo de visión del conductor. Una lámina oscura solo puede reemplazar la franja de fábrica en la parte más alta.' },
        { q: '¿Qué permite una autorización médica de polarizado en Virginia?', a: 'Una autorización escrita del Comisionado del DMV, concedida con la declaración firmada de un médico u optometrista con licencia, permite bajar todas las ventanas hasta 35 %, y el parabrisas hasta 70 % por debajo de las 5 pulgadas superiores o la línea AS-1. Debe ir en el vehículo y vale mientras dure la condición o hasta que se venda el vehículo.' },
      ];
    },
    body: (h) => {
      const { s, md, dc, nc, wv, ky } = F(h);
      return `
<h2>Dos límites y un margen amplio</h2>
<p>La ley escribe el margen en su propio texto: «a las mediciones hechas por los agentes se les dará una tolerancia de menos siete puntos porcentuales». Eso hace a Virginia especialmente indulgente frente al medidor, pero solo para la lectura, no para la lámina que usted elige. La tabla muestra algunas láminas comunes sobre un vidrio de fábrica de 80 %:</p>
${h.table(['Lámina', 'Combinada con vidrio de 80 %', 'Puertas delanteras (50 %, medidor 43 %)', 'Ventanas traseras (35 %, medidor 28 %)'], [
  ['70 %', h.pc(combinedVlt(80, 70)), 'legal', 'legal'],
  ['60 %', h.pc(combinedVlt(80, 60)), 'en el margen', 'legal'],
  ['50 %', h.pc(combinedVlt(80, 50)), 'muy oscuro', 'legal'],
  ['40 %', h.pc(combinedVlt(80, 40)), 'muy oscuro', 'en el margen'],
  ['35 %', h.pc(combinedVlt(80, 35)), 'muy oscuro', 'muy oscuro'],
], 'Lecturas calculadas como lámina × vidrio; los límites y la tolerancia de 7 puntos vienen de Va. Code 46.2-1052(C) y (E).', ['l', 'r', 'l', 'l'])}
<h2>SUV, vans y pickups</h2>
<p>La subsección H permite que las laterales traseras y el vidrio trasero de un vehículo de usos múltiples o de una pickup bajen de 35 %. Las puertas delanteras conservan la regla del 50 %, y el tope de reflectancia de 20 % vale en todas partes. Un sedán no tiene esta exención, así que sus ventanas traseras se quedan en 35 %.</p>
<h2>Espejos antes de la lámina</h2>
<p>Virginia exige un espejo a cada lado del vehículo que dé al conductor una vista de al menos 200 pies hacia atrás antes de aplicar cualquier lámina en cualquier ventana. Los autos actuales tienen los dos espejos, pero un vehículo antiguo o modificado puede no tenerlos.</p>
<h2>Autorización médica</h2>
<p>La sección 46.2-1053 permite al Comisionado del DMV autorizar una lámina más oscura para una persona con una condición médica, con la declaración firmada de un médico u optometrista con licencia. Todas las ventanas pueden entonces bajar hasta 35 %, y el parabrisas hasta 70 % por debajo de las 5 pulgadas superiores o la línea AS-1. La autorización va en el vehículo y termina cuando termina la condición o cuando se vende el vehículo.</p>
<h2>Viajar a Carolina del Norte o a Maryland</h2>
<p>Un auto polarizado a los límites de Virginia es más claro adelante de lo que piden sus vecinos, pero la parte trasera puede diferir. Compare Virginia con cualquier estado aquí:</p>
<!--tool:mini:compare|{"state":"VA","b":"MD"}-->
<p>${h.sl('MD')} pide ${md.front} en todas las ventanas de un auto, ${h.sl('DC')} ${dc.front} adelante, ${h.sl('NC')} ${nc.front}, ${h.sl('WV')} ${wv.front} y ${h.sl('KY')} ${ky.front} en las puertas delanteras.</p>
<h2>Sanción</h2>
<p>Para el conductor, una infracción de polarizado es una falta de tránsito que no suma puntos. La sección no fija un monto de multa, así que este sitio la muestra como ${s.fineL}. Para un instalador, una primera infracción es un delito menor de clase 3 y una posterior, de clase 2. Virginia es además uno de los dos lugares de los datos de este sitio que prohíben los detectores de radar en autos particulares; la ${h.a('radar', 'página de detectores de radar')} da los detalles.</p>
<p>Cifras leídas en el Sistema de Información Legislativa de Virginia el ${s.checked}, incluida la reforma de 2026 sobre la lámina transparente del parabrisas.</p>`;
    },
  },
});
