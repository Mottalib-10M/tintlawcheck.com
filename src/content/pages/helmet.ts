import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const by = (t: (r: string | null | undefined, a: number | null | undefined) => boolean) =>
    h.STATES.filter((s) => t(s.equipment.helmet?.rule, s.equipment.helmet?.ageUnder)).map((s) => s.code);
  const universal = by((r) => r === 'universal');
  const none = by((r) => r === 'none');
  const unk = by((r) => r == null);
  const partial = by((r) => r === 'partial');
  const age = (n: number) => by((r, a) => r === 'partial' && a === n);
  return { universal, none, unk, partial, u18: age(18), u19: age(19), u21: age(21), u26: age(26), n: h.STATES.length };
};

export default definePage({
  id: 'helmet', group: 'equipment', order: 1,
  tool: { kind: 'mini:helmet', props: { state: 'TX', age: 30 } },
  mini: { kind: 'mini:helmet' },
  related: ['home', 'radar', 'by-state', 'state-tx', 'state-fl', 'state-pa'],
  sources: ['fmvss218'],
  en: {
    slug: 'motorcycle-helmet-laws-by-state', nav: 'Helmet laws',
    card: 'Which states require a helmet for every rider, which only for riders under 18 or 21, and the conditions.',
    title: 'Motorcycle Helmet Laws by State 2026: Who Must Wear One',
    description: 'Motorcycle helmet laws by state, 2026: the states that require a helmet for every rider, those that require one only under 18, 21 or 26 and the two with none.',
    h1: 'Motorcycle helmet laws by state: who has to wear one',
    intro: 'Pick a state and enter the rider\'s age: the tool says whether the statute requires a helmet. The table below gives every state, with the section read and the age threshold.',
    resume: (h) => {
      const f = F(h);
      return `Helmet rules for motorcycle riders fall into three groups. ${f.universal.length} jurisdictions read for this site require a helmet for every rider and passenger, whatever their age. ${f.partial.length} require one only below an age threshold, most often 18 (${f.u18.length} states) or 21 (${f.u21.length} states), with Delaware at 19 and Missouri at 26. ${h.list(f.none)} have no helmet requirement for adult riders. For ${h.list(f.unk)} the rule could not be confirmed in the official text on the day of the check, and this site says so rather than guessing. Age is often not the only condition. Texas lets riders aged 21 or more go without a helmet if they completed a safety course or carry health insurance covering crash injuries, Florida asks riders over 21 for a policy with at least $10,000 in medical benefits, and Pennsylvania asks for two years of license or a course. Several states also require a helmet for anyone riding on an instruction permit. Helmets themselves must meet federal standard FMVSS 218.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Which states require a helmet for every motorcycle rider?', a: `${f.universal.length} jurisdictions: ${h.listN(f.universal)}. In these states every operator and passenger must wear a helmet, whatever their age or experience. Some exclude riders in an enclosed cab or on an autocycle, as Alabama does. The table on this page links each statute.` },
        { q: 'Which states have no motorcycle helmet law?', a: `${h.listN(f.none)} have no helmet requirement for adult riders in the text read for this site. Illinois has none at all in its vehicle code; Iowa has none for operators or passengers. Check the statute for eye protection or windscreen rules, which are written separately from the helmet section in many vehicle codes.` },
        { q: 'Do I need a helmet in Texas if I am over 21?', a: 'Not if you meet one of two conditions in section 661.003. A rider aged 21 or more may ride without a helmet after completing an approved motorcycle safety course, or when covered by a health insurance plan that pays for motorcycle crash injuries. Police may not stop a rider only to check this. The fine runs from $10 to $50.' },
        { q: 'What helmet is legal on a motorcycle?', a: 'Where a state requires a helmet, it must meet federal standard FMVSS 218, the rule in 49 CFR 571.218 that sets impact, penetration and retention tests for motorcycle helmets. Helmets that meet it carry a DOT marking. Several state statutes refer to that standard by name, as Colorado and Connecticut do.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rule = (r: string | null | undefined) => r === 'universal' ? (h.es ? 'todos los motociclistas' : 'every rider') : r === 'partial' ? (h.es ? 'según la edad' : 'by age') : r === 'none' ? (h.es ? 'ninguna' : 'none') : h.nc;
      const rows = h.STATES.map((s) => { const x = s.equipment.helmet; return [h.sl(s.code), rule(x?.rule), x?.ageUnder != null ? `under ${x.ageUnder}` : '–', x?.url ? h.ext(x.url, x.cite ?? '') : (x?.cite ?? h.nc)]; });
      return `
<h2>Helmet rule by state</h2>
<p>"Every rider" means the statute requires a helmet for all operators and passengers. "By age" means it applies below the age shown, often with further conditions described below. "Not confirmed" means the official text could not be read on the day of the check.</p>
${h.table(['State', 'Helmet required for', 'Age', 'Statute'], rows, `Read in each state's statute for this site: ${f.universal.length} universal, ${f.partial.length} by age, ${f.none.length} none, ${f.unk.length} not confirmed.`, ['l', 'l', 'l', 'l'])}
<h2>Conditions beyond age</h2>
<p>An age threshold rarely tells the whole story. Texas and Florida trade the helmet for insurance or training once a rider turns 21. Pennsylvania lets riders 21 and over go without a helmet if they have held a license for two full calendar years or completed an approved course. Nebraska, since 2023, allows riders 21 and over to go without one if they hold a Class M license and completed the required course. Kentucky requires a helmet under 21, on an instruction permit and during the first year of license. Delaware requires one up to 19 and, for riders newly endorsed since July 30, 2023, during their first two years. Missouri sets the line at 26.</p>
<p>Check a rider's case here, with any state and age:</p>
<!--tool:mini:helmet|{"state":"PA","age":22}-->
<h2>Passengers and permits</h2>
<p>Many statutes cover passengers as well as operators. North Dakota requires any passenger to wear a helmet when the operator must, regardless of the passenger's age, and Wisconsin and South Dakota forbid carrying an unhelmeted passenger under 18. Learners are a frequent special case: Minnesota, Ohio, Indiana and Wisconsin, among others, require a helmet for anyone riding on an instruction permit, whatever their age.</p>
<h2>Eye protection</h2>
<p>Several states that do not require a helmet for adults still require eye protection, or a windscreen of a set height, for every operator. Kansas, for example, requires eye protection unless the motorcycle has a windscreen of at least 10 inches, and Rhode Island requires it for all operators. Read the state's statute before riding without goggles.</p>
<h2>The two states not confirmed</h2>
<p>${h.list(h.STATES.filter((s) => !s.equipment.helmet?.rule).map((s) => s.code))}: the helmet section could not be read in an official version on the day of the check (official site refusing our connections, or official code not readable by page), so no rule is shown for them as confirmed. A rule read only on a non-official copy of a code is not used here.</p>
<h2>The helmet itself</h2>
<p>Where a helmet is required, it must meet ${h.src('fmvss218', 'FMVSS 218')}, the federal standard for motorcycle helmets, which sets tests for impact attenuation, penetration resistance and the retention system. Helmets certified to it carry the DOT symbol. Colorado and Connecticut name the standard in their statutes.</p>`;
    },
  },
  es: {
    slug: 'ley-del-casco-por-estado', nav: 'Ley del casco',
    card: 'Qué estados exigen casco a todos los motociclistas, cuáles solo a los menores de 18 o 21, y con qué condiciones.',
    title: 'Ley del casco de moto por estado 2026: quién debe llevarlo',
    description: 'Ley del casco de moto por estado: los estados que exigen casco a todos los motociclistas, los que solo lo piden bajo 18, 21 o 26 años y los dos sin regla.',
    h1: 'Ley del casco de moto por estado: quién tiene que llevarlo',
    intro: 'Elija un estado y ponga la edad del motociclista: la herramienta dice si la ley exige casco. La tabla de abajo da todos los estados, con la sección leída y la edad límite.',
    resume: (h) => {
      const f = F(h);
      return `Las reglas del casco para los motociclistas se dividen en tres grupos. ${f.universal.length} jurisdicciones leídas para este sitio exigen casco a todo conductor y pasajero, sea cual sea su edad. ${f.partial.length} solo lo exigen por debajo de una edad, casi siempre 18 años (${f.u18.length} estados) o 21 (${f.u21.length} estados), con Delaware en 19 y Misuri en 26. ${h.list(f.none)} no exigen casco a los motociclistas adultos. Para ${h.list(f.unk)} la regla no pudo confirmarse en el texto oficial el día de la revisión, y este sitio lo dice en lugar de adivinar. La edad no suele ser la única condición. Texas deja ir sin casco a quien tiene 21 años o más si hizo un curso de seguridad o tiene un seguro de salud que cubre las lesiones por accidente, Florida pide a los mayores de 21 una póliza con al menos 10 000 dólares en gastos médicos, y Pensilvania pide dos años de licencia o un curso. Varios estados exigen además casco a quien maneja con permiso de aprendizaje. Los cascos deben cumplir la norma federal FMVSS 218.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿Qué estados exigen casco a todos los motociclistas?', a: `${f.universal.length} jurisdicciones: ${h.listN(f.universal)}. En estos estados todo conductor y pasajero debe llevar casco, sea cual sea su edad o su experiencia. Algunos excluyen a quien va en una cabina cerrada o en un autociclo, como Alabama. La tabla de esta página enlaza cada ley.` },
        { q: '¿Qué estados no tienen ley del casco para motociclistas?', a: `${h.listN(f.none)} no exigen casco a los motociclistas adultos en el texto leído para este sitio. Illinois no tiene ninguna regla en su código de vehículos; Iowa no la tiene ni para conductores ni para pasajeros. Revise la ley sobre protección ocular o parabrisas, que en muchos códigos de vehículos se escribe aparte de la sección del casco.` },
        { q: '¿Necesito casco en Texas si tengo más de 21 años?', a: 'No si cumple una de las dos condiciones de la sección 661.003. Un motociclista de 21 años o más puede ir sin casco tras completar un curso de seguridad aprobado, o si tiene un seguro de salud que cubre las lesiones de un accidente de moto. La policía no puede detenerlo solo para comprobarlo. La multa va de 10 a 50 dólares.' },
        { q: '¿Qué casco es legal en una moto?', a: 'Donde un estado exige casco, debe cumplir la norma federal FMVSS 218, la regla del 49 CFR 571.218 que fija pruebas de impacto, de penetración y de sujeción para los cascos de moto. Los cascos que la cumplen llevan la marca DOT. Varias leyes estatales citan esa norma por su nombre, como las de Colorado y Connecticut.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rule = (r: string | null | undefined) => r === 'universal' ? 'todos los motociclistas' : r === 'partial' ? 'según la edad' : r === 'none' ? 'ninguna' : h.nc;
      const rows = h.STATES.map((s) => { const x = s.equipment.helmet; return [h.sl(s.code), rule(x?.rule), x?.ageUnder != null ? `menores de ${x.ageUnder}` : '–', x?.url ? h.ext(x.url, x.cite ?? '') : (x?.cite ?? h.nc)]; });
      return `
<h2>Regla del casco por estado</h2>
<p>«Todos los motociclistas» significa que la ley exige casco a todos los conductores y pasajeros. «Según la edad» significa que se aplica por debajo de la edad indicada, a menudo con otras condiciones que se describen abajo. «No confirmado» significa que el texto oficial no pudo leerse el día de la revisión.</p>
${h.table(['Estado', 'Casco exigido para', 'Edad', 'Ley'], rows, `Leído en la ley de cada estado para este sitio: ${f.universal.length} universales, ${f.partial.length} según la edad, ${f.none.length} sin regla, ${f.unk.length} no confirmados.`, ['l', 'l', 'l', 'l'])}
<h2>Condiciones además de la edad</h2>
<p>Una edad límite rara vez lo dice todo. Texas y Florida cambian el casco por un seguro o una formación a partir de los 21 años. Pensilvania deja ir sin casco a los mayores de 21 que tienen licencia desde hace dos años calendario completos o hicieron un curso aprobado. Nebraska, desde 2023, permite ir sin casco a los mayores de 21 con licencia de clase M que hicieron el curso exigido. Kentucky exige casco a los menores de 21, con permiso de aprendizaje y durante el primer año de licencia. Delaware lo exige hasta los 19 años y, para quienes obtuvieron el permiso de moto desde el 30 de julio de 2023, durante sus dos primeros años. Misuri pone la línea en 26.</p>
<p>Revise el caso de un motociclista aquí, con cualquier estado y edad:</p>
<!--tool:mini:helmet|{"state":"PA","age":22}-->
<h2>Pasajeros y permisos</h2>
<p>Muchas leyes cubren a los pasajeros además de los conductores. Dakota del Norte exige casco a todo pasajero cuando el conductor debe llevarlo, sea cual sea la edad del pasajero, y Wisconsin y Dakota del Sur prohíben llevar a un pasajero menor de 18 sin casco. Los aprendices son un caso especial frecuente: Minnesota, Ohio, Indiana y Wisconsin, entre otros, exigen casco a quien maneja con permiso de aprendizaje, sea cual sea su edad.</p>
<h2>Protección ocular</h2>
<p>Varios estados que no exigen casco a los adultos sí exigen protección ocular, o un parabrisas de cierta altura, a todo conductor. Kansas, por ejemplo, exige protección ocular salvo que la moto tenga un parabrisas de al menos 10 pulgadas, y Rhode Island la exige a todos los conductores. Lea la ley del estado antes de manejar sin gafas.</p>
<h2>Los dos estados no confirmados</h2>
<p>${h.list(h.STATES.filter((s) => !s.equipment.helmet?.rule).map((s) => s.code))}: la sección del casco no pudo leerse en una versión oficial el día de la revisión (sitio oficial que rechazaba la conexión o código oficial no legible por página), así que no se muestra ninguna regla confirmada para ellos. Una regla leída solo en una copia no oficial de un código no se usa aquí.</p>
<h2>El casco en sí</h2>
<p>Donde se exige casco, debe cumplir la ${h.src('fmvss218', 'FMVSS 218')}, la norma federal de los cascos de moto, que fija pruebas de amortiguación del impacto, de resistencia a la penetración y del sistema de sujeción. Los cascos certificados llevan el símbolo DOT. Colorado y Connecticut citan la norma en sus leyes.</p>`;
    },
  },
});
