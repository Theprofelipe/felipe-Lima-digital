import {
  articles,
  capabilities,
  contactLinks,
  differentials,
  faqs,
  processSteps,
  services,
} from "../data/site";
import { AutomationConsole, SiteDeviceVisual } from "./Visuals";
import { ContactCTA } from "./ContactCTA";
import { EditorialHero } from "./EditorialHero";
import { FounderPortrait } from "./FounderPortrait";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { Reveal } from "./Reveal";

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <span className="eyebrow"><i /> {eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function Hero() {
  return <EditorialHero />;
}

export function Services() {
  return (
    <section className="section services-section" id="servicos">
      <div className="container">
        <Reveal>
          <div className="section-topline">
            <SectionHeading
              eyebrow="O que construímos"
              title={<>Soluções digitais<br />sob medida.</>}
              text="Do primeiro contato à operação do dia a dia, a tecnologia deve facilitar o trabalho e abrir novas possibilidades."
            />
            <p className="section-note">Um parceiro técnico para transformar problemas e ideias em experiências digitais bem resolvidas.</p>
          </div>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.index} delay={(index % 3) * 80}>
              <article className="service-card">
                <div className="service-card-top"><span>{service.index}</span><i aria-hidden="true">↗</i></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section className="section capabilities-section" id="solucoes">
      <div className="container">
        <Reveal>
          <div className="capabilities-panel">
            <div className="capability-copy">
              <span className="eyebrow eyebrow-light"><i /> Da ideia à solução</span>
              <h2>Tem uma ideia<br />diferente?</h2>
              <p>Nem todo problema cabe em um pacote pronto. Entendemos o cenário, organizamos as prioridades e construímos a solução adequada.</p>
              <a className="text-link text-link-light" href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer">Conversar sobre uma ideia <span>→</span></a>
            </div>
            <div className="capability-orbit" aria-label="Tipos de soluções que podem ser desenvolvidas">
              <div className="orbit-grid" aria-hidden="true" />
              <div className="orbit-center"><span>Seu<br />desafio</span><i /></div>
              {capabilities.map((capability, index) => (
                <span className={`orbit-chip orbit-chip-${index + 1}`} key={capability}>{capability}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Automation() {
  return (
    <section className="section automation-section" id="automacao">
      <div className="container automation-grid">
        <Reveal className="automation-copy-wrap">
          <div className="automation-copy">
            <SectionHeading
              eyebrow="Automação & Inteligência Artificial"
              title={<>Menos tarefas repetitivas.<br />Mais tempo para decidir.</>}
              text="Conectamos canais, dados e inteligência para que processos importantes avancem sem depender de cada etapa manual."
            />
            <div className="automation-list">
              <div><span>01</span><p><strong>Atendimento organizado</strong>Respostas, triagem e encaminhamento com contexto.</p></div>
              <div><span>02</span><p><strong>Operação conectada</strong>CRM, pedidos, agenda e equipe falando a mesma língua.</p></div>
              <div><span>03</span><p><strong>Visão do processo</strong>Notificações e relatórios no momento certo.</p></div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}><AutomationConsole /></Reveal>
      </div>
    </section>
  );
}

export function SitesShowcase() {
  const benefits = ["Velocidade", "Responsividade", "Conversão", "SEO", "Credibilidade", "Acessibilidade"];
  return (
    <section className="section sites-showcase" id="sites">
      <div className="container">
        <Reveal>
          <div className="sites-panel">
            <div className="sites-panel-copy">
              <span className="eyebrow"><i /> Sites & experiências</span>
              <h2>Sites que trabalham<br />pelo seu negócio.</h2>
              <p>Uma presença digital bonita precisa também ser rápida, clara e preparada para transformar visitantes em conversas.</p>
              <div className="benefit-chips">{benefits.map((benefit) => <span key={benefit}><i />{benefit}</span>)}</div>
              <a className="button button-primary" href="/sites">Conhecer criação de sites <span>→</span></a>
            </div>
            <SiteDeviceVisual />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="section projects-section" id="projetos">
      <div className="container">
        <Reveal>
          <div className="section-topline projects-heading">
            <SectionHeading eyebrow="Projetos" title={<>Projetos que transformam<br />ideias em produto.</>} />
            <p className="section-note">Uma seleção de soluções, experiências digitais e projetos conceituais desenvolvidos para explorar desafios reais de negócios.</p>
          </div>
        </Reveal>
        <Reveal delay={100}><ProjectsCarousel /></Reveal>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section process-section" id="processo">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Como trabalhamos"
            title={<>Clareza do primeiro<br />contato à evolução.</>}
            text="Um processo organizado reduz incertezas e mantém cada decisão conectada ao que o negócio precisa."
          />
        </Reveal>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={(index % 3) * 70}>
              <article className="process-step">
                <div><span>{step.number}</span><i /></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Differentials() {
  return (
    <section className="section differentials-section">
      <div className="container">
        <Reveal>
          <SectionHeading align="center" eyebrow="O que orienta cada entrega" title={<>Tecnologia bem feita.<br />Relação bem conduzida.</>} />
        </Reveal>
        <div className="differentials-grid">
          {differentials.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 60}>
              <article className="differential-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Founder() {
  return (
    <section className="section founder-section" id="sobre">
      <div className="container founder-grid">
        <Reveal><FounderPortrait /></Reveal>
        <Reveal delay={100}>
          <div className="founder-copy">
            <span className="eyebrow"><i /> Quem está por trás</span>
            <blockquote>“Tecnologia deve resolver problemas reais.”</blockquote>
            <p>Felipe Lima Machado é o fundador e responsável pelo desenvolvimento das soluções. O trabalho nasce de uma ideia simples: entender bem antes de construir.</p>
            <p>Cada projeto combina proximidade no atendimento, cuidado com a experiência e responsabilidade técnica para transformar uma necessidade em algo claro, útil e preparado para evoluir.</p>
            <div className="founder-principles">
              <span><i>01</i> Ouvir com atenção</span>
              <span><i>02</i> Construir com clareza</span>
              <span><i>03</i> Entregar com responsabilidade</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function BlogPreview() {
  return (
    <section className="section blog-preview-section" id="blog">
      <div className="container">
        <Reveal>
          <div className="section-topline">
            <SectionHeading eyebrow="Insights" title={<>Tecnologia explicada<br />sem complicação.</>} />
            <a className="text-link" href="/blog">Ver todos os artigos <span>→</span></a>
          </div>
        </Reveal>
        <div className="articles-grid">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 70}>
              <article className="article-card">
                <div className={`article-art article-art-${index + 1}`} aria-hidden="true"><span /><i /><b /></div>
                <div className="article-meta"><span>{article.category}</span><i />{article.readingTime}</div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="text-link text-link-muted">Conteúdo inicial <span>↗</span></span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <Reveal>
          <div className="faq-heading">
            <SectionHeading eyebrow="Perguntas frequentes" title={<>Antes de começar,<br />vale saber.</>} text="Respostas diretas para as dúvidas mais comuns sobre escopo, prazo e continuidade." />
            <a className="text-link" href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer">Ainda tem uma dúvida? <span>→</span></a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <details key={item.question} name="faq">
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<i /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { ContactCTA };
