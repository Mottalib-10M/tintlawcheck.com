import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const ws = (c: string) => h.STATES.find((s) => s.code === c)!.passenger.windshield;
  const by = (t: (w: ReturnType<typeof ws>) => boolean) => h.STATES.filter((s) => t(s.passenger.windshield)).map((s) => s.code);
  const none = by((w) => w.rule === 'none');
  const vlt = by((w) => w.rule === 'vlt');
  const strip = by((w) => w.rule === 'strip');
  const inchOnly = (n: number) => by((w) => w.rule === 'strip' && w.stripInches === n && !w.asLine);
  const both = by((w) => w.rule === 'strip' && !!w.stripInches && !!w.asLine);
  const asOnly = by((w) => w.rule === 'strip' && !w.stripInches && !!w.asLine);
  const noInch = by((w) => w.rule === 'strip' && !w.stripInches && !w.asLine);
  const inches = [4, 5, 6].map((n) => ({ n, c: inchOnly(n) }));
  void ws;
  return { none, vlt, strip, both, asOnly, noInch, inches, n: h.STATES.length };
};

export default definePage({
  id: 'windshield', group: 'tint', order: 5,
  tool: { kind: 'mini:windshield', props: { state: 'TX', inches: 5 } },
  mini: { kind: 'mini:medical' },
  related: ['home', 'by-state', 'percentage', 'state-oh', 'state-tn', 'state-ca'],
  sources: ['fmvss205', 'nhtsa_70', 'fmcsa_393_60'],
  en: {
    slug: 'windshield-tint-laws', nav: 'Windshield tint',
    card: 'How far down a windshield strip may go in each state, in inches or to the AS-1 line, and where no film is allowed.',
    title: 'Windshield Tint Laws 2026: Strip Depth and AS-1 by State',
    description: 'Windshield tint laws by state: how deep the top strip may go, in inches or to the AS-1 line, where 70% applies to the whole glass and where no film is allowed.',
    h1: 'Windshield tint laws: how deep the strip may go in each state',
    intro: 'Pick a state and enter the depth of your strip, measured from the top edge of the glass: the tool says whether it fits the statute or whether the windshield follows a percentage rule instead.',
    resume: (h) => {
      const f = F(h);
      return `No state lets you tint a whole windshield the way you tint a side window. Federal standard FMVSS 205 already requires the glass a driver looks through to transmit at least 70% of the light, and state laws build on that. In ${f.strip.length} of the ${f.n} jurisdictions read, the rule is a strip along the top: ${f.both.length} measure it both in inches and against the AS-1 line printed on the glass, ${f.inches.reduce((a, b) => a + b.c.length, 0)} give a depth in inches only, ${f.asOnly.length} use the AS-1 line only, and ${f.noInch.length} describe the strip without an inch figure, such as California's and Arizona's rule measured from the driver's seat. ${f.vlt.length} jurisdictions set a percentage for the whole windshield instead, most often 70%, and ${f.none.length}, ${h.list(f.none)}, allow no film at all. Clear film that blocks ultraviolet light is allowed on the whole windshield in a few states, Virginia and North Carolina among them since recent amendments. Medical exemptions cover the windshield only where the statute says so.`;
    },
    faqs: (h) => [
      { q: 'What is the AS-1 line on a windshield?', a: 'It is a marking printed by the glass maker near the top corners of the windshield, often with an arrow and the letters AS-1 or AS1. It shows the lower edge of the area where tinting is allowed under the industry standard incorporated by FMVSS 205. Many state laws let a strip come down to that line and no further.' },
      { q: 'How many inches of windshield tint are legal?', a: `It depends on the state. Among those that write a figure, the depth is 4, 5 or 6 inches from the top. Some add the AS-1 line and say which of the two applies, the longer or the closer to the top. ${h.listN(F(h).none)} allow no strip at all. The tool at the top of this page checks your depth against the statute.` },
      { q: 'Is clear windshield film legal?', a: 'In some states, yes. Virginia allowed clear film on the whole windshield in 2026 if the glass stays within FMVSS 205, and North Carolina allows untinted clear UV film on the windshield. Elsewhere the statute may ban any film below the strip, whatever its color. A clear film still lowers the reading slightly, so it must keep the glass at 70%.' },
      { q: 'Do commercial trucks have a different windshield rule?', a: 'Yes, under federal rules. Section 393.60(d) of the motor carrier safety regulations allows coloring or tinting of the windshield and the windows to the immediate right and left of the driver only if the parallel luminous transmittance is at least 70%. State rules for private cars do not change that federal floor for commercial vehicles.' },
    ],
    body: (h) => {
      const f = F(h);
      const rows = [
        ...f.inches.filter((x) => x.c.length).map((x) => [`Top ${x.n} inches`, h.list(x.c), x.c.length]),
        ['Inches or the AS-1 line (see the state page for which applies)', h.list(f.both), f.both.length],
        ['Down to the AS-1 line', h.list(f.asOnly), f.asOnly.length],
        ['Strip without an inch figure', h.list(f.noInch), f.noInch.length],
        ['Percentage for the whole windshield', h.list(f.vlt), f.vlt.length],
        ['No film at all', h.list(f.none), f.none.length],
      ];
      return `
<h2>Windshield rule by state</h2>
<p>The table sorts every jurisdiction by the kind of windshield rule its statute writes for a passenger car. Where a state gives both an inch figure and the AS-1 line, its page says whether the longer or the shorter applies.</p>
${h.table(['Rule', 'States', 'Count'], rows, `Windshield rule for a passenger car in the ${f.n} jurisdictions read for this site.`, ['l', 'l', 'r'])}
<h2>The federal floor</h2>
<p>${h.src('fmvss205', 'FMVSS 205')} sets the minimum light transmittance of glass requisite for driving visibility at 70%, and the windshield is the first such window. Federal regulators have explained that film applied after sale can take a window below that level (${h.src('nhtsa_70', 'NHTSA interpretation')}). That is why state laws, even the most permissive on side windows, keep the windshield almost clear and allow tint only in a band at the top, where the sun visor sits.</p>
<h2>How to measure a strip</h2>
<p>Measure straight down from the top edge of the glass, not along the curve of the frame. Check for the AS-1 marking near the upper corners: if your state uses it, the strip must stop at that line. In California and Arizona the rule is measured from the driver's seat: the strip's lower edge must stay at least 29 inches above the undepressed seat, so a tall windshield can carry a deeper band. Enter your measurement in the tool above for any state.</p>
<h2>Color and shine of the strip</h2>
<p>Depth is not the only test. Several statutes ban red or amber on the windshield band, Georgia and Arizona among them, and others require the strip to be nonreflective, as Illinois and Michigan do. A mirror-finish visor strip can therefore fail even when it stops at the right line. If a shop offers a colored or metallic band, check the state page before it goes on.</p>
<h2>States with a percentage instead of a strip</h2>
<p>${h.list(f.vlt)} set a light transmittance for the windshield itself. Most use 70%, the federal figure, and some still allow a darker band above the AS-1 line or in the top few inches. Pennsylvania's figure comes from its inspection table, and Ohio's from its administrative code, which also allows a strip of up to 5 inches. In these states a clear film is possible as long as the combined reading stays at the limit.</p>
<h2>Medical exemptions and the windshield</h2>
<p>A medical exemption does not always reach the windshield. North Carolina's medical permit leaves the windshield rule unchanged. Virginia's authorization allows 70% below the top 5 inches or the AS-1 line. New York's and Illinois's exemptions cover the windshield along with the front side windows. Check whether your state allows one here:</p>
<!--tool:mini:medical|{"state":"NY"}-->
<h2>Commercial vehicles</h2>
<p>For trucks and buses in interstate commerce, ${h.src('fmcsa_393_60', '49 CFR 393.60(d)')} allows tint on the windshield and the side windows next to the driver only when they still transmit at least 70% of the light. Owners of light trucks used privately follow their state law instead.</p>`;
    },
  },
  es: {
    slug: 'polarizado-del-parabrisas', nav: 'Parabrisas',
    card: 'Hasta dónde puede bajar la franja del parabrisas en cada estado, en pulgadas o hasta la línea AS-1, y dónde no se admite lámina.',
    title: 'Polarizado del parabrisas 2026: franja y AS-1 por estado',
    description: 'Polarizado del parabrisas por estado: cuánto puede bajar la franja, en pulgadas o hasta la línea AS-1, dónde se pide 70 % en todo el vidrio y dónde se prohíbe.',
    h1: 'Polarizado del parabrisas: hasta dónde puede bajar la franja en cada estado',
    intro: 'Elija un estado y ponga la altura de su franja, medida desde el borde superior del vidrio: la herramienta dice si cumple la ley o si el parabrisas sigue una regla de porcentaje.',
    resume: (h) => {
      const f = F(h);
      return `Ningún estado permite polarizar todo el parabrisas como se polariza una ventana lateral. La norma federal FMVSS 205 ya exige que el vidrio a través del cual mira el conductor transmita al menos el 70 % de la luz, y las leyes estatales parten de ahí. En ${f.strip.length} de las ${f.n} jurisdicciones leídas, la regla es una franja en la parte alta: ${f.both.length} la miden a la vez en pulgadas y respecto de la línea AS-1 impresa en el vidrio, ${f.inches.reduce((a, b) => a + b.c.length, 0)} dan una altura solo en pulgadas, ${f.asOnly.length} usan solo la línea AS-1, y ${f.noInch.length} describen la franja sin cifra en pulgadas, como la regla de California y de Arizona, medida desde el asiento del conductor. ${f.vlt.length} jurisdicciones fijan en cambio un porcentaje para todo el parabrisas, casi siempre 70 %, y ${f.none.length}, ${h.list(f.none)}, no admiten ninguna lámina. Una lámina transparente que bloquea los rayos ultravioleta se permite en todo el parabrisas en algunos estados, entre ellos Virginia y Carolina del Norte desde reformas recientes. Las exenciones médicas solo cubren el parabrisas cuando la ley lo dice.`;
    },
    faqs: (h) => [
      { q: '¿Qué es la línea AS-1 del parabrisas?', a: 'Es una marca impresa por el fabricante del vidrio cerca de las esquinas superiores del parabrisas, a menudo con una flecha y las letras AS-1 o AS1. Indica el borde inferior de la zona donde se permite polarizar según la norma industrial incorporada en la FMVSS 205. Muchas leyes estatales dejan que la franja baje hasta esa línea y no más.' },
      { q: '¿Cuántas pulgadas de polarizado en el parabrisas son legales?', a: `Depende del estado. Entre los que escriben una cifra, la altura es de 4, 5 o 6 pulgadas desde arriba. Algunos añaden la línea AS-1 y dicen cuál de las dos se aplica, la más larga o la más cercana al borde. ${h.listN(F(h).none)} no admiten ninguna franja. La herramienta de arriba compara su medida con la ley.` },
      { q: '¿Es legal una lámina transparente en el parabrisas?', a: 'En algunos estados, sí. Virginia admitió en 2026 una lámina transparente en todo el parabrisas si el vidrio sigue cumpliendo la FMVSS 205, y Carolina del Norte admite una lámina transparente contra los rayos UV en el parabrisas. En otros lugares la ley puede prohibir cualquier lámina debajo de la franja, sea cual sea su color. Una lámina clara baja un poco la lectura, así que debe mantener el vidrio en 70 %.' },
      { q: '¿Los camiones comerciales tienen otra regla para el parabrisas?', a: 'Sí, según las normas federales. La sección 393.60(d) de las normas de seguridad de los transportistas solo permite colorear o polarizar el parabrisas y las ventanas a la derecha y a la izquierda del conductor si la transmisión luminosa paralela es de al menos 70 %. Las reglas estatales para autos particulares no cambian ese piso federal para los vehículos comerciales.' },
    ],
    body: (h) => {
      const f = F(h);
      const rows = [
        ...f.inches.filter((x) => x.c.length).map((x) => [`${x.n} pulgadas superiores`, h.list(x.c), x.c.length]),
        ['Pulgadas o línea AS-1 (la página del estado dice cuál se aplica)', h.list(f.both), f.both.length],
        ['Hasta la línea AS-1', h.list(f.asOnly), f.asOnly.length],
        ['Franja sin cifra en pulgadas', h.list(f.noInch), f.noInch.length],
        ['Porcentaje para todo el parabrisas', h.list(f.vlt), f.vlt.length],
        ['Ninguna lámina', h.list(f.none), f.none.length],
      ];
      return `
<h2>Regla del parabrisas por estado</h2>
<p>La tabla ordena cada jurisdicción según el tipo de regla que su ley escribe para el parabrisas de un auto de pasajeros. Cuando un estado da a la vez una cifra en pulgadas y la línea AS-1, su página dice si se aplica la más larga o la más corta.</p>
${h.table(['Regla', 'Estados', 'Número'], rows, `Regla del parabrisas de un auto de pasajeros en las ${f.n} jurisdicciones leídas para este sitio.`, ['l', 'l', 'r'])}
<h2>El piso federal</h2>
<p>La ${h.src('fmvss205', 'FMVSS 205')} fija en 70 % la transmisión mínima del vidrio necesario para la visibilidad al manejar, y el parabrisas es la primera de esas ventanas. Los reguladores federales han explicado que una lámina aplicada después de la venta puede bajar una ventana por debajo de ese nivel (${h.src('nhtsa_70', 'interpretación de la NHTSA')}). Por eso las leyes estatales, incluso las más permisivas con las laterales, mantienen el parabrisas casi claro y solo admiten polarizado en una banda en la parte alta, donde está el parasol.</p>
<h2>Cómo medir una franja</h2>
<p>Mida en línea recta hacia abajo desde el borde superior del vidrio, no siguiendo la curva del marco. Busque la marca AS-1 cerca de las esquinas superiores: si su estado la usa, la franja debe detenerse en esa línea. En California y Arizona la regla se mide desde el asiento del conductor: el borde inferior de la franja debe quedar al menos a 29 pulgadas por encima del asiento sin hundir, así que un parabrisas alto admite una banda más honda. Ponga su medida en la herramienta de arriba para cualquier estado.</p>
<h2>Color y brillo de la franja</h2>
<p>La altura no es la única prueba. Varias leyes prohíben el rojo o el ámbar en la banda del parabrisas, entre ellas las de Georgia y Arizona, y otras exigen que la franja sea no reflectante, como Illinois y Michigan. Una franja con acabado espejo puede así fallar aunque se detenga en la línea correcta. Si un taller ofrece una banda de color o metálica, revise la página del estado antes de ponerla.</p>
<h2>Estados con un porcentaje en lugar de una franja</h2>
<p>${h.list(f.vlt)} fijan una transmisión de luz para el parabrisas mismo. La mayoría usa 70 %, la cifra federal, y algunos admiten todavía una banda más oscura sobre la línea AS-1 o en las primeras pulgadas. La cifra de Pensilvania viene de su tabla de inspección, y la de Ohio de su código administrativo, que también admite una franja de hasta 5 pulgadas. En estos estados es posible una lámina clara siempre que la lectura combinada quede en el límite.</p>
<h2>Exenciones médicas y parabrisas</h2>
<p>Una exención médica no siempre alcanza el parabrisas. El permiso médico de Carolina del Norte deja intacta la regla del parabrisas. La autorización de Virginia permite 70 % por debajo de las 5 pulgadas superiores o de la línea AS-1. Las exenciones de Nueva York y de Illinois cubren el parabrisas junto con las laterales delanteras. Vea si su estado prevé una aquí:</p>
<!--tool:mini:medical|{"state":"NY"}-->
<h2>Vehículos comerciales</h2>
<p>Para los camiones y autobuses del comercio interestatal, la ${h.src('fmcsa_393_60', '49 CFR 393.60(d)')} solo admite polarizado en el parabrisas y en las laterales junto al conductor si siguen transmitiendo al menos el 70 % de la luz. Los dueños de camionetas de uso particular siguen la ley de su estado.</p>`;
    },
  },
});
