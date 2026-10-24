import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt } from '../../lib/engine/tint';

const C = 'IL';
const F = (h: Helpers) => ({ s: h.S(C), wi: h.S('WI'), ia: h.S('IA'), mo: h.S('MO'), ky: h.S('KY'), in_: h.S('IN') });

export default definePage({
  id: 'state-il',
  group: 'states',
  order: 110,
  state: C,
  tool: { kind: 'tint', props: { film: 50 } },
  mini: { kind: 'mini:darkest', props: { state: 'IL', glass: 80 } },
  related: ['home', 'state-oh', 'state-tx', 'by-state', 'ticket', 'medical'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'illinois-tint-laws',
    nav: 'Illinois',
    card: 'Illinois: the front doors depend on the rear, 35% with a 5-point margin or 50% film.',
    title: 'Illinois Tint Laws 2026: Front Depends on Your Rear Windows',
    description: 'Illinois tint laws: 35% on the front side windows if no rear window is below 35%, 50% if none is below 30%, any rear shade with two mirrors, a $50 to $500 fine.',
    h1: 'Illinois tint laws: the rear windows decide what the front may carry',
    intro: 'Illinois ties the front doors to the rear windows. Enter the film on each and the glass: the calculator picks the front limit that the rear allows and checks each window.',
    resume: (h) => {
      const { s } = F(h);
      return `Illinois is the one state in this site's data where the darkness of the rear windows sets the limit for the front. Under ${s.law}, the side windows beside the driver may carry film with ${s.front} light transmittance, with a 5% variance, only if no window behind the driver is below 35%. If the rear windows go down to 30% but no lower, the front doors may carry 50% film. If the rear glass came tinted from the factory, the front limit is also 50%. If any rear window is darker than 30%, the front side windows may not be tinted at all. The rear side windows and the back window have no number of their own, but any car with treated glass behind the driver needs a side mirror on each side. On the windshield, nonreflective film may cover the top 6 inches. Because the text does not say whether the glass counts, the calculator also shows the combined reading: a 35% film on 80% glass reads ${h.pc(combinedVlt(80, 35))}. A first violation is a petty offense with a fine of $50 to ${s.fineL}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Can I have limo tint on the back of an Illinois car?', a: 'Yes, but it costs you the front. Section 12-503 sets no number for the rear windows, so 5% film is legal there with a side mirror on each side. Once any rear window is darker than 30%, though, the law no longer allows any tint on the front side windows. Most owners choose 35% all around to keep the front tinted.' },
        { q: 'What is the 5% variance in the Illinois tint law?', a: `Subsection (a-5) allows the ${s.front} front film a 5% variance, so an officer's reading down to 30% is accepted when the rear windows are at 35% or lighter. The variance is written for that 35% case. The statute does not say whether the reading includes the glass, which is why the calculator shows both the film and the combined figure.` },
        { q: 'How much is an Illinois tint ticket?', a: `A first violation of section 12-503 is a petty offense with a fine of $50 to ${s.fineL}. A second or later one is a Class C misdemeanor with a fine of $100 to ${s.fineL}. In both cases the court orders the windows brought into compliance, so the film has to come off as well.` },
        { q: 'How does the Illinois medical tint exemption work?', a: 'The owner, or a household member who is transported, needs a certified statement from an Illinois-licensed physician naming a condition that requires shielding from the sun. The statement stays in the vehicle, is renewed every 4 years and a copy goes to the Secretary of State. The vehicle must carry distinctive plates or plate stickers.' },
      ];
    },
    body: (h) => {
      const { s, wi, ia, mo, ky, in_ } = F(h);
      return `
<h2>The front limit, step by step</h2>
<p>Section 12-503(a-5) does not give one figure for the front side windows. It gives a ladder, and the rear windows decide which rung applies:</p>
${h.table(['Rear windows', 'Front side windows may carry', 'Source'], [
  ['none below 35%', '35% film, with a 5% variance', '12-503(a-5)'],
  ['none below 30%', '50% film', '12-503(a-5)'],
  ['factory-tinted rear glass', '50% film', '12-503(a-5)'],
  ['any window below 30%', 'no tint', '12-503(a-5)'],
], 'The ladder of 625 ILCS 5/12-503(a-5); the calculator applies it automatically when you enter the rear films.', ['l', 'l', 'l'])}
<p>The result surprises many owners: a 20% rear with a 50% front is not legal, because the rear is below 30% and the front must then stay clear. A 30% rear with a 50% front is legal, and so is 35% all around.</p>
<h2>Does the glass count?</h2>
<p>The Illinois text does not say how the light is measured. Read literally, it speaks of film with a given light transmittance. A meter at the roadside reads the window as it is, film and glass together:</p>
${h.table(['Film', 'Combined on 75% glass', 'Combined on 85% glass'], [
  ['50%', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50))],
  ['35%', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35))],
  ['30%', h.pc(combinedVlt(75, 30)), h.pc(combinedVlt(85, 30))],
], 'Readings computed as film × glass.', ['l', 'r', 'r'])}
<p>The calculator above marks a 35% film as legal on the film itself and shows the combined figure beside it, so you can see how far from the 30% floor of the variance a meter would place you. Here is the darkest film for each window type on your glass:</p>
<!--tool:mini:darkest|{"state":"IL","glass":80}-->
<h2>Mirrors, windshield and reflection</h2>
<p>Any vehicle with a treated window behind the driver's seat must have a side mirror on each side. On the windshield, only nonreflective tinted film on the uppermost 6 inches is allowed, and front film must be nonreflective too.</p>
<h2>Medical exemption</h2>
<p>A certified statement from an Illinois-licensed physician exempts the vehicle from the windshield and front side window rules. The statute lists examples such as lupus, porokeratosis, light sensitivity after a brain injury and albinism. The statement is renewed every 4 years, a copy goes to the Secretary of State and the vehicle needs distinctive plates or stickers.</p>
<h2>Penalty and the court order</h2>
<p>A first violation is a petty offense, punished by a fine of $50 to ${s.fineL}. A second or later violation becomes a Class C misdemeanor, with a fine of $100 to ${s.fineL}. In both cases the court orders the windows brought into compliance, so paying the fine does not end the matter: the film has to come off or be replaced, and a car bought from another state with darker front film has to be brought to the Illinois ladder before it is driven here.</p>
<h2>Around Illinois</h2>
<p>${h.sl('WI')} asks for ${wi.front} on the front doors and ${wi.back} behind, ${h.sl('IA')} ${ia.front} on the front, ${h.sl('MO')} ${mo.front}, ${h.sl('KY')} ${ky.front} and ${h.sl('IN')} ${in_.front}. Figures read on ${s.checked}, from an archived copy of the official Illinois Compiled Statutes page because ilga.gov was not reachable that day.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-illinois',
    nav: 'Illinois',
    card: 'Illinois: las puertas delanteras dependen de la parte trasera, 35 % con 5 puntos de margen o lámina de 50 %.',
    title: 'Polarizado en Illinois 2026: el frente depende de atrás',
    description: 'Polarizado en Illinois: 35 % en las laterales delanteras si ninguna trasera baja de 35 %, 50 % si ninguna baja de 30 % y atrás libre con dos espejos laterales.',
    h1: 'Polarizado en Illinois: las ventanas traseras deciden lo que lleva el frente',
    intro: 'Illinois une las puertas delanteras a las ventanas traseras. Ponga la lámina de cada una y el vidrio: la calculadora elige el límite delantero que permite la parte trasera y revisa cada ventana.',
    resume: (h) => {
      const { s } = F(h);
      return `Illinois es el único estado de los datos de este sitio en el que la oscuridad de las ventanas traseras fija el límite de las delanteras. Según ${s.law}, las laterales junto al conductor pueden llevar una lámina con ${s.front} de transmisión de luz, con una variación de 5 %, solo si ninguna ventana detrás del conductor baja de 35 %. Si las traseras bajan hasta 30 % pero no más, las puertas delanteras pueden llevar una lámina de 50 %. Si el vidrio trasero vino polarizado de fábrica, el límite delantero también es 50 %. Si alguna ventana trasera es más oscura que 30 %, las laterales delanteras no pueden llevar ningún polarizado. Las laterales traseras y el vidrio trasero no tienen cifra propia, pero todo auto con vidrio tratado detrás del conductor necesita un espejo lateral a cada lado. En el parabrisas, una lámina no reflectante puede cubrir las 6 pulgadas superiores. Como el texto no dice si el vidrio cuenta, la calculadora muestra también la lectura combinada: una lámina de 35 % sobre un vidrio de 80 % da ${h.pc(combinedVlt(80, 35))}. Una primera infracción es una falta menor con una multa de 50 dólares a ${s.fineL}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Puedo llevar polarizado muy oscuro atrás en un auto de Illinois?', a: 'Sí, pero le cuesta el frente. La sección 12-503 no fija cifra para las ventanas traseras, así que una lámina de 5 % es legal ahí con un espejo lateral a cada lado. Pero en cuanto una ventana trasera es más oscura que 30 %, la ley ya no permite ningún polarizado en las laterales delanteras. Muchos dueños eligen 35 % en todo el auto para conservar el frente polarizado.' },
        { q: '¿Qué es la variación de 5 % de la ley de polarizado de Illinois?', a: `La subsección (a-5) da a la lámina delantera de ${s.front} una variación de 5 %, así que se acepta una lectura del agente de hasta 30 % cuando las traseras están en 35 % o más claras. La variación está escrita para ese caso de 35 %. La ley no dice si la lectura incluye el vidrio, por eso la calculadora muestra la lámina y la cifra combinada.` },
        { q: '¿Cuánto cuesta una multa por polarizado en Illinois?', a: `Una primera infracción de la sección 12-503 es una falta menor con una multa de 50 dólares a ${s.fineL}. Una segunda o posterior es un delito menor de clase C con una multa de 100 dólares a ${s.fineL}. En los dos casos el tribunal ordena poner las ventanas en regla, así que además hay que quitar la lámina.` },
        { q: '¿Cómo funciona la exención médica del polarizado en Illinois?', a: 'El dueño, o un miembro del hogar que viaja en el auto, necesita una declaración certificada de un médico con licencia en Illinois que indique una condición que exige protegerse del sol. La declaración va en el vehículo, se renueva cada 4 años y se envía una copia a la Secretaría de Estado. El vehículo debe llevar placas o calcomanías distintivas.' },
      ];
    },
    body: (h) => {
      const { s, wi, ia, mo, ky, in_ } = F(h);
      return `
<h2>El límite delantero, paso a paso</h2>
<p>La sección 12-503(a-5) no da una sola cifra para las laterales delanteras. Da una escala, y las ventanas traseras deciden qué escalón se aplica:</p>
${h.table(['Ventanas traseras', 'Las laterales delanteras pueden llevar', 'Fuente'], [
  ['ninguna por debajo de 35 %', 'lámina de 35 %, con variación de 5 %', '12-503(a-5)'],
  ['ninguna por debajo de 30 %', 'lámina de 50 %', '12-503(a-5)'],
  ['vidrio trasero polarizado de fábrica', 'lámina de 50 %', '12-503(a-5)'],
  ['alguna por debajo de 30 %', 'ningún polarizado', '12-503(a-5)'],
], 'La escala de 625 ILCS 5/12-503(a-5); la calculadora la aplica sola cuando usted pone las láminas traseras.', ['l', 'l', 'l'])}
<p>El resultado sorprende a muchos dueños: una parte trasera de 20 % con un frente de 50 % no es legal, porque la trasera está por debajo de 30 % y el frente debe quedar sin lámina. Una trasera de 30 % con un frente de 50 % es legal, y también lo es 35 % en todo el auto.</p>
<h2>¿Cuenta el vidrio?</h2>
<p>El texto de Illinois no dice cómo se mide la luz. Leído al pie de la letra, habla de una lámina con cierta transmisión de luz. Un medidor en un control lee la ventana tal como está, lámina y vidrio juntos:</p>
${h.table(['Lámina', 'Combinada con vidrio de 75 %', 'Combinada con vidrio de 85 %'], [
  ['50 %', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50))],
  ['35 %', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35))],
  ['30 %', h.pc(combinedVlt(75, 30)), h.pc(combinedVlt(85, 30))],
], 'Lecturas calculadas como lámina × vidrio.', ['l', 'r', 'r'])}
<p>La calculadora de arriba marca una lámina de 35 % como legal por la lámina misma y muestra la cifra combinada al lado, para que vea a qué distancia del piso de 30 % de la variación lo pondría un medidor. Esta es la lámina más oscura para cada tipo de ventana sobre su vidrio:</p>
<!--tool:mini:darkest|{"state":"IL","glass":80}-->
<h2>Espejos, parabrisas y reflejo</h2>
<p>Todo vehículo con una ventana tratada detrás del asiento del conductor debe tener un espejo lateral a cada lado. En el parabrisas solo se permite una lámina no reflectante en las 6 pulgadas superiores, y la lámina delantera también debe ser no reflectante.</p>
<h2>Exención médica</h2>
<p>Una declaración certificada de un médico con licencia en Illinois exime al vehículo de las reglas del parabrisas y de las laterales delanteras. La ley da ejemplos como el lupus, la poroqueratosis, la sensibilidad a la luz tras una lesión cerebral y el albinismo. La declaración se renueva cada 4 años, se envía una copia a la Secretaría de Estado y el vehículo necesita placas o calcomanías distintivas.</p>
<h2>Sanción y orden del tribunal</h2>
<p>Una primera infracción es una falta menor, castigada con una multa de 50 dólares a ${s.fineL}. Una segunda o posterior pasa a ser un delito menor de clase C, con una multa de 100 dólares a ${s.fineL}. En los dos casos el tribunal ordena poner las ventanas en regla, así que pagar la multa no cierra el asunto: hay que quitar o cambiar la lámina, y un auto comprado en otro estado con una lámina delantera más oscura debe ajustarse a la escala de Illinois antes de circular aquí.</p>
<h2>Alrededor de Illinois</h2>
<p>${h.sl('WI')} pide ${wi.front} en las puertas delanteras y ${wi.back} atrás, ${h.sl('IA')} ${ia.front} adelante, ${h.sl('MO')} ${mo.front}, ${h.sl('KY')} ${ky.front} e ${h.sl('IN')} ${in_.front}. Cifras leídas el ${s.checked}, en una copia archivada de la página oficial de los Estatutos Compilados de Illinois porque ilga.gov no respondía ese día.</p>`;
    },
  },
});
