"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SiteMotion() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    const animatedRegions = Array.from(document.querySelectorAll<HTMLElement>(".capability-orbit, .automation-console, .speed-rings"));
    const regionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("is-motion-visible", entry.isIntersecting));
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );
    animatedRegions.forEach((region) => regionObserver.observe(region));
    const syncTickerWithVisibility = () => {
      document.body.classList.toggle("is-page-hidden", document.hidden);
      if (document.hidden) gsap.ticker.sleep();
      else gsap.ticker.wake();
    };

    document.addEventListener("visibilitychange", syncTickerWithVisibility);
    syncTickerWithVisibility();

    media.add(
      {
        desktop: "(min-width: 901px)",
        mobile: "(max-width: 900px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduce } = context.conditions as { desktop: boolean; mobile: boolean; reduce: boolean };
        if (reduce) return;

        const hero = document.querySelector<HTMLElement>(".editorial-hero");
        const heroPanelStage = hero?.querySelector<HTMLElement>(".editorial-panel-stage");
        const heroCopy = hero?.querySelector<HTMLElement>(".editorial-hero-copy");
        if (hero && heroCopy && heroPanelStage) {
          const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
          let shouldCoordinateIntro = navigation?.type === "reload";
          try {
            shouldCoordinateIntro ||= sessionStorage.getItem("fld-editorial-intro-seen") !== "true";
          } catch {
            // Storage can be unavailable; a reload still keeps the opening coordinated.
          }
          const entryDelay = shouldCoordinateIntro ? 1.05 : 0.08;
          const copySequence = heroCopy.querySelectorAll<HTMLElement>(".editorial-hero-kicker, h1 > span, .editorial-hero-lower > p, .editorial-hero-actions");
          const panels = heroPanelStage.querySelectorAll<HTMLElement>(".hero-panel-ghost, .hero-panel-glass, .hero-panel-dark, .hero-panel-pearl");
          const entry = gsap.timeline({ delay: entryDelay, defaults: { ease: "power3.out" } });
          entry
            .fromTo(copySequence, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, stagger: 0.065, clearProps: "transform,opacity" })
            .fromTo(heroPanelStage, { x: 42, y: 14, rotate: 1.8, opacity: 0 }, { x: 0, y: 0, rotate: 0, opacity: 1, duration: 0.82, clearProps: "transform,opacity" }, "<0.08")
            .fromTo(panels, { y: 24, rotate: 2.2, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: 0.68, stagger: 0.07, clearProps: "transform,opacity" }, "<0.04");
        }

        if (hero && heroPanelStage && desktop) {
          gsap.fromTo(
            heroPanelStage,
            { "--hero-scroll-y": "0px" },
            {
              "--hero-scroll-y": "52px",
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5, invalidateOnRefresh: true },
            },
          );
          if (heroCopy) {
            gsap.to(heroCopy, {
              y: -18,
              opacity: 0.72,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "52% top", end: "bottom top", scrub: 0.5 },
            });
          }
        }

        const homeServices = document.querySelector<HTMLElement>(".services-section");
        if (homeServices) {
          gsap.fromTo(
            homeServices,
            { "--bridge-progress": 0 },
            {
              "--bridge-progress": 1,
              ease: "none",
              scrollTrigger: { trigger: homeServices, start: "top bottom", end: "top 28%", scrub: 0.65, invalidateOnRefresh: true },
            },
          );
        }

        const orbit = document.querySelector<HTMLElement>(".capability-orbit");
        const capabilityPanel = document.querySelector<HTMLElement>(".capabilities-panel");
        if (desktop && orbit && capabilityPanel) {
          gsap.fromTo(
            orbit,
            { y: 54, rotate: -4 },
            { y: -34, rotate: 5, ease: "none", scrollTrigger: { trigger: capabilityPanel, start: "top bottom", end: "bottom top", scrub: 0.8 } },
          );
        }

        const automation = document.querySelector<HTMLElement>(".automation-section");
        const automationCopy = document.querySelector<HTMLElement>(".automation-copy-wrap");
        const automationConsole = document.querySelector<HTMLElement>(".automation-console");
        if (desktop && automation && automationCopy && automationConsole) {
          gsap.fromTo(automationCopy, { x: -46 }, { x: 20, ease: "none", scrollTrigger: { trigger: automation, start: "top bottom", end: "bottom top", scrub: 0.75 } });
          gsap.fromTo(automationConsole, { y: 70, rotate: 1.8 }, { y: -45, rotate: -1, ease: "none", scrollTrigger: { trigger: automation, start: "top bottom", end: "bottom top", scrub: 0.75 } });
        }

        const sitesPanel = document.querySelector<HTMLElement>(".sites-panel");
        const sitesDevice = sitesPanel?.querySelector<HTMLElement>(".site-device-visual");
        if (desktop && sitesPanel && sitesDevice) {
          gsap.fromTo(
            sitesDevice,
            { xPercent: desktop ? 9 : 2, y: 44 },
            { xPercent: desktop ? -3 : 0, y: -20, ease: "none", scrollTrigger: { trigger: sitesPanel, start: "top bottom", end: "bottom top", scrub: 0.7 } },
          );
        }

        const featuredProject = document.querySelector<HTMLElement>(".flowlead-feature-card");
        const featuredCopy = featuredProject?.querySelector<HTMLElement>(".flowlead-feature-copy");
        const featuredPreview = featuredProject?.querySelector<HTMLElement>(".flowlead-feature-preview");
        if (desktop && featuredProject && featuredCopy && featuredPreview) {
          gsap.fromTo(
            featuredCopy,
            { y: -18 },
            { y: 28, ease: "none", scrollTrigger: { trigger: featuredProject, start: "top bottom", end: "bottom top", scrub: 0.75 } },
          );
          gsap.fromTo(
            featuredPreview,
            { y: 52, rotate: 0.45 },
            { y: -34, rotate: -0.35, ease: "none", scrollTrigger: { trigger: featuredProject, start: "top bottom", end: "bottom top", scrub: 0.75 } },
          );
        }

        document.querySelectorAll<HTMLElement>(".project-slide").forEach((slide, index) => {
          const art = slide.querySelector<HTMLElement>(".project-art");
          const info = slide.querySelector<HTMLElement>(".project-info");
          if (!art || !info || !desktop) return;
          gsap.fromTo(
            art,
            { x: index % 2 === 0 ? -26 : 26, scale: 0.985 },
            { x: 0, scale: 1, ease: "none", scrollTrigger: { trigger: slide, start: "top 92%", end: "top 48%", scrub: 0.55 } },
          );
          gsap.fromTo(
            info,
            { y: 34 },
            { y: -8, ease: "none", scrollTrigger: { trigger: slide, start: "top bottom", end: "bottom top", scrub: 0.7 } },
          );
        });

        const processGrid = document.querySelector<HTMLElement>(".process-grid");
        if (processGrid) {
          gsap.fromTo(
            processGrid,
            { "--process-progress": 0 },
            { "--process-progress": 1, ease: "none", scrollTrigger: { trigger: processGrid, start: "top 84%", end: "bottom 55%", scrub: 0.45 } },
          );
          const processSteps = processGrid.querySelectorAll<HTMLElement>(".process-step");
          if (processSteps.length) {
            gsap.fromTo(
              processSteps,
              { "--step-active": 0, y: 12 },
              {
                "--step-active": 1,
                y: 0,
                duration: 0.18,
                stagger: 0.12,
                ease: "none",
                scrollTrigger: { trigger: processGrid, start: "top 84%", end: "bottom 55%", scrub: 0.45 },
              },
            );
          }
        }

        const founder = document.querySelector<HTMLElement>(".founder-section");
        const portrait = founder?.querySelector<HTMLElement>(".founder-portrait");
        const founderCopy = founder?.querySelector<HTMLElement>(".founder-copy");
        if (desktop && founder && portrait && founderCopy) {
          gsap.fromTo(portrait, { y: 58 }, { y: -32, ease: "none", scrollTrigger: { trigger: founder, start: "top bottom", end: "bottom top", scrub: 0.8 } });
          gsap.fromTo(founderCopy, { y: -20 }, { y: 34, ease: "none", scrollTrigger: { trigger: founder, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        }

        if (desktop) {
          document.querySelectorAll<HTMLElement>(".article-art, .blog-index-art").forEach((art, index) => {
            const travel = index % 2 === 0 ? -26 : 28;
            gsap.fromTo(art, { y: travel * -0.7 }, { y: travel, ease: "none", scrollTrigger: { trigger: art, start: "top bottom", end: "bottom top", scrub: 0.7 } });
          });
        }

        const typesList = document.querySelector<HTMLElement>(".site-types-list");
        if (desktop && typesList) {
          gsap.fromTo(
            typesList,
            { "--types-progress": 0 },
            { "--types-progress": 1, ease: "none", scrollTrigger: { trigger: typesList, start: "top 78%", end: "bottom 52%", scrub: 0.5 } },
          );
        }

        const speedRings = document.querySelector<HTMLElement>(".speed-rings");
        const performanceSection = document.querySelector<HTMLElement>(".performance-section");
        if (desktop && speedRings && performanceSection) {
          gsap.fromTo(
            speedRings,
            { rotate: -8, scale: 0.91 },
            { rotate: 8, scale: 1.04, ease: "none", scrollTrigger: { trigger: performanceSection, start: "top bottom", end: "bottom top", scrub: 0.8 } },
          );
        }

        if (desktop) {
          document.querySelectorAll<HTMLElement>("[data-site-parallax]").forEach((element) => {
            const distance = Number(element.dataset.siteParallax || 42);
            gsap.fromTo(
              element,
              { y: distance * -0.45 },
              { y: distance, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true } },
            );
          });
        }
      },
    );

    return () => {
      document.removeEventListener("visibilitychange", syncTickerWithVisibility);
      document.body.classList.remove("is-page-hidden");
      regionObserver.disconnect();
      media.revert();
    };
  });

  return null;
}
