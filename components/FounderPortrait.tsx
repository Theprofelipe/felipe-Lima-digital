"use client";

import { useState } from "react";

export function FounderPortrait() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`founder-portrait ${loaded ? "has-image" : ""}`}>
      <div className="portrait-placeholder" aria-hidden="true">
        <span>FLM</span>
        <i />
      </div>
      {!failed && (
        // A tag nativa permite manter o placeholder quando o arquivo opcional ainda não existe.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/felipe-lima-machado.webp"
          alt="Felipe Lima Machado, fundador"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      <div className="portrait-caption"><span>Fundador & Desenvolvedor</span><strong>Felipe Lima Machado</strong></div>
    </div>
  );
}
