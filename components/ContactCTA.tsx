"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "../data/site";

export function ContactCTA({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");

  const whatsappHref = siteConfig.contact.whatsapp
    ? `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`
    : "";

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const content = [
      `Nome: ${form.get("name")}`,
      `Empresa: ${form.get("company") || "Não informado"}`,
      `Projeto: ${form.get("project")}`,
    ].join("\n");

    if (siteConfig.contact.email) {
      window.location.href = `mailto:${siteConfig.contact.email}?subject=Novo projeto&body=${encodeURIComponent(content)}`;
      setMessage("Abrindo seu aplicativo de e-mail…");
      return;
    }

    setSummary(content);
    try {
      await navigator.clipboard.writeText(content);
      setMessage("Resumo copiado. Os canais de contato serão adicionados em breve.");
    } catch {
      setMessage("Resumo criado. Copie o texto abaixo para guardar sua solicitação.");
    }
  };

  return (
    <section className={`contact-section ${compact ? "is-compact" : ""}`} id="contato">
      <div className="contact-orb" />
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="eyebrow eyebrow-light"><i /> Seu próximo projeto</span>
          <h2>Vamos tirar sua<br />ideia do papel?</h2>
          <p>Conte sobre o seu projeto e vamos entender juntos qual solução faz sentido para o momento do seu negócio.</p>
          <div className="contact-actions">
            {whatsappHref ? (
              <a className="button button-light" href={whatsappHref} target="_blank" rel="noreferrer">Falar no WhatsApp <span>↗</span></a>
            ) : (
              <span className="button button-ghost-disabled" aria-disabled="true" title="Número ainda não configurado">WhatsApp em breve</span>
            )}
          </div>
        </div>
        <form className="project-form" onSubmit={submit}>
          <div className="form-heading"><span>Conte o essencial</span><i>Leva menos de 2 minutos</i></div>
          <label>Como podemos chamar você?<input type="text" name="name" autoComplete="name" required placeholder="Seu nome" /></label>
          <label>Empresa ou projeto <input type="text" name="company" autoComplete="organization" placeholder="Nome do negócio (opcional)" /></label>
          <label>O que você quer construir?<textarea name="project" required rows={3} placeholder="Um site, sistema, automação ou uma ideia diferente…" /></label>
          <button className="button button-light form-submit" type="submit">Preparar solicitação <span>→</span></button>
          {message && <p className="form-status" role="status">{message}</p>}
          {summary && <pre className="form-summary">{summary}</pre>}
        </form>
      </div>
    </section>
  );
}

