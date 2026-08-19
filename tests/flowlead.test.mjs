import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildCommercialSummary,
  buildMessagePreview,
  classifyLead,
  FOLLOW_UP_STAGES,
  PROCESSING_STEPS,
} from "../components/flowlead/leadLogic.ts";

const normalLead = {
  name: "Marina Alves",
  company: "Aurora Studio",
  segment: "Serviços profissionais",
  projectType: "Site ou landing page",
  goal: "Organizar pedidos de orçamento",
  description: "Precisamos reunir os contatos recebidos em um fluxo inicial claro.",
  investment: "Até R$ 10 mil",
  deadline: "Prazo flexível",
};

const urgentLead = {
  name: "Rafael Costa",
  company: "Nexo Operações",
  segment: "Tecnologia",
  projectType: "Automação de processo",
  goal: "Automatizar a triagem comercial",
  description: "O processo possui múltiplas etapas, canais, regras e integrações entre sistemas.",
  investment: "Acima de R$ 50 mil",
  deadline: "Até 7 dias",
};

test("classifies normal and urgent leads from transparent form rules", () => {
  const normal = classifyLead(normalLead);
  const urgent = classifyLead(urgentLead);

  assert.equal(normal.key, "normal");
  assert.match(normal.explanation, /planejamento flexível/i);
  assert.equal(urgent.key, "urgent");
  assert.match(urgent.explanation, /prazo de até 7 dias/i);
  assert.equal(urgent.signals.length, 5);
  assert.deepEqual(urgent.signals.map((signal) => signal.label), [
    "Urgência do prazo",
    "Tipo de projeto",
    "Faixa de investimento",
    "Objetivo",
    "Complexidade descrita",
  ]);
});

test("generates a complete commercial summary and a local message preview", () => {
  const priority = classifyLead(urgentLead);
  const summary = buildCommercialSummary(urgentLead, priority);
  const message = buildMessagePreview(urgentLead, priority);

  for (const expected of [
    "Nome: Rafael Costa",
    "Empresa: Nexo Operações",
    "Segmento: Tecnologia",
    "Tipo de projeto: Automação de processo",
    "Objetivo: Automatizar a triagem comercial",
    "Necessidade principal:",
    "Faixa de investimento: Acima de R$ 50 mil",
    "Prazo: Até 7 dias",
    "Prioridade: Urgente",
    "Próxima ação recomendada:",
  ]) assert.ok(summary.includes(expected), `Resumo deve incluir: ${expected}`);

  assert.match(message, /Prévia demonstrativa — nenhuma mensagem foi enviada/);
  assert.doesNotMatch(message, /https?:\/\/|wa\.me|\+?\d{10,}/i);
});

test("keeps processing and follow-up stages finite and session-local", async () => {
  assert.deepEqual(PROCESSING_STEPS, [
    "Validação dos dados",
    "Organização do briefing",
    "Análise de prioridade",
    "Geração do resumo",
    "Criação do acompanhamento",
  ]);
  assert.deepEqual(FOLLOW_UP_STAGES.map((stage) => stage.label), ["Novo", "Qualificado", "Contato agendado", "Proposta"]);

  const sources = await Promise.all([
    "../components/FlowLeadDemo.tsx",
    "../components/flowlead/FlowLeadForm.tsx",
    "../components/flowlead/FlowLeadProcessing.tsx",
    "../components/flowlead/FlowLeadResult.tsx",
    "../components/flowlead/leadLogic.ts",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  const implementation = sources.join("\n");

  assert.match(implementation, /setLead\(null\)/);
  assert.match(implementation, /setPhase\("form"\)/);
  assert.doesNotMatch(implementation, /\bfetch\s*\(|XMLHttpRequest|sendBeacon|window\.open|localStorage|sessionStorage|wa\.me|https?:\/\//i);
});
