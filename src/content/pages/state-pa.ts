import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt } from '../../lib/engine/tint';

const C = 'PA';
const F = (h: Helpers) => ({ s: h.S(C), oh: h.S('OH'), ny: h.S('NY'), md: h.S('MD'), de: h.S('DE'), wv: h.S('WV') });

export default definePage({
  id: 'state-pa',
  group: 'states',
  order: 111,
  state: C,
  tool: { kind: 'tint', props: { film: 80 } },
  mini: { kind: 'mini:compare', props: { state: 'PA', b: 'OH' } },
  related: ['home', 'state-ny', 'state-oh', 'medical', 'percentage', 'by-state'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'pennsylvania-tint-laws',
    nav: 'Pennsylvania',
    card: 'Pennsylvania: 70% on every window of a car in the inspection table, SUVs free behind the driver.',
    title: 'Pennsylvania Tint Laws 2026: 70% on Every Window of a Car',
    description: 'Pennsylvania tint laws: the inspection table asks for 70% on every window of a 1998 or newer car and sets nothing behind the driver of an SUV or a pickup.',
    h1: 'Pennsylvania tint laws: 70% at inspection, on every window of a car',
    intro: 'Pennsylvania\'s numbers live in the inspection rules. Enter the film and the glass: the calculator checks each window of a car against 70%, and the front only on an SUV.',
    resume: (h) => {
      const { s } = F(h);
      return `Pennsylvania has two layers of rules. The statute, ${s.law}, bars any sun screening material that does not let a person see inside the vehicle through the windshield, the side wings or the side windows. The figures come from the vehicle inspection regulation: Table X of 67 Pa. Code chapter 175 asks for ${s.front} light transmittance on the windshield, the front side windows, the rear side windows and the back window of a passenger car built in 1998 or later. For trucks and multipurpose passenger vehicles, the table sets 70% for the windshield and the front side windows and no requirement behind the driver. The table says every level assumes a 3% accuracy. Because federal standard FMVSS 205 only requires factory glass to reach 70%, little room is left for film on a Pennsylvania car: an 80% film on 85% glass reads ${h.pc(combinedVlt(85, 80))}. The state appeals court held in 2010 that the 70% figure is not part of the statute's own test, which matters for a roadside charge but not for inspection. A violation of the statute is a summary offense.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Is any aftermarket tint legal on a Pennsylvania car?', a: `On a 1998 or newer passenger car, very little. Table X asks for ${s.front} on every window, and factory side glass already lets through less than all of the light. On 85% glass, a clear 80% film reads ${h.pc(combinedVlt(85, 80))}, inside the 3-point margin, while a 70% film reads ${h.pc(combinedVlt(85, 70))} and fails. Darker film needs an exemption.` },
        { q: 'Will tinted windows fail a Pennsylvania inspection?', a: 'They can. Section 175.67 makes the Table X levels part of the safety inspection, so a station checks the windows of a passenger car against 70% with the 3% accuracy margin. A car carrying an exemption certificate must show it to the inspector. An SUV or truck is checked only on the windshield and front side windows.' },
        { q: 'What did Commonwealth v. Brubaker decide about tint?', a: 'In 2010 the Superior Court held that the 70% figure of the inspection regulation is not written into section 4524(e)(1), whose test is whether a person can see inside the vehicle. A roadside charge therefore rests on visibility, while inspection rests on the table. The ruling does not make dark film pass inspection.' },
        { q: 'How do I get a Pennsylvania medical tint exemption?', a: 'PennDOT grants a certificate of exemption to the owner or a household member who drives or is driven regularly, for a condition approved with its Medical Advisory Board and certified by a licensed physician or optometrist. The regulation limits medical exemptions to colorless, UV-filtering material. The certificate stays in the car and ends on sale.' },
      ];
    },
    body: (h) => {
      const { s, oh, ny, md, de, wv } = F(h);
      return `
<h2>Table X, window by window</h2>
<p>The inspection regulation lists light transmittance by vehicle type and window, and states that all levels "assume a 3% accuracy (±3%)". For the vehicles most people drive, it reads:</p>
${h.table(['Vehicle', 'Windshield', 'Front side', 'Rear side', 'Back window'], [
  ['Passenger car, 1998 or newer', '70%', '70%', '70%', '70%'],
  ['Truck or multipurpose vehicle', '70%', '70%', 'no requirement', 'no requirement'],
], '67 Pa. Code ch. 175, Table X, read on the Pennsylvania Code site; older cars follow other rows of the table.', ['l', 'r', 'r', 'r', 'r'])}
<p>Because the levels apply to the window as inspected, the glass counts in practice. Here is what a few films give on two common glass readings, against the 67% floor that the 3% margin allows:</p>
${h.table(['Film', 'On 80% glass', 'On 88% glass', 'Pennsylvania car'], [
  ['90%', h.pc(combinedVlt(80, 90)), h.pc(combinedVlt(88, 90)), 'legal on both'],
  ['80%', h.pc(combinedVlt(80, 80)), h.pc(combinedVlt(88, 80)), 'too dark on 80%, legal on 88%'],
  ['70%', h.pc(combinedVlt(80, 70)), h.pc(combinedVlt(88, 70)), 'too dark'],
  ['50%', h.pc(combinedVlt(80, 50)), h.pc(combinedVlt(88, 50)), 'too dark'],
], 'Readings computed as film × glass.', ['l', 'r', 'r', 'l'])}
<h2>SUVs, vans and pickups</h2>
<p>Behind the driver of a truck or multipurpose passenger vehicle, the table sets no requirement, so any shade passes inspection there. A treated back window needs the mirrors that section 175.264 requires. The front side windows of these vehicles stay at 70%, like a car's.</p>
<h2>Moving to Pennsylvania with tint</h2>
<p>A car tinted to the rules of most other states will not pass a Pennsylvania inspection on the front doors, and a sedan will not pass on the rear either. Compare Pennsylvania with the state you come from:</p>
<!--tool:mini:compare|{"state":"PA","b":"OH"}-->
<h2>At the roadside and at the inspection station</h2>
<p>The two layers do not test the same thing. At inspection, the station applies Table X and its 3% accuracy margin to each window. At the roadside, section 4524(e) asks whether a person can see inside the vehicle, and the Superior Court held in Commonwealth v. Brubaker (2010) that the 70% figure is not written into that test. A car can therefore fail inspection with film that an officer would not charge, but the reverse is rarer: a window dark enough to hide the cabin fails both. Clear ultraviolet film with a high rating can still pass the table, as long as the combined reading stays at 67% or more.</p>
<h2>Exemptions</h2>
<p>PennDOT issues certificates of exemption for medical reasons and for some older vehicles. The medical certificate covers the owner or a household member, is limited to colorless material that filters ultraviolet light, must be carried and shown to the police and the inspector, and is void when the car is sold.</p>
<h2>Penalty</h2>
<p>A violation of section 4524(e) is a summary offense. The section read does not state the fine, so this site shows it as ${s.fineL}.</p>
<h2>Around Pennsylvania</h2>
<p>${h.sl('OH')} asks for ${oh.front} on the front doors, ${h.sl('NY')} for ${ny.front}, ${h.sl('MD')} for ${md.front}, ${h.sl('DE')} for ${de.front} and ${h.sl('WV')} for ${wv.front}. Figures read on the official Pennsylvania statute and code sites on ${s.checked}.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-pensilvania',
    nav: 'Pensilvania',
    card: 'Pensilvania: 70 % en todas las ventanas de un auto en la tabla de inspección; SUV libres atrás.',
    title: 'Polarizado en Pensilvania 2026: 70 % en todas las ventanas',
    description: 'Polarizado en Pensilvania: la tabla de inspección pide 70 % en todas las ventanas de un auto de 1998 o más nuevo y nada detrás del conductor de una SUV.',
    h1: 'Polarizado en Pensilvania: 70 % en la inspección, en todas las ventanas de un auto',
    intro: 'Las cifras de Pensilvania están en las reglas de inspección. Ponga la lámina y el vidrio: la calculadora compara cada ventana de un auto con el 70 %, y solo el frente en una SUV.',
    resume: (h) => {
      const { s } = F(h);
      return `Pensilvania tiene dos capas de reglas. La ley, ${s.law}, prohíbe cualquier material de protección solar que no permita ver el interior del vehículo a través del parabrisas, los deflectores laterales o las ventanas laterales. Las cifras vienen del reglamento de inspección: la Tabla X del capítulo 175 del 67 Pa. Code pide ${s.front} de transmisión de luz en el parabrisas, las laterales delanteras, las laterales traseras y el vidrio trasero de un auto de pasajeros de 1998 o más nuevo. Para camionetas y vehículos de usos múltiples, la tabla fija 70 % en el parabrisas y las laterales delanteras y ningún requisito detrás del conductor. La tabla dice que todos los niveles suponen una precisión de 3 %. Como la norma federal FMVSS 205 solo exige que el vidrio de fábrica llegue a 70 %, queda poco margen para una lámina en un auto de Pensilvania: una lámina de 80 % sobre un vidrio de 85 % da ${h.pc(combinedVlt(85, 80))}. El tribunal de apelación del estado decidió en 2010 que la cifra de 70 % no forma parte de la prueba de la ley, lo que pesa en un cargo en la calle pero no en la inspección. Una infracción de la ley es una falta sumaria.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Es legal algún polarizado añadido en un auto de Pensilvania?', a: `En un auto de pasajeros de 1998 o más nuevo, muy poco. La Tabla X pide ${s.front} en todas las ventanas, y el vidrio lateral de fábrica ya deja pasar menos que toda la luz. Sobre un vidrio de 85 %, una lámina clara de 80 % da ${h.pc(combinedVlt(85, 80))}, dentro del margen de 3 puntos, mientras que una de 70 % da ${h.pc(combinedVlt(85, 70))} y no pasa. Una lámina más oscura necesita una exención.` },
        { q: '¿Las ventanas polarizadas no pasan la inspección en Pensilvania?', a: 'Pueden no pasarla. La sección 175.67 incorpora los niveles de la Tabla X a la inspección de seguridad, así que la estación revisa las ventanas de un auto de pasajeros contra el 70 % con el margen de precisión de 3 %. Un auto con certificado de exención debe mostrarlo al inspector. Una SUV o camioneta solo se revisa en el parabrisas y las laterales delanteras.' },
        { q: '¿Qué decidió el caso Commonwealth v. Brubaker sobre el polarizado?', a: 'En 2010 el Tribunal Superior decidió que la cifra de 70 % del reglamento de inspección no está escrita en la sección 4524(e)(1), cuya prueba es si una persona puede ver el interior del vehículo. Un cargo en la calle se apoya entonces en la visibilidad, mientras que la inspección se apoya en la tabla. El fallo no hace pasar la inspección a una lámina oscura.' },
        { q: '¿Cómo se obtiene una exención médica del polarizado en Pensilvania?', a: 'PennDOT concede un certificado de exención al dueño o a un miembro del hogar que maneja o viaja con regularidad, por una condición aprobada con su Junta Médica Asesora y certificada por un médico u optometrista con licencia. El reglamento limita las exenciones médicas a material incoloro que filtra los rayos UV. El certificado va en el auto y termina con la venta.' },
      ];
    },
    body: (h) => {
      const { s, oh, ny, md, de, wv } = F(h);
      return `
<h2>La Tabla X, ventana por ventana</h2>
<p>El reglamento de inspección enumera la transmisión de luz por tipo de vehículo y por ventana, y dice que todos los niveles «suponen una precisión de 3 % (±3 %)». Para los vehículos que maneja la mayoría, dice:</p>
${h.table(['Vehículo', 'Parabrisas', 'Lateral delantera', 'Lateral trasera', 'Vidrio trasero'], [
  ['Auto de pasajeros, 1998 o más nuevo', '70 %', '70 %', '70 %', '70 %'],
  ['Camioneta o vehículo de usos múltiples', '70 %', '70 %', 'sin requisito', 'sin requisito'],
], '67 Pa. Code cap. 175, Tabla X, leída en el sitio del Pennsylvania Code; los autos más antiguos siguen otras filas de la tabla.', ['l', 'r', 'r', 'r', 'r'])}
<p>Como los niveles se aplican a la ventana tal como se inspecciona, el vidrio cuenta en la práctica. Esto es lo que dan algunas láminas sobre dos lecturas de vidrio comunes, frente al piso de 67 % que permite el margen de 3 %:</p>
${h.table(['Lámina', 'Vidrio de 80 %', 'Vidrio de 88 %', 'Auto en Pensilvania'], [
  ['90 %', h.pc(combinedVlt(80, 90)), h.pc(combinedVlt(88, 90)), 'legal en los dos'],
  ['80 %', h.pc(combinedVlt(80, 80)), h.pc(combinedVlt(88, 80)), 'muy oscuro con 80 %, legal con 88 %'],
  ['70 %', h.pc(combinedVlt(80, 70)), h.pc(combinedVlt(88, 70)), 'muy oscuro'],
  ['50 %', h.pc(combinedVlt(80, 50)), h.pc(combinedVlt(88, 50)), 'muy oscuro'],
], 'Lecturas calculadas como lámina × vidrio.', ['l', 'r', 'r', 'l'])}
<h2>SUV, vans y pickups</h2>
<p>Detrás del conductor de una camioneta o un vehículo de usos múltiples, la tabla no fija requisito, así que cualquier tono pasa la inspección ahí. Un vidrio trasero tratado necesita los espejos que exige la sección 175.264. Las laterales delanteras de estos vehículos se quedan en 70 %, como las de un auto.</p>
<h2>Mudarse a Pensilvania con polarizado</h2>
<p>Un auto polarizado según las reglas de la mayoría de los demás estados no pasará la inspección de Pensilvania en las puertas delanteras, y un sedán tampoco en la parte trasera. Compare Pensilvania con el estado de donde viene:</p>
<!--tool:mini:compare|{"state":"PA","b":"OH"}-->
<h2>En la calle y en la estación de inspección</h2>
<p>Las dos capas no prueban lo mismo. En la inspección, la estación aplica la Tabla X y su margen de precisión de 3 % a cada ventana. En la calle, la sección 4524(e) pregunta si una persona puede ver el interior del vehículo, y el Tribunal Superior decidió en Commonwealth v. Brubaker (2010) que la cifra de 70 % no forma parte de esa prueba. Un auto puede no pasar la inspección con una lámina que un agente no multaría, pero lo contrario es más raro: una ventana tan oscura que oculta el interior falla en los dos casos.</p>
<h2>Exenciones</h2>
<p>PennDOT emite certificados de exención por razones médicas y para algunos vehículos antiguos. El certificado médico cubre al dueño o a un miembro del hogar, se limita a material incoloro que filtra los rayos ultravioleta, debe llevarse y mostrarse a la policía y al inspector, y queda sin efecto cuando se vende el auto.</p>
<h2>Sanción</h2>
<p>Una infracción de la sección 4524(e) es una falta sumaria. La sección leída no indica la multa, así que este sitio la muestra como ${s.fineL}.</p>
<h2>Alrededor de Pensilvania</h2>
<p>${h.sl('OH')} pide ${oh.front} en las puertas delanteras, ${h.sl('NY')} ${ny.front}, ${h.sl('MD')} ${md.front}, ${h.sl('DE')} ${de.front} y ${h.sl('WV')} ${wv.front}. Cifras leídas en los sitios oficiales de las leyes y del código de Pensilvania el ${s.checked}.</p>`;
    },
  },
});
