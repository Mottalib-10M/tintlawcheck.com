import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const av = (v: boolean | null | undefined) => h.STATES.filter((s) => (s.detail.medicalExemption?.available ?? null) === v).map((s) => s.code);
  return { yes: av(true), no: av(false), unk: av(null), n: h.STATES.length };
};

export default definePage({
  id: 'medical', group: 'tint', order: 7,
  tool: { kind: 'mini:medical', props: { state: 'FL' } },
  mini: { kind: 'mini:compare' },
  related: ['home', 'ticket', 'windshield', 'state-nc', 'state-pa', 'state-ga'],
  sources: ['fmvss205'],
  en: {
    slug: 'medical-exemption-window-tint', nav: 'Medical exemption',
    card: 'Which states allow darker tint for a medical condition, who signs the request, and whether a permit is issued.',
    title: 'Medical Exemption for Window Tint 2026: Rules in Every State',
    description: 'Medical exemption for window tint: which states allow darker film for a light-sensitive illness, who signs, whether a permit is issued and where there is none.',
    h1: 'Medical exemption for window tint: who qualifies and how to apply',
    intro: 'Pick a state to see whether its tint statute provides a medical exemption and what limit applies without it. The sections below explain the three ways states handle the request.',
    resume: (h) => {
      const f = F(h);
      return `Most states let a person with a light-sensitive medical condition drive with darker windows than the law otherwise allows. Of the ${f.n} jurisdictions read for this site, ${f.yes.length} provide a medical exemption in the tint statute or its rules, ${f.no.length} do not (${h.list(f.no)}), and for ${f.unk.length} the text read did not settle the question. The exemptions work in three ways. Some states issue a permit, certificate or sticker after an application with a doctor's statement, as Florida, North Carolina, New York and Pennsylvania do. Others issue nothing: the driver carries a signed statement or affidavit from a physician or optometrist, as in Ohio, Minnesota, Maryland and South Carolina, and Texas makes the medical need a defense in court. A few limit what the exemption allows, such as Kansas and Pennsylvania, which allow only clear or colorless material. Depending on the state, the exemption is tied to a person, a vehicle or both, often ends when the vehicle is sold or the condition ends, and must stay in the vehicle. Only some states extend it to the windshield.`;
    },
    faqs: (h) => [
      { q: 'What medical conditions qualify for darker window tint?', a: 'The statutes speak of conditions that require shielding from the sun or that are aggravated by light. Some list examples: Illinois names lupus, porokeratosis, light sensitivity after a brain injury and albinism, and Florida issues certificates for lupus and similar autoimmune conditions. Most leave the judgment to the signing physician or optometrist, sometimes with review by a state medical board.' },
      { q: 'Who can sign a medical tint exemption?', a: 'Usually a licensed physician, and in many states an optometrist as well. Several statutes require a doctor licensed in that state, as Alabama, Illinois, Maryland, Ohio and South Carolina do. New York also accepts a nurse practitioner, and Wisconsin a Christian Science practitioner. Check the state page or statute before you book the visit.' },
      { q: 'Does a medical tint exemption follow me to another state?', a: 'Not by its own terms. Each exemption is granted under one state\'s statute, and the statutes read for this site do not say that they honor another state\'s permit. A driver who moves or travels often should check the destination state\'s rule and, where needed, apply again there.' },
      { q: 'How dark can tint be with a medical exemption?', a: 'It depends on the state. Some name a floor: Virginia\'s authorization allows 35% on every window, and Arkansas and Wyoming set their own lower limits for exempt vehicles. Others let the permit state the level, as North Carolina and Tennessee do. Pennsylvania and Kansas allow only clear material, which helps with ultraviolet light but not with brightness.' },
    ],
    body: (h) => {
      const f = F(h);
      const rows = h.STATES.map((s) => { const x = h.S(s.code); const v = s.detail.medicalExemption?.available; return [h.sl(s.code), v === true ? 'yes' : v === false ? 'no' : h.nc, x.medLink || x.law]; });
      return `
<h2>Medical exemption by state</h2>
<p>"Yes" means the tint statute or its rules provide an exemption for a medical condition; "no" means the text read has none; "not confirmed" means the text read leaves it open, for instance because it delegates the question to a regulation that was not located.</p>
${h.table(['State', 'Medical exemption', 'Text'], rows, `Read in each state's tint statute or rules for this site: ${f.yes.length} yes, ${f.no.length} no, ${f.unk.length} not confirmed.`, ['l', 'l', 'l'])}
<h2>Three ways states handle it</h2>
<p><strong>A permit or certificate.</strong> The driver applies to the motor vehicle or public safety agency with a doctor's statement, and the agency issues a document, sometimes a sticker for the glass. North Carolina's permit lasts five years and names the windows and the levels; New York's comes with a sticker on each shielded window; Pennsylvania's certificate must be shown to the police and at inspection.</p>
<p><strong>A statement carried in the car.</strong> No permit is issued. The driver keeps a signed statement or affidavit from a physician or optometrist in the vehicle. Ohio, Minnesota, Maryland and South Carolina work this way. In Texas the medical need is a defense to prosecution, which means it is raised after the ticket rather than before.</p>
<p><strong>A limited exemption.</strong> Some states allow only part of what people expect. Kansas allows only clear, colorless film that blocks ultraviolet light. Pennsylvania limits medical certificates to colorless material. California allows removable sun screens on the front side windows rather than darker film.</p>
<h2>What to prepare</h2>
<p>Ask the doctor for a statement that names the condition, says that it requires shielding from the sun and, where the state asks for it, the minimum light transmission needed. Check whether your state requires a doctor licensed there. Keep the document, permit or sticker in the vehicle at all times: most statutes make it a condition of the exemption, and North Carolina fines a missing sticker separately.</p>
<h2>What the exemption does not change</h2>
<p>An exemption usually covers the person, the vehicle named or the vehicles the person rides in, and only the windows the statute lists. Several states leave the windshield rule untouched, others allow only the top strip or a 70% windshield. Reflective and colored films often stay banned even with an exemption. If you travel, compare your state with the one you are heading to:</p>
<!--tool:mini:compare|{"state":"NC","b":"VA"}-->
<h2>States without a medical exemption</h2>
<p>${h.list(f.no)} have no medical exemption in the text read for this site. In Iowa, dark-window exemptions issued before July 4, 2012 remain valid under the former rule, but no new ones are granted. In these states the only lawful route for a light-sensitive driver is film within the general limit, plus measures that do not reduce light transmission, such as clear UV-blocking film where the statute allows it.</p>`;
    },
  },
  es: {
    slug: 'exencion-medica-polarizado', nav: 'Exención médica',
    card: 'Qué estados permiten un polarizado más oscuro por una condición médica, quién firma la solicitud y si se emite un permiso.',
    title: 'Exención médica del polarizado 2026: reglas de cada estado',
    description: 'Exención médica del polarizado: qué estados admiten una lámina más oscura por una condición sensible a la luz, quién firma, si hay permiso y dónde no existe.',
    h1: 'Exención médica del polarizado: quién califica y cómo pedirla',
    intro: 'Elija un estado para ver si su ley de polarizado prevé una exención médica y qué límite rige sin ella. Las secciones de abajo explican las tres formas en que los estados tratan la solicitud.',
    resume: (h) => {
      const f = F(h);
      return `La mayoría de los estados permite a una persona con una condición médica sensible a la luz manejar con ventanas más oscuras que las que la ley permite en general. De las ${f.n} jurisdicciones leídas para este sitio, ${f.yes.length} prevén una exención médica en la ley de polarizado o en sus reglas, ${f.no.length} no la prevén (${h.list(f.no)}), y en ${f.unk.length} el texto leído no resolvió la cuestión. Las exenciones funcionan de tres maneras. Algunos estados emiten un permiso, un certificado o una calcomanía tras una solicitud con la declaración de un médico, como Florida, Carolina del Norte, Nueva York y Pensilvania. Otros no emiten nada: el conductor lleva una declaración firmada o una declaración jurada de un médico u optometrista, como en Ohio, Minnesota, Maryland y Carolina del Sur, y Texas hace de la necesidad médica una defensa ante el tribunal. Unos pocos limitan lo que permite la exención, como Kansas y Pensilvania, que solo admiten material claro o incoloro. Según el estado, la exención se vincula a una persona, a un vehículo o a ambos, suele terminar cuando se vende el vehículo o termina la condición, y debe ir en el vehículo. Solo algunos estados la extienden al parabrisas.`;
    },
    faqs: (h) => [
      { q: '¿Qué condiciones médicas permiten un polarizado más oscuro?', a: 'Las leyes hablan de condiciones que exigen protegerse del sol o que la luz agrava. Algunas dan ejemplos: Illinois nombra el lupus, la poroqueratosis, la sensibilidad a la luz tras una lesión cerebral y el albinismo, y Florida emite certificados para el lupus y enfermedades autoinmunes similares. La mayoría deja el juicio al médico u optometrista que firma, a veces con revisión de una junta médica estatal.' },
      { q: '¿Quién puede firmar una exención médica de polarizado?', a: 'Por lo general un médico con licencia, y en muchos estados también un optometrista. Varias leyes exigen un médico con licencia en ese estado, como las de Alabama, Illinois, Maryland, Ohio y Carolina del Sur. Nueva York acepta además a una enfermera practicante, y Wisconsin a un practicante de la Ciencia Cristiana. Revise la página del estado o la ley antes de pedir la cita.' },
      { q: '¿Una exención médica de polarizado vale en otro estado?', a: 'No por sí misma. Cada exención se concede según la ley de un estado, y las leyes leídas para este sitio no dicen que reconozcan el permiso de otro estado. Quien se muda o viaja a menudo debe revisar la regla del estado de destino y, si hace falta, volver a solicitarla allí.' },
      { q: '¿Qué tan oscuro puede ser el polarizado con una exención médica?', a: 'Depende del estado. Algunos fijan un piso: la autorización de Virginia permite 35 % en todas las ventanas, y Arkansas y Wyoming fijan sus propios límites más bajos para los vehículos exentos. Otros dejan que el permiso indique el nivel, como Carolina del Norte y Tennessee. Pensilvania y Kansas solo admiten material claro, que ayuda contra los rayos ultravioleta pero no contra el brillo.' },
    ],
    body: (h) => {
      const f = F(h);
      const rows = h.STATES.map((s) => { const x = h.S(s.code); const v = s.detail.medicalExemption?.available; return [h.sl(s.code), v === true ? 'sí' : v === false ? 'no' : h.nc, x.medLink || x.law]; });
      return `
<h2>Exención médica por estado</h2>
<p>«Sí» significa que la ley de polarizado o sus reglas prevén una exención por una condición médica; «no» significa que el texto leído no la tiene; «no confirmado» significa que el texto leído deja la cuestión abierta, por ejemplo porque la remite a un reglamento que no se encontró.</p>
${h.table(['Estado', 'Exención médica', 'Texto'], rows, `Leído en la ley de polarizado de cada estado o en sus reglas para este sitio: ${f.yes.length} sí, ${f.no.length} no, ${f.unk.length} no confirmados.`, ['l', 'l', 'l'])}
<h2>Tres formas de tratarla</h2>
<p><strong>Un permiso o certificado.</strong> El conductor lo solicita a la agencia de vehículos o de seguridad pública con la declaración de un médico, y la agencia emite un documento, a veces una calcomanía para el vidrio. El permiso de Carolina del Norte dura cinco años e indica las ventanas y los niveles; el de Nueva York viene con una calcomanía en cada ventana protegida; el certificado de Pensilvania debe mostrarse a la policía y en la inspección.</p>
<p><strong>Una declaración en el auto.</strong> No se emite permiso. El conductor guarda en el vehículo una declaración firmada o una declaración jurada de un médico u optometrista. Ohio, Minnesota, Maryland y Carolina del Sur funcionan así. En Texas la necesidad médica es una defensa ante la acusación, lo que significa que se alega después de la multa y no antes.</p>
<p><strong>Una exención limitada.</strong> Algunos estados permiten solo parte de lo que la gente espera. Kansas solo admite una lámina clara e incolora que bloquea los rayos ultravioleta. Pensilvania limita los certificados médicos a material incoloro. California admite parasoles removibles en las laterales delanteras en lugar de una lámina más oscura.</p>
<h2>Qué preparar</h2>
<p>Pida al médico una declaración que nombre la condición, diga que exige protegerse del sol y, cuando el estado lo pida, la transmisión de luz mínima necesaria. Revise si su estado exige un médico con licencia allí. Lleve siempre en el vehículo el documento, el permiso o la calcomanía: la mayoría de las leyes lo ponen como condición de la exención, y Carolina del Norte multa aparte la falta de la calcomanía.</p>
<h2>Lo que la exención no cambia</h2>
<p>Una exención suele cubrir a la persona, al vehículo indicado o a los vehículos en que viaja, y solo las ventanas que la ley enumera. Varios estados dejan intacta la regla del parabrisas, otros solo admiten la franja superior o un parabrisas de 70 %. Las láminas reflectantes o de color siguen a menudo prohibidas incluso con exención. Si viaja, compare su estado con el de destino:</p>
<!--tool:mini:compare|{"state":"NC","b":"VA"}-->
<h2>Estados sin exención médica</h2>
<p>${h.list(f.no)} no tienen exención médica en el texto leído para este sitio. En Iowa, las exenciones por ventanas oscuras emitidas antes del 4 de julio de 2012 siguen valiendo con la regla anterior, pero no se conceden nuevas. En estos estados, la única vía legal para un conductor sensible a la luz es una lámina dentro del límite general, más medidas que no reducen la transmisión de luz, como una lámina transparente contra los rayos UV donde la ley la admite.</p>`;
    },
  },
});
