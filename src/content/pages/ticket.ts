import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const withFine = h.rank((s) => s.detail.penalty?.maxFineUsd ?? null, -1);
  const top = withFine.filter((s) => s.detail.penalty!.maxFineUsd === withFine[0].detail.penalty!.maxFineUsd);
  const low = withFine.at(-1)!;
  const unknown = h.STATES.filter((s) => s.detail.penalty?.maxFineUsd == null).map((s) => s.code);
  return { withFine, top, low, unknown, n: h.STATES.length };
};

export default definePage({
  id: 'ticket', group: 'tint', order: 6,
  tool: { kind: 'mini:ticket', props: { state: 'TX' } },
  mini: { kind: 'mini:darkest' },
  related: ['home', 'by-state', 'medical', 'state-tx', 'state-va', 'state-nc'],
  sources: ['fmvss205'],
  en: {
    slug: 'tint-ticket', nav: 'Tint ticket',
    card: 'The highest fine each state writes for illegal tint, and the states that drop the charge once the film is fixed.',
    title: 'Tint Ticket 2026: Fines by State and When It Is Dismissed',
    description: 'Tint ticket fines by state for 2026: the highest amount each statute writes, the states that drop the charge once the film is fixed, and the risk to installers.',
    h1: 'Tint ticket: how much it costs and when it can be dismissed',
    intro: 'Pick a state to see the highest fine its law writes for illegal tint, the meter tolerance and the front limit. The table below gives every state, with the statute cited.',
    resume: (h) => {
      const f = F(h);
      return `A tint ticket is usually a small charge with a large catch: in most states the film still has to come off. Of the ${f.n} jurisdictions read for this site, ${f.withFine.length} write a maximum fine that could be confirmed in the statute or in the general penalty it points to. The highest is ${h.m(f.top[0].detail.penalty!.maxFineUsd!)}, in ${h.list(f.top.map((s) => s.code))}, and the lowest is ${h.m(f.low.detail.penalty!.maxFineUsd!)} in ${h.sl(f.low.code)}. In the other ${f.unknown.length} the amount is set by a schedule or a general rule that was not read, and this site shows it as not confirmed rather than guessing. The type of charge varies: a civil infraction in states such as Arizona and Michigan, a misdemeanor in Georgia, North Carolina and Tennessee. Several states let the driver avoid the penalty by fixing the windows: Texas dismisses the charge against a fee of up to $10, North Carolina gives a defense if the film is removed within 15 days, and Virginia and Oregon let the court dismiss or reduce it on proof of compliance. Installers often face heavier penalties than drivers.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'How much is a tint ticket?', a: `It depends on the state. The maximum written in the law runs from ${h.m(f.low.detail.penalty!.maxFineUsd!)} in Iowa to ${h.m(f.top[0].detail.penalty!.maxFineUsd!)} in ${h.listN(f.top.map((s) => s.code))}, and many states add court costs or surcharges. For ${f.unknown.length} jurisdictions the amount sits in a schedule this site has not read.` },
        { q: 'Can a tint ticket be dismissed if I remove the tint?', a: 'In several states, yes. Texas dismisses an equipment charge fixed before the first court date against a fee of up to $10. North Carolina gives a defense if the film is removed within 15 days with a compliance certificate. Virginia and Oregon let the court dismiss or reduce the charge on proof of compliance. Bring the proof to court.' },
        { q: 'Can police pull me over just for window tint?', a: 'Unless the statute says otherwise, yes: illegal tint is an equipment violation an officer can see from outside. Virginia is the clear exception: since 2020 its statute says no officer shall stop a vehicle for a tint violation, so it can only be cited after a stop for another reason. Tennessee, by contrast, writes that officers may stop a car they reasonably believe is in violation.' },
        { q: 'Does a tint ticket add points to my license?', a: 'Usually not, but it depends on the state. Virginia\'s statute says the infraction carries no demerit points, and Nevada says the violation is not a moving violation for demerit purposes. Florida, for its part, classes it as a nonmoving violation. Check the state\'s point schedule if your license is close to a suspension.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = h.STATES.map((s) => [h.sl(s.code), s.detail.penalty?.maxFineUsd != null ? h.m(s.detail.penalty.maxFineUsd) : h.nc, s.detail.penalty?.cite ?? h.nc]);
      return `
<h2>Highest fine written in each state</h2>
<p>The figure is the largest amount the statute, or the general penalty it points to, allows for driving with illegal tint, usually for a first offense. Surcharges and court costs come on top. "Not confirmed" means the amount sits in a schedule or rule that was not read for this site.</p>
${h.table(['State', 'Highest fine', 'Penalty provision'], rows, `Read in each state's statute for this site; ${f.withFine.length} of ${f.n} amounts confirmed.`, ['l', 'r', 'l'])}
<h2>Fix it before court</h2>
<p>A tint charge is one of the few traffic charges that the driver can often cure. The statutes read for this site show several routes:</p>
<ul>
<li>${h.sl('TX')}: an equipment charge is dismissed if the defect is fixed before the first court appearance, with an administrative fee of up to $10.</li>
<li>${h.sl('NC')}: removing the film, or replacing it with legal film, within 15 days and getting a compliance certificate is a defense.</li>
<li>${h.sl('VA')} and Oregon: the court may dismiss or reduce the charge when the windows are brought into compliance.</li>
<li>Connecticut: the owner must remove the material and present the car to the police department that issued the ticket within 60 days.</li>
<li>District of Columbia: the car must be inspected within 5 business days, and the fine rises to ${h.m(1000)} if it is not brought into compliance.</li>
</ul>
<p>Before you go back to the shop, find the film that will pass on your glass:</p>
<!--tool:mini:darkest|{"state":"TX","glass":75}-->
<h2>Installers pay more</h2>
<p>Many statutes treat the person who applies illegal film more harshly than the driver. Louisiana fines a seller or installer ${h.m(1000)} for a first offense. Hawaii fines an installer ${h.m(700)} to ${h.m(1200)} per offense, plus free reinstallation. South Carolina fines a professional tinter at least ${h.m(1000)}. In Ohio, operating a car with illegal tint is a minor misdemeanor, while installing it is a misdemeanor of the fourth degree. A shop that refuses to put dark film on your front doors is protecting itself as much as you.</p>
<h2>What the officer measures</h2>
<p>The charge rests on a meter reading of the window, film and glass together in most states, compared with the limit and any written tolerance. A few states, such as Tennessee, also make it an offense to refuse the field test. Keep the invoice and any label the installer placed on the glass: in Tennessee and Ohio the law requires one, and it helps if the reading is close to the limit.</p>
<h2>Repeat offenses</h2>
<p>Several states raise the stakes for a second ticket. California's base fine rises from $100 to $250 by the third within a year, Illinois turns a second violation into a Class C misdemeanor, and Massachusetts suspends the license for up to 90 days after a third conviction. Fixing the windows after the first ticket is the cheapest route.</p>`;
    },
  },
  es: {
    slug: 'multa-por-polarizado', nav: 'Multa por polarizado',
    card: 'La multa más alta que cada estado escribe por un polarizado ilegal, y los estados que anulan el cargo si se corrige la lámina.',
    title: 'Multa por polarizado 2026: montos por estado y cómo anularla',
    description: 'Multa por polarizado por estado: el monto más alto que escribe cada ley, los estados que anulan el cargo si se corrige la lámina y el riesgo del instalador.',
    h1: 'Multa por polarizado: cuánto cuesta y cuándo se puede anular',
    intro: 'Elija un estado para ver la multa más alta que su ley escribe por un polarizado ilegal, la tolerancia del medidor y el límite delantero. La tabla de abajo da todos los estados, con la ley citada.',
    resume: (h) => {
      const f = F(h);
      return `Una multa por polarizado suele ser un cargo pequeño con una trampa grande: en la mayoría de los estados hay que quitar la lámina de todos modos. De las ${f.n} jurisdicciones leídas para este sitio, ${f.withFine.length} escriben una multa máxima que pudo confirmarse en la ley o en la sanción general a la que remite. La más alta es de ${h.m(f.top[0].detail.penalty!.maxFineUsd!)}, en ${h.list(f.top.map((s) => s.code))}, y la más baja de ${h.m(f.low.detail.penalty!.maxFineUsd!)} en ${h.sl(f.low.code)}. En las otras ${f.unknown.length}, el monto lo fija una tabla o una regla general que no se leyó, y este sitio lo muestra como no confirmado en lugar de adivinarlo. El tipo de cargo cambia: una infracción civil en estados como Arizona y Michigan, un delito menor en Georgia, Carolina del Norte y Tennessee. Varios estados permiten evitar la sanción corrigiendo las ventanas: Texas anula el cargo con un cargo administrativo de 10 dólares como máximo, Carolina del Norte da una defensa si la lámina se quita en 15 días, y Virginia y Oregón dejan que el tribunal lo anule o lo reduzca con la prueba de conformidad. Los instaladores suelen arriesgar más que los conductores.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: '¿Cuánto cuesta una multa por polarizado?', a: `Depende del estado. El máximo escrito en la ley va de ${h.m(f.low.detail.penalty!.maxFineUsd!)} en Iowa a ${h.m(f.top[0].detail.penalty!.maxFineUsd!)} en ${h.listN(f.top.map((s) => s.code))}, y muchos estados añaden costas o recargos. Para ${f.unknown.length} jurisdicciones el monto está en una tabla que este sitio no ha leído.` },
        { q: '¿Se puede anular una multa por polarizado si quito la lámina?', a: 'En varios estados, sí. Texas anula un cargo de equipamiento corregido antes de la primera fecha en el tribunal, con un cargo de 10 dólares como máximo. Carolina del Norte da una defensa si la lámina se quita en 15 días con un certificado de conformidad. Virginia y Oregón dejan que el tribunal anule o reduzca el cargo con la prueba. Lleve la prueba al tribunal.' },
        { q: '¿La policía puede detenerme solo por el polarizado?', a: 'Salvo que la ley diga otra cosa, sí: un polarizado ilegal es una infracción de equipamiento que un agente ve desde fuera. Virginia es la excepción clara: desde 2020 su ley dice que ningún agente detendrá un vehículo por el polarizado, así que solo puede anotarse tras una parada por otro motivo. Tennessee, al contrario, escribe que los agentes pueden detener un auto que creen razonablemente en infracción.' },
        { q: '¿Una multa por polarizado suma puntos a la licencia?', a: 'Por lo general no, pero depende del estado. La ley de Virginia dice que la infracción no lleva puntos de demérito, y Nevada dice que no es una infracción de circulación a efectos de puntos. Florida, por su parte, la clasifica como una infracción sin movimiento. Revise la tabla de puntos de su estado si su licencia está cerca de una suspensión.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = h.STATES.map((s) => [h.sl(s.code), s.detail.penalty?.maxFineUsd != null ? h.m(s.detail.penalty.maxFineUsd) : h.nc, s.detail.penalty?.cite ?? h.nc]);
      return `
<h2>Multa más alta escrita en cada estado</h2>
<p>La cifra es el monto mayor que la ley, o la sanción general a la que remite, permite por manejar con un polarizado ilegal, casi siempre para una primera infracción. Los recargos y las costas se suman. «No confirmado» significa que el monto está en una tabla o regla que no se leyó para este sitio.</p>
${h.table(['Estado', 'Multa más alta', 'Disposición de la sanción'], rows, `Leído en la ley de cada estado para este sitio; ${f.withFine.length} de ${f.n} montos confirmados.`, ['l', 'r', 'l'])}
<h2>Corregir antes del tribunal</h2>
<p>Un cargo por polarizado es uno de los pocos cargos de tránsito que el conductor puede corregir a menudo. Las leyes leídas para este sitio muestran varias vías:</p>
<ul>
<li>${h.sl('TX')}: un cargo de equipamiento se anula si el defecto se corrige antes de la primera comparecencia, con un cargo administrativo de 10 dólares como máximo.</li>
<li>${h.sl('NC')}: quitar la lámina, o cambiarla por una legal, en 15 días y obtener un certificado de conformidad es una defensa.</li>
<li>${h.sl('VA')} y Oregón: el tribunal puede anular o reducir el cargo cuando las ventanas se ponen en regla.</li>
<li>Connecticut: el dueño debe quitar el material y presentar el auto al departamento de policía que puso la multa en 60 días.</li>
<li>Distrito de Columbia: el auto debe pasar inspección en 5 días hábiles, y la multa sube a ${h.m(1000)} si no se pone en regla.</li>
</ul>
<p>Antes de volver al taller, busque la lámina que pasará sobre su vidrio:</p>
<!--tool:mini:darkest|{"state":"TX","glass":75}-->
<h2>Los instaladores pagan más</h2>
<p>Muchas leyes tratan con más dureza a quien aplica una lámina ilegal que al conductor. Luisiana multa a un vendedor o instalador con ${h.m(1000)} por una primera infracción. Hawái multa a un instalador con ${h.m(700)} a ${h.m(1200)} por infracción, más una reinstalación gratuita. Carolina del Sur multa a un instalador profesional con al menos ${h.m(1000)}. En Ohio, manejar con un polarizado ilegal es un delito menor leve, mientras que instalarlo es un delito menor de cuarto grado. Un taller que se niega a poner una lámina oscura en sus puertas delanteras se protege a sí mismo tanto como a usted.</p>
<h2>Lo que mide el agente</h2>
<p>El cargo se basa en la lectura del medidor sobre la ventana, lámina y vidrio juntos en la mayoría de los estados, comparada con el límite y la tolerancia escrita. Algunos estados, como Tennessee, también castigan la negativa a la prueba en el lugar. Guarde la factura y la etiqueta que el instalador puso en el vidrio: en Tennessee y Ohio la ley la exige, y ayuda si la lectura está cerca del límite.</p>
<h2>Reincidencia</h2>
<p>Varios estados suben la apuesta en una segunda multa. La multa base de California pasa de 100 a 250 dólares en la tercera dentro de un año, Illinois convierte una segunda infracción en un delito menor de clase C, y Massachusetts suspende la licencia hasta 90 días tras una tercera condena. Corregir las ventanas tras la primera multa es lo más barato.</p>`;
    },
  },
});
