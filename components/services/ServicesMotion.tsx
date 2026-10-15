"use client";

import { useEffect } from "react";

type ParallaxItem = {
  element: HTMLElement;
  speed: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export function ServicesMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".services-page");
    if (!page) return;

    const reveals = Array.from(page.querySelectorAll<HTMLElement>("[data-service-reveal]"));
    const sequences = Array.from(page.querySelectorAll<HTMLElement>("[data-service-sequence]"));
    const chapters = Array.from(page.querySelectorAll<HTMLElement>("[data-service-chapter]"));
    const parallaxElements = Array.from(page.querySelectorAll<HTMLElement>("[data-service-parallax]"));
    const parallaxItems: ParallaxItem[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMotion = window.matchMedia("(min-width: 1021px)");

    for (let index = 0; index < sequences.length; index += 1) {
      const children = sequences[index].querySelectorAll<HTMLElement>("[data-service-sequence-item]");
      for (let childIndex = 0; childIndex < children.length; childIndex += 1) {
        children[childIndex].style.setProperty("--service-sequence-index", String(childIndex));
      }
    }

    for (let index = 0; index < parallaxElements.length; index += 1) {
      const element = parallaxElements[index];
      const parsedSpeed = Number.parseFloat(element.dataset.serviceParallax ?? "0.06");
      parallaxItems.push({ element, speed: Number.isFinite(parsedSpeed) ? parsedSpeed : 0.06 });
    }

    const showEverything = () => {
      for (let index = 0; index < reveals.length; index += 1) reveals[index].classList.add("is-visible");
      for (let index = 0; index < sequences.length; index += 1) sequences[index].classList.add("is-visible");
      for (let index = 0; index < chapters.length; index += 1) {
        chapters[index].style.setProperty("--chapter-y", "0px");
        chapters[index].style.setProperty("--chapter-scale", "1");
        chapters[index].style.setProperty("--chapter-opacity", "1");
      }
      for (let index = 0; index < parallaxItems.length; index += 1) {
        parallaxItems[index].element.style.setProperty("--parallax-y", "0px");
      }
    };

    if (reducedMotion.matches) {
      showEverything();
      return;
    }

    page.classList.add("services-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (let index = 0; index < entries.length; index += 1) {
          const entry = entries[index];
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.09 },
    );

    for (let index = 0; index < reveals.length; index += 1) {
      const item = reveals[index];
      if (item.getBoundingClientRect().top < window.innerHeight * 0.94) item.classList.add("is-visible");
      else observer.observe(item);
    }

    for (let index = 0; index < sequences.length; index += 1) {
      const item = sequences[index];
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) item.classList.add("is-visible");
      else observer.observe(item);
    }

    let frame = 0;

    const updateMotion = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const pageBounds = page.getBoundingClientRect();
      const scrollDistance = Math.max(page.offsetHeight - viewportHeight, 1);
      const pageProgress = clamp(-pageBounds.top / scrollDistance);
      page.style.setProperty("--services-scroll-progress", pageProgress.toFixed(4));

      if (!desktopMotion.matches) {
        showEverything();
        return;
      }

      for (let index = 0; index < parallaxItems.length; index += 1) {
        const item = parallaxItems[index];
        const bounds = item.element.getBoundingClientRect();
        const centerDelta = (bounds.top + bounds.height * 0.5 - viewportHeight * 0.5) / viewportHeight;
        const offset = clamp(centerDelta, -1.15, 1.15) * item.speed * viewportHeight * -1;
        item.element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      }

      for (let index = 0; index < chapters.length; index += 1) {
        const chapter = chapters[index];
        const bounds = chapter.getBoundingClientRect();
        const entrance = clamp((viewportHeight * 0.9 - bounds.top) / (viewportHeight * 0.62));
        let cover = 0;

        if (index < chapters.length - 1) {
          const nextBounds = chapters[index + 1].getBoundingClientRect();
          cover = clamp((viewportHeight * 0.84 - nextBounds.top) / (viewportHeight * 0.84));
        }

        const translateY = (1 - entrance) * 68 - cover * 10;
        const scale = 0.982 + entrance * 0.018 - cover * 0.012;
        const opacity = 0.72 + entrance * 0.28 - cover * 0.08;
        chapter.style.setProperty("--chapter-y", `${translateY.toFixed(2)}px`);
        chapter.style.setProperty("--chapter-scale", scale.toFixed(4));
        chapter.style.setProperty("--chapter-opacity", opacity.toFixed(4));
      }
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateMotion);
    };

    updateMotion();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    desktopMotion.addEventListener("change", requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      desktopMotion.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      page.classList.remove("services-motion-ready");
      page.style.removeProperty("--services-scroll-progress");
    };
  }, []);

  return <span className="services-scroll-progress" aria-hidden="true" />;
}
