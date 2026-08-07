"use client";

import { useCallback, useState } from "react";
import { FlowLeadForm } from "./flowlead/FlowLeadForm";
import { FlowLeadProcessing } from "./flowlead/FlowLeadProcessing";
import { FlowLeadResult } from "./flowlead/FlowLeadResult";
import type { DemoPhase, LeadData } from "./flowlead/types";

export function FlowLeadDemo() {
  const [phase, setPhase] = useState<DemoPhase>("form");
  const [lead, setLead] = useState<LeadData | null>(null);

  const submit = (nextLead: LeadData) => {
    setLead(nextLead);
    setPhase("processing");
  };

  const showResult = useCallback(() => setPhase("result"), []);
  const returnToForm = useCallback(() => setPhase("form"), []);

  const reset = () => {
    setLead(null);
    setPhase("form");
  };

  return (
    <div className="flowlead-demo-shell">
      <div className="flowlead-demo-topbar">
        <div><span className="flowlead-live-dot" aria-hidden="true" />Demonstração local</div>
        <span>{phase === "form" ? "01 · Entrada" : phase === "processing" ? "02 · Processamento" : "03 · Acompanhamento"}</span>
      </div>

      {phase === "form" && <FlowLeadForm initialLead={lead} onSubmit={submit} />}
      {phase === "processing" && lead && <FlowLeadProcessing onBack={returnToForm} onComplete={showResult} />}
      {phase === "result" && lead && <FlowLeadResult lead={lead} onReset={reset} />}
    </div>
  );
}
