import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { combinedVlt, darkestLegalFilm } from '../../lib/engine/tint';

const C = 'TX';
const F = (h: Helpers) => ({ s: h.S(C), ok: h.S('OK'), la: h.S('LA'), nm: h.S('NM') });

export default definePage({
  id: 'state-tx',
  group: 'states',
  order: 101,
  state: C,
  tool: { kind: 'tint', props: { film: 25 } },
  mini: { kind: 'mini:darkest' },
  related: ['home', 'legal-percentage', 'ticket', 'state-ca', 'state-fl', 'by-state'],
  sources: ['fmvss205', 'nhtsa_70'],
  en: {
    slug: 'texas-tint-laws',
    nav: 'Texas',
    card: 'Texas: 25% combined on the front side windows, any darkness behind the driver, a 3-point tolerance.',
    title: 'Texas Tint Laws 2026: 25% Front, Glass Included, Checked',
    description: 'Texas tint laws: front side windows need 25% with the glass counted, rear windows any shade with two mirrors, a 5-inch windshield strip. Check your car free.',
    h1: 'Texas tint laws: the 25% front rule, glass included',
    intro: 'Enter your film and your factory glass: the calculator reads them the way a DPS meter does and checks each window against section 547.613 of the Transportation Code.',
    resume: (h) => {
      const { s } = F(h);
      return `Texas sets the bar on the front side windows only: the film and the window together must let through at least ${s.front} of the light, with a luminous reflectance of 25% or less, under ${s.law}. The side windows behind the driver are exempt, and the back window can take any film as long as the car has an outside mirror on each side. On the windshield, a strip is allowed above the AS-1 line or in the top ${s.wsInches} inches, whichever is closer to the top. Because the glass counts, a film sold as "25%" fails on most cars: on 70% glass it reads ${h.pc(combinedVlt(70, 25))}. The darkest film that 70% glass can take is ${h.pc(darkestLegalFilm(25, 70) as number)}, and the law lets DPS treat a window within ${s.tolL} of the limit as compliant. The highest fine for the driver is ${s.fineL}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Is 20% tint legal on the back windows in Texas?', a: `Yes on a car or an SUV. Section 547.613 exempts the side windows to the rear of the operator outright, and the back window is exempt if the vehicle has an outside mirror on each side giving a 200-foot view behind. Any shade is then legal behind the driver, 5% included. The front side windows still need ${s.front} with the glass counted, and red, blue or amber film is banned on every window.` },
        { q: 'Can a Texas tint ticket be dismissed?', a: `Often, yes. A Texas equipment charge can be dismissed if the defect is fixed before the first court appearance, against an administrative fee of no more than $10, under section 547.004(c). Without the fix, the general penalty of section 542.401 applies: a fine of up to ${s.fineL}. Removing or replacing the front film and bringing proof to the court is the usual route.` },
        { q: 'Does Texas require a tint sticker?', a: 'Every sunscreening device sold or installed in Texas must carry a legible label between the film and the glass, with the light transmission and reflectance that DPS requires and a statement that the film complies with section 547.613. The label is the installer\'s duty: a business that installs film without it commits a misdemeanor. A driver who tints a car alone should keep the film box and its specification sheet.' },
        { q: 'Is there a medical exemption for tint in Texas?', a: 'Texas writes a defense rather than a permit: it is a defense to prosecution that the driver or a passenger is required for a medical reason to be shielded from the sun, under section 547.613(e). Keep a signed statement from a physician in the car and show it to the court if you are cited. The medical exemption guide compares this with the states that issue a certificate.' },
      ];
    },
    body: (h) => {
      const { s, ok, la, nm } = F(h);
      return `
<h2>Texas windows, one by one</h2>
${h.table(['Window', 'Texas rule', 'What it means on 70% glass'], [
  ['Windshield', `above the AS-1 line or top ${s.wsInches} in., 25% reflectance max`, 'a strip only, never the whole glass'],
  ['Front side', `${s.front} combined, reflectance 25% max`, `film of ${h.pc(darkestLegalFilm(25, 70) as number)} or lighter`],
  ['Rear side', s.back, 'exempt from the percentage'],
  ['Back window', s.rear, 'needs an outside mirror on each side'],
], 'Passenger cars and multipurpose vehicles follow the same rule in Texas.', ['l', 'l', 'l'])}
<p>Texas draws no line between a sedan and an SUV, which keeps the rule simple: the only percentage that matters is the one on the two front side windows. The statute words it as a sunscreening device that "in combination with the vent or window" has a light transmission of 25 percent or more. That phrase is why the factory glass belongs in the calculation. A window that passes 75% of the light with no film becomes ${h.pc(combinedVlt(75, 35))} with a 35% film and ${h.pc(combinedVlt(75, 30))} with a 30% film.</p>
<h2>The 3-point tolerance</h2>
<p>Section 547.613(d) lets the Department of Public Safety treat a front side window as compliant when its transmission or reflectance varies by no more than 3 percent from the standard. A front window that reads 22% or more is therefore inside that margin. Count on the tolerance only as a safety margin for meter error: a 35% film on 70% glass reads ${h.pc(combinedVlt(70, 35))}, which the calculator marks "tolerance", while a 20% film on the same glass reads ${h.pc(combinedVlt(70, 20))} and fails outright.</p>
<p>Check your own glass with the darkest-film tool. Enter the reading of your bare front window if you know it; if not, 70% is the federal minimum for new cars and the cautious choice.</p>
<!--tool:mini:darkest|{"state":"TX","glass":80}-->
<h2>Colors, reflectance and labels</h2>
<p>Red, blue and amber film is banned on every window, and the front side windows and the windshield strip may reflect no more than 25% of the light. A mirror finish is out. Each sunscreening device sold or installed in Texas must carry a legible label between the film and the glass, stating that it complies with section 547.613; installing film without it is a misdemeanor for the business, with a fine of up to $1,000.</p>
<h2>Texas next to its neighbors</h2>
<p>Driving into another state, your Texas film is judged by that state's law. ${h.sl('OK')} asks for ${ok.front} on every window of a car, ${h.sl('LA')} for ${la.front} in front and ${la.rear} on the back window, and ${h.sl('NM')} for ${nm.front}. A car tinted to the Texas limit therefore passes in New Mexico but can fail on the rear windows in Oklahoma and Louisiana, where the darkness behind the driver is limited too. The ${h.a('by-state', '50-state comparison')} puts any two states side by side.</p>
<p>The Texas figures on this page were read in the Transportation Code on ${s.checked}. The law was last amended in ${s.amended ? s.amended.split(' ')[0] : h.nc}; if a new act changes section 547.613, this page and the calculator change with it.</p>`;
    },
  },
  es: {
    slug: 'polarizado-en-texas',
    nav: 'Texas',
    card: 'Texas: 25 % combinado en las laterales delanteras, libre detrás del conductor, tolerancia de 3 puntos.',
    title: 'Polarizado en Texas 2026: 25 % adelante, vidrio incluido',
    description: 'Ley de polarizado en Texas: las laterales delanteras deben dejar pasar 25 % contando el vidrio, atrás cualquier tono con dos espejos. Compruebe su auto gratis.',
    h1: 'Polarizado en Texas: la regla del 25 % adelante, con el vidrio',
    intro: 'Ponga su lámina y su vidrio de fábrica: la calculadora los lee como el medidor del DPS y compara cada ventana con la sección 547.613 del Código de Transporte.',
    resume: (h) => {
      const { s } = F(h);
      return `Texas solo pone un porcentaje en las ventanas laterales delanteras: la lámina y la ventana juntas deben dejar pasar al menos el ${s.front} de la luz, con una reflectancia de 25 % como máximo, según ${s.law}. Las laterales detrás del conductor están exentas, y el vidrio trasero admite cualquier lámina si el auto tiene un espejo exterior a cada lado. En el parabrisas se permite una franja sobre la línea AS-1 o en las ${s.wsInches} pulgadas superiores, lo que quede más arriba. Como el vidrio cuenta, una lámina vendida como «25 %» no pasa en la mayoría de los autos: sobre un vidrio de 70 % da ${h.pc(combinedVlt(70, 25))}. La lámina más oscura que admite ese vidrio es de ${h.pc(darkestLegalFilm(25, 70) as number)}, y la ley permite al DPS aceptar una ventana a ${s.tolL} o menos del límite. La multa máxima para el conductor es de ${s.fineL}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Es legal un polarizado de 20 % atrás en Texas?', a: `Sí, en un auto o en una SUV. La sección 547.613 exime directamente las ventanas laterales detrás del conductor, y el vidrio trasero queda exento si el vehículo tiene un espejo exterior a cada lado con vista de 200 pies hacia atrás. Detrás del conductor vale cualquier tono, incluso 5 %. Las laterales delanteras siguen necesitando ${s.front} contando el vidrio, y las láminas rojas, azules o ámbar están prohibidas en todas las ventanas.` },
        { q: '¿Se puede anular una multa por polarizado en Texas?', a: `A menudo sí. Una infracción de equipamiento en Texas puede anularse si el defecto se corrige antes de la primera comparecencia, con un cargo administrativo de 10 dólares como máximo, según la sección 547.004(c). Sin la corrección se aplica la sanción general de la sección 542.401: una multa de hasta ${s.fineL}. Quitar o cambiar la lámina delantera y llevar la prueba al tribunal es el camino habitual.` },
        { q: '¿Texas exige una etiqueta en el polarizado?', a: 'Toda lámina vendida o instalada en Texas debe llevar una etiqueta legible entre la lámina y el vidrio, con la transmisión de luz y la reflectancia que exige el DPS y una declaración de que cumple la sección 547.613. La etiqueta es obligación del instalador: un negocio que instala lámina sin ella comete un delito menor. Quien polariza su propio auto debería guardar la caja y la ficha técnica de la lámina.' },
        { q: '¿Hay exención médica para el polarizado en Texas?', a: 'Texas no da un permiso sino una defensa: es una defensa ante la acusación que el conductor o un pasajero necesite, por una razón médica, protegerse del sol, según la sección 547.613(e). Lleve en el auto una declaración firmada por un médico y preséntela al tribunal si lo multan. La guía de exenciones médicas compara esta regla con la de los estados que emiten un certificado.' },
      ];
    },
    body: (h) => {
      const { s, ok, la, nm } = F(h);
      return `
<h2>Las ventanas en Texas, una por una</h2>
${h.table(['Ventana', 'Regla de Texas', 'Con un vidrio de 70 %'], [
  ['Parabrisas', `sobre la línea AS-1 o ${s.wsInches} pulgadas superiores, reflectancia máx. 25 %`, 'solo una franja, nunca todo el vidrio'],
  ['Laterales delanteras', `${s.front} combinado, reflectancia máx. 25 %`, `lámina de ${h.pc(darkestLegalFilm(25, 70) as number)} o más clara`],
  ['Laterales traseras', s.back, 'exentas del porcentaje'],
  ['Vidrio trasero', s.rear, 'exige un espejo exterior a cada lado'],
], 'En Texas los autos y los vehículos de usos múltiples siguen la misma regla.', ['l', 'l', 'l'])}
<p>Texas no distingue entre un sedán y una SUV, y eso simplifica la regla: el único porcentaje que importa es el de las dos laterales delanteras. La ley habla de un dispositivo que, «in combination with the vent or window», tiene una transmisión de luz de 25 % o más. Esa frase es la razón por la que el vidrio de fábrica entra en el cálculo. Una ventana que sin lámina deja pasar 75 % de la luz queda en ${h.pc(combinedVlt(75, 35))} con una lámina de 35 % y en ${h.pc(combinedVlt(75, 30))} con una de 30 %.</p>
<h2>La tolerancia de 3 puntos</h2>
<p>La sección 547.613(d) permite al Departamento de Seguridad Pública considerar conforme una lateral delantera cuya transmisión o reflectancia se aparte 3 % como máximo de la norma. Una lateral delantera que lee 22 % o más queda, por tanto, dentro de ese margen. Cuente con la tolerancia solo como margen ante el error del medidor: una lámina de 35 % sobre un vidrio de 70 % da ${h.pc(combinedVlt(70, 35))}, que la calculadora marca como «tolerancia», mientras que una de 20 % sobre el mismo vidrio da ${h.pc(combinedVlt(70, 20))} y no pasa.</p>
<p>Pruebe su propio vidrio con la herramienta de la lámina más oscura. Ponga la lectura de su ventana delantera sin lámina si la conoce; si no, 70 % es el mínimo federal para un auto nuevo y la opción prudente.</p>
<!--tool:mini:darkest|{"state":"TX","glass":80}-->
<h2>Colores, reflectancia y etiquetas</h2>
<p>Las láminas rojas, azules y ámbar están prohibidas en todas las ventanas, y las laterales delanteras y la franja del parabrisas no pueden reflejar más del 25 % de la luz. El acabado espejo queda fuera. Cada lámina vendida o instalada en Texas debe llevar una etiqueta legible entre la lámina y el vidrio que declare que cumple la sección 547.613; instalarla sin etiqueta es un delito menor para el negocio, con una multa de hasta 1000 dólares.</p>
<h2>Texas frente a sus vecinos</h2>
<p>Al entrar en otro estado, su lámina de Texas se juzga con la ley de ese estado. ${h.sl('OK')} pide ${ok.front} en todas las ventanas de un auto, ${h.sl('LA')} ${la.front} adelante y ${la.rear} en el vidrio trasero, y ${h.sl('NM')} ${nm.front}. Un auto polarizado al límite de Texas pasa en Nuevo México, pero puede no pasar atrás en Oklahoma y en Luisiana, donde la oscuridad detrás del conductor también está limitada. La ${h.a('by-state', 'comparación de los 50 estados')} pone dos estados cualesquiera lado a lado.</p>
<p>Las cifras de Texas de esta página se leyeron en el Código de Transporte el ${s.checked}. La ley se modificó por última vez en ${s.amended ? s.amended.split(' ')[0] : h.nc}; si una nueva ley cambia la sección 547.613, esta página y la calculadora cambian con ella.</p>`;
    },
  },
});
