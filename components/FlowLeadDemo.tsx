"use client";

import { FormEvent, useEffect, useState } from "react";

type DemoPhase = "form" | "processing" | "result";

type LeadData = {
  name: string;
  company: string;
  segment: string;
  projectType: string;
  goal: string;
  description: string;
  investment: string;
  deadline: string;
};

type Priority = {
  key: "normal" | "high" | "urgent";
  label: "Normal" | "Alta" | "Urgente";
  explanation: string;
  nextAction: string;
};

function classifyLead(lead: LeadData): Priority {
  let score = 0;

  if (lead.deadline === "Até 7 dias") score += 4;
  if (lead.deadline === "De 2 a 4 semanas") score += 2;
  if (lead.investment === "De R$ 25 mil a R$ 50 mil") score += 1;
  if (lead.investment === "Acima de R$ 50 mil") score += 2;
  if (["Automação de processo", "Sistema sob medida", "Integração de canais"].includes(lead.projectType)) score += 1;

  if (score >= 4) {
    return {
      key: "urgent",
      label: "Urgente",
      explanation: "Prazo curto ou combinação de prazo, investimento e complexidade exige retorno prioritário.",
      nextAction: "Agendar diagnóstico em até 1 dia útil",
    };
  }

  if (score >= 2) {
    return {
      key: "high",
      label: "Alta",
      explanation: "O prazo ou a complexidade indicam uma oportunidade que merece análise antecipada.",
      nextAction: "Revisar escopo e sugerir horário para diagnóstico",
    };
  }

  return {
    key: "normal",
    label: "Normal",
    explanation: "O prazo é confortável e permite seguir o fluxo padrão de qualificação.",
    nextAction: "Confirmar briefing e organizar primeira conversa",
  };
}

export function FlowLeadDemo() {
  const [phase, setPhase] = useState<DemoPhase>("form");
  const [lead, setLead] = useState<LeadData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (phase !== "processing") return;

    const timer = window.setTimeout(() => setPhase("result"), 1800);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (field: string) => String(form.get(field) ?? "").trim();
    const nextLead: LeadData = {
      name: value("name"),
      company: value("company") || "Não informada",
      segment: value("segment"),
      projectType: value("projectType"),
      goal: value("goal"),
      description: value("description"),
      investment: value("investment"),
      deadline: value("deadline"),
    };

    if (!nextLead.name || !nextLead.segment || !nextLead.projectType || !nextLead.goal || !nextLead.description || !nextLead.investment || !nextLead.deadline) {
      setError("Preencha os campos obrigatórios para continuar.");
      return;
    }

    setError("");
    setLead(nextLead);
    setPhase("processing");
  };

  const reset = () => {
    setLead(null);
    setError("");
    setPhase("form");
  };

  const priority = lead ? classifyLead(lead) : null;

  return (
    <div className="flowlead-demo-shell">
      <div className="flowlead-demo-topbar">
        <div>
          <span className="flowlead-live-dot" aria-hidden="true" />
          Demonstração local
        </div>
        <span>{phase === "form" ? "01 · Entrada" : phase === "processing" ? "02 · Processamento" : "03 · Painel"}</span>
      </div>

      {phase === "form" && (
        <div className="flowlead-demo-layout">
          <div className="flowlead-demo-intro">
            <span className="flowlead-demo-kicker">Experimente o fluxo</span>
            <h2>Simule a entrada de um novo lead.</h2>
            <p>Preencha um briefing fictício ou de teste. O FlowLead organizará as informações e montará uma prévia de acompanhamento neste navegador.</p>
            <div className="flowlead-privacy-note">
              <strong>Seus dados ficam aqui.</strong>
              <span>Nada é enviado, armazenado ou compartilhado. Evite inserir informações sensíveis.</span>
            </div>
          </div>

          <form className="flowlead-form" onSubmit={submit} aria-describedby="flowlead-privacy">
            <div className="flowlead-form-grid">
              <label htmlFor="flowlead-name">Nome <span>*</span>
                <input id="flowlead-name" name="name" type="text" autoComplete="name" required placeholder="Ex.: Marina Alves" />
              </label>
              <label htmlFor="flowlead-company">Empresa
                <input id="flowlead-company" name="company" type="text" autoComplete="organization" placeholder="Ex.: Aurora Studio" />
              </label>
              <label htmlFor="flowlead-segment">Segmento <span>*</span>
                <select id="flowlead-segment" name="segment" required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option>Serviços profissionais</option>
                  <option>Comércio e varejo</option>
                  <option>Indústria</option>
                  <option>Educação</option>
                  <option>Saúde e bem-estar</option>
                  <option>Tecnologia</option>
                  <option>Outro segmento</option>
                </select>
              </label>
              <label htmlFor="flowlead-project">Tipo de projeto <span>*</span>
                <select id="flowlead-project" name="projectType" required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option>Automação de processo</option>
                  <option>Sistema sob medida</option>
                  <option>Integração de canais</option>
                  <option>Site ou landing page</option>
                  <option>Consultoria técnica</option>
                </select>
              </label>
              <label className="flowlead-field-wide" htmlFor="flowlead-goal">Objetivo principal <span>*</span>
                <input id="flowlead-goal" name="goal" type="text" required placeholder="Ex.: organizar pedidos de orçamento" />
              </label>
              <label className="flowlead-field-wide" htmlFor="flowlead-description">Descrição da necessidade <span>*</span>
                <textarea id="flowlead-description" name="description" rows={4} required placeholder="Conte brevemente como o processo funciona hoje e o que precisa melhorar." />
              </label>
              <label htmlFor="flowlead-investment">Investimento estimado <span>*</span>
                <select id="flowlead-investment" name="investment" required defaultValue="">
                  <option value="" disabled>Selecione uma faixa</option>
                  <option>Até R$ 10 mil</option>
                  <option>De R$ 10 mil a R$ 25 mil</option>
                  <option>De R$ 25 mil a R$ 50 mil</option>
                  <option>Acima de R$ 50 mil</option>
                  <option>A definir</option>
                </select>
              </label>
              <label htmlFor="flowlead-deadline">Prazo desejado <span>*</span>
                <select id="flowlead-deadline" name="deadline" required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option>Até 7 dias</option>
                  <option>De 2 a 4 semanas</option>
                  <option>De 1 a 2 meses</option>
                  <option>Prazo flexível</option>
                </select>
              </label>
            </div>
            <p id="flowlead-privacy" className="flowlead-form-caption">Simulação frontend · nenhum dado sai desta página.</p>
            {error && <p className="flowlead-form-error" role="alert">{error}</p>}
            <button className="button button-primary flowlead-submit" type="submit">Organizar lead <span>→</span></button>
          </form>
        </div>
      )}

      {phase === "processing" && (
        <div className="flowlead-processing" role="status" aria-live="polite">
          <div className="flowlead-processing-orbit" aria-hidden="true"><span>FL</span><i /><i /><i /></div>
          <span className="flowlead-demo-kicker">Processamento simulado</span>
          <h2>Transformando o briefing em contexto.</h2>
          <p>As informações estão sendo organizadas localmente. Nenhum serviço externo está sendo acionado.</p>
          <ol>
            <li><i /> Estruturando informações</li>
            <li><i /> Aplicando critérios de prioridade</li>
            <li><i /> Preparando acompanhamento</li>
          </ol>
        </div>
      )}

      {phase === "result" && lead && priority && (
        <div className="flowlead-result">
          <div className="flowlead-result-heading">
            <div>
              <span className="flowlead-demo-kicker">Lead organizado</span>
              <h2>O contato já tem contexto e próxima ação.</h2>
            </div>
            <button className="button button-secondary" type="button" onClick={reset}>Reiniciar demonstração <span>↻</span></button>
          </div>

          <div className="flowlead-result-grid">
            <section className="flowlead-summary-card" aria-labelledby="flowlead-summary-title">
              <div className="flowlead-card-label"><span>Resumo gerado</span><i>Simulação local</i></div>
              <h3 id="flowlead-summary-title">{lead.name} busca {lead.projectType.toLocaleLowerCase("pt-BR")} para {lead.goal.toLocaleLowerCase("pt-BR")}.</h3>
              <p>{lead.description}</p>
              <dl>
                <div><dt>Empresa</dt><dd>{lead.company}</dd></div>
                <div><dt>Segmento</dt><dd>{lead.segment}</dd></div>
                <div><dt>Faixa de investimento</dt><dd>{lead.investment}</dd></div>
                <div><dt>Prazo</dt><dd>{lead.deadline}</dd></div>
              </dl>
            </section>

            <aside className="flowlead-priority-card">
              <span>Classificação demonstrativa</span>
              <strong className={`flowlead-priority flowlead-priority-${priority.key}`}><i /> Prioridade {priority.label}</strong>
              <p>{priority.explanation}</p>
              <div>
                <small>Critérios utilizados</small>
                <span>Prazo desejado</span>
                <span>Faixa de investimento</span>
                <span>Complexidade do projeto</span>
              </div>
            </aside>
          </div>

          <section className="flowlead-panel-preview" aria-labelledby="flowlead-panel-title">
            <div className="flowlead-panel-sidebar" aria-hidden="true">
              <b>FL</b><i className="active" /><i /><i /><i />
            </div>
            <div className="flowlead-panel-main">
              <div className="flowlead-panel-header">
                <div><span>Painel de acompanhamento</span><h3 id="flowlead-panel-title">Lead em qualificação</h3></div>
                <span className={`flowlead-priority flowlead-priority-${priority.key}`}><i /> {priority.label}</span>
              </div>
              <div className="flowlead-panel-columns">
                <dl>
                  <div><dt>Lead</dt><dd>{lead.name}</dd></div>
                  <div><dt>Empresa</dt><dd>{lead.company}</dd></div>
                  <div><dt>Serviço solicitado</dt><dd>{lead.projectType}</dd></div>
                </dl>
                <dl>
                  <div><dt>Etapa atual</dt><dd>Qualificação concluída</dd></div>
                  <div><dt>Prazo desejado</dt><dd>{lead.deadline}</dd></div>
                  <div className="flowlead-next-action"><dt>Próxima ação sugerida</dt><dd>{priority.nextAction}</dd></div>
                </dl>
              </div>
            </div>
          </section>

          <p className="flowlead-result-disclaimer">Esta visualização é apenas uma demonstração. O lead não foi salvo, enviado ou integrado a um CRM.</p>
        </div>
      )}
    </div>
  );
}
