"use client";

import { useMemo, useState } from "react";
import { buildCommercialSummary, buildMessagePreview, classifyLead, FOLLOW_UP_STAGES, PROCESSING_STEPS } from "./leadLogic";
import type { LeadData } from "./types";

type FlowLeadResultProps = {
  lead: LeadData;
  onReset: () => void;
};

type CopyTarget = "summary" | "message";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Continua para a alternativa local abaixo.
    }
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.readOnly = true;
  helper.setAttribute("aria-hidden", "true");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  try {
    helper.select();
    return typeof document.execCommand === "function" && document.execCommand("copy");
  } catch {
    return false;
  } finally {
    helper.remove();
  }
}

export function FlowLeadResult({ lead, onReset }: FlowLeadResultProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState<{ target: CopyTarget; success: boolean } | null>(null);
  const priority = useMemo(() => classifyLead(lead), [lead]);
  const commercialSummary = useMemo(() => buildCommercialSummary(lead, priority), [lead, priority]);
  const messagePreview = useMemo(() => buildMessagePreview(lead, priority), [lead, priority]);
  const currentStage = FOLLOW_UP_STAGES[stageIndex];
  const canAdvance = stageIndex < FOLLOW_UP_STAGES.length - 1;
  const nextAction = stageIndex === 0 ? priority.nextAction : currentStage.nextAction;
  const activities = [
    "Formulário recebido e validado",
    "Briefing organizado no navegador",
    `Prioridade ${priority.label.toLocaleLowerCase("pt-BR")} definida por regras demonstrativas`,
    "Resumo e prévia de mensagem preparados",
    ...FOLLOW_UP_STAGES.slice(0, stageIndex + 1).map((stage) => stage.activity),
  ];

  const copy = async (target: CopyTarget, text: string) => {
    const success = await copyText(text);
    setCopyFeedback({ target, success });
  };

  return (
    <div className="flowlead-result">
      <div className="flowlead-result-heading">
        <div>
          <span className="flowlead-demo-kicker">Lead organizado</span>
          <h2>Contexto pronto para a próxima ação.</h2>
        </div>
        <button className="button button-secondary" type="button" onClick={onReset}>Reiniciar demonstração <span>↻</span></button>
      </div>

      <p className="flowlead-copy-feedback" role="status" aria-live="polite">
        {copyFeedback ? (copyFeedback.success ? (copyFeedback.target === "summary" ? "Resumo copiado com sucesso." : "Mensagem copiada com sucesso.") : "Não foi possível copiar automaticamente. Selecione o texto e tente novamente.") : ""}
      </p>

      <div className="flowlead-result-grid">
        <section className="flowlead-summary-card" aria-labelledby="flowlead-summary-title">
          <div className="flowlead-card-label">
            <span>Resumo comercial</span>
            <button className="flowlead-copy-button" type="button" onClick={() => copy("summary", commercialSummary)}>
              {copyFeedback?.target === "summary" && copyFeedback.success ? "Resumo copiado ✓" : "Copiar resumo"}
            </button>
          </div>
          <h3 id="flowlead-summary-title">{lead.name} busca {lead.projectType.toLocaleLowerCase("pt-BR")}.</h3>
          <p>{lead.description}</p>
          <dl>
            <div><dt>Nome</dt><dd>{lead.name}</dd></div>
            <div><dt>Empresa</dt><dd>{lead.company}</dd></div>
            <div><dt>Segmento</dt><dd>{lead.segment}</dd></div>
            <div><dt>Tipo de projeto</dt><dd>{lead.projectType}</dd></div>
            <div className="flowlead-definition-wide"><dt>Objetivo</dt><dd>{lead.goal}</dd></div>
            <div className="flowlead-definition-wide"><dt>Necessidade principal</dt><dd>{lead.description}</dd></div>
            <div><dt>Faixa de investimento</dt><dd>{lead.investment}</dd></div>
            <div><dt>Prazo</dt><dd>{lead.deadline}</dd></div>
            <div><dt>Prioridade</dt><dd>{priority.label}</dd></div>
            <div><dt>Próxima ação</dt><dd>{priority.nextAction}</dd></div>
          </dl>
        </section>

        <aside className="flowlead-priority-card" aria-labelledby="flowlead-priority-title">
          <span>Classificação demonstrativa</span>
          <strong id="flowlead-priority-title" className={`flowlead-priority flowlead-priority-${priority.key}`}><i /> Prioridade {priority.label}</strong>
          <p>{priority.explanation}</p>
          <small className="flowlead-priority-disclaimer">Baseada somente nas informações fornecidas — sem análise por IA real.</small>
          <ul>
            {priority.signals.map((signal) => (
              <li key={signal.label} className={signal.points > 0 ? "is-relevant" : ""}>
                <i aria-hidden="true">{signal.points > 0 ? "+" : "="}</i>
                <span><strong>{signal.label}</strong><small>{signal.detail}</small></span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="flowlead-result-secondary">
        <section className="flowlead-message-card" aria-labelledby="flowlead-message-title">
          <div className="flowlead-card-label">
            <span>Prévia demonstrativa · WhatsApp</span>
            <button className="flowlead-copy-button" type="button" onClick={() => copy("message", messagePreview)}>
              {copyFeedback?.target === "message" && copyFeedback.success ? "Mensagem copiada ✓" : "Copiar mensagem"}
            </button>
          </div>
          <h3 id="flowlead-message-title">Como a equipe poderia receber o contexto.</h3>
          <div className="flowlead-message-window">
            <div><span>Mensagem comercial</span><small>Prévia · não enviada</small></div>
            <p>{messagePreview}</p>
          </div>
          <p className="flowlead-message-note">Sem número de telefone, abertura de aplicativo ou uso da API do WhatsApp.</p>
        </section>

        <section className="flowlead-timeline-card" aria-labelledby="flowlead-timeline-title">
          <span className="flowlead-demo-kicker">Linha do tempo local</span>
          <h3 id="flowlead-timeline-title">A automação fica fácil de acompanhar.</h3>
          <ol>
            {PROCESSING_STEPS.map((step, index) => (
              <li key={step}>
                <i aria-hidden="true">✓</i>
                <div><strong>{index === 0 ? "Formulário recebido" : index === 1 ? "Briefing organizado" : index === 2 ? "Prioridade definida" : index === 3 ? "Resumo preparado" : "Acompanhamento criado"}</strong><span>{index === PROCESSING_STEPS.length - 1 ? `Etapa comercial atual: ${currentStage.label}.` : "Concluído nesta simulação."}</span></div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="flowlead-panel-preview" aria-labelledby="flowlead-panel-title">
        <div className="flowlead-panel-sidebar" aria-hidden="true">
          <b>FL</b><i className="active" /><i /><i /><i />
        </div>
        <div className="flowlead-panel-main">
          <div className="flowlead-panel-header">
            <div><span>Painel de acompanhamento</span><h3 id="flowlead-panel-title">Lead · {currentStage.label}</h3></div>
            <span className={`flowlead-priority flowlead-priority-${priority.key}`}><i /> {priority.label}</span>
          </div>

          <ol className="flowlead-stage-list" aria-label="Etapas do acompanhamento comercial">
            {FOLLOW_UP_STAGES.map((stage, index) => {
              const state = index < stageIndex ? "complete" : index === stageIndex ? "current" : "pending";
              return <li key={stage.id} className={`is-${state}`}><i aria-hidden="true">{index < stageIndex ? "✓" : index + 1}</i><span><strong>{stage.label}</strong><small>{state === "complete" ? "Concluída" : state === "current" ? "Etapa atual" : "Pendente"}</small></span></li>;
            })}
          </ol>

          <div className="flowlead-panel-columns">
            <dl>
              <div><dt>Lead recebido</dt><dd>{lead.name} · {lead.company}</dd></div>
              <div><dt>Prioridade</dt><dd>{priority.label}</dd></div>
              <div><dt>Etapa atual</dt><dd>{currentStage.label}</dd></div>
            </dl>
            <dl>
              <div className="flowlead-next-action"><dt>Próxima ação</dt><dd>{nextAction}</dd></div>
              <div><dt>Responsável</dt><dd>Equipe comercial</dd></div>
              <div><dt>Prazo sugerido</dt><dd>{priority.followUpWindow}</dd></div>
            </dl>
          </div>

          <div className="flowlead-panel-footer">
            <div className="flowlead-activity-history">
              <span>Histórico resumido</span>
              <ul>{activities.map((activity, index) => <li key={`${activity}-${index}`}><i aria-hidden="true" />{activity}</li>)}</ul>
            </div>
            <button className="button button-primary flowlead-advance-button" type="button" disabled={!canAdvance} onClick={() => setStageIndex((current) => Math.min(current + 1, FOLLOW_UP_STAGES.length - 1))}>
              {canAdvance ? `Avançar para ${FOLLOW_UP_STAGES[stageIndex + 1].label}` : "Etapa final alcançada"} <span>{canAdvance ? "→" : "✓"}</span>
            </button>
          </div>
        </div>
      </section>

      <p className="flowlead-result-disclaimer">Demonstração local: o lead não foi salvo, enviado, analisado por IA ou integrado a um serviço externo.</p>
    </div>
  );
}
