/* eslint-disable @next/next/no-html-link-for-pages -- Links nativos evitam uma falha de prefetch do adaptador Vinext atual. */
import { contactLinks, navigation, siteConfig } from "../data/site";
import { Brand } from "./Navbar";

const serviceLinks = [
  { label: "Criação de sites", href: "/servicos#criacao-de-sites" },
  { label: "Manutenção", href: "/servicos#manutencao" },
  { label: "Redes sociais", href: "/servicos#redes-sociais" },
  { label: "Automações", href: "/servicos#automacoes" },
  { label: "Inteligência artificial", href: "/servicos#inteligencia-artificial" },
] as const;

export function Footer() {
  const socialLinks = [
    { label: "GitHub", href: siteConfig.social.github },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "Instagram", href: siteConfig.social.instagram },
  ].filter((item) => item.href);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <a href="/#inicio" className="brand-link"><Brand /></a>
          <p>Soluções digitais construídas com clareza, cuidado e responsabilidade.</p>
          <span>Fundado por Felipe Lima Machado</span>
        </div>
        <div className="footer-column">
          <h2>Navegação</h2>
          {navigation.slice(0, 6).map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </div>
        <div className="footer-column">
          <h2>Serviços</h2>
          {serviceLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
        <div className="footer-column">
          <h2>Contato</h2>
          <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" data-budget-wizard aria-haspopup="dialog">Solicitar orçamento</a>
          <a href={contactLinks.email}>{siteConfig.contact.email}</a>
          <span className="footer-pending">{siteConfig.contact.locationLabel}</span>
          {socialLinks.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>)}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Felipe Lima Machado</span>
        <span>Desenvolvimento Web & Soluções Digitais com IA</span>
      </div>
    </footer>
  );
}
