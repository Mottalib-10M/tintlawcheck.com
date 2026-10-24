import type { Locale } from './routes';
const en = {
  updatedOn: 'State statutes checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Statutes read by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions drivers ask about tint', relatedCalculators: 'Other checks', sourcesTitle: 'Statutes and federal rules behind this page', writtenBy: 'Written by',
  asOf: 'Window tint statutes of the 50 states and DC, read section by section', lastUpdated: 'last checked on',
  footerValidated: 'Every limit links to the statute section it was read in',
  footerBrowser: 'The check runs in your browser · nothing you type is sent · free, no account, no installer',
  footerDisclaimer: 'Tint Law Check is an independent site published by Radif Partners. It is not a police agency, a DMV or a tint shop, and what it publishes is not legal advice. Limits are read in each state statute and can change; an officer or a court applies the law as written on the day, so confirm with your state before you buy film.',
  footerPopular: 'Tint laws by state',
  notFound: 'There is no page at this address. The window tint check for all 50 states and DC is on the home page.',
  readMore: 'Read more', back: 'Home',
  disclaimer: 'Limits read by Radif Partners in each state vehicle code. The result is a calculation, not a meter reading or legal advice: film labels and glass vary, so measure if you can and check the statute linked on the page.',
};
const es: typeof en = {
  updatedOn: 'Leyes estatales revisadas el', editorialPolicy: 'Política editorial', contactLabel: 'Contacto', reviewedBy: 'Leyes leídas por',
  skipToContent: 'Ir al contenido', mainNav: 'Navegación principal', breadcrumbLabel: 'Ruta de navegación', breadcrumbHome: 'Inicio', menuOpen: 'Abrir menú',
  faqTitle: 'Preguntas de los conductores sobre el polarizado', relatedCalculators: 'Otras comprobaciones', sourcesTitle: 'Leyes y reglas federales de esta página', writtenBy: 'Escrito por',
  asOf: 'Leyes de polarizado de los 50 estados y DC, leídas sección por sección', lastUpdated: 'última revisión el',
  footerValidated: 'Cada límite enlaza a la sección de la ley donde se leyó',
  footerBrowser: 'El cálculo se hace en su navegador · nada de lo que escribe se envía · gratis, sin cuenta, sin instalador',
  footerDisclaimer: 'Polarizado Legal por Estado es un sitio independiente publicado por Radif Partners. No es una policía, ni un DMV, ni un taller de polarizado, y lo que publica no sustituye una asesoría legal. Los límites se leen en la ley de cada estado y pueden cambiar; un agente o un juez aplica la ley vigente ese día, así que confírmela con su estado antes de comprar la lámina.',
  footerPopular: 'Polarizado por estado',
  notFound: 'No hay ninguna página en esta dirección. La comprobación del polarizado para los 50 estados y DC está en la página de inicio.',
  readMore: 'Leer más', back: 'Inicio',
  disclaimer: 'Límites leídos por Radif Partners en el código de vehículos de cada estado. El resultado es un cálculo, no una medición ni una asesoría legal: las etiquetas de las láminas y los vidrios varían, así que mida si puede y revise la ley enlazada en la página.',
};
export function t(lang: Locale) { return lang === 'es' ? es : en; }
