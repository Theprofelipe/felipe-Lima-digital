"use client";

import { useEffect, useState } from "react";
import { PROCESSING_STEPS } from "./leadLogic";

type FlowLeadProcessingProps = {
  onBack: () => void;
  onComplete: () => void;
};

export function FlowLeadProcessing({ onBack, onComplete }: FlowLeadProcessingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];

    if (reducedMotion) {
      timers.push(window.setTimeout(() => setCurrentStep(PROCESSING_STEPS.length - 1), 0));
      timers.push(window.setTimeout(onComplete, 280));
    } else {
      PROCESSING_STEPS.slice(1).forEach((_, index) => {
        timers.push(window.setTimeout(() => setCurrentStep(index + 1), (index + 1) * 310));
      });
      timers.push(window.setTimeout(onComplete, PROCESSING_STEPS.length * 310 + 170));
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onComplete]);

  return (
    <div className="flowlead-processing" role="status" aria-live="polite">
      <div className="flowlead-processing-mark" aria-hidden="true"><span>FL</span><i /></div>
      <span className="flowlead-demo-kicker">Processamento simulado · etapa {currentStep + 1} de {PROCESSING_STEPS.length}</span>
      <h2>Organizando o briefing localmente.</h2>
      <p>Nenhuma IA, API ou integração externa está sendo acionada. Esta sequência apenas demonstra como o fluxo poderia ser apresentado.</p>
      <div className="flowlead-progress-track" aria-hidden="true"><span style={{ width: `${((currentStep + 1) / PROCESSING_STEPS.length) * 100}%` }} /></div>
      <ol className="flowlead-processing-steps">
        {PROCESSING_STEPS.map((step, index) => {
          const state = index < currentStep ? "complete" : index === currentStep ? "current" : "pending";
          return (
            <li key={step} className={`flowlead-processing-step is-${state}`}>
              <i aria-hidden="true">{state === "complete" ? "✓" : index + 1}</i>
              <span><strong>{step}</strong><small>{state === "complete" ? "Concluída" : state === "current" ? "Em andamento" : "Aguardando"}</small></span>
            </li>
          );
        })}
      </ol>
      <button className="flowlead-text-button" type="button" onClick={onBack}>Voltar ao formulário</button>
    </div>
  );
}
