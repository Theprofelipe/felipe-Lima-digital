"use client";

import { useRef, useState } from "react";
import { projects } from "../data/site";

export function ProjectsCarousel({ compact = false }: { compact?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const move = (direction: -1 | 1) => {
    const next = Math.min(Math.max(active + direction, 0), projects.length - 1);
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
      <div className="carousel-toolbar">
        <p aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
        <div>
          <button type="button" aria-label="Projeto anterior" onClick={() => move(-1)} disabled={active === 0}>←</button>
          <button type="button" aria-label="Próximo projeto" onClick={() => move(1)} disabled={active === projects.length - 1}>→</button>
        </div>
      </div>
      <div className="projects-track" ref={trackRef} onScroll={onScroll} aria-label="Projetos conceito">
        {projects.map((project, index) => (
          <article className="project-slide" key={project.slug} aria-label={`${project.name}, ${project.category}`}>
            <div className={`project-art project-art-${project.tone}`}>
              <span className="concept-label">Projeto conceito</span>
              <div className="project-browser">
                <div className="project-browser-top"><span><i /><i /><i /></span><em>{project.slug}.conceito</em></div>
                {index === 0 && (
                  <div className="atlas-ui"><aside><b>A</b><i /><i /><i /><i /></aside><main><span>Bom dia.</span><h3>Operação em foco</h3><div className="atlas-metrics"><i /><i /><i /></div><div className="atlas-chart"><span /><span /><span /><span /><span /><span /></div></main></div>
                )}
                {index === 1 && (
                  <div className="nativa-ui"><nav><b>nativa°</b><span>projetos &nbsp; estúdio</span></nav><div><small>CASA VENTO • 2026</small><h3>Espaços para<br />viver devagar.</h3><i /></div></div>
                )}
                {index === 2 && (
                  <div className="elo-ui"><header><b>elo.</b><span>Atendimento ativo</span></header><main><div className="elo-flow"><i>Mensagem</i><span /><i>IA</i><span /><i>CRM</i></div><div className="elo-chat"><p>Como podemos ajudar?</p><p>Quero conhecer o serviço.</p><p>Perfeito. Vou organizar as informações.</p></div></main></div>
                )}
              </div>
            </div>
            <div className="project-info">
              <span>{project.category}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <span className="text-link text-link-muted" aria-label={`${project.name} ainda é um projeto conceito`}>Estudo demonstrativo <span>↗</span></span>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-dots" aria-hidden="true">
        {projects.map((project, index) => <i key={project.slug} className={index === active ? "active" : ""} />)}
      </div>
    </div>
  );
}
