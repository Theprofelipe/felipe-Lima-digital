"use client";

import { useEffect } from "react";

export function ServicesMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".services-page");
    if (!page) return;

    const items = Array.from(page.querySelectorAll<HTMLElement>("[data-service-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    items.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.94) item.classList.add("is-visible");
    });
    page.classList.add("services-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    items.filter((item) => !item.classList.contains("is-visible")).forEach((item) => observer.observe(item));

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const bounds = page.getBoundingClientRect();
      const distance = Math.max(page.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-bounds.top / distance, 0), 1);
      page.style.setProperty("--services-scroll-progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      page.classList.remove("services-motion-ready");
      page.style.removeProperty("--services-scroll-progress");
    };
  }, []);

  return <span className="services-scroll-progress" aria-hidden="true" />;
}

