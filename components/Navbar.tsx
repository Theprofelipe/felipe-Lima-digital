"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Links nativos evitam uma falha de prefetch do adaptador Vinext atual. */

import { useEffect, useRef, useState } from "react";
import { contactLinks, navigation } from "../data/site";

export function Brand() {
  return (
    <span className="brand" aria-label="Felipe Lima Digital">
      <span className="brand-mark" aria-hidden="true">FL</span>
      <span className="brand-copy">
        <strong>Felipe Lima</strong>
        <small>Digital</small>
      </span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-shell">
        <a href="/#inicio" className="brand-link" onClick={() => setOpen(false)}>
          <Brand />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <a className="button button-small nav-cta" href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" data-budget-wizard aria-haspopup="dialog">
          Solicitar orçamento
        </a>

        <button
          ref={menuButtonRef}
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Navegação mobile"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mobile-nav-inner">
          {navigation.map((item, index) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
          <a className="button" href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" data-budget-wizard aria-haspopup="dialog" onClick={() => setOpen(false)}>
            Solicitar orçamento
          </a>
        </div>
      </nav>
    </header>
  );
}
