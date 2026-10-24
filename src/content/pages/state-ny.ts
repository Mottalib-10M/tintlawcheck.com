import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt } from '../../lib/engine/tint';

const C = 'NY';
const F = (h: Helpers) => ({ s: h.S(C), nj: h.S('NJ'), ct: h.S('CT'), ma: h.S('MA'), vt: h.S('VT'), pa: h.S('PA') });

export default definePage({
  id: 'state-ny',
  group: 'states',
  order: 112,
  state: C,
  tool: { kind: 'tint', props: { film: 80 } },
  mini: { kind: 'mini:compare', props: { state: 'NY', b: 'NJ' } },
  related: ['home', 'state-pa', 'state-fl', 'windshield', 'ticket', 'medical'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'new-york-tint-laws',
    nav: 'New York',
    card: 'New York: 70% on the side windows of a car, any back window with two mirrors, SUVs free behind.',
    title: 'New York Tint Laws 2026: 70% on the Side Windows of a Car',
    description: 'New York tint laws: 70% light transmittance on the front and rear side windows of a sedan or coupe, any back window with two mirrors, a 6-inch windshield strip.',
    h1: 'New York tint laws: 70% on the side windows, free at the back',
    intro: 'New York sets 70% on the side windows of a car and lets the back window go dark with two mirrors. Enter the film and the glass: the calculator checks each window.',
    resume: (h) => {
      const { s } = F(h);
      return `New York uses one figure, 70%, and applies it to most of the glass. Under ${s.law}, no one may drive a car whose windshield, or side windows beside or in front of the driver's seat, are covered with material that has a light transmittance below ${s.front}. The same 70% applies to the rear side windows of station wagons, sedans, hardtops, coupes, hatchbacks and convertibles. The back window may be darker if the vehicle has side mirrors on both sides giving a clear and full view of the road behind. SUVs, vans and trucks are not in the list of body styles for the rear side windows, so those windows are free on them. On the windshield, material below 70% may only sit in the uppermost ${s.wsInches} inches. The statute does not say whether the glass counts and gives no tolerance, so the calculator shows the combined reading: an 80% film on 85% glass reads ${h.pc(combinedVlt(85, 80))}. A violation is a traffic infraction, punished on a first conviction by a fine of up to ${s.fineL}, up to 15 days in jail, or both.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What is the darkest legal tint on New York front windows?', a: `Material with at least ${s.front} light transmittance, with no tolerance written in the statute. Because a meter reads film and glass together, only very light film keeps a front window at 70%: on 85% glass, an 80% film reads ${h.pc(combinedVlt(85, 80))} and a 90% film ${h.pc(combinedVlt(85, 90))}. Darker film on the front doors needs a medical exemption.` },
        { q: 'Can a New York SUV have dark rear windows?', a: 'Yes. Section 375(12-a) applies the 70% rule for the rear side windows only to station wagons, sedans, hardtops, coupes, hatchbacks and convertibles. SUVs, vans and trucks are not on that list, so their rear side windows are free, and the back window of any vehicle may be darker when side mirrors on both sides give a full view behind.' },
        { q: 'How do I get a New York medical tint exemption?', a: 'Apply to the DMV Commissioner with a statement from a physician or nurse practitioner giving the condition and the minimum light transmission needed. The condition must appear on the Health Commissioner\'s list. The exemption covers the windshield and front side windows, and the DMV sticker is attached to each shielded window.' },
        { q: 'How much is a New York tint ticket?', a: `A tint violation is a traffic infraction. Under the general penalty of section 1800, a first conviction can bring a fine of up to ${s.fineL}, up to 15 days in jail, or both, with higher amounts for a repeat within 18 months. The statute also lets the DMV test a window and give it a small conformity label.` },
      ];
    },
    body: (h) => {
      const { s, nj, ct, ma, vt, pa } = F(h);
      return `
<h2>Which windows carry the 70% rule</h2>
<p>The statute names windows and body styles rather than giving one rule for the whole car. Read window by window, it gives:</p>
${h.table(['Window', 'Sedan, coupe, hatchback, wagon, convertible', 'SUV, van or truck'], [
  ['Windshield', `70%, darker only in the top ${s.wsInches} in.`, `70%, darker only in the top ${s.wsInches} in.`],
  ['Front side windows', '70%', '70%'],
  ['Rear side windows', '70%', 'no limit'],
  ['Back window', 'any, with two side mirrors', 'any, with two side mirrors'],
], `N.Y. Veh. & Traf. Law 375(12-a), read in an archived copy of the official New York Senate page dated ${s.readDate}.`, ['l', 'l', 'l'])}
<h2>Why so little film fits</h2>
<p>Federal standard ${h.src('fmvss205', 'FMVSS 205')} requires at least 70% for the glass in the driver's field of view, and New York asks for the same figure with the material on. A meter cannot separate film from glass, so the room left is small:</p>
${h.table(['Film', 'On 80% glass', 'On 88% glass'], [
  ['90%', h.pc(combinedVlt(80, 90)), h.pc(combinedVlt(88, 90))],
  ['80%', h.pc(combinedVlt(80, 80)), h.pc(combinedVlt(88, 80))],
  ['70%', h.pc(combinedVlt(80, 70)), h.pc(combinedVlt(88, 70))],
], 'Readings computed as film × glass, against a 70% limit with no tolerance written.', ['l', 'r', 'r'])}
<p>Only a clear film on clear glass keeps a sedan's side windows at 70% on the meter. The calculator above flags the case where the film alone meets 70% but the window, glass included, does not.</p>
<h2>Medical exemption</h2>
<p>The DMV Commissioner may exempt the windshield and front side windows for a person who needs shielding from the sun and drives or is regularly driven in the vehicle. The application carries a statement from a physician or nurse practitioner giving the condition and the minimum light transmission needed, and the condition must appear on the list kept by the Health Commissioner. Without that exemption, there is no route to darker front film in New York.</p>
<h2>Testing and labels</h2>
<p>The statute lets the DMV test a window; one found to comply gets a small conformity label. A medical exemption comes with a DMV sticker for each shielded window. Neither the label nor the sticker replaces the rule for the other windows.</p>
<h2>Driving in from New Jersey or Pennsylvania</h2>
<p>New York's neighbors read the side windows very differently. Compare New York with any state here:</p>
<!--tool:mini:compare|{"state":"NY","b":"NJ"}-->
<p>${h.sl('NJ')} allows ${nj.front} on the front side windows, ${h.sl('CT')} asks for ${ct.front}, ${h.sl('MA')} for ${ma.front}, ${h.sl('VT')} allows ${vt.front} and ${h.sl('PA')} asks for ${pa.front} in its inspection table. A car tinted to the Connecticut or Massachusetts line is too dark on the front for New York.</p>
<h2>Penalty</h2>
<p>A violation is a traffic infraction. The general penalty of section 1800(a) applies: up to ${s.fineL}, up to 15 days in jail, or both for a first conviction, and more for a second within 18 months. ${s.readL}</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-nueva-york',
    nav: 'Nueva York',
    card: 'Nueva York: 70 % en las ventanas laterales de un auto; vidrio trasero libre con dos espejos.',
    title: 'Polarizado en Nueva York 2026: 70 % en las laterales',
    description: 'Polarizado en Nueva York: 70 % de transmisión en las laterales delanteras y traseras de un sedán o cupé y vidrio trasero libre con dos espejos laterales.',
    h1: 'Polarizado en Nueva York: 70 % en las laterales, libre atrás',
    intro: 'Nueva York fija 70 % en las laterales de un auto y deja oscurecer el vidrio trasero con dos espejos. Ponga la lámina y el vidrio: la calculadora revisa cada ventana.',
    resume: (h) => {
      const { s } = F(h);
      return `Nueva York usa una sola cifra, 70 %, y la aplica a casi todo el vidrio. Según ${s.law}, nadie puede manejar un auto cuyo parabrisas, o cuyas ventanas laterales junto o delante del asiento del conductor, estén cubiertos con un material con una transmisión de luz inferior al ${s.front}. El mismo 70 % vale para las laterales traseras de las rancheras, sedanes, hardtops, cupés, hatchbacks y convertibles. El vidrio trasero puede ser más oscuro si el vehículo tiene espejos laterales a ambos lados con una vista clara y completa de la vía detrás. Las SUV, las vans y las camionetas no figuran en la lista de carrocerías para las laterales traseras, así que esas ventanas quedan libres en ellas. En el parabrisas, un material por debajo de 70 % solo puede ir en las ${s.wsInches} pulgadas superiores. La ley no dice si el vidrio cuenta ni da tolerancia, así que la calculadora muestra la lectura combinada: una lámina de 80 % sobre un vidrio de 85 % da ${h.pc(combinedVlt(85, 80))}. Una infracción es una falta de tránsito, castigada en una primera condena con una multa de hasta ${s.fineL}, hasta 15 días de cárcel, o ambas.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuál es el polarizado más oscuro legal en las ventanas delanteras en Nueva York?', a: `Un material con al menos ${s.front} de transmisión de luz, sin tolerancia escrita en la ley. Como un medidor lee lámina y vidrio juntos, solo una lámina muy clara mantiene una ventana delantera en 70 %: sobre un vidrio de 85 %, una lámina de 80 % da ${h.pc(combinedVlt(85, 80))} y una de 90 % da ${h.pc(combinedVlt(85, 90))}. Una lámina más oscura adelante necesita una exención médica.` },
        { q: '¿Una SUV en Nueva York puede llevar ventanas traseras oscuras?', a: 'Sí. La sección 375(12-a) aplica la regla del 70 % de las laterales traseras solo a las rancheras, sedanes, hardtops, cupés, hatchbacks y convertibles. Las SUV, vans y camionetas no están en esa lista, así que sus laterales traseras quedan libres, y el vidrio trasero de cualquier vehículo puede ser más oscuro si los espejos laterales dan una vista completa hacia atrás.' },
        { q: '¿Cómo se obtiene una exención médica del polarizado en Nueva York?', a: 'Solicítela al Comisionado del DMV con una declaración de un médico o de una enfermera practicante que indique la condición y la transmisión de luz mínima necesaria. La condición debe figurar en la lista del Comisionado de Salud. La exención cubre el parabrisas y las laterales delanteras, y la calcomanía del DMV va en cada ventana protegida.' },
        { q: '¿Cuánto cuesta una multa por polarizado en Nueva York?', a: `Una infracción de polarizado es una falta de tránsito. Según la sanción general de la sección 1800, una primera condena puede llevar una multa de hasta ${s.fineL}, hasta 15 días de cárcel, o ambas, con montos mayores si se repite en 18 meses. La ley también permite al DMV medir una ventana y darle una pequeña etiqueta de conformidad.` },
      ];
    },
    body: (h) => {
      const { s, nj, ct, ma, vt, pa } = F(h);
      return `
<h2>Qué ventanas llevan la regla del 70 %</h2>
<p>La ley nombra ventanas y carrocerías en lugar de dar una sola regla para todo el auto. Leída ventana por ventana, da:</p>
${h.table(['Ventana', 'Sedán, cupé, hatchback, ranchera, convertible', 'SUV, van o camioneta'], [
  ['Parabrisas', `70 %, más oscuro solo en las ${s.wsInches} pulgadas superiores`, `70 %, más oscuro solo en las ${s.wsInches} pulgadas superiores`],
  ['Laterales delanteras', '70 %', '70 %'],
  ['Laterales traseras', '70 %', 'sin límite'],
  ['Vidrio trasero', 'cualquiera, con dos espejos laterales', 'cualquiera, con dos espejos laterales'],
], `N.Y. Veh. & Traf. Law 375(12-a), leída en una copia archivada de la página oficial del Senado de Nueva York fechada el ${s.readDate}.`, ['l', 'l', 'l'])}
<h2>Por qué cabe tan poca lámina</h2>
<p>La norma federal ${h.src('fmvss205', 'FMVSS 205')} exige al menos 70 % en el vidrio del campo de visión del conductor, y Nueva York pide la misma cifra con el material puesto. Un medidor no puede separar la lámina del vidrio, así que queda poco margen:</p>
${h.table(['Lámina', 'Vidrio de 80 %', 'Vidrio de 88 %'], [
  ['90 %', h.pc(combinedVlt(80, 90)), h.pc(combinedVlt(88, 90))],
  ['80 %', h.pc(combinedVlt(80, 80)), h.pc(combinedVlt(88, 80))],
  ['70 %', h.pc(combinedVlt(80, 70)), h.pc(combinedVlt(88, 70))],
], 'Lecturas calculadas como lámina × vidrio, frente a un límite de 70 % sin tolerancia escrita.', ['l', 'r', 'r'])}
<p>Solo una lámina clara sobre un vidrio claro mantiene las laterales de un sedán en 70 % en el medidor. La calculadora de arriba señala el caso en que la lámina sola cumple el 70 % pero la ventana, con el vidrio, no.</p>
<h2>Exención médica</h2>
<p>El Comisionado del DMV puede eximir el parabrisas y las laterales delanteras para una persona que necesita protegerse del sol y maneja o viaja con regularidad en el vehículo. La solicitud lleva la declaración de un médico o de una enfermera practicante con la condición y la transmisión mínima necesaria, y la condición debe figurar en la lista del Comisionado de Salud. Sin esa exención, no hay manera de llevar una lámina delantera más oscura en Nueva York.</p>
<h2>Pruebas y etiquetas</h2>
<p>La ley permite al DMV medir una ventana; la que cumple recibe una pequeña etiqueta de conformidad. Una exención médica viene con una calcomanía del DMV para cada ventana protegida. Ni la etiqueta ni la calcomanía reemplazan la regla de las demás ventanas.</p>
<h2>Llegar desde Nueva Jersey o Pensilvania</h2>
<p>Los vecinos de Nueva York leen las laterales de forma muy distinta. Compare Nueva York con cualquier estado aquí:</p>
<!--tool:mini:compare|{"state":"NY","b":"NJ"}-->
<p>${h.sl('NJ')} admite ${nj.front} en las laterales delanteras, ${h.sl('CT')} pide ${ct.front}, ${h.sl('MA')} ${ma.front}, ${h.sl('VT')} admite ${vt.front} y ${h.sl('PA')} pide ${pa.front} en su tabla de inspección. Un auto polarizado al límite de Connecticut o Massachusetts es muy oscuro adelante para Nueva York.</p>
<h2>Sanción</h2>
<p>Una infracción es una falta de tránsito. Se aplica la sanción general de la sección 1800(a): hasta ${s.fineL}, hasta 15 días de cárcel, o ambas en una primera condena, y más en una segunda dentro de 18 meses. ${s.readL}</p>`;
    },
  },
});
