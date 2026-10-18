"use client";

import { useEffect, useRef } from "react";
import { contactLinks } from "../data/site";

const INTRO_SESSION_KEY = "fld-editorial-intro-seen";

export function EditorialHero() {
  const rootRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let intersecting = true;
    let pointerX = 0;
    let pointerY = 0;

    const renderPointer = () => {
      frame = 0;
      if (!intersecting || document.hidden || reduceMotion.matches) return;
      root.style.setProperty("--hero-pointer-x", pointerX.toFixed(3));
      root.style.setProperty("--hero-pointer-y", pointerY.toFixed(3));
    };

    const queuePointer = (event: PointerEvent) => {
      if (!finePointer.matches || reduceMotion.matches || !intersecting || document.hidden) return;
      const bounds = root.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
      if (!frame) frame = window.requestAnimationFrame(renderPointer);
    };

    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
      if (!frame) frame = window.requestAnimationFrame(renderPointer);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        root.dataset.motionActive = intersecting && !document.hidden && !reduceMotion.matches ? "true" : "false";
        if (!intersecting) resetPointer();
      },
      { rootMargin: "80px 0px", threshold: 0.01 },
    );

    const updateMotionPreference = () => {
      root.dataset.motionActive = intersecting && !document.hidden && !reduceMotion.matches ? "true" : "false";
      if (reduceMotion.matches) resetPointer();
    };
    const updateVisibility = () => {
      root.dataset.motionActive = intersecting && !document.hidden && !reduceMotion.matches ? "true" : "false";
    };

    observer.observe(root);
    root.addEventListener("pointermove", queuePointer, { passive: true });
    root.addEventListener("pointerleave", resetPointer);
    root.addEventListener("pointercancel", resetPointer);
    reduceMotion.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer.disconnect();
      root.removeEventListener("pointermove", queuePointer);
      root.removeEventListener("pointerleave", resetPointer);
      root.removeEventListener("pointercancel", resetPointer);
      reduceMotion.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = navigation?.type === "reload";
    let hasPlayed = false;
    try {
      hasPlayed = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "true";
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    } catch {
      // Storage can be unavailable in privacy-restricted contexts. The Hero remains visible.
    }

    const finishIntro = (event: AnimationEvent) => {
      if (event.animationName !== "opening-shell") return;
      intro.classList.remove("is-playing");
      intro.removeEventListener("animationend", finishIntro);
    };
    let introFallback: number | undefined;
    if (isReload || !hasPlayed) {
      intro.addEventListener("animationend", finishIntro);
      intro.classList.add("is-playing");
      window.requestAnimationFrame(() => {
        const shellAnimation = intro.getAnimations().find((animation) => (animation as CSSAnimation).animationName === "opening-shell");
        shellAnimation?.finished.then(() => intro.classList.remove("is-playing")).catch(() => undefined);
      });
      introFallback = window.setTimeout(() => intro.classList.remove("is-playing"), 2200);
    }
    return () => {
      intro.removeEventListener("animationend", finishIntro);
      if (introFallback) window.clearTimeout(introFallback);
    };
  }, []);

  return (
    <section ref={rootRef} className="editorial-hero" id="inicio" data-motion-active="true">
      <div ref={introRef} className="site-opening" aria-hidden="true">
        <div className="site-opening-panel" />
        <div className="site-opening-name"><span>Felipe Lima Digital</span><i /></div>
      </div>

      <div className="editorial-hero-grid" aria-hidden="true" />
      <svg className="editorial-hero-trace" viewBox="0 0 1600 900" fill="none" aria-hidden="true" preserveAspectRatio="none">
        <path d="M-40 742C286 706 412 822 658 760C986 678 1122 272 1640 54" />
        <path d="M508 892C782 752 848 640 1008 448C1178 242 1380 188 1640 110" />
      </svg>
      <div className="container editorial-hero-layout">
        <div className="editorial-hero-copy">
          <div className="editorial-hero-kicker">
            <span>Design · Tecnologia · Estratégia</span>
          </div>
          <h1 aria-label="Sua próxima fase começa no digital.">
            <span>Sua próxima</span>
            <span>fase começa</span>
            <span>no <em>digital.</em></span>
          </h1>
          <div className="editorial-hero-lower">
            <p>Sites, automações e experiências digitais para dar forma ao próximo passo da sua empresa.</p>
            <div className="editorial-hero-actions">
              <a href={contactLinks.whatsapp} className="button button-primary" target="_blank" rel="noopener noreferrer" data-budget-wizard aria-haspopup="dialog">
                Vamos criar seu projeto <span aria-hidden="true">↗</span>
              </a>
              <a href="/servicos" className="editorial-hero-text-link">Explore os serviços <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </div>

        <div className="editorial-panel-stage" aria-hidden="true">
          <div className="hero-panel hero-panel-ghost"><i /><i /><i /><i /></div>

          <div className="hero-panel hero-panel-pearl">
            <div className="hero-panel-brand">Felipe Lima Digital</div>
            <div className="hero-panel-menu"><i /><i /><i /></div>
            <div className="hero-panel-pearl-copy">
              <span />
              <strong>Sua marca.<br />Outra dimensão.</strong>
              <small>Estratégia, tecnologia e design para negócios que querem mais.</small>
            </div>
            <div className="hero-panel-monogram"><span>F</span><i /><span>L</span></div>
            <div className="hero-panel-foot"><span>Ideias</span><span>Sistemas</span><span>Resultados</span></div>
          </div>

          <div className="hero-panel hero-panel-dark">
            <div className="hero-panel-dark-title">Conecte. Simplifique. Evolua.</div>
            <div className="hero-panel-flow">
              <span><i className="hero-flow-stack" /><small>Integre<br />sistemas</small></span>
              <span><i className="hero-flow-gear" /><small>Automatize<br />processos</small></span>
              <span><i className="hero-flow-chart" /><small>Ganhe<br />escala</small></span>
            </div>
          </div>

          <div className="hero-panel hero-panel-glass">
            <div className="hero-glass-ribs" />
            <p>Estratégia<br />que transforma<br />oportunidades<br />em realidade.</p>
            <i />
          </div>

          <div className="hero-panel-shadow" />
        </div>
      </div>

      <nav className="editorial-hero-index" aria-label="Áreas de atuação">
        <a href="/servicos"><span>01</span><i /><strong>Presença Digital</strong><small>Sites que posicionam e geram oportunidades.</small></a>
        <a href="/servicos"><span>02</span><i /><strong>Automações</strong><small>Processos mais simples e conectados.</small></a>
        <a href="/servicos"><span>03</span><i /><strong>Experiências</strong><small>Soluções digitais que elevam seu negócio.</small></a>
      </nav>
    </section>
  );
}
