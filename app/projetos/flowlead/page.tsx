/* eslint-disable @next/next/no-html-link-for-pages -- Links nativos evitam uma falha de prefetch do adaptador Vinext atual. */
import type { Metadata } from "next";
import { FlowLeadDemo } from "../../../components/FlowLeadDemo";
import { Footer } from "../../../components/Footer";
import { Navbar } from "../../../components/Navbar";
import { Reveal } from "../../../components/Reveal";
import "./flowlead.css";

export const metadata: Metadata = {
  title: "FlowLead | Automação inteligente de atendimento",
  description: "Demonstração autoral de um fluxo inteligente para organizar, qualificar e acompanhar solicitações comerciais.",
  alternates: { canonical: "/projetos/flowlead" },
};

const flowSteps = [
  { number: "01", title: "Entrada do lead", text: "O contato descreve sua necessidade em um formulário objetivo." },
  { number: "02", title: "Identificação", text: "Objetivo, contexto, investimento e prazo ganham estrutura." },
  { number: "03", title: "Organização", text: "As informações são reunidas em um briefing fácil de consultar." },
  { number: "04", title: "Classificação", text: "Critérios transparentes indicam a prioridade do atendimento." },
  { number: "05", title: "Resumo", text: "Uma visão sintética prepara a conversa comercial." },
  { number: "06", title: "Acompanhamento", text: "A próxima ação fica clara em uma prévia de painel." },
] as const;

const possibleConnections = ["Formulários", "APIs", "Webhooks", "WhatsApp", "CRM", "Automações", "Inteligência artificial"] as const;

function FlowLeadHeroVisual() {
  return (
    <div className="flowlead-hero-visual" aria-label="Fluxo demonstrativo organizando um novo contato">
      <div className="flowlead-product-window">
        <div className="flowlead-window-bar"><span><i /><i /><i /></span><em>FlowLead · Visão do fluxo</em><b><i /> Local</b></div>
        <div className="flowlead-window-body">
          <aside aria-hidden="true"><strong>FL</strong><i className="active" /><i /><i /><i /></aside>
          <main>
            <div className="flowlead-window-heading"><span>Novo atendimento</span><small>Qualificação em andamento</small></div>
            <div className="flowlead-window-flow">
              <div><i>01</i><span><strong>Lead recebido</strong><small>Formulário</small></span><em>agora</em></div>
              <b />
              <div><i>02</i><span><strong>Contexto organizado</strong><small>Briefing estruturado</small></span><em>local</em></div>
              <b />
              <div><i>03</i><span><strong>Próxima ação</strong><small>Diagnóstico sugerido</small></span><em>pronto</em></div>
            </div>
          </main>
        </div>
      </div>
      <div className="flowlead-floating-card flowlead-floating-lead"><span>Novo lead</span><strong>Marina Alves</strong><small>Aurora Studio</small></div>
      <div className="flowlead-floating-card flowlead-floating-priority"><span>Prioridade</span><strong><i /> Alta</strong><small>Prazo + complexidade</small></div>
    </div>
  );
}

export default function FlowLeadPage() {
  return (
    <>
      <Navbar />
      <main className="flowlead-page">
        <section className="flowlead-hero">
          <div className="flowlead-hero-grid-pattern" aria-hidden="true" />
          <div className="flowlead-hero-glow flowlead-hero-glow-one" aria-hidden="true" />
          <div className="flowlead-hero-glow flowlead-hero-glow-two" aria-hidden="true" />
          <div className="container flowlead-hero-grid">
            <div className="flowlead-hero-copy">
              <div className="flowlead-hero-meta"><span className="eyebrow"><i /> Automação e IA</span><span>Projeto autoral demonstrativo</span></div>
              <h1>Contatos viram oportunidades <span>organizadas.</span></h1>
              <p>FlowLead demonstra como uma empresa pode receber pedidos de orçamento, entender prioridades e preparar o acompanhamento sem perder contexto pelo caminho.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#demonstracao">Experimentar demonstração <span>↓</span></a>
                <a className="button button-secondary" href="/#projetos">Voltar aos projetos <span>←</span></a>
              </div>
              <div className="flowlead-local-proof"><i aria-hidden="true">✓</i><span><strong>Simulação segura no navegador</strong>Nenhum dado é enviado ou armazenado.</span></div>
            </div>
            <FlowLeadHeroVisual />
          </div>
        </section>

        <section className="section flowlead-problem-section">
          <div className="container flowlead-problem-grid">
            <Reveal>
              <div className="flowlead-problem-label"><span>O problema</span><i /></div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flowlead-problem-copy">
                <h2>Receber o contato é só o começo.</h2>
                <p>Quando solicitações chegam sem padrão, informações importantes se espalham e o retorno depende de tarefas manuais. O FlowLead propõe um caminho claro entre a intenção do visitante e a próxima ação da empresa.</p>
                <div><span>Menos contexto perdido</span><span>Prioridade visível</span><span>Acompanhamento claro</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section flowlead-steps-section">
          <div className="container">
            <Reveal>
              <div className="section-topline">
                <div className="section-heading"><span className="eyebrow"><i /> Fluxo visual</span><h2>Da entrada à próxima ação,<br />sem perder o fio.</h2></div>
                <p className="section-note">Seis etapas conectam a necessidade do visitante a uma visão pronta para acompanhamento.</p>
              </div>
            </Reveal>
            <div className="flowlead-steps-grid">
              {flowSteps.map((step, index) => (
                <Reveal key={step.number} delay={(index % 3) * 70}>
                  <article className="flowlead-step-card">
                    <div><span>{step.number}</span>{index < flowSteps.length - 1 && <i aria-hidden="true">→</i>}</div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section flowlead-demo-section" id="demonstracao">
          <div className="container">
            <Reveal><FlowLeadDemo /></Reveal>
          </div>
        </section>

        <section className="section flowlead-technical-section">
          <div className="container flowlead-technical-grid">
            <Reveal>
              <div className="flowlead-technical-copy">
                <span className="eyebrow eyebrow-light"><i /> Possibilidades técnicas</span>
                <h2>Uma base que pode conectar a operação real.</h2>
                <p>Em uma implementação de produção, a experiência poderia ser integrada aos canais e ferramentas já usados pela empresa, com regras, segurança e governança adequadas.</p>
                <div className="flowlead-connection-chips">{possibleConnections.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <aside className="flowlead-technical-note">
                <span>Escopo desta versão</span>
                <h3>Frontend demonstrativo.</h3>
                <p>Nenhuma integração está ativa nesta etapa. O formulário, a classificação e o painel funcionam somente durante a sessão atual da página.</p>
                <ul><li><i /> Sem backend ou banco de dados</li><li><i /> Sem envio para WhatsApp ou CRM</li><li><i /> Sem inteligência artificial externa ativa</li></ul>
              </aside>
            </Reveal>
          </div>
        </section>

        <section className="flowlead-final-cta">
          <div className="flowlead-final-orb" aria-hidden="true" />
          <div className="container">
            <Reveal>
              <span className="eyebrow eyebrow-light"><i /> FlowLead</span>
              <h2>Um fluxo claro começa com o contexto certo.</h2>
              <p>Esta primeira versão transforma um briefing em uma visão organizada — inteiramente no frontend.</p>
              <div className="hero-actions"><a className="button button-light" href="#demonstracao">Testar novamente <span>↑</span></a><a className="button flowlead-button-ghost" href="/#projetos">Ver outros projetos <span>→</span></a></div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
