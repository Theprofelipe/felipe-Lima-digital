import { automationSteps } from "../data/site";

function WindowControls() {
  return <span className="window-controls" aria-hidden="true"><i /><i /><i /></span>;
}

export function HeroProductVisual() {
  return (
    <div className="hero-visual" aria-label="Interface de produto digital exibida em notebook e celular">
      <div className="visual-glow visual-glow-one" />
      <div className="visual-glow visual-glow-two" />
      <div className="floating-label label-performance"><span />Performance<br /><strong>Otimizada</strong></div>
      <div className="laptop">
        <div className="laptop-screen">
          <div className="mock-window-bar"><WindowControls /><span>painel.empresa</span></div>
          <div className="dashboard-shell">
            <aside className="dashboard-sidebar">
              <b>f.</b><i className="active" /><i /><i /><i />
            </aside>
            <div className="dashboard-content">
              <div className="dashboard-heading">
                <span>Visão geral</span><i>Hoje</i>
              </div>
              <div className="metric-row">
                <div><small>Oportunidades</small><strong>24</strong><em>+8 esta semana</em></div>
                <div><small>Em andamento</small><strong>12</strong><em>Fluxo atualizado</em></div>
                <div><small>Conversão</small><strong>Alta</strong><em>Meta acompanhada</em></div>
              </div>
              <div className="chart-card">
                <div className="chart-title"><span>Crescimento</span><small>Últimos 30 dias</small></div>
                <div className="chart-bars" aria-hidden="true">
                  {[28, 42, 35, 56, 48, 72, 61, 84, 77, 92, 88, 98].map((height, index) => (
                    <i key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="laptop-base"><span /></div>
      </div>
      <div className="phone">
        <div className="phone-sensor" />
        <div className="phone-ui">
          <div className="phone-top"><span>9:41</span><i /></div>
          <p>Olá, Felipe</p>
          <h3>Seu negócio,<br />em movimento.</h3>
          <div className="phone-card phone-card-main"><span>Novos contatos</span><strong>08</strong><small>hoje</small></div>
          <div className="phone-progress"><span /><span /><span /></div>
          <div className="phone-card phone-card-line"><i /><span><b>Automação ativa</b><small>Fluxo funcionando</small></span><em>ON</em></div>
        </div>
      </div>
      <div className="floating-label label-ai"><span>IA</span><strong>Fluxo conectado</strong></div>
    </div>
  );
}

export function SiteDeviceVisual() {
  return (
    <div className="site-device-visual" aria-label="Site responsivo exibido em telas de desktop e celular">
      <div className="site-browser">
        <div className="mock-window-bar"><WindowControls /><span>seunegocio.com.br</span><em>Seguro</em></div>
        <div className="website-screen">
          <nav><b>marca.</b><span>Sobre&nbsp;&nbsp;&nbsp; Serviços&nbsp;&nbsp;&nbsp; Contato</span><i>Conversar</i></nav>
          <div className="website-hero-copy">
            <small>NOVAS POSSIBILIDADES</small>
            <h3>Uma presença digital<br />à altura do seu trabalho.</h3>
            <p>Clareza para apresentar. Velocidade para convencer.</p>
            <span className="fake-button">Conhecer soluções</span>
          </div>
          <div className="website-art" aria-hidden="true"><span /><i /><b /></div>
        </div>
      </div>
      <div className="site-phone">
        <div className="phone-sensor" />
        <div className="site-phone-screen">
          <b>marca.</b>
          <small>NOVAS POSSIBILIDADES</small>
          <h3>Presença digital<br />que trabalha.</h3>
          <div className="site-phone-art"><span /><i /></div>
          <em>Conhecer</em>
        </div>
      </div>
      <div className="site-score-card"><span>Experiência</span><strong>Rápida</strong><small>em qualquer tela</small></div>
    </div>
  );
}

export function AutomationConsole() {
  return (
    <div className="automation-console" aria-label="Exemplo de fluxo de automação conectado">
      <div className="console-topbar">
        <WindowControls />
        <span>Fluxo • Atendimento inteligente</span>
        <em><i /> Ativo</em>
      </div>
      <div className="workflow">
        {automationSteps.map((step, index) => (
          <div className="workflow-row" key={step.index}>
            <div className="workflow-index">{step.index}</div>
            <div className={`workflow-node workflow-node-${index + 1}`}>
              <span className="workflow-symbol" aria-hidden="true">{index === 1 ? "IA" : index === 2 ? "CRM" : index === 3 ? "W" : index === 4 ? "✓" : "+"}</span>
              <span><strong>{step.label}</strong><small>{step.detail}</small></span>
              <em>{index === 0 ? "agora" : "automático"}</em>
            </div>
            {index < automationSteps.length - 1 && <div className="workflow-line"><i /></div>}
          </div>
        ))}
      </div>
      <div className="console-footer"><span><i /> 5 etapas conectadas</span><span>Tempo poupado em cada novo contato</span></div>
    </div>
  );
}

