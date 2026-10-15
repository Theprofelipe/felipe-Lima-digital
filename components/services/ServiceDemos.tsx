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
          <span>Demonstração · Página de serviço</span>
          <strong>Felipe Lima Digital</strong>
        </div>
        <DemoControls label="Formato da prévia" options={siteModes} selected={mode} onSelect={setMode} />
      </div>

      <div className={`site-preview-stage is-${mode}`} aria-live="polite">
        <div className="site-preview-device">
          <DemoTopbar title={mode === "desktop" ? "felipelima.digital/servicos" : "Prévia mobile"} />
          <div className="site-preview-page">
            <div className="site-preview-nav"><b>FL Digital</b><span>Serviços&nbsp;&nbsp; Projetos&nbsp;&nbsp; Contato</span><i>Conversar</i></div>
            <div className="site-preview-copy">
              <small>Serviços e pacotes</small>
              <h3>Da presença digital<br />à operação inteligente.</h3>
              <p>Uma oferta clara, organizada pelo momento de cada negócio.</p>
              <span>Comparar pacotes</span>
            </div>
            <div className="site-preview-visual" aria-hidden="true">
              <i /><i /><i />
            </div>
            <div className="site-preview-footer"><span>Demonstração em código</span><span>Sites · Automação · IA</span></div>
          </div>
        </div>
        <p className="service-demo-feedback">Composição adaptada para {mode === "desktop" ? "tela ampla" : "navegação por toque"}.</p>
      </div>
    </div>
  );
}

const maintenanceOptions = [
  { value: "photo", label: "Case" },
  { value: "banner", label: "Campanha" },
  { value: "event", label: "SEO" },
] as const;

const maintenanceContent = {
  photo: {
    title: "Novo case publicado",
    detail: "Imagem, contexto e resultado adicionados ao portfólio.",
  },
  banner: {
    title: "Campanha em destaque",
    detail: "Mensagem e chamada para ação revisadas para a nova oferta.",
  },
  event: {
    title: "Busca atualizada",
    detail: "Metadados, rota e sitemap revisados para indexação.",
  },
} as const;

export function MaintenanceDemo() {
  const [update, setUpdate] = useState<keyof typeof maintenanceContent>("banner");
  const content = maintenanceContent[update];

  return (
    <div className="service-demo service-demo-maintenance">
      <DemoTopbar title="Demonstração · Rotina de manutenção" />
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
          <div className="maintenance-site-nav"><b>Felipe Lima Digital</b><span>Serviços&nbsp;&nbsp; Projetos</span></div>
          <div className="maintenance-hero-image" aria-hidden="true"><i /><i /></div>
          <div className="maintenance-banner"><small>Nova oferta</small><strong>Serviços organizados para cada momento.</strong></div>
          <div className="maintenance-event"><time>SEO</time><span><strong>Rota pronta para busca</strong><small>Metadados e sitemap revisados</small></span></div>
          <span className="maintenance-focus-label">Alteração simulada</span>
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
  post: { label: "Peça estática", title: "O que um site precisa explicar em oito segundos.", meta: "Série Clareza digital" },
  carousel: { label: "Carrossel", title: "Da presença à operação em três etapas.", meta: "Série Serviços em prática" },
  video: { label: "Vídeo curto", title: "Como nasce uma automação bem definida.", meta: "Série Por dentro do processo" },
} as const;

export function SocialDemo() {
  const [format, setFormat] = useState<keyof typeof socialContent>("video");
  const content = socialContent[format];

  return (
    <div className="service-demo service-demo-social">
      <div className="service-demo-heading">
        <div><span>Demonstração · Estúdio de conteúdo</span><strong>Felipe Lima Digital em diferentes formatos</strong></div>
        <DemoControls label="Formato de conteúdo" options={socialOptions} selected={format} onSelect={(value) => setFormat(value as keyof typeof socialContent)} />
      </div>
      <div className="social-workspace">
        <div className="social-calendar" aria-hidden="true">
          <span>SEG</span><span>TER</span><span className="is-active">QUA</span><span>QUI</span><span>SEX</span>
          <i /><i /><i className="is-active" /><i /><i />
        </div>
        <div className={`social-phone format-${format}`} aria-live="polite">
          <div className="social-phone-head"><b>felipelima.digital</b><i aria-hidden="true">•••</i></div>
          <div className="social-content-art">
            <span className="social-content-label">{content.label}</span>
            <strong>{content.title}</strong>
            {format === "carousel" && <em>1 / 4</em>}
            {format === "video" && <i className="social-play">▶</i>}
            <span className="social-art-shape" aria-hidden="true" />
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
  { id: "arrival", label: "Contato pelo site", detail: "A demonstração recebe objetivo, momento do negócio e serviço de interesse." },
  { id: "triage", label: "Diagnóstico do pedido", detail: "O contexto é organizado antes de sugerir pacote, composição ou solução sob medida." },
  { id: "record", label: "Proposta organizada", detail: "Escopo, entregáveis e responsabilidades seguem para uma proposta clara." },
  { id: "route", label: "Acompanhamento", detail: "O próximo passo fica registrado para conduzir a conversa sem perder contexto." },
] as const;

export function AutomationDemo() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="service-demo service-demo-automation">
      <DemoTopbar title="Demonstração · Fluxo de oportunidade" />
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
    label: "Organizar um briefing",
    prompt: "Organize este pedido de uma nova página de serviços.",
    response: "Objetivo identificado: apresentar ofertas com clareza. Próximo passo sugerido: confirmar públicos, prioridades, provas e chamadas para contato.",
  },
  {
    id: "summary",
    label: "Resumir um diagnóstico",
    prompt: "Resuma os pontos principais desta análise de presença digital.",
    response: "Resumo demonstrativo: a oferta existe, mas precisa de hierarquia, diferenciação entre pacotes e um próximo passo mais visível.",
  },
  {
    id: "route",
    label: "Sugerir próximo passo",
    prompt: "Esta necessidade pede pacote ou solução personalizada?",
    response: "Encaminhamento demonstrativo: iniciar pelo diagnóstico de automação, levantando processo, canais, volume e integrações antes do escopo.",
  },
] as const;

export function AiDemo() {
  const [request, setRequest] = useState(0);
  const selected = aiRequests[request];

  return (
    <div className="service-demo service-demo-ai">
      <DemoTopbar title="Demonstração · Assistente de diagnóstico" />
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
