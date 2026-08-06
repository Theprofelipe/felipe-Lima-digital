import { contactLinks, navigation, services, siteConfig } from "../data/site";
import Link from "next/link";
import { Brand } from "./Navbar";

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
          <Link href="/#inicio" className="brand-link"><Brand /></Link>
          <p>Soluções digitais construídas com clareza, cuidado e responsabilidade.</p>
          <span>Fundado por Felipe Lima Machado</span>
        </div>
        <div className="footer-column">
          <h2>Navegação</h2>
          {navigation.slice(0, 6).map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </div>
        <div className="footer-column">
          <h2>Serviços</h2>
          {services.slice(0, 5).map((item) => <Link key={item.index} href="/#servicos">{item.title}</Link>)}
        </div>
        <div className="footer-column">
          <h2>Contato</h2>
          <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer">Solicitar orçamento</a>
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
