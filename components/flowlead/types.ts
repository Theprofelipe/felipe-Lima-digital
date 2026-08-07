export type DemoPhase = "form" | "processing" | "result";

export type LeadData = {
  name: string;
  company: string;
  segment: string;
  projectType: string;
  goal: string;
  description: string;
  investment: string;
  deadline: string;
};

export type RequiredLeadField = Exclude<keyof LeadData, "company">;

export type PriorityKey = "normal" | "high" | "urgent";

export type PrioritySignal = {
  label: string;
  detail: string;
  points: number;
};

export type Priority = {
  key: PriorityKey;
  label: "Normal" | "Alta" | "Urgente";
  explanation: string;
  nextAction: string;
  followUpWindow: string;
  signals: PrioritySignal[];
};

export type FollowUpStage = {
  id: "new" | "qualified" | "scheduled" | "proposal";
  label: "Novo" | "Qualificado" | "Contato agendado" | "Proposta";
  nextAction: string;
  activity: string;
};
