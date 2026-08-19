"use client";

import { FormEvent, useState } from "react";
import type { LeadData, RequiredLeadField } from "./types";

type FlowLeadFormProps = {
  initialLead: LeadData | null;
  onSubmit: (lead: LeadData) => void;
};

const REQUIRED_FIELDS: RequiredLeadField[] = [
  "name",
  "segment",
  "projectType",
  "goal",
  "description",
  "investment",
  "deadline",
];

const FIELD_IDS: Record<RequiredLeadField, string> = {
  name: "flowlead-name",
  segment: "flowlead-segment",
  projectType: "flowlead-project",
  goal: "flowlead-goal",
  description: "flowlead-description",
  investment: "flowlead-investment",
  deadline: "flowlead-deadline",
};

const FIELD_LABELS: Record<RequiredLeadField, string> = {
  name: "nome",
  segment: "segmento",
  projectType: "tipo de projeto",
  goal: "objetivo principal",
  description: "descrição da necessidade",
  investment: "investimento estimado",
  deadline: "prazo desejado",
};

export function FlowLeadForm({ initialLead, onSubmit }: FlowLeadFormProps) {
  const [invalidFields, setInvalidFields] = useState<RequiredLeadField[]>([]);

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
    const missing = REQUIRED_FIELDS.filter((field) => !nextLead[field]);

    if (missing.length > 0) {
      setInvalidFields(missing);
      window.requestAnimationFrame(() => document.getElementById(FIELD_IDS[missing[0]])?.focus());
      return;
    }

    setInvalidFields([]);
    onSubmit(nextLead);
  };

  const describedBy = (field: RequiredLeadField) => invalidFields.includes(field) ? "flowlead-form-error" : undefined;
  const invalid = (field: RequiredLeadField) => invalidFields.includes(field);

  return (
    <div className="flowlead-demo-layout">
      <div className="flowlead-demo-intro">
        <span className="flowlead-demo-kicker">Experimente o fluxo</span>
        <h2>Simule a entrada de um novo lead.</h2>
        <p>Preencha um briefing fictício ou de teste. O FlowLead organiza as informações e monta uma prévia de acompanhamento neste navegador.</p>
        <div className="flowlead-privacy-note">
          <strong>Seus dados ficam aqui.</strong>
          <span>Nada é enviado, armazenado ou compartilhado. Evite inserir informações sensíveis.</span>
        </div>
      </div>

      <form className="flowlead-form" onSubmit={submit} noValidate aria-describedby="flowlead-privacy">
        <div className="flowlead-form-grid">
          <label htmlFor="flowlead-name">Nome <span>*</span>
            <input id="flowlead-name" name="name" type="text" autoComplete="name" maxLength={80} defaultValue={initialLead?.name ?? ""} required aria-invalid={invalid("name")} aria-describedby={describedBy("name")} placeholder="Ex.: Marina Alves" />
          </label>
          <label htmlFor="flowlead-company">Empresa
            <input id="flowlead-company" name="company" type="text" autoComplete="organization" maxLength={100} defaultValue={initialLead?.company === "Não informada" ? "" : initialLead?.company ?? ""} placeholder="Ex.: Aurora Studio" />
          </label>
          <label htmlFor="flowlead-segment">Segmento <span>*</span>
            <select id="flowlead-segment" name="segment" required defaultValue={initialLead?.segment ?? ""} aria-invalid={invalid("segment")} aria-describedby={describedBy("segment")}>
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
            <select id="flowlead-project" name="projectType" required defaultValue={initialLead?.projectType ?? ""} aria-invalid={invalid("projectType")} aria-describedby={describedBy("projectType")}>
              <option value="" disabled>Selecione</option>
              <option>Automação de processo</option>
              <option>Sistema sob medida</option>
              <option>Integração de canais</option>
              <option>Site ou landing page</option>
              <option>Consultoria técnica</option>
            </select>
          </label>
          <label className="flowlead-field-wide" htmlFor="flowlead-goal">Objetivo principal <span>*</span>
            <input id="flowlead-goal" name="goal" type="text" maxLength={160} defaultValue={initialLead?.goal ?? ""} required aria-invalid={invalid("goal")} aria-describedby={describedBy("goal")} placeholder="Ex.: organizar pedidos de orçamento" />
          </label>
          <label className="flowlead-field-wide" htmlFor="flowlead-description">Descrição da necessidade <span>*</span>
            <textarea id="flowlead-description" name="description" rows={4} maxLength={800} defaultValue={initialLead?.description ?? ""} required aria-invalid={invalid("description")} aria-describedby={describedBy("description")} placeholder="Conte brevemente como o processo funciona hoje e o que precisa melhorar." />
          </label>
          <label htmlFor="flowlead-investment">Investimento estimado <span>*</span>
            <select id="flowlead-investment" name="investment" required defaultValue={initialLead?.investment ?? ""} aria-invalid={invalid("investment")} aria-describedby={describedBy("investment")}>
              <option value="" disabled>Selecione uma faixa</option>
              <option>Até R$ 10 mil</option>
              <option>De R$ 10 mil a R$ 25 mil</option>
              <option>De R$ 25 mil a R$ 50 mil</option>
              <option>Acima de R$ 50 mil</option>
              <option>A definir</option>
            </select>
          </label>
          <label htmlFor="flowlead-deadline">Prazo desejado <span>*</span>
            <select id="flowlead-deadline" name="deadline" required defaultValue={initialLead?.deadline ?? ""} aria-invalid={invalid("deadline")} aria-describedby={describedBy("deadline")}>
              <option value="" disabled>Selecione</option>
              <option>Até 7 dias</option>
              <option>De 2 a 4 semanas</option>
              <option>De 1 a 2 meses</option>
              <option>Prazo flexível</option>
            </select>
          </label>
        </div>
        <p id="flowlead-privacy" className="flowlead-form-caption">Simulação frontend · nenhum dado sai desta página.</p>
        {invalidFields.length > 0 && (
          <p id="flowlead-form-error" className="flowlead-form-error" role="alert">
            Revise os campos obrigatórios: {invalidFields.map((field) => FIELD_LABELS[field]).join(", ")}.
          </p>
        )}
        <button className="button button-primary flowlead-submit" type="submit">Organizar lead <span>→</span></button>
      </form>
    </div>
  );
}
