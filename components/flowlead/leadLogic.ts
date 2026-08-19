import type { FollowUpStage, LeadData, Priority, PrioritySignal } from "./types";

export const PROCESSING_STEPS = [
  "Validação dos dados",
  "Organização do briefing",
  "Análise de prioridade",
  "Geração do resumo",
  "Criação do acompanhamento",
] as const;

export const FOLLOW_UP_STAGES: FollowUpStage[] = [
  {
    id: "new",
    label: "Novo",
    nextAction: "Revisar o briefing e qualificar a oportunidade",
    activity: "Lead adicionado ao acompanhamento comercial",
  },
  {
    id: "qualified",
    label: "Qualificado",
    nextAction: "Sugerir uma data para a conversa de diagnóstico",
    activity: "Oportunidade marcada como qualificada",
  },
  {
    id: "scheduled",
    label: "Contato agendado",
    nextAction: "Preparar escopo e pontos para a conversa",
    activity: "Contato comercial registrado como agendado",
  },
  {
    id: "proposal",
    label: "Proposta",
    nextAction: "Acompanhar o retorno sobre a proposta",
    activity: "Oportunidade avançada para proposta",
  },
];

const COMPLEX_PROJECTS = new Set([
  "Automação de processo",
  "Sistema sob medida",
  "Integração de canais",
]);

const normalize = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("pt-BR");

function mentionsComplexity(value: string) {
  return /(automat|integr|sistema|multipl|etapa|canal|regra|escala|manual)/.test(normalize(value));
}

export function classifyLead(lead: LeadData): Priority {
  const signals: PrioritySignal[] = [];

  const deadlinePoints = lead.deadline === "Até 7 dias" ? 4 : lead.deadline === "De 2 a 4 semanas" ? 2 : 0;
  signals.push({
    label: "Urgência do prazo",
    detail: deadlinePoints === 4
      ? "Prazo de até 7 dias pede retorno imediato."
      : deadlinePoints === 2
        ? "Prazo de 2 a 4 semanas antecipa a análise."
        : "Prazo confortável mantém o fluxo padrão.",
    points: deadlinePoints,
  });

  const projectPoints = COMPLEX_PROJECTS.has(lead.projectType) ? 2 : lead.projectType === "Site ou landing page" ? 1 : 0;
  signals.push({
    label: "Tipo de projeto",
    detail: projectPoints === 2
      ? `${lead.projectType} tende a envolver mais regras e etapas.`
      : projectPoints === 1
        ? "O projeto possui escopo digital objetivo."
        : "O projeto pode começar por um diagnóstico de escopo.",
    points: projectPoints,
  });

  const investmentPoints = lead.investment === "Acima de R$ 50 mil" ? 2 : lead.investment === "De R$ 25 mil a R$ 50 mil" ? 1 : 0;
  signals.push({
    label: "Faixa de investimento",
    detail: investmentPoints === 2
      ? "A faixa indicada recomenda análise comercial prioritária."
      : investmentPoints === 1
        ? "A faixa indicada reforça a oportunidade."
        : "A faixa indicada não altera a prioridade por si só.",
    points: investmentPoints,
  });

  const goalPoints = mentionsComplexity(lead.goal) ? 1 : 0;
  signals.push({
    label: "Objetivo",
    detail: goalPoints
      ? "O objetivo menciona automação, integração ou ganho de escala."
      : "O objetivo foi considerado sem sinal extra de urgência.",
    points: goalPoints,
  });

  const descriptionPoints = lead.description.trim().split(/\s+/).length >= 28 || mentionsComplexity(lead.description) ? 1 : 0;
  signals.push({
    label: "Complexidade descrita",
    detail: descriptionPoints
      ? "A necessidade cita múltiplas etapas, regras ou sistemas."
      : "A descrição sugere um escopo inicial mais direto.",
    points: descriptionPoints,
  });

  const score = signals.reduce((total, signal) => total + signal.points, 0);

  if (deadlinePoints === 4 || score >= 7) {
    return {
      key: "urgent",
      label: "Urgente",
      explanation: `Prioridade urgente: ${deadlinePoints === 4 ? "prazo de até 7 dias" : "combinação de escopo e investimento"} exige retorno rápido.`,
      nextAction: "Agendar diagnóstico em até 1 dia útil",
      followUpWindow: "Até 1 dia útil",
      signals,
    };
  }

  if (score >= 3) {
    const hasComplexProject = projectPoints === 2;
    return {
      key: "high",
      label: "Alta",
      explanation: `Prioridade alta: ${deadlinePoints > 0 ? "prazo curto" : "escopo relevante"}${hasComplexProject ? " e projeto com maior complexidade" : " e sinais do briefing"}.`,
      nextAction: "Revisar escopo e sugerir horário para diagnóstico",
      followUpWindow: "Até 2 dias úteis",
      signals,
    };
  }

  return {
    key: "normal",
    label: "Normal",
    explanation: "Prioridade normal: planejamento flexível e escopo inicial permitem seguir o fluxo padrão.",
    nextAction: "Confirmar briefing e organizar primeira conversa",
    followUpWindow: "Até 3 dias úteis",
    signals,
  };
}

export function buildCommercialSummary(lead: LeadData, priority: Priority) {
  return [
    "RESUMO COMERCIAL — FLOWLEAD",
    "Demonstração local",
    "",
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `Segmento: ${lead.segment}`,
    `Tipo de projeto: ${lead.projectType}`,
    `Objetivo: ${lead.goal}`,
    `Necessidade principal: ${lead.description}`,
    `Faixa de investimento: ${lead.investment}`,
    `Prazo: ${lead.deadline}`,
    `Prioridade: ${priority.label}`,
    `Justificativa: ${priority.explanation}`,
    `Próxima ação recomendada: ${priority.nextAction}`,
  ].join("\n");
}

export function buildMessagePreview(lead: LeadData, priority: Priority) {
  return [
    "Olá, equipe comercial!",
    "",
    "Um novo lead foi organizado no FlowLead:",
    `• ${lead.name} — ${lead.company}`,
    `• ${lead.segment}`,
    `• Projeto: ${lead.projectType}`,
    `• Objetivo: ${lead.goal}`,
    `• Investimento: ${lead.investment}`,
    `• Prazo: ${lead.deadline}`,
    `• Prioridade demonstrativa: ${priority.label}`,
    "",
    `Próxima ação: ${priority.nextAction}.`,
    "",
    "Prévia demonstrativa — nenhuma mensagem foi enviada.",
  ].join("\n");
}
