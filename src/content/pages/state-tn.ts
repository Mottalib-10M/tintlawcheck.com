import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt } from '../../lib/engine/tint';

const C = 'TN';
const F = (h: Helpers) => ({ s: h.S(C), ky: h.S('KY'), al: h.S('AL'), ms: h.S('MS'), ar: h.S('AR'), mo: h.S('MO') });

export default definePage({
  id: 'state-tn',
  group: 'states',
  order: 108,
  state: C,
  tool: { kind: 'tint', props: { film: 35 } },
  mini: { kind: 'mini:darkness', props: { dark: 65 } },
  related: ['home', 'state-ga', 'state-nc', 'state-va', 'percentage', 'ticket'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'tennessee-tint-laws',
    nav: 'Tennessee',
    card: 'Tennessee: no material below 35% on any window of a car, front doors never exempt.',
    title: 'Tennessee Tint Laws 2026: 35% Film on Every Window of a Car',
    description: 'Tennessee tint laws: no material below 35% visible light transmittance on any window of a car, a 70% windshield, front doors never exempt, installer label.',
    h1: 'Tennessee tint laws: 35% on every window, front doors included',
    intro: 'Tennessee writes its limit on the material. Enter the film and the glass: the calculator checks the film against 35% and also shows the combined reading an officer\'s meter may give.',
    resume: (h) => {
      const { s } = F(h);
      return `Tennessee sets one floor for the whole car and attaches it to the material. Under ${s.law}, no one may operate a motor vehicle with any window made of, covered by or treated with material that has a visible light transmittance of less than ${s.front}, and nothing other than the manufacturer's shade band may bring the windshield below 70%. The rule covers the front side windows, the rear side windows and the back window of a car. For trucks, vans and SUVs, windows that federal rules allow to be darker, such as factory privacy glass behind the driver, are exempt, and the statute says the front door windows of any vehicle are never exempt. Officers check by a field comparison test set by the Safety Commissioner, and refusing the test is itself an offense. Professional installers must place a compliance label on the driver's window and give a signed receipt. Because the law does not say whether the glass counts, a 35% film on 80% glass, which reads ${h.pc(combinedVlt(80, 35))} on a meter, is the case to watch. A violation is a Class C misdemeanor.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What is the darkest legal tint in Tennessee?', a: `A material with at least ${s.front} visible light transmittance, on every window of a car. Section 55-9-107 speaks of the material, not of the window with its glass, and gives no tolerance. Because a meter reads film and glass together, a 35% film can show about ${h.pc(combinedVlt(80, 35))} at the roadside, so keep the receipt and label that prove the film's own rating.` },
        { q: 'What label does a Tennessee tint shop have to put on the car?', a: 'A professional installer must place a label on the lower right corner of the driver\'s window with the business name and the words "Complies with Tennessee Code Annotated, § 55-9-107", and give the owner a signed receipt to keep with the registration. The statute puts the burden of proving compliance on the owner, so both papers matter.' },
        { q: 'Are SUV privacy windows legal in Tennessee?', a: 'Factory privacy glass behind the driver of a truck, van or SUV is exempt where federal rules allow the model to have darker windows there, under section 55-9-107(a)(6). Whether aftermarket film behind the driver of an SUV is covered by the same exemption is not settled by the text. The front door windows are never exempt.' },
        { q: 'How do I get a medical tint exemption in Tennessee?', a: 'Send a physician\'s statement to the Commissioner of Safety. The Department\'s medical review board recommends whether to grant the exemption and the degree of tint, and the Commissioner then issues a certificate or decal to display in the vehicle. A refusal can be appealed under the state\'s administrative procedures act.' },
      ];
    },
    body: (h) => {
      const { s, ky, al, ms, ar, mo } = F(h);
      return `
<h2>The material, not the window</h2>
<p>Most states measure the window as tinted, glass included. Tennessee's text targets "any material that has a visible light transmittance of less than thirty-five percent". Read literally, a film rated 35% is legal whatever the glass beneath it. The statute does not settle the question, and officers check with a field comparison test whose procedure is set by the Safety Commissioner, not by the statute. The calculator above therefore shows both figures: the film against 35%, and the combined reading a meter would give.</p>
${h.table(['Film rating', 'Combined on 75% glass', 'Combined on 85% glass', 'Film against 35%'], [
  ['50%', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50)), 'legal'],
  ['35%', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35)), 'legal as a material'],
  ['30%', h.pc(combinedVlt(75, 30)), h.pc(combinedVlt(85, 30)), 'too dark'],
  ['20%', h.pc(combinedVlt(75, 20)), h.pc(combinedVlt(85, 20)), 'too dark'],
], 'Combined readings computed as film × glass; the 35% material rule comes from Tenn. Code Ann. 55-9-107(a)(1).', ['l', 'r', 'r', 'l'])}
<h2>Darkness versus transmission</h2>
<p>Shops often sell film by darkness ("65% tint") when the law speaks of the light that passes. A 65% dark film lets through 35%. Convert any advertised figure here before you buy:</p>
<!--tool:mini:darkness|{"dark":65}-->
<h2>Cars, SUVs and the front doors</h2>
<p>On a car, every window follows the same 35% rule. On a truck, van or SUV, windows that federal rules allow to be darker are exempt, which covers factory privacy glass behind the driver. The statute adds that this exemption may never be read to cover the front door windows of any vehicle, so the front doors stay at 35% everywhere.</p>
<h2>The windshield</h2>
<p>Tennessee has no inch rule for the windshield. Nothing may bring it below 70%, except the shade band the manufacturer installed. An aftermarket strip that goes darker than 70% is therefore outside the rule, even at the very top.</p>
<h2>Label, receipt and proof</h2>
<p>Professional installers must put a compliance label on the lower right corner of the driver's window and hand over a signed receipt to keep with the registration documents. The owner bears the burden of proving the tint complies, so these two papers are the owner's evidence at the roadside and in court.</p>
<h2>Penalty</h2>
<p>Violating the section, or refusing the field comparison test, is a Class C misdemeanor, and officers may stop a vehicle when they reasonably believe the tint violates it. The section does not write a fine amount, so this site shows the fine as ${s.fineL}.</p>
<h2>Around Tennessee</h2>
<p>${h.sl('KY')} asks for ${ky.front} on the front doors and ${ky.back} behind, ${h.sl('AL')} ${al.front}, ${h.sl('MS')} ${ms.front}, ${h.sl('AR')} ${ar.front} and ${h.sl('MO')} ${mo.front}. A Tennessee car with 35% film passes on the front in Alabama, Mississippi and Arkansas; Missouri and Kentucky use the same 35% but count the glass, so the same film can read too dark there. The text was read on ${s.checked} in a reproduction of the 2023 code, whose history lists the 2024 amendment (Acts ch. 602, effective March 27, 2024), because the official code is published only through a commercial viewer.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-tennessee',
    nav: 'Tennessee',
    card: 'Tennessee: ningún material por debajo de 35 % en ninguna ventana de un auto; puertas delanteras sin excepción.',
    title: 'Polarizado en Tennessee 2026: lámina de 35 % en todo el auto',
    description: 'Polarizado en Tennessee: ningún material por debajo de 35 % de transmisión en ninguna ventana de un auto, parabrisas al 70 % y puertas delanteras sin excepción.',
    h1: 'Polarizado en Tennessee: 35 % en todas las ventanas, puertas delanteras incluidas',
    intro: 'Tennessee escribe su límite sobre el material. Ponga la lámina y el vidrio: la calculadora compara la lámina con el 35 % y muestra también la lectura combinada que puede dar el medidor de un agente.',
    resume: (h) => {
      const { s } = F(h);
      return `Tennessee fija un solo piso para todo el auto y lo aplica al material. Según ${s.law}, nadie puede manejar un vehículo con una ventana hecha, cubierta o tratada con un material cuya transmisión de luz visible sea inferior al ${s.front}, y nada salvo la franja de fábrica puede bajar el parabrisas por debajo de 70 %. La regla cubre las laterales delanteras, las laterales traseras y el vidrio trasero de un auto. En camionetas, vans y SUV, las ventanas que las normas federales permiten más oscuras, como el vidrio privado de fábrica detrás del conductor, quedan exentas, y la ley dice que las ventanas de las puertas delanteras de cualquier vehículo nunca lo están. Los agentes revisan con una prueba de comparación en el lugar que fija el Comisionado de Seguridad, y negarse a ella ya es una infracción. Los instaladores profesionales deben poner una etiqueta de conformidad en la ventana del conductor y entregar un recibo firmado. Como la ley no dice si el vidrio cuenta, una lámina de 35 % sobre un vidrio de 80 %, que da ${h.pc(combinedVlt(80, 35))} en un medidor, es el caso a vigilar. Una infracción es un delito menor de clase C.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuál es el polarizado más oscuro legal en Tennessee?', a: `Un material con al menos ${s.front} de transmisión de luz visible, en todas las ventanas de un auto. La sección 55-9-107 habla del material, no de la ventana con su vidrio, y no da margen de tolerancia. Como un medidor lee lámina y vidrio juntos, una lámina de 35 % puede marcar unos ${h.pc(combinedVlt(80, 35))} en un control, así que guarde el recibo y la etiqueta que prueban la clasificación de la lámina.` },
        { q: '¿Qué etiqueta debe poner un taller de polarizado en Tennessee?', a: 'Un instalador profesional debe poner una etiqueta en la esquina inferior derecha de la ventana del conductor con el nombre del negocio y la frase «Complies with Tennessee Code Annotated, § 55-9-107», y dar al dueño un recibo firmado para guardar con el registro. La ley pone en el dueño la carga de probar la conformidad, así que los dos papeles cuentan.' },
        { q: '¿Son legales las ventanas privadas de una SUV en Tennessee?', a: 'El vidrio privado de fábrica detrás del conductor de una camioneta, van o SUV queda exento cuando las normas federales permiten al modelo tener ahí ventanas más oscuras, según la sección 55-9-107(a)(6). El texto no resuelve si una lámina añadida detrás del conductor de una SUV entra en la misma exención. Las ventanas de las puertas delanteras nunca quedan exentas.' },
        { q: '¿Cómo se obtiene una exención médica del polarizado en Tennessee?', a: 'Envíe una declaración de su médico al Comisionado de Seguridad. La junta de revisión médica del Departamento recomienda si se concede la exención y el grado de polarizado, y el Comisionado emite luego un certificado o una calcomanía para mostrar en el vehículo. Una negativa puede apelarse según la ley estatal de procedimientos administrativos.' },
      ];
    },
    body: (h) => {
      const { s, ky, al, ms, ar, mo } = F(h);
      return `
<h2>El material, no la ventana</h2>
<p>La mayoría de los estados mide la ventana ya polarizada, con el vidrio incluido. El texto de Tennessee apunta a «cualquier material con una transmisión de luz visible inferior al treinta y cinco por ciento». Leído al pie de la letra, una lámina clasificada en 35 % es legal sea cual sea el vidrio debajo. La ley no zanja la cuestión, y los agentes revisan con una prueba de comparación en el lugar cuyo procedimiento fija el Comisionado de Seguridad, no la ley. Por eso la calculadora de arriba muestra las dos cifras: la lámina frente al 35 %, y la lectura combinada que daría un medidor.</p>
${h.table(['Clasificación de la lámina', 'Combinada con vidrio de 75 %', 'Combinada con vidrio de 85 %', 'Lámina frente al 35 %'], [
  ['50 %', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50)), 'legal'],
  ['35 %', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35)), 'legal como material'],
  ['30 %', h.pc(combinedVlt(75, 30)), h.pc(combinedVlt(85, 30)), 'muy oscuro'],
  ['20 %', h.pc(combinedVlt(75, 20)), h.pc(combinedVlt(85, 20)), 'muy oscuro'],
], 'Lecturas combinadas calculadas como lámina × vidrio; la regla de 35 % para el material viene de Tenn. Code Ann. 55-9-107(a)(1).', ['l', 'r', 'r', 'l'])}
<h2>Oscuridad frente a transmisión</h2>
<p>Los talleres suelen vender la lámina por su oscuridad («polarizado de 65 %») cuando la ley habla de la luz que pasa. Una lámina 65 % oscura deja pasar 35 %. Convierta aquí cualquier cifra anunciada antes de comprar:</p>
<!--tool:mini:darkness|{"dark":65}-->
<h2>Autos, SUV y puertas delanteras</h2>
<p>En un auto, todas las ventanas siguen la misma regla del 35 %. En una camioneta, van o SUV, las ventanas que las normas federales permiten más oscuras quedan exentas, lo que cubre el vidrio privado de fábrica detrás del conductor. La ley añade que esta exención nunca puede leerse como si cubriera las ventanas de las puertas delanteras de un vehículo, así que las puertas delanteras se quedan en 35 % en todos los casos.</p>
<h2>El parabrisas</h2>
<p>Tennessee no tiene regla en pulgadas para el parabrisas. Nada puede bajarlo de 70 %, salvo la franja que instaló el fabricante. Una franja añadida más oscura que 70 % queda, por tanto, fuera de la regla, incluso en la parte más alta.</p>
<h2>Etiqueta, recibo y prueba</h2>
<p>Los instaladores profesionales deben poner una etiqueta de conformidad en la esquina inferior derecha de la ventana del conductor y entregar un recibo firmado para guardar con los documentos del registro. El dueño carga con la prueba de que el polarizado es conforme, así que esos dos papeles son su evidencia en un control y ante el tribunal.</p>
<h2>Sanción</h2>
<p>Violar la sección, o negarse a la prueba de comparación, es un delito menor de clase C, y los agentes pueden detener un vehículo cuando creen razonablemente que el polarizado la viola. La sección no fija un monto de multa, así que este sitio la muestra como ${s.fineL}.</p>
<h2>Alrededor de Tennessee</h2>
<p>${h.sl('KY')} pide ${ky.front} en las puertas delanteras y ${ky.back} atrás, ${h.sl('AL')} ${al.front}, ${h.sl('MS')} ${ms.front}, ${h.sl('AR')} ${ar.front} y ${h.sl('MO')} ${mo.front}. Un auto de Tennessee con lámina de 35 % pasa adelante en Alabama, Misisipi y Arkansas; Misuri y Kentucky usan el mismo 35 % pero cuentan el vidrio, así que la misma lámina puede resultar muy oscura ahí. El texto se leyó el ${s.checked} en una reproducción del código de 2023, cuyo historial menciona la reforma de 2024 (Acts cap. 602, vigente desde el 27 de marzo de 2024), porque el código oficial solo se publica a través de un visor comercial.</p>`;
    },
  },
});
