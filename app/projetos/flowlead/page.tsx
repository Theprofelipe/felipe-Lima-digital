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

const possibleConnections = ["Formulários", "APIs", "Webhooks", "WhatsApp", "CRM", "Notificações", "Automações", "Inteligência artificial"] as const;

const demoCapabilities = [
  "Organiza os dados localmente",
  "Classifica o lead com regras demonstrativas",
  "Gera resumo e prévia de mensagem",
  "Simula o acompanhamento comercial",
] as const;

const inactiveCapabilities = [
  "Envio real de mensagens",
  "Armazenamento permanente",
  "Integrações externas",
  "Análise por IA real",
  "Painel administrativo de produção",
] as const;

const demonstratedResources = [
  "Formulário estruturado",
  "Validação local",
  "Priorização transparente",
  "Resumo copiável",
  "Prévia de mensagem",
  "Pipeline interativo",
  "Histórico de atividades",
] as const;

const projectTechnologies = ["Next.js", "React", "TypeScript", "CSS", "Vinext", "Estado local no navegador"] as const;

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

        <section className="section flowlead-case-section">
          <div className="container flowlead-case-grid">
            <Reveal>
              <div className="flowlead-case-heading">
                <span className="eyebrow"><i /> Solução proposta</span>
                <h2>Um case autoral sobre transformar interesse em rotina comercial.</h2>
                <p>O FlowLead conecta coleta, leitura de contexto e acompanhamento em uma única experiência demonstrativa. A proposta não é substituir a equipe, mas entregar informações melhores para a próxima conversa.</p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="flowlead-case-details">
                <div>
                  <span>Recursos demonstrados</span>
                  <ul>{demonstratedResources.map((item) => <li key={item}><i aria-hidden="true" />{item}</li>)}</ul>
                </div>
                <div>
                  <span>Tecnologias utilizadas</span>
                  <p>Implementação frontend responsiva, sem backend, autenticação ou persistência.</p>
                  <div>{projectTechnologies.map((item) => <small key={item}>{item}</small>)}</div>
                </div>
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
          <div className="container">
            <Reveal>
              <div className="flowlead-technical-heading">
                <span className="eyebrow eyebrow-light"><i /> Escopo transparente</span>
                <h2>Demonstração convincente, limites claros.</h2>
                <p>O protótipo mostra a experiência comercial sem fingir uma infraestrutura que não existe. Em produção, cada integração dependeria de regras, segurança e governança adequadas.</p>
              </div>
            </Reveal>
            <div className="flowlead-boundaries-grid">
              <Reveal>
                <article className="flowlead-boundary-card is-active">
                  <span>01 · O que esta demonstração faz</span>
                  <h3>Organiza e orienta.</h3>
                  <ul>{demoCapabilities.map((item) => <li key={item}><i aria-hidden="true">✓</i>{item}</li>)}</ul>
                </article>
              </Reveal>
              <Reveal delay={70}>
                <article className="flowlead-boundary-card">
                  <span>02 · O que uma versão real poderia integrar</span>
                  <h3>Conecta a operação.</h3>
                  <div className="flowlead-connection-chips">{possibleConnections.map((item) => <small key={item}>{item}</small>)}</div>
                </article>
              </Reveal>
              <Reveal delay={140}>
                <article className="flowlead-boundary-card is-inactive">
                  <span>03 · O que não está ativo aqui</span>
                  <h3>Sem promessas artificiais.</h3>
                  <ul>{inactiveCapabilities.map((item) => <li key={item}><i aria-hidden="true">—</i>{item}</li>)}</ul>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="flowlead-final-cta">
          <div className="flowlead-final-orb" aria-hidden="true" />
          <div className="container">
            <Reveal>
              <span className="eyebrow eyebrow-light"><i /> FlowLead</span>
              <h2>Quer organizar o seu fluxo comercial?</h2>
              <p>Podemos desenhar uma solução semelhante para o seu processo, com o nível certo de automação, integração e acompanhamento.</p>
              <div className="hero-actions"><a className="button button-light" href="/#contato">Solicitar solução semelhante <span>→</span></a><a className="button flowlead-button-ghost" href="#demonstracao">Testar novamente <span>↑</span></a></div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
