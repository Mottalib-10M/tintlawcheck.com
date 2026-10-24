import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt, darkestLegalFilm } from '../../lib/engine/tint';

const C = 'AZ';
const F = (h: Helpers) => ({ s: h.S(C), nv: h.S('NV'), ut: h.S('UT'), nm: h.S('NM'), co: h.S('CO') });

export default definePage({
  id: 'state-az',
  group: 'states',
  order: 107,
  state: C,
  tool: { kind: 'tint', props: { film: 45 } },
  mini: { kind: 'mini:ticket', props: { state: 'AZ' } },
  related: ['home', 'state-ca', 'state-tx', 'windshield', 'ticket', 'medical'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'arizona-tint-laws',
    nav: 'Arizona',
    card: 'Arizona: 33% plus or minus 3 on the front doors, any shade behind with two mirrors, $250 cap.',
    title: 'Arizona Tint Laws 2026: 33% on the Front, Any Shade Behind',
    description: 'Arizona tint laws: 33% light transmission, plus or minus 3, on the front side windows, any shade behind the driver with two mirrors, and a fine capped at $250.',
    h1: 'Arizona tint laws: 33% on the front doors, the rest is yours',
    intro: 'Arizona measures light transmission with the glass and allows 3 points either way. Enter the film and the glass: the calculator checks the front doors and shows the rear as free.',
    resume: (h) => {
      const { s } = F(h);
      return `Arizona regulates two things on the front doors: light and reflection. Under ${s.law}, the side windows to the immediate right and left of the driver must let through at least ${s.front} of the light, plus or minus 3%, and may not have a luminous reflectance above 35%, plus or minus 3%. The light transmission figure includes the glass, so a 35% film reads ${h.pc(combinedVlt(80, 35))} on 80% factory glass and fails, while a 45% film reads ${h.pc(combinedVlt(80, 45))} and passes. Behind the driver there is no light limit: the rear side windows can take any shade, and the back window too, provided the car has outside mirrors on both sides showing at least 200 feet to the rear. The reflectance limit still applies there. On the windshield, transparent material may cover the top as long as its bottom edge stays at least 29 inches above the undepressed driver's seat, and it may not be red or amber. A violation is a civil traffic violation with a penalty of up to ${s.fineL} plus surcharges.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What is the darkest legal front tint in Arizona?', a: `The front side windows must read at least ${s.front}, plus or minus 3, with the glass, so the meter floor is 30%. On 80% factory glass that allows a film of about ${h.pc(darkestLegalFilm(30, 80) as number)} at the very edge, or ${h.pc(darkestLegalFilm(33, 80) as number)} to stay on the limit itself. A 35% film is too dark on almost every car.` },
        { q: 'How is the Arizona windshield strip measured?', a: 'From the seat, not from the top of the glass. The bottom edge of the strip must be at least 29 inches above the undepressed driver\'s seat, measured 5 inches in front of the backrest with the seat in its rearmost and lowest position. A tall windshield can therefore take a deeper strip than a short one.' },
        { q: 'Does Arizona issue medical tint exemptions?', a: 'Yes. The Department of Transportation may grant an exemption on application by a person who must be shielded from the sun for medical reasons, supported by a written attestation from a physician licensed in Arizona. It covers the person\'s own vehicle or one in which the person is a habitual passenger, for the side and rear windows.' },
        { q: 'Is an Arizona tint ticket a criminal charge?', a: `No. Section 28-959.01 sits in the chapter of civil traffic violations, and section 28-1598 caps the civil penalty at ${s.fineL}, plus the surcharges added by state law. It does not lead to a criminal record, but the fine and surcharges are due unless the court reduces them.` },
      ];
    },
    body: (h) => {
      const { s, nv, ut, nm, co } = F(h);
      return `
<h2>Light and reflection, both on the front doors</h2>
<p>Many buyers in Arizona ask for heat control rather than darkness, and the law gives two limits for that. The light transmission must stay at ${s.front} or more, plus or minus 3, with the glass. The reflectance may not pass 35%, plus or minus 3, which rules out strong mirror finishes but leaves room for ceramic and lightly reflective films. Here is what common films give on two glass readings:</p>
${h.table(['Film', 'On 75% glass', 'On 85% glass', 'Arizona front doors'], [
  ['50%', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50)), 'legal'],
  ['45%', h.pc(combinedVlt(75, 45)), h.pc(combinedVlt(85, 45)), 'legal'],
  ['40%', h.pc(combinedVlt(75, 40)), h.pc(combinedVlt(85, 40)), 'within the margin on 75%, legal on 85%'],
  ['35%', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35)), 'too dark on 75%, within the margin on 85%'],
  ['20%', h.pc(combinedVlt(75, 20)), h.pc(combinedVlt(85, 20)), 'too dark'],
], 'Readings computed as film × glass; the 33% limit and its 3-point margin come from A.R.S. 28-959.01(A)(1).', ['l', 'r', 'r', 'l'])}
<h2>Behind the driver</h2>
<p>The rear side windows have no light limit, only the reflectance cap. The back window is exempt when the vehicle has outside mirrors on both sides giving a view of at least 200 feet to the rear, which nearly every current car has. Arizona does not split cars and SUVs: the same rule applies to every vehicle.</p>
<h2>Measure before you choose a film</h2>
<p>Two cars of the same model can carry glass with different readings, and a replaced door glass may not match the others. Ask the shop to read each bare front window before it cuts the film, then multiply: the calculator above does it for you. If the reading is not available, entering 70% gives the cautious answer, because it is the federal minimum for new glass.</p>
<h2>What sellers must tell you</h2>
<p>Film makers must certify their products to the director, and sellers and installers must state in a conspicuous way that installing film on the front side windows may be illegal in some states. There is no Arizona sticker to put on the glass, so keep the invoice with the film name and percentage.</p>
<h2>Fine and how it is handled</h2>
<p>A tint violation is a civil traffic violation. The penalty is capped at ${s.fineL} by section 28-1598, and state law adds surcharges to that amount. The tool below shows the cap in Arizona and lets you compare it with any other state:</p>
<!--tool:mini:ticket|{"state":"AZ"}-->
<h2>Medical exemption</h2>
<p>The Department of Transportation may exempt a person who must be shielded from the sun, on a physician's written attestation. The exemption covers the side and rear windows of the person's vehicle or of a vehicle in which the person often rides. Keep the document in the car.</p>
<h2>Around Arizona</h2>
<p>${h.sl('CA')} allows only clear film on the front doors. ${h.sl('NV')} asks for ${nv.front} there, ${h.sl('UT')} for ${ut.front}, ${h.sl('NM')} for ${nm.front} and ${h.sl('CO')} for ${co.front}. An Arizona car at the 33% line is too dark on the front for California, Nevada and Utah, and passes in New Mexico and Colorado. Figures read on the Arizona Legislature site on ${s.checked}.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-arizona',
    nav: 'Arizona',
    card: 'Arizona: 33 % con 3 puntos de margen en las puertas delanteras, atrás libre con dos espejos.',
    title: 'Polarizado en Arizona 2026: 33 % adelante y libre atrás',
    description: 'Polarizado en Arizona: 33 % de transmisión, con 3 puntos de margen, en las laterales delanteras, cualquier tono atrás con espejos y multa de hasta 250 dólares.',
    h1: 'Polarizado en Arizona: 33 % en las puertas delanteras, el resto es suyo',
    intro: 'Arizona mide la transmisión de luz con el vidrio y admite 3 puntos de diferencia. Ponga la lámina y el vidrio: la calculadora revisa las puertas delanteras y muestra la parte trasera libre.',
    resume: (h) => {
      const { s } = F(h);
      return `Arizona regula dos cosas en las puertas delanteras: la luz y el reflejo. Según ${s.law}, las ventanas laterales a la derecha y a la izquierda del conductor deben dejar pasar al menos el ${s.front} de la luz, con 3 % de margen, y no pueden tener una reflectancia luminosa de más de 35 %, con 3 % de margen. La cifra de transmisión incluye el vidrio, así que una lámina de 35 % da ${h.pc(combinedVlt(80, 35))} sobre un vidrio de fábrica de 80 % y no pasa, mientras que una de 45 % da ${h.pc(combinedVlt(80, 45))} y pasa. Detrás del conductor no hay límite de luz: las laterales traseras admiten cualquier tono, y el vidrio trasero también, siempre que el auto tenga espejos exteriores a ambos lados con una vista de al menos 200 pies hacia atrás. El límite de reflectancia sigue valiendo ahí. En el parabrisas, un material transparente puede cubrir la parte alta si su borde inferior queda al menos a 29 pulgadas por encima del asiento del conductor sin hundir, y no puede ser rojo ni ámbar. Una infracción es una falta civil de tránsito con una sanción de hasta ${s.fineL} más recargos.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuál es el polarizado delantero más oscuro legal en Arizona?', a: `Las laterales delanteras deben medir al menos ${s.front}, con 3 de margen, contando el vidrio, así que el piso del medidor es 30 %. Sobre un vidrio de fábrica de 80 %, eso permite una lámina de unos ${h.pc(darkestLegalFilm(30, 80) as number)} al borde, o ${h.pc(darkestLegalFilm(33, 80) as number)} para quedarse en el límite mismo. Una lámina de 35 % es muy oscura en casi todos los autos.` },
        { q: '¿Cómo se mide la franja del parabrisas en Arizona?', a: 'Desde el asiento, no desde el borde del vidrio. El borde inferior de la franja debe quedar al menos a 29 pulgadas por encima del asiento del conductor sin hundir, medido 5 pulgadas delante del respaldo con el asiento en su posición más atrasada y más baja. Un parabrisas alto admite así una franja más honda que uno bajo.' },
        { q: '¿Arizona concede exenciones médicas de polarizado?', a: 'Sí. El Departamento de Transporte puede conceder una exención a quien la solicite por tener que protegerse del sol por razones médicas, con una declaración escrita de un médico con licencia en Arizona. Cubre el vehículo propio de la persona o uno en el que viaja con frecuencia, para las ventanas laterales y trasera.' },
        { q: '¿Una multa por polarizado en Arizona es un cargo penal?', a: `No. La sección 28-959.01 está en el capítulo de las faltas civiles de tránsito, y la sección 28-1598 limita la sanción civil a ${s.fineL}, más los recargos que añade la ley estatal. No deja antecedentes penales, pero la multa y los recargos se deben pagar salvo que el tribunal los reduzca.` },
      ];
    },
    body: (h) => {
      const { s, nv, ut, nm, co } = F(h);
      return `
<h2>Luz y reflejo, los dos en las puertas delanteras</h2>
<p>Muchos compradores en Arizona buscan controlar el calor más que oscurecer, y la ley da dos límites para eso. La transmisión de luz debe quedar en ${s.front} o más, con 3 de margen, contando el vidrio. La reflectancia no puede pasar de 35 %, con 3 de margen, lo que excluye los acabados espejo fuertes pero deja sitio a las láminas cerámicas o poco reflectantes. Esto es lo que dan algunas láminas comunes sobre dos lecturas de vidrio:</p>
${h.table(['Lámina', 'Vidrio de 75 %', 'Vidrio de 85 %', 'Puertas delanteras en Arizona'], [
  ['50 %', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50)), 'legal'],
  ['45 %', h.pc(combinedVlt(75, 45)), h.pc(combinedVlt(85, 45)), 'legal'],
  ['40 %', h.pc(combinedVlt(75, 40)), h.pc(combinedVlt(85, 40)), 'en el margen con 75 %, legal con 85 %'],
  ['35 %', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35)), 'muy oscuro con 75 %, en el margen con 85 %'],
  ['20 %', h.pc(combinedVlt(75, 20)), h.pc(combinedVlt(85, 20)), 'muy oscuro'],
], 'Lecturas calculadas como lámina × vidrio; el límite de 33 % y su margen de 3 puntos vienen de A.R.S. 28-959.01(A)(1).', ['l', 'r', 'r', 'l'])}
<h2>Detrás del conductor</h2>
<p>Las laterales traseras no tienen límite de luz, solo el tope de reflectancia. El vidrio trasero queda exento cuando el vehículo tiene espejos exteriores a ambos lados con una vista de al menos 200 pies hacia atrás, algo que tienen casi todos los autos actuales. Arizona no separa autos y SUV: la misma regla vale para todos los vehículos.</p>
<h2>Mida antes de elegir la lámina</h2>
<p>Dos autos del mismo modelo pueden llevar vidrios con lecturas distintas, y un vidrio de puerta cambiado puede no coincidir con los demás. Pida al taller que mida cada ventana delantera sin lámina antes de cortarla, y luego multiplique: la calculadora de arriba lo hace por usted. Si no tiene la lectura, poner 70 % da la respuesta prudente, porque es el mínimo federal para un vidrio nuevo.</p>
<h2>Lo que el vendedor debe decirle</h2>
<p>Los fabricantes de láminas deben certificar sus productos ante el director, y los vendedores e instaladores deben indicar de forma visible que instalar lámina en las laterales delanteras puede ser ilegal en algunos estados. No hay calcomanía de Arizona en el vidrio, así que guarde la factura con el nombre de la lámina y su porcentaje.</p>
<h2>La multa y cómo se trata</h2>
<p>Una infracción de polarizado es una falta civil de tránsito. La sanción tiene un tope de ${s.fineL} según la sección 28-1598, y la ley estatal añade recargos a ese monto. La herramienta de abajo muestra el tope en Arizona y permite compararlo con otro estado:</p>
<!--tool:mini:ticket|{"state":"AZ"}-->
<h2>Exención médica</h2>
<p>El Departamento de Transporte puede eximir a una persona que deba protegerse del sol, con la declaración escrita de un médico. La exención cubre las ventanas laterales y trasera del vehículo de la persona o de uno en el que viaja a menudo. Lleve el documento en el auto.</p>
<h2>Alrededor de Arizona</h2>
<p>${h.sl('CA')} solo admite lámina transparente en las puertas delanteras. ${h.sl('NV')} pide ahí ${nv.front}, ${h.sl('UT')} ${ut.front}, ${h.sl('NM')} ${nm.front} y ${h.sl('CO')} ${co.front}. Un auto de Arizona en la línea de 33 % es muy oscuro adelante para California, Nevada y Utah, y pasa en Nuevo México y Colorado. Cifras leídas en el sitio de la Legislatura de Arizona el ${s.checked}.</p>`;
    },
  },
});
