"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";

type NexoAgendaHeaderProps = {
  resetPending: boolean;
  onRequestReset: () => void;
  onConfirmReset: () => void;
  onCancelReset: () => void;
};

export function NexoAgendaHeader({ resetPending, onRequestReset, onConfirmReset, onCancelReset }: NexoAgendaHeaderProps) {
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const wasPendingRef = useRef(false);

  useEffect(() => {
    if (resetPending) cancelButtonRef.current?.focus();
    else if (wasPendingRef.current) resetButtonRef.current?.focus();
    wasPendingRef.current = resetPending;
  }, [resetPending]);

  const cancelResetFromKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Escape") return;
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onCancelReset();
  };

  return (
    <header className="nexo-demo-header">
      <div className="nexo-demo-brand">
        <span aria-hidden="true">NA</span>
        <div><strong>Nexo Agenda</strong><small>Casa Lume · Gestão de horários</small></div>
      </div>
      <div className="nexo-demo-header-actions">
        <span className="nexo-demo-period"><small>Semana visualizada</small><strong>18–22 ago</strong></span>
        <span className="nexo-demo-local"><i aria-hidden="true" />Demonstração local</span>
        {!resetPending ? (
          <button ref={resetButtonRef} type="button" onClick={onRequestReset}>Reiniciar</button>
        ) : (
          <div className="nexo-reset-confirmation" role="dialog" aria-labelledby="nexo-reset-title" aria-describedby="nexo-reset-description">
            <span><strong id="nexo-reset-title">Voltar ao estado inicial?</strong><small id="nexo-reset-description">Agenda, indicadores, histórico e lista de espera serão restaurados.</small></span>
            <button type="button" onClick={onConfirmReset} onKeyDown={cancelResetFromKeyboard}>Restaurar</button>
            <button ref={cancelButtonRef} type="button" onClick={onCancelReset} onKeyDown={cancelResetFromKeyboard}>Continuar</button>
          </div>
        )}
      </div>
    </header>
  );
}
