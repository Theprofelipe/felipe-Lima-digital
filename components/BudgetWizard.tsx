"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { siteConfig } from "../data/site";

const projectTypes = [
  "Site institucional",
  "Landing page",
  "Sistema web",
  "Automação com IA",
  "Agente de IA",
  "E-commerce",
  "Integração ou API",
  "Outra ideia",
] as const;

const projectObjectives = [
  "Conseguir mais clientes",
  "Melhorar a presença digital",
  "Automatizar atendimento",
  "Reduzir tarefas repetitivas",
  "Criar uma ferramenta interna",
  "Vender pela internet",
  "Outro",
] as const;

const investmentRanges = [
  "Ainda não defini",
  "Até R$ 1.500",
  "R$ 1.500 a R$ 3.000",
  "R$ 3.000 a R$ 6.000",
  "Acima de R$ 6.000",
] as const;

const deadlines = [
  "Quero começar o quanto antes",
  "Dentro de 30 dias",
  "Dentro de 2 a 3 meses",
  "Ainda estou planejando",
] as const;

type BudgetData = {
  projectType: string;
  name: string;
  company: string;
  segment: string;
  description: string;
  objective: string;
  investment: string;
  deadline: string;
};

type BudgetField = keyof BudgetData;

const initialData: BudgetData = {
  projectType: "",
  name: "",
  company: "",
  segment: "",
  description: "",
  objective: "",
  investment: "",
  deadline: "",
};

const stepTitles = [
  "O que vamos construir?",
  "Sobre o negócio",
  "Sobre o projeto",
  "Investimento e prazo",
  "Revise sua solicitação",
] as const;

function OptionGrid({
  label,
  options,
  value,
  onChange,
  columns = 2,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div className="budget-option-group" role="group" aria-label={label}>
      <div className={`budget-options budget-options-${columns}`}>
        {options.map((option) => (
          <button
            className={`budget-option ${value === option ? "is-selected" : ""}`}
            type="button"
            aria-pressed={value === option}
            key={option}
            onClick={() => onChange(option)}
          >
            <span aria-hidden="true"><i /></span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function BudgetWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BudgetData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<BudgetField, string>>>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const closeWizard = useCallback(() => {
    setOpen(false);
    setErrors({});
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    const openFromTrigger = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-budget-wizard]");
      if (!trigger) return;
      event.preventDefault();
      triggerRef.current = trigger;
      setOpen(true);
    };

    document.addEventListener("click", openFromTrigger);
    return () => document.removeEventListener("click", openFromTrigger);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeWizard();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [href]:not([aria-disabled="true"]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeWizard, open]);

  const updateField = (field: BudgetField, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateStep = () => {
    const nextErrors: Partial<Record<BudgetField, string>> = {};

    if (step === 0 && !data.projectType) {
      nextErrors.projectType = "Selecione o tipo de projeto para continuar.";
    }
    if (step === 1 && !data.name.trim()) {
      nextErrors.name = "Informe seu nome para continuar.";
    }
    if (step === 2) {
      if (!data.description.trim()) {
        nextErrors.description = "Conte brevemente o que você deseja construir.";
      }
      if (!data.objective) {
        nextErrors.objective = "Selecione o principal objetivo do projeto.";
      }
    }
    if (step === 3) {
      if (!data.investment) {
        nextErrors.investment = "Selecione uma faixa de investimento.";
      }
      if (!data.deadline) {
        nextErrors.deadline = "Selecione o prazo mais adequado.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const continueWizard = () => {
    if (!validateStep()) return;
    setStep((current) => Math.min(current + 1, stepTitles.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const continueOnWhatsApp = () => {
    const message = [
      "Olá, Felipe! Vim pelo site Felipe Lima Digital e gostaria de solicitar um orçamento.",
      "",
      `Nome: ${data.name.trim()}`,
      `Empresa: ${data.company.trim() || "Não informado"}`,
      `Segmento: ${data.segment.trim() || "Não informado"}`,
      `Tipo de projeto: ${data.projectType}`,
      `Objetivo: ${data.objective}`,
      `Descrição: ${data.description.trim()}`,
      `Investimento estimado: ${data.investment}`,
      `Prazo: ${data.deadline}`,
      "",
      "Gostaria de conversar sobre essa ideia.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (whatsappWindow) whatsappWindow.opener = null;
  };

  if (!open) return null;

  const reviewItems = [
    ["Tipo de projeto", data.projectType],
    ["Nome", data.name],
    ["Empresa", data.company || "Não informado"],
    ["Segmento", data.segment || "Não informado"],
    ["Objetivo", data.objective],
    ["Descrição", data.description],
    ["Investimento estimado", data.investment],
    ["Prazo", data.deadline],
  ];

  return (
    <div className="budget-overlay">
      <button
        className="budget-overlay-dismiss"
        type="button"
        tabIndex={-1}
        aria-label="Fechar solicitação de orçamento"
        onClick={closeWizard}
      />
      <div
        className="budget-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="budget-dialog-title"
        aria-describedby="budget-privacy-note"
      >
        <header className="budget-header">
          <div className="budget-header-copy">
            <span>Orçamento inteligente</span>
            <p aria-live="polite">Etapa {step + 1} de {stepTitles.length}</p>
          </div>
          <button
            className="budget-close"
            type="button"
            ref={closeButtonRef}
            onClick={closeWizard}
            aria-label="Fechar solicitação de orçamento"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <div
            className="budget-progress"
            role="progressbar"
            aria-label="Progresso da solicitação"
            aria-valuemin={1}
            aria-valuemax={stepTitles.length}
            aria-valuenow={step + 1}
          >
            <i style={{ width: `${((step + 1) / stepTitles.length) * 100}%` }} />
          </div>
        </header>

        <div className="budget-body">
          <div className="budget-step" key={step}>
            <span className="budget-step-number">0{step + 1}</span>
            <h2 id="budget-dialog-title">{stepTitles[step]}</h2>

            {step === 0 && (
              <>
                <p className="budget-intro">Escolha a opção que mais se aproxima da sua necessidade.</p>
                <OptionGrid
                  label="Tipo de projeto"
                  options={projectTypes}
                  value={data.projectType}
                  onChange={(value) => updateField("projectType", value)}
                />
                {errors.projectType && <p className="budget-error" role="alert">{errors.projectType}</p>}
              </>
            )}

            {step === 1 && (
              <div className="budget-fields">
                <label className="budget-field" htmlFor="budget-name">
                  <span>Nome <i>*</i></span>
                  <input
                    id="budget-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={data.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "budget-name-error" : undefined}
                    placeholder="Como podemos chamar você?"
                  />
                </label>
                {errors.name && <p className="budget-error" id="budget-name-error" role="alert">{errors.name}</p>}
                <label className="budget-field" htmlFor="budget-company">
                  <span>Nome da empresa ou negócio <small>Opcional</small></span>
                  <input
                    id="budget-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={data.company}
                    onChange={(event) => updateField("company", event.target.value)}
                    placeholder="Nome do seu negócio"
                  />
                </label>
                <label className="budget-field" htmlFor="budget-segment">
                  <span>Segmento do negócio <small>Opcional</small></span>
                  <input
                    id="budget-segment"
                    name="segment"
                    type="text"
                    value={data.segment}
                    onChange={(event) => updateField("segment", event.target.value)}
                    placeholder="Ex.: saúde, varejo, consultoria"
                  />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="budget-fields">
                <label className="budget-field budget-field-textarea" htmlFor="budget-description">
                  <span>Descreva brevemente sua ideia ou problema <i>*</i></span>
                  <textarea
                    id="budget-description"
                    name="description"
                    rows={4}
                    value={data.description}
                    onChange={(event) => updateField("description", event.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "budget-description-error" : undefined}
                    placeholder="Conte o contexto e o resultado que você espera."
                  />
                </label>
                {errors.description && <p className="budget-error" id="budget-description-error" role="alert">{errors.description}</p>}
                <div className="budget-field-label">Principal objetivo do projeto <i>*</i></div>
                <OptionGrid
                  label="Principal objetivo do projeto"
                  options={projectObjectives}
                  value={data.objective}
                  onChange={(value) => updateField("objective", value)}
                />
                {errors.objective && <p className="budget-error" role="alert">{errors.objective}</p>}
              </div>
            )}

            {step === 3 && (
              <div className="budget-fields budget-fields-spaced">
                <div>
                  <div className="budget-field-label">Faixa de investimento <i>*</i></div>
                  <OptionGrid
                    label="Faixa de investimento"
                    options={investmentRanges}
                    value={data.investment}
                    onChange={(value) => updateField("investment", value)}
                  />
                  {errors.investment && <p className="budget-error" role="alert">{errors.investment}</p>}
                </div>
                <div>
                  <div className="budget-field-label">Prazo <i>*</i></div>
                  <OptionGrid
                    label="Prazo"
                    options={deadlines}
                    value={data.deadline}
                    onChange={(value) => updateField("deadline", value)}
                  />
                  {errors.deadline && <p className="budget-error" role="alert">{errors.deadline}</p>}
                </div>
              </div>
            )}

            {step === 4 && (
              <>
                <p className="budget-intro">Confira as informações antes de continuar para o WhatsApp.</p>
                <dl className="budget-review">
                  {reviewItems.map(([label, value]) => (
                    <div key={label} className={label === "Descrição" ? "budget-review-wide" : ""}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </div>

        <footer className="budget-footer">
          <p id="budget-privacy-note">Seus dados não são enviados a servidores. Eles servem apenas para montar a mensagem do WhatsApp.</p>
          <div className="budget-actions">
            {step > 0 && (
              <button className="button budget-back" type="button" onClick={goBack}>
                <span aria-hidden="true">←</span> Voltar
              </button>
            )}
            {step < stepTitles.length - 1 ? (
              <button className="button button-primary budget-next" type="button" onClick={continueWizard}>
                Continuar <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button className="button button-primary budget-next" type="button" onClick={continueOnWhatsApp}>
                Continuar pelo WhatsApp <span aria-hidden="true">↗</span>
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

