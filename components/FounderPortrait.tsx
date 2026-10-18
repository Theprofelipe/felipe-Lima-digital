"use client";

import { useEffect, useRef, useState } from "react";

export function FounderPortrait() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div className={`founder-portrait ${loaded ? "has-image" : ""}`}>
      <div className="portrait-placeholder" aria-hidden="true">
        <span>FLM</span>
        <i />
      </div>
      {!failed && (
        // A tag nativa mantém o placeholder disponível caso o arquivo não carregue.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imageRef}
          src="/images/felipe-lima-machado-perfil.webp"
          alt="Felipe Lima Machado"
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      <div className="portrait-caption"><span>Fundador & Desenvolvedor</span><strong>Felipe Lima Machado</strong></div>
    </div>
  );
}
