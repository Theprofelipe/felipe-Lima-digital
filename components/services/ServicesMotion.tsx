"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ServicesMotion() {
  useGSAP(() => {
    const page = document.querySelector<HTMLElement>(".services-page");
    if (!page) return;

    page.classList.add("services-motion-ready");

    const revealEverything = () => {
      page.querySelectorAll<HTMLElement>("[data-service-reveal], [data-service-sequence]").forEach((element) => {
        element.classList.add("is-visible");
      });
      gsap.set(
        page.querySelectorAll<HTMLElement>("[data-service-reveal], [data-service-sequence-item], .service-lab-copy, .service-demo, .service-chapter-heading, .service-package-group, .service-chapter-groups"),
        { clearProps: "transform,opacity" },
      );
    };

    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 1021px)",
        mobile: "(max-width: 1020px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduce } = context.conditions as { desktop: boolean; mobile: boolean; reduce: boolean };
        const reveals = page.querySelectorAll<HTMLElement>("[data-service-reveal], [data-service-sequence]");
        reveals.forEach((element) => element.classList.add("is-visible"));

        if (reduce) {
          revealEverything();
          page.style.setProperty("--services-scroll-progress", "1");
          return;
        }

        gsap.to(page, {
          "--services-scroll-progress": 1,
          ease: "none",
          scrollTrigger: {
            trigger: page,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });

        if (!desktop) {
          revealEverything();
          return;
        }

        const journey = page.querySelector<HTMLElement>(".services-journey-shell");
        const journeyArt = page.querySelector<HTMLElement>(".services-journey-art");
        if (journey && journeyArt) {
          gsap.fromTo(
            journeyArt,
            { yPercent: -4 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: journey, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }

        page.querySelectorAll<HTMLElement>(".service-lab").forEach((lab) => {
          const copy = lab.querySelector<HTMLElement>(".service-lab-copy");
          const demo = lab.querySelector<HTMLElement>(".service-demo");
          if (!copy || !demo) return;

          const activate = () => {
            page.querySelectorAll<HTMLElement>(".service-lab.is-current").forEach((item) => item.classList.remove("is-current"));
            lab.classList.add("is-current");
          };

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: lab,
              start: "top 76%",
              end: "bottom 24%",
              scrub: 0.62,
              invalidateOnRefresh: true,
              onEnter: activate,
              onEnterBack: activate,
              onLeave: () => lab.classList.remove("is-current"),
              onLeaveBack: () => lab.classList.remove("is-current"),
            },
          });

          timeline
            .fromTo(copy, { y: 42, opacity: 0.72 }, { y: 0, opacity: 1, duration: 0.3, ease: "none" })
            .fromTo(demo, { y: 44, scale: 0.974, opacity: 0.76 }, { y: 0, scale: 1, opacity: 1, duration: 0.36, ease: "none" }, 0)
            .to(copy, { y: -18, opacity: 0.8, duration: 0.2, ease: "none" }, 0.8)
            .to(demo, { y: -10, scale: 0.994, opacity: 0.84, duration: 0.2, ease: "none" }, 0.8);
        });

        page.querySelectorAll<HTMLElement>("[data-service-chapter]").forEach((chapter) => {
          const heading = chapter.querySelector<HTMLElement>(".service-chapter-heading");
          const content = chapter.querySelector<HTMLElement>(".service-package-group, .service-chapter-groups, .custom-solution");
          if (!heading || !content) return;

          gsap.fromTo(
            content,
            { y: 38 },
            {
              y: -12,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top 88%",
                end: "bottom 15%",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
          gsap.fromTo(
            heading,
            { y: 22, opacity: 0.78 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: chapter, start: "top 80%", end: "top 28%", scrub: 0.55 },
            },
          );
        });

        page.querySelectorAll<HTMLElement>("[data-service-sequence]").forEach((sequence) => {
          const panels = Array.from(sequence.querySelectorAll<HTMLElement>("[data-service-sequence-item]"));
          if (!panels.length) return;

          gsap.fromTo(
            panels,
            {
              y: (index) => 52 + index * 12,
              rotate: (index) => index % 2 === 0 ? -0.75 : 0.75,
              scale: 0.982,
              opacity: 0.66,
            },
            {
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              stagger: 0.11,
              ease: "none",
              scrollTrigger: {
                trigger: sequence,
                start: "top 88%",
                end: "top 30%",
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        page.querySelectorAll<HTMLElement>("[data-service-parallax]").forEach((element) => {
          if (element.classList.contains("services-journey-shell")) return;
          const speed = Number.parseFloat(element.dataset.serviceParallax ?? "0.06");
          const travel = Math.min(Math.max(speed * 620, 24), 58);
          gsap.fromTo(
            element,
            { y: travel * -0.45 },
            { y: travel, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        const customArt = page.querySelector<HTMLElement>(".custom-solution-art");
        const customSolution = page.querySelector<HTMLElement>(".custom-solution");
        if (customArt && customSolution) {
          gsap.fromTo(
            customArt,
            { yPercent: -4, scale: 1.08 },
            { yPercent: 5, scale: 1.04, ease: "none", scrollTrigger: { trigger: customSolution, start: "top bottom", end: "bottom top", scrub: true } },
          );
        }

        return () => {
          page.querySelectorAll<HTMLElement>(".service-lab.is-current").forEach((lab) => lab.classList.remove("is-current"));
        };
      },
    );

    return () => {
      media.revert();
      page.classList.remove("services-motion-ready");
      page.style.removeProperty("--services-scroll-progress");
    };
  });

  return <span className="services-scroll-progress" aria-hidden="true" />;
}
