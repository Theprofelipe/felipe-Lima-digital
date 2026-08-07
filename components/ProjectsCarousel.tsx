"use client";

import { useRef, useState } from "react";
import { projects } from "../data/site";

export function ProjectsCarousel({ compact = false }: { compact?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const featuredProject = projects.find((project) => project.slug === "flowlead");
  const visibleProjects = compact ? projects : projects.filter((project) => project.slug !== "flowlead");

  const move = (direction: -1 | 1) => {
    const next = Math.min(Math.max(active + direction, 0), visibleProjects.length - 1);
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActive(next);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const closest = slides.reduce((best, slide, index) => {
      const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setActive(closest.index);
  };

  return (
    <div className={`projects-carousel ${compact ? "is-compact" : ""}`}>
      {!compact && featuredProject?.detailUrl && (
        <a className="flowlead-feature-card" href={featuredProject.detailUrl} aria-label="FlowLead: explorar demonstração interativa">
          <div className="flowlead-feature-copy">
            <div className="flowlead-feature-meta">
              <span>{featuredProject.status}</span>
              <i aria-hidden="true" />
              <span>{featuredProject.category}</span>
            </div>
            <strong className="flowlead-feature-name">{featuredProject.name}</strong>
            <h3>Do novo contato à próxima ação, sem perder contexto.</h3>
            <p>Quando pedidos chegam sem padrão, informações e prioridades se perdem. O FlowLead organiza o briefing, explica a classificação e prepara o acompanhamento comercial.</p>
            <div className="flowlead-feature-live"><i aria-hidden="true" /><span>Demonstração interativa completa</span></div>
            <ul aria-label="Recursos demonstrados no FlowLead">
              <li><i aria-hidden="true">✓</i>Classificação transparente</li>
              <li><i aria-hidden="true">✓</i>Resumo comercial</li>
              <li><i aria-hidden="true">✓</i>Acompanhamento do lead</li>
            </ul>
            <span className="flowlead-feature-cta">Explorar demonstração <i aria-hidden="true">→</i></span>
          </div>

          <div className="flowlead-feature-preview" aria-hidden="true">
            <div className="flowlead-feature-window">
              <header><b>FL</b><span>FlowLead · visão comercial</span><em><i /> Local</em></header>
              <main>
                <div className="flowlead-feature-preview-heading"><span>Lead recebido</span><strong>Marina Alves</strong><small>Aurora Studio · Automação de processo</small></div>
                <div className="flowlead-feature-priority"><small>Prioridade</small><strong><i /> Alta</strong><span>Prazo curto + automação</span></div>
                <section className="flowlead-feature-summary">
                  <div><small>Resumo comercial</small><span>Pronto para copiar</span></div>
                  <p>Organizar pedidos e preparar o próximo contato da equipe.</p>
                  <i><span /></i>
                </section>
                <section className="flowlead-feature-progress">
                  <div><small>Acompanhamento</small><span>2 de 4 etapas</span></div>
                  <ol><li className="is-complete"><i>✓</i><span>Novo</span></li><li className="is-current"><i>2</i><span>Qualificado</span></li><li><i>3</i><span>Contato</span></li><li><i>4</i><span>Proposta</span></li></ol>
                </section>
              </main>
              <footer><span>Nenhum dado enviado</span><b>Simulação local</b></footer>
            </div>
          </div>
        </a>
      )}

      {!compact && <div className="projects-secondary-label"><span>Outros projetos</span><i /></div>}
      <div className="carousel-toolbar">
        <p aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(visibleProjects.length).padStart(2, "0")}</p>
        <div>
          <button type="button" aria-label="Projeto anterior" onClick={() => move(-1)} disabled={active === 0}>←</button>
          <button type="button" aria-label="Próximo projeto" onClick={() => move(1)} disabled={active === visibleProjects.length - 1}>→</button>
        </div>
      </div>
      <div className="projects-track" ref={trackRef} onScroll={onScroll} aria-label="Projetos selecionados">
        {visibleProjects.map((project) => (
          <article className="project-slide" key={project.slug} aria-label={`${project.name}, ${project.category}`}>
            <div className={`project-art project-art-${project.tone}`}>
              <span className="concept-label">{project.status}</span>
              <div className="project-browser">
                <div className="project-browser-top"><span><i /><i /><i /></span><em>{project.slug}</em></div>
                {project.visual === "flowlead" && (
                  <div className="flowlead-project-ui">
                    <header><b>FlowLead</b><span><i /> Fluxo local</span></header>
                    <main>
                      <div className="flowlead-mini-flow"><span>Lead</span><i>→</i><span>Qualificação</span><i>→</i><span>Acompanhamento</span></div>
                      <div className="flowlead-mini-grid">
                        <section><small>NOVO CONTATO</small><strong>Marina Alves</strong><em>Aurora Studio</em></section>
                        <section><small>PRIORIDADE</small><strong><i /> Alta</strong><em>Diagnóstico sugerido</em></section>
                      </div>
                    </main>
                    <footer><span>Dados processados no navegador</span><b>Simulação</b></footer>
                  </div>
                )}
                {project.visual === "felipe" && (
                  <div className="felipe-project-ui">
                    <header><b>FL</b><span>Serviços &nbsp; Projetos &nbsp; Contato</span></header>
                    <main><small>DESENVOLVIMENTO WEB &amp; IA</small><h3>Tecnologia para<br />empresas.</h3><div><i>Sites</i><i>Sistemas</i><i>Automação</i></div></main>
                    <footer><span>Orçamento inteligente</span><b>→</b></footer>
                  </div>
                )}
                {project.visual === "batata" && (
                  <div className="batata-project-ui">
                    <header><b>BATATA PIPAS</b><span>Catálogo &nbsp; Como comprar</span></header>
                    <main><small>ESCOLHA SUA PIPA</small><h3>Cor no céu.<br />Diversão no ar.</h3><div className="batata-products"><i /><i /><i /></div></main>
                    <footer><span>Catálogo responsivo</span><b>WhatsApp</b></footer>
                  </div>
                )}
                {project.visual === "dashboard" && (
                  <div className="atlas-ui"><aside><b>₿</b><i /><i /><i /><i /></aside><main><span>Visão geral do mercado</span><h3>Dados em foco</h3><div className="atlas-metrics"><i /><i /><i /></div><div className="atlas-chart"><span /><span /><span /><span /><span /><span /></div></main></div>
                )}
                {project.visual === "cafeteria" && (
                  <div className="nativa-ui"><nav><b>cafeteria.</b><span>menu &nbsp; história &nbsp; contato</span></nav><div><small>CAFÉS · ENCONTROS</small><h3>Sabor que convida<br />a desacelerar.</h3><i /></div></div>
                )}
              </div>
            </div>
            <div className="project-info">
              <span>{project.category}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tag-row" aria-label={`Tecnologias utilizadas em ${project.name}`}>{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
              <div className="project-links">
                {project.detailUrl && <a className="project-link project-link-primary" href={project.detailUrl} aria-label={`Explorar o projeto ${project.name}`}>Explorar projeto <span>→</span></a>}
                {project.liveUrl && <a className="project-link project-link-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver projeto ${project.name} em nova aba`}>Ver projeto <span>↗</span></a>}
                {project.githubUrl && <a className={`project-link ${project.liveUrl || project.detailUrl ? "project-link-secondary" : "project-link-primary"}`} href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver código do projeto ${project.name} no GitHub em nova aba`}>Ver código <span>↗</span></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-dots" aria-hidden="true">
        {visibleProjects.map((project, index) => <i key={project.slug} className={index === active ? "active" : ""} />)}
      </div>
    </div>
  );
}
