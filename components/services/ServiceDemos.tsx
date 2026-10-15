"use client";

import { useState } from "react";

type DemoOption = {
  value: string;
  label: string;
};

function DemoControls({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly DemoOption[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="service-demo-controls" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={selected === option.value}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function DemoTopbar({ title }: { title: string }) {
  return (
    <div className="service-demo-topbar">
      <span className="service-demo-dots" aria-hidden="true"><i /><i /><i /></span>
      <strong>{title}</strong>
      <small><i /> Simulação local</small>
    </div>
  );
}

const siteModes = [
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Celular" },
] as const;

export function SitesDemo() {
  const [mode, setMode] = useState("desktop");

  return (
    <div className="service-demo service-demo-sites">
      <div className="service-demo-heading">
        <div>
          <span>Prévia navegável</span>
          <strong>Ateliê Horizonte</strong>
        </div>
        <DemoControls label="Formato da prévia" options={siteModes} selected={mode} onSelect={setMode} />
      </div>

      <div className={`site-preview-stage is-${mode}`} aria-live="polite">
        <div className="site-preview-device">
          <DemoTopbar title={mode === "desktop" ? "ateliehorizonte.com" : "Prévia mobile"} />
          <div className="site-preview-page">
            <div className="site-preview-nav"><b>horizonte.</b><span>Projetos&nbsp;&nbsp; Estúdio&nbsp;&nbsp; Contato</span><i>Conversar</i></div>
            <div className="site-preview-copy">
              <small>Arquitetura com intenção</small>
              <h3>Espaços que começam<br />por boas perguntas.</h3>
              <p>Projetos residenciais e comerciais pensados para a vida real.</p>
              <span>Conhecer projetos</span>
            </div>
            <div className="site-preview-visual" aria-hidden="true">
              <i /><i /><i />
            </div>
            <div className="site-preview-footer"><span>São Paulo</span><span>Arquitetura · Interiores</span></div>
          </div>
        </div>
        <p className="service-demo-feedback">Composição adaptada para {mode === "desktop" ? "tela ampla" : "navegação por toque"}.</p>
      </div>
    </div>
  );
}

const maintenanceOptions = [
  { value: "photo", label: "Foto" },
  { value: "banner", label: "Banner" },
  { value: "event", label: "Evento" },
] as const;

const maintenanceContent = {
  photo: {
    title: "Nova imagem principal",
    detail: "Foto atualizada na abertura da página.",
  },
  banner: {
    title: "Comunicado em destaque",
    detail: "Banner preparado para uma nova campanha.",
  },
  event: {
    title: "Agenda atualizada",
    detail: "Novo evento incluído na programação.",
  },
} as const;

export function MaintenanceDemo() {
  const [update, setUpdate] = useState<keyof typeof maintenanceContent>("banner");
  const content = maintenanceContent[update];

  return (
    <div className="service-demo service-demo-maintenance">
      <DemoTopbar title="Central de atualizações" />
      <div className="maintenance-workspace">
        <div className="maintenance-sidebar">
          <span>O que atualizar</span>
          <DemoControls label="Exemplo de atualização" options={maintenanceOptions} selected={update} onSelect={(value) => setUpdate(value as keyof typeof maintenanceContent)} />
          <div className="maintenance-note" aria-live="polite">
            <i aria-hidden="true">✓</i>
            <span><strong>{content.title}</strong><small>{content.detail}</small></span>
          </div>
        </div>
        <div className={`maintenance-site-preview update-${update}`}>
          <div className="maintenance-site-nav"><b>Casa Lume</b><span>Experiências&nbsp;&nbsp; Agenda</span></div>
          <div className="maintenance-hero-image" aria-hidden="true"><i /><i /></div>
          <div className="maintenance-banner"><small>Em destaque</small><strong>Uma nova experiência começa aqui.</strong></div>
          <div className="maintenance-event"><time>26</time><span><strong>Encontro de primavera</strong><small>Programação especial</small></span></div>
          <span className="maintenance-focus-label">Atualização aplicada</span>
        </div>
      </div>
    </div>
  );
}

const socialOptions = [
  { value: "post", label: "Peça" },
  { value: "carousel", label: "Carrossel" },
  { value: "video", label: "Vídeo curto" },
] as const;

const socialContent = {
  post: { label: "Peça estática", title: "Ideias que cabem na rotina.", meta: "Publicação de marca" },
  carousel: { label: "Carrossel", title: "Três formas de organizar a semana.", meta: "Conteúdo em sequência" },
  video: { label: "Vídeo curto", title: "Um processo, visto por dentro.", meta: "Edição vertical" },
} as const;

export function SocialDemo() {
  const [format, setFormat] = useState<keyof typeof socialContent>("video");
  const content = socialContent[format];

  return (
    <div className="service-demo service-demo-social">
      <div className="service-demo-heading">
        <div><span>Estúdio de conteúdo</span><strong>Uma pauta, diferentes formatos</strong></div>
        <DemoControls label="Formato de conteúdo" options={socialOptions} selected={format} onSelect={(value) => setFormat(value as keyof typeof socialContent)} />
      </div>
      <div className="social-workspace">
        <div className="social-calendar" aria-hidden="true">
          <span>SEG</span><span>TER</span><span className="is-active">QUA</span><span>QUI</span><span>SEX</span>
          <i /><i /><i className="is-active" /><i /><i />
        </div>
        <div className={`social-phone format-${format}`} aria-live="polite">
          <div className="social-phone-head"><b>norte.estúdio</b><i>•••</i></div>
          <div className="social-content-art" aria-hidden="true">
            <span className="social-content-label">{content.label}</span>
            <strong>{content.title}</strong>
            {format === "carousel" && <em>1 / 4</em>}
            {format === "video" && <i className="social-play">▶</i>}
            <span className="social-art-shape" />
          </div>
          <div className="social-phone-foot"><span>♡ · ⌁ · ↗</span><small>{content.meta}</small></div>
        </div>
        <div className="social-caption">
          <span>Legenda organizada</span>
          <i /><i /><i />
          <small>Prévia ilustrativa do conteúdo.</small>
        </div>
      </div>
    </div>
  );
}

const automationSteps = [
  { id: "arrival", label: "Solicitação recebida", detail: "Um novo pedido inicia o fluxo ilustrativo." },
  { id: "triage", label: "Triagem", detail: "O contexto é organizado para orientar a próxima etapa." },
  { id: "record", label: "Registro", detail: "As informações seguem para o ponto definido no processo." },
  { id: "route", label: "Encaminhamento", detail: "A tarefa é direcionada para a ação adequada." },
] as const;

export function AutomationDemo() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="service-demo service-demo-automation">
      <DemoTopbar title="Fluxo ilustrativo · Atendimento" />
      <div className="automation-workspace">
        <div className="automation-flow" role="group" aria-label="Etapas do fluxo ilustrativo">
          {automationSteps.map((step, index) => (
            <div className="automation-step-wrap" key={step.id}>
              <button
                type="button"
                className={index === selected ? "is-selected" : index < selected ? "is-complete" : ""}
                aria-pressed={index === selected}
                onClick={() => setSelected(index)}
              >
                <span>{index < selected ? "✓" : String(index + 1).padStart(2, "0")}</span>
                <strong>{step.label}</strong>
              </button>
              {index < automationSteps.length - 1 && <i className={index < selected ? "is-active" : ""} aria-hidden="true" />}
            </div>
          ))}
        </div>
        <div className="automation-detail" aria-live="polite">
          <span>Etapa {String(selected + 1).padStart(2, "0")}</span>
          <strong>{automationSteps[selected].label}</strong>
          <p>{automationSteps[selected].detail}</p>
          <small>Demonstração local; nenhuma automação real é executada.</small>
        </div>
      </div>
    </div>
  );
}

const aiRequests = [
  {
    id: "triage",
    label: "Triar solicitação",
    prompt: "Organize este pedido para o primeiro atendimento.",
    response: "Interesse identificado: criação de site. Próximo passo sugerido: confirmar objetivo, conteúdo e integrações desejadas.",
  },
  {
    id: "summary",
    label: "Resumir contexto",
    prompt: "Resuma os pontos principais desta conversa.",
    response: "Resumo ilustrativo: empresa em fase de reposicionamento, precisa apresentar serviços e facilitar contatos pelo WhatsApp.",
  },
  {
    id: "route",
    label: "Sugerir encaminhamento",
    prompt: "Qual equipe deve analisar esta necessidade?",
    response: "Encaminhamento ilustrativo: diagnóstico de automação, com levantamento prévio dos canais e das integrações envolvidas.",
  },
] as const;

export function AiDemo() {
  const [request, setRequest] = useState(0);
  const selected = aiRequests[request];

  return (
    <div className="service-demo service-demo-ai">
      <DemoTopbar title="Assistente ilustrativo" />
      <div className="ai-workspace">
        <div className="ai-requests" role="group" aria-label="Solicitações de exemplo">
          <span>Escolha um exemplo</span>
          {aiRequests.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={request === index ? "is-selected" : ""}
              aria-pressed={request === index}
              onClick={() => setRequest(index)}
            >
              <i>{String(index + 1).padStart(2, "0")}</i>
              {item.label}
            </button>
          ))}
        </div>
        <div className="ai-conversation" aria-live="polite">
          <div className="ai-message ai-message-user"><span>Solicitação</span><p>{selected.prompt}</p></div>
          <div className="ai-message ai-message-response">
            <span><i /> Resposta ilustrativa</span>
            <p>{selected.response}</p>
          </div>
          <small>Conteúdo previamente definido. Nenhum dado é enviado e nenhuma API de IA é acionada.</small>
        </div>
      </div>
    </div>
  );
}
