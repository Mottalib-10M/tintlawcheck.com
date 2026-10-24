import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt, darkestLegalFilm } from '../../lib/engine/tint';

const C = 'OH';
const F = (h: Helpers) => ({ s: h.S(C), mi: h.S('MI'), pa: h.S('PA'), in_: h.S('IN'), ky: h.S('KY'), wv: h.S('WV') });

export default definePage({
  id: 'state-oh',
  group: 'states',
  order: 106,
  state: C,
  tool: { kind: 'tint', props: { film: 70 } },
  mini: { kind: 'mini:windshield', props: { state: 'OH', inches: 5 } },
  related: ['home', 'state-pa', 'state-tn', 'windshield', 'ticket', 'legal-percentage'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'ohio-tint-laws',
    nav: 'Ohio',
    card: 'Ohio: 50% plus or minus 3 on the front doors, any shade behind the driver with two mirrors.',
    title: 'Ohio Tint Laws 2026: 50% Front, Any Shade Behind the Driver',
    description: 'Ohio tint laws: 50% light transmission, plus or minus 3, on the front side windows, any darkness behind the driver with two mirrors, 70% on the windshield.',
    h1: 'Ohio tint laws: 50% on the front doors, free behind',
    intro: 'Ohio measures the film with the glass and allows 3 points either way. Enter both: the calculator checks the front doors against 50% and shows the rest of the car as free.',
    resume: (h) => {
      const { s } = F(h);
      return `Ohio regulates the front of the car and leaves the back to the owner. Under ${s.law} and Administrative Code rule 4501-41-03, the side windows to the immediate right and left of the driver must keep a light transmittance of at least ${s.front}, plus or minus 3%, film and glass together, and the film may not be red or yellow. Behind the driver, any darkness is allowed; once the back window falls below 50%, the car needs outside rear-view mirrors on both sides. The windshield is treated in two parts: material along the top that stays above the AS-1 line or within ${s.wsInches} inches of the top, whichever is closer to the top, is not regulated, and below that the windshield must keep 70%, plus or minus 3. Reflective materials are banned everywhere. Because the glass counts, a 50% film fails on most front doors: on 75% glass it reads ${h.pc(combinedVlt(75, 50))}. Operating a car with non-conforming tint is a minor misdemeanor with a fine of up to ${s.fineL}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What is the darkest legal front tint in Ohio?', a: `The front side windows must read at least ${s.front} with the glass, and the 3-point margin brings the accepted reading to 47%. On 75% factory glass that allows a film of about ${h.pc(darkestLegalFilm(47, 75) as number)} at the edge of the margin. In practice that means a 70% or 65% film on the front doors, not the 50% film often sold as Ohio-legal.` },
        { q: 'Does Ohio require a tint label on each window?', a: 'Yes, for vehicles from the 1990 model year on. Rule 4501-41-03(F) requires a label with the manufacturer\'s name and the percentage of light transmission, placed between the film and the glass in the lower left corner of each tinted window and readable from outside. A shop that skips the label leaves the owner without that proof.' },
        { q: 'How does the Ohio medical tint exemption work?', a: 'Ohio does not issue a permit. Under rule 4501-41-05, an Ohio-licensed physician or optometrist signs an affidavit stating that the person needs darker sunscreening; it can cover a vehicle registered to the person or to a parent, guardian or spouse. The affidavit must be in the vehicle at all times while that person is in it.' },
        { q: 'Who is punished more in Ohio, the driver or the installer?', a: `The installer. Operating a car with non-conforming or reflective material is a minor misdemeanor, with a fine of up to ${s.fineL} under section 2929.28. Installing non-conforming material is a misdemeanor of the fourth degree under section 4513.241(K). The installer charge is the heavier one, which is why careful shops refuse to put dark film on front doors.` },
      ];
    },
    body: (h) => {
      const { s, mi, pa, in_, ky, wv } = F(h);
      return `
<h2>The front doors are the whole question</h2>
<p>Ohio writes "fifty per cent plus or minus three per cent" for the side windows beside the driver, so the meter must show 47% or more. Factory glass already removes part of the light before any film goes on, so the film has to be lighter than the number on the law. The table shows common films on two typical glass readings:</p>
${h.table(['Film', 'On 75% glass', 'On 85% glass', 'Ohio front doors'], [
  ['80%', h.pc(combinedVlt(75, 80)), h.pc(combinedVlt(85, 80)), 'legal'],
  ['70%', h.pc(combinedVlt(75, 70)), h.pc(combinedVlt(85, 70)), 'legal'],
  ['60%', h.pc(combinedVlt(75, 60)), h.pc(combinedVlt(85, 60)), 'within the margin on 85%, too dark on 75%'],
  ['50%', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50)), 'too dark'],
  ['35%', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35)), 'too dark'],
], 'Readings computed as film × glass; the 50% limit and its 3-point margin come from Ohio Adm. Code 4501-41-03.', ['l', 'r', 'r', 'l'])}
<h2>Behind the driver</h2>
<p>For any other window, the rule allows any light transmittance. The condition is on the mirrors: a back window below 50%, plus or minus 3, requires outside rear-view mirrors on the left and the right. Almost every car sold today has both, so the condition mostly matters for older or modified vehicles. Red and yellow film and reflective finishes stay banned on every window.</p>
<h2>The windshield strip, measured</h2>
<p>Ohio lets a strip run along the top as long as it stays above the AS-1 line or within ${s.wsInches} inches of the top, whichever is closer to the top. Below that limit the windshield must keep 70%, plus or minus 3, with the glass. Enter the depth of your strip to see where it lands in Ohio or in any other state:</p>
<!--tool:mini:windshield|{"state":"OH","inches":6}-->
<h2>Exemptions</h2>
<p>A medical need is handled by affidavit, not by permit: an Ohio-licensed physician or optometrist signs it, and it stays in the vehicle whenever the person is aboard. The rule on exemptions also covers some vehicle types listed in rule 4501-41-05; check the text before relying on one of them.</p>
<h2>Penalty and how the rules are kept current</h2>
<p>Operating a car with non-conforming tint is a minor misdemeanor; the general misdemeanor rule caps the fine at ${s.fineL}. Installing it is a fourth-degree misdemeanor. Section 4513.241 was last rewritten with effect from April 9, 2025, and the administrative rule dates from 2014, with its next review due in 2031.</p>
<h2>Around Ohio</h2>
<p>${h.sl('MI')} allows ${mi.front} on the front side windows, ${h.sl('PA')} asks for ${pa.front} in its inspection table, ${h.sl('IN')} for ${in_.front}, ${h.sl('KY')} for ${ky.front} and ${h.sl('WV')} for ${wv.front}. An Ohio car with a 70% film on the front doors passes on the front in Indiana, Kentucky and West Virginia, but Pennsylvania's table asks for 70% with the glass and Michigan allows only a top strip there. Figures read on ${s.checked}, from archived copies of the official Ohio pages because codes.ohio.gov refused our connection that day.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-ohio',
    nav: 'Ohio',
    card: 'Ohio: 50 % con 3 puntos de margen en las puertas delanteras; atrás, cualquier tono con dos espejos.',
    title: 'Polarizado en Ohio 2026: 50 % adelante, cualquier tono atrás',
    description: 'Polarizado en Ohio: 50 % de transmisión, con 3 puntos de margen, en las laterales delanteras, cualquier oscuridad atrás con dos espejos y parabrisas al 70 %.',
    h1: 'Polarizado en Ohio: 50 % en las puertas delanteras, libre atrás',
    intro: 'Ohio mide la lámina con el vidrio y admite 3 puntos de diferencia. Ponga los dos datos: la calculadora compara las puertas delanteras con el 50 % y muestra el resto del auto libre.',
    resume: (h) => {
      const { s } = F(h);
      return `Ohio regula la parte delantera del auto y deja la trasera al dueño. Según ${s.law} y la regla 4501-41-03 del Código Administrativo, las ventanas laterales a la derecha y a la izquierda del conductor deben conservar una transmisión de luz de al menos ${s.front}, con 3 % de margen, lámina y vidrio juntos, y la lámina no puede ser roja ni amarilla. Detrás del conductor se permite cualquier oscuridad; cuando el vidrio trasero baja de 50 %, el auto necesita espejos retrovisores exteriores a ambos lados. El parabrisas se trata en dos partes: el material en la parte alta que queda por encima de la línea AS-1 o dentro de las ${s.wsInches} pulgadas superiores, lo que esté más cerca del borde, no está regulado, y debajo el parabrisas debe conservar 70 %, con 3 de margen. Los materiales reflectantes están prohibidos en todas partes. Como el vidrio cuenta, una lámina de 50 % no pasa en la mayoría de las puertas delanteras: sobre un vidrio de 75 % da ${h.pc(combinedVlt(75, 50))}. Manejar con un polarizado no conforme es un delito menor leve con una multa de hasta ${s.fineL}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuál es el polarizado delantero más oscuro legal en Ohio?', a: `Las laterales delanteras deben medir al menos ${s.front} con el vidrio, y el margen de 3 puntos deja la lectura aceptada en 47 %. Sobre un vidrio de fábrica de 75 %, eso permite una lámina de unos ${h.pc(darkestLegalFilm(47, 75) as number)} al borde del margen. En la práctica, eso significa una lámina de 70 % o 65 % en las puertas delanteras, no la de 50 % que a menudo se vende como legal en Ohio.` },
        { q: '¿Ohio exige una etiqueta de polarizado en cada ventana?', a: 'Sí, para los vehículos desde el modelo 1990. La regla 4501-41-03(F) exige una etiqueta con el nombre del fabricante y el porcentaje de transmisión de luz, colocada entre la lámina y el vidrio en la esquina inferior izquierda de cada ventana polarizada y legible desde fuera. Un taller que omite la etiqueta deja al dueño sin esa prueba.' },
        { q: '¿Cómo funciona la exención médica del polarizado en Ohio?', a: 'Ohio no emite un permiso. Según la regla 4501-41-05, un médico u optometrista con licencia en Ohio firma una declaración jurada de que la persona necesita un polarizado más oscuro; puede cubrir un vehículo registrado a nombre de la persona, de su padre o madre, de su tutor o de su cónyuge. La declaración debe estar en el vehículo siempre que esa persona viaje en él.' },
        { q: '¿A quién se castiga más en Ohio, al conductor o al instalador?', a: `Al instalador. Manejar un auto con material no conforme o reflectante es un delito menor leve, con una multa de hasta ${s.fineL} según la sección 2929.28. Instalar material no conforme es un delito menor de cuarto grado según la sección 4513.241(K). El cargo del instalador es el más pesado, y por eso los talleres cuidadosos se niegan a poner láminas oscuras adelante.` },
      ];
    },
    body: (h) => {
      const { s, mi, pa, in_, ky, wv } = F(h);
      return `
<h2>Todo se juega en las puertas delanteras</h2>
<p>Ohio escribe «cincuenta por ciento, más o menos tres por ciento» para las ventanas laterales junto al conductor, así que el medidor debe marcar 47 % o más. El vidrio de fábrica ya quita parte de la luz antes de la lámina, así que la lámina tiene que ser más clara que la cifra de la ley. La tabla muestra algunas láminas comunes sobre dos lecturas típicas de vidrio:</p>
${h.table(['Lámina', 'Vidrio de 75 %', 'Vidrio de 85 %', 'Puertas delanteras en Ohio'], [
  ['80 %', h.pc(combinedVlt(75, 80)), h.pc(combinedVlt(85, 80)), 'legal'],
  ['70 %', h.pc(combinedVlt(75, 70)), h.pc(combinedVlt(85, 70)), 'legal'],
  ['60 %', h.pc(combinedVlt(75, 60)), h.pc(combinedVlt(85, 60)), 'en el margen con 85 %, muy oscuro con 75 %'],
  ['50 %', h.pc(combinedVlt(75, 50)), h.pc(combinedVlt(85, 50)), 'muy oscuro'],
  ['35 %', h.pc(combinedVlt(75, 35)), h.pc(combinedVlt(85, 35)), 'muy oscuro'],
], 'Lecturas calculadas como lámina × vidrio; el límite de 50 % y su margen de 3 puntos vienen de Ohio Adm. Code 4501-41-03.', ['l', 'r', 'r', 'l'])}
<h2>Detrás del conductor</h2>
<p>Para las demás ventanas, la regla admite cualquier transmisión de luz. La condición está en los espejos: un vidrio trasero por debajo de 50 %, con 3 de margen, exige espejos retrovisores exteriores a la izquierda y a la derecha. Casi todos los autos vendidos hoy tienen los dos, así que la condición pesa sobre todo en vehículos antiguos o modificados. Las láminas rojas o amarillas y los acabados reflectantes siguen prohibidos en todas las ventanas.</p>
<h2>La franja del parabrisas, medida</h2>
<p>Ohio deja una franja en la parte alta siempre que quede por encima de la línea AS-1 o dentro de las ${s.wsInches} pulgadas superiores, lo que esté más cerca del borde. Por debajo de ese límite el parabrisas debe conservar 70 %, con 3 de margen, contando el vidrio. Ponga la altura de su franja para ver dónde queda en Ohio o en otro estado:</p>
<!--tool:mini:windshield|{"state":"OH","inches":6}-->
<h2>Exenciones</h2>
<p>Una necesidad médica se resuelve con una declaración jurada, no con un permiso: la firma un médico u optometrista con licencia en Ohio, y se queda en el vehículo cada vez que la persona viaja en él. La regla de exenciones también cubre algunos tipos de vehículos que enumera la regla 4501-41-05; lea el texto antes de apoyarse en uno de ellos.</p>
<h2>Sanción y vigencia de las reglas</h2>
<p>Manejar con un polarizado no conforme es un delito menor leve; la regla general de esos delitos limita la multa a ${s.fineL}. Instalarlo es un delito menor de cuarto grado. La sección 4513.241 se reescribió por última vez con efecto el 9 de abril de 2025, y la regla administrativa data de 2014, con su próxima revisión prevista en 2031.</p>
<h2>Alrededor de Ohio</h2>
<p>${h.sl('MI')} permite ${mi.front} en las laterales delanteras, ${h.sl('PA')} pide ${pa.front} en su tabla de inspección, ${h.sl('IN')} ${in_.front}, ${h.sl('KY')} ${ky.front} y ${h.sl('WV')} ${wv.front}. Un auto de Ohio con una lámina de 70 % en las puertas delanteras pasa adelante en Indiana, Kentucky y Virginia Occidental, pero la tabla de Pensilvania pide 70 % con el vidrio y Michigan solo admite ahí una franja superior. Cifras leídas el ${s.checked}, en copias archivadas de las páginas oficiales de Ohio porque codes.ohio.gov rechazó la conexión ese día.</p>`;
    },
  },
});
