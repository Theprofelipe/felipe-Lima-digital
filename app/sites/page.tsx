import type { Metadata } from "next";
import { ContactCTA } from "../../components/ContactCTA";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { ProjectsCarousel } from "../../components/ProjectsCarousel";
import { Reveal } from "../../components/Reveal";
import { SiteDeviceVisual } from "../../components/Visuals";
import { contactLinks, faqs, processSteps, siteTypes } from "../../data/site";

export const metadata: Metadata = {
  title: "Criação de Sites Profissionais | Felipe Lima Digital",
  description: "Sites profissionais, rápidos, responsivos e pensados para gerar credibilidade e novas oportunidades para o seu negócio.",
  alternates: { canonical: "/sites" },
};

const benefits = [
  { label: "Velocidade", title: "Cada segundo importa.", text: "Páginas leves e respostas rápidas ajudam o visitante a continuar e facilitam a conversão." },
  { label: "Responsividade", title: "Feito para qualquer tela.", text: "A experiência é planejada para celular, tablet e desktop com a mesma atenção." },
  { label: "Clareza", title: "Sua mensagem sem ruído.", text: "Conteúdo, hierarquia e navegação trabalham juntos para explicar o valor do seu negócio." },
  { label: "SEO técnico", title: "Uma base encontrável.", text: "Estrutura semântica e fundamentos técnicos para mecanismos de busca entenderem o site." },
];

export default function SitesPage() {
  return (
    <>
      <Navbar />
      <main className="inner-page sites-page">
        <section className="inner-hero sites-inner-hero">
          <div className="inner-hero-glow" />
          <div className="container inner-hero-grid">
            <div className="inner-hero-copy">
              <span className="eyebrow"><i /> Criação de sites</span>
              <h1>Seu site precisa fazer mais do que <span>parecer bonito.</span></h1>
              <p>Projetamos experiências rápidas, responsivas e confiáveis para apresentar o seu negócio com clareza e transformar visitas em oportunidades.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" data-budget-wizard aria-haspopup="dialog">Solicitar orçamento <span>↗</span></a>
                <a className="button button-secondary" href="#tipos-de-site">Conhecer opções <span>↓</span></a>
              </div>
            </div>
            <SiteDeviceVisual />
          </div>
          <div className="container inner-proof-row">
            <span><i /> Experiência pensada para mobile</span>
            <span><i /> Performance desde a primeira linha</span>
            <span><i /> Estrutura pronta para evoluir</span>
          </div>
        </section>

        <section className="section site-benefits-section">
          <div className="container">
            <Reveal>
              <div className="section-heading"><span className="eyebrow"><i /> O que um bom site entrega</span><h2>Credibilidade que se percebe.<br />Performance que se sente.</h2></div>
            </Reveal>
            <div className="site-benefits-grid">
              {benefits.map((benefit, index) => (
                <Reveal key={benefit.label} delay={index * 60}>
                  <article><span>{String(index + 1).padStart(2, "0")} • {benefit.label}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section site-types-section" id="tipos-de-site">
          <div className="container site-types-grid">
            <Reveal>
              <div className="sticky-heading"><span className="eyebrow"><i /> Formatos</span><h2>O site certo para o momento do seu negócio.</h2><p>A estrutura é definida pelo objetivo, não por um modelo fixo.</p></div>
            </Reveal>
            <div className="site-types-list">
              {siteTypes.map((type, index) => (
                <Reveal key={type.title} delay={(index % 2) * 60}>
                  <article><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{type.title}</h3><p>{type.text}</p></div><i>↗</i></article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section performance-section">
          <div className="container performance-panel">
            <Reveal>
              <div className="performance-copy"><span className="eyebrow eyebrow-light"><i /> Performance</span><h2>Rápido não é um detalhe.<br />É parte da experiência.</h2><p>Uma base leve melhora a navegação, ajuda mecanismos de busca e transmite profissionalismo em cada interação.</p></div>
            </Reveal>
            <Reveal delay={100}>
              <div className="performance-visual">
                <div className="speed-rings"><i /><i /><span><small>Experiência</small><strong>Ágil</strong><em>em qualquer tela</em></span></div>
                <div className="speed-principles"><span><i /> Carregamento eficiente</span><span><i /> Imagens otimizadas</span><span><i /> Interações responsivas</span><span><i /> Código enxuto</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section sites-process-section">
          <div className="container">
            <Reveal><div className="section-heading"><span className="eyebrow"><i /> Processo</span><h2>Da primeira conversa<br />ao site no ar.</h2></div></Reveal>
            <div className="sites-process-track">
              {processSteps.slice(0, 5).map((step, index) => <Reveal key={step.number} delay={index * 50}><article><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section related-projects-section">
          <div className="container">
            <Reveal><div className="section-heading"><span className="eyebrow"><i /> Possibilidades</span><h2>Experiências em contexto.</h2><p>Estudos conceito para visualizar diferentes direções de projeto.</p></div></Reveal>
            <Reveal delay={80}><ProjectsCarousel compact /></Reveal>
          </div>
        </section>

        <section className="section compact-faq-section">
          <div className="container faq-grid">
            <Reveal><div className="faq-heading"><span className="eyebrow"><i /> FAQ</span><h2>Dúvidas sobre<br />criação de sites.</h2><p>O essencial para começar uma conversa com segurança.</p></div></Reveal>
            <Reveal delay={80}><div className="faq-list">{faqs.slice(0, 5).map((item, index) => <details key={item.question} name="sites-faq"><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<i /></summary><p>{item.answer}</p></details>)}</div></Reveal>
          </div>
        </section>
        <ContactCTA compact />
      </main>
      <Footer />
    </>
  );
}
