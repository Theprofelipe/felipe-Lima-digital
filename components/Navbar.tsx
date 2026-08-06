"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navigation } from "../data/site";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
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
        <Link href="/#inicio" className="brand-link" onClick={() => setOpen(false)}>
          <Brand />
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <Link className="button button-small nav-cta" href="/#contato">
          Solicitar orçamento
        </Link>

        <button
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
      >
        <div className="mobile-nav-inner">
          {navigation.map((item, index) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
          <Link className="button" href="/#contato" onClick={() => setOpen(false)}>
            Solicitar orçamento
          </Link>
        </div>
      </nav>
    </header>
  );
}
