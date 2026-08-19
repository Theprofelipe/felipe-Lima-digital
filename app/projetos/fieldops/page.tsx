/* eslint-disable @next/next/no-html-link-for-pages -- Links nativos evitam uma falha de prefetch do adaptador Vinext atual. */
import type { Metadata } from "next";
import { FieldOpsDemo } from "../../../components/FieldOpsDemo";
import { Footer } from "../../../components/Footer";
import { Navbar } from "../../../components/Navbar";
import { Reveal } from "../../../components/Reveal";
import "./fieldops.css";

export const metadata: Metadata = {
  title: "FieldOps | Gestão de equipes e serviços externos",
  description: "Demonstração autoral de um sistema para organizar ordens de serviço, equipes em campo, prioridades e riscos operacionais.",
  alternates: { canonical: "/projetos/fieldops" },
};

const operationSteps = [
  { number: "01", title: "Ordem recebida", text: "Serviço, prioridade, região e prazo entram na mesma fila operacional." },
  { number: "02", title: "Equipe orientada", text: "A próxima ação fica clara antes do deslocamento e da execução." },
  { number: "03", title: "Atendimento visível", text: "Mudanças de status atualizam indicadores e histórico imediatamente." },
  { number: "04", title: "Operação acompanhada", text: "Riscos e pendências ganham contexto para uma decisão mais rápida." },
] as const;

const demoCapabilities = [
  "Filtra e pesquisa ordens fictícias",
  "Recalcula indicadores derivados",
  "Explica sinais de risco de prazo",
  "Simula progressão e histórico local",
] as const;

const possibleConnections = ["ERP", "CRM", "Aplicativo da equipe", "Estoque", "Notificações", "Geolocalização", "Assinatura digital", "Relatórios"] as const;

const inactiveCapabilities = [
  "Dados, pessoas ou endereços reais",
  "Persistência ou banco de dados",
  "Autenticação e permissões",
  "Mapa ou rastreamento em tempo real",
  "Integrações e notificações externas",
] as const;

function FieldOpsHeroVisual() {
  return (
    <div className="fieldops-hero-visual" aria-label="Prévia visual de um painel de gestão de serviços externos">
      <div className="fieldops-product-window">
        <header><span><i /><i /><i /></span><em>FieldOps · Central operacional</em><b><i /> Local</b></header>
        <div className="fieldops-product-body">
          <aside aria-hidden="true"><strong>FO</strong><i className="is-active" /><i /><i /><i /></aside>
          <div className="fieldops-product-main">
            <div className="fieldops-product-heading"><span><small>Visão geral</small><strong>Operação em campo</strong></span><em>Hoje · 6 ordens</em></div>
            <div className="fieldops-product-metrics"><span><small>Em aberto</small><strong>05</strong></span><span><small>Em rota</small><strong>01</strong></span><span className="is-alert"><small>Em risco</small><strong>03</strong></span></div>
            <div className="fieldops-product-orders">
              <div><i>FO-1042</i><span><strong>Inspeção técnica</strong><small>Equipe 04 · Centro</small></span><em>Urgente</em></div>
              <div><i>FO-1043</i><span><strong>Manutenção preventiva</strong><small>Equipe 02 · Norte</small></span><em className="is-route">Em rota</em></div>
              <div><i>FO-1044</i><span><strong>Instalação</strong><small>Equipe 07 · Oeste</small></span><em className="is-service">Em atendimento</em></div>
            </div>
          </div>
        </div>
      </div>
      <div className="fieldops-floating-card fieldops-floating-order"><span>Ordem selecionada</span><strong>FO-1042</strong><small>Prazo · Hoje, 10:30</small></div>
      <div className="fieldops-floating-card fieldops-floating-risk"><span>Risco de prazo</span><strong><i /> 9 pontos</strong><small>Regra transparente</small></div>
    </div>
  );
}

export default function FieldOpsPage() {
  return (
    <>
      <Navbar />
      <main className="fieldops-page">
        <section className="fieldops-hero">
          <div className="fieldops-hero-grid-pattern" aria-hidden="true" />
          <div className="fieldops-hero-glow" aria-hidden="true" />
          <div className="container fieldops-hero-grid">
            <div className="fieldops-hero-copy">
              <div className="fieldops-hero-meta"><span className="eyebrow"><i /> Sistema de gestão operacional</span><span>Projeto autoral demonstrativo</span></div>
              <h1>Operação de campo, <span>sob controle.</span></h1>
              <p>FieldOps demonstra como equipes externas, ordens de serviço, prioridades e riscos podem ser organizados em uma visão operacional clara — da programação à conclusão.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#demonstracao">Explorar painel <span>↓</span></a>
                <a className="button button-secondary" href="/#projetos">Voltar aos projetos <span>←</span></a>
              </div>
              <div className="fieldops-local-proof"><i aria-hidden="true">✓</i><span><strong>Demonstração segura e inteiramente local</strong>Todos os registros são fictícios e reiniciados ao recarregar.</span></div>
            </div>
            <FieldOpsHeroVisual />
          </div>
        </section>

        <section className="section fieldops-problem-section">
          <div className="container fieldops-problem-grid">
            <Reveal><div className="fieldops-problem-label"><span>O problema</span><i /></div></Reveal>
            <Reveal delay={80}>
              <div className="fieldops-problem-copy">
                <h2>Trabalho externo sem visibilidade vira reação.</h2>
                <p>Quando agenda, equipe, materiais e prazos vivem em controles separados, a operação descobre atrasos tarde demais. O FieldOps propõe uma leitura única para decidir o que precisa avançar, quem está em atendimento e onde existe risco.</p>
                <div><span>Ordens centralizadas</span><span>Prioridades visíveis</span><span>Pendências explicadas</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section fieldops-solution-section">
          <div className="container">
            <Reveal>
              <div className="section-topline">
                <div className="section-heading"><span className="eyebrow"><i /> Solução proposta</span><h2>Uma central leve para<br />coordenar o dia.</h2></div>
                <p className="section-note">A demonstração conecta planejamento, execução e acompanhamento sem simular uma infraestrutura que não existe.</p>
              </div>
            </Reveal>
            <div className="fieldops-solution-grid">
              <Reveal><article><span>01</span><i aria-hidden="true">⌁</i><h3>Despacho organizado</h3><p>Cada ordem reúne equipe, região, prioridade, prazo, checklist e materiais.</p></article></Reveal>
              <Reveal delay={70}><article><span>02</span><i aria-hidden="true">◎</i><h3>Progresso rastreável</h3><p>A mudança local de status alimenta indicadores e histórico da operação.</p></article></Reveal>
              <Reveal delay={140}><article><span>03</span><i aria-hidden="true">△</i><h3>Risco explicável</h3><p>Uma regra transparente combina urgência, prazo, paralisação e material.</p></article></Reveal>
            </div>
          </div>
        </section>

        <section className="section fieldops-demo-section" id="demonstracao">
          <div className="container">
            <Reveal>
              <div className="fieldops-demo-intro">
                <span className="eyebrow"><i /> Demonstração interativa</span>
                <h2>Assuma a visão da operação.</h2>
                <p>Filtre as ordens, abra os detalhes, libere uma pendência e avance o atendimento. Indicadores, risco e histórico respondem às suas decisões.</p>
                <div><span><i aria-hidden="true">✓</i> Dados totalmente fictícios</span><span><i aria-hidden="true">✓</i> Nenhuma informação é enviada</span><span><i aria-hidden="true">✓</i> Estado apenas nesta sessão</span></div>
                <p className="fieldops-risk-explainer"><strong>Regra de risco transparente:</strong> a ordem entra em atenção ao somar 3 pontos entre urgência, prazo próximo, falta de atualização e material pendente.</p>
              </div>
              <FieldOpsDemo />
            </Reveal>
          </div>
        </section>

        <section className="section fieldops-flow-section">
          <div className="container">
            <Reveal>
              <div className="section-topline">
                <div className="section-heading"><span className="eyebrow"><i /> Fluxo operacional</span><h2>Da programação ao<br />encerramento.</h2></div>
                <p className="section-note">Quatro estados mantêm o acompanhamento simples e deixam a próxima ação evidente.</p>
              </div>
            </Reveal>
            <div className="fieldops-flow-grid">
              {operationSteps.map((step, index) => <Reveal key={step.number} delay={index * 60}><article><div><span>{step.number}</span>{index < operationSteps.length - 1 && <i aria-hidden="true">→</i>}</div><h3>{step.title}</h3><p>{step.text}</p></article></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section fieldops-coverage-section">
          <div className="container fieldops-coverage-grid">
            <Reveal>
              <div className="fieldops-coverage-copy"><span className="eyebrow"><i /> Cobertura regional abstrata</span><h2>Distribuição sem fingir um mapa real.</h2><p>As regiões ajudam a visualizar a carga operacional de forma conceitual. Não há geolocalização, rastreamento ou endereço associado aos registros.</p></div>
            </Reveal>
            <Reveal delay={90}>
              <div className="fieldops-coverage-card" aria-label="Distribuição demonstrativa de ordens por região">
                <header><span>Ordens por região</span><small>Visão demonstrativa</small></header>
                <div><span><i>Centro</i><b><em style={{ width: "82%" }} /></b><strong>02</strong></span><span><i>Norte</i><b><em style={{ width: "48%" }} /></b><strong>01</strong></span><span><i>Oeste</i><b><em style={{ width: "48%" }} /></b><strong>01</strong></span><span><i>Leste</i><b><em style={{ width: "48%" }} /></b><strong>01</strong></span><span><i>Sul</i><b><em style={{ width: "48%" }} /></b><strong>01</strong></span></div>
                <footer><i aria-hidden="true" /><span>Sem mapas ou coordenadas reais</span></footer>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section fieldops-technical-section">
          <div className="container">
            <Reveal><div className="fieldops-technical-heading"><span className="eyebrow eyebrow-light"><i /> Escopo transparente</span><h2>Produto demonstrável,<br />limites explícitos.</h2><p>O protótipo mostra decisões de interface e regras operacionais no navegador. Uma versão de produção exigiria segurança, governança, integrações e dados adequados à operação real.</p></div></Reveal>
            <div className="fieldops-boundaries-grid">
              <Reveal><article className="is-active"><span>01 · O que esta demonstração faz</span><h3>Organiza e atualiza.</h3><ul>{demoCapabilities.map((item) => <li key={item}><i aria-hidden="true">✓</i>{item}</li>)}</ul></article></Reveal>
              <Reveal delay={70}><article><span>02 · O que uma versão real poderia integrar</span><h3>Conecta a operação.</h3><div>{possibleConnections.map((item) => <small key={item}>{item}</small>)}</div></article></Reveal>
              <Reveal delay={140}><article className="is-inactive"><span>03 · O que não está ativo aqui</span><h3>Sem dados ou serviços reais.</h3><ul>{inactiveCapabilities.map((item) => <li key={item}><i aria-hidden="true">—</i>{item}</li>)}</ul></article></Reveal>
            </div>
          </div>
        </section>

        <section className="fieldops-final-cta">
          <div className="fieldops-final-glow" aria-hidden="true" />
          <div className="container"><Reveal><span className="eyebrow eyebrow-light"><i /> FieldOps</span><h2>Sua operação externa precisa de uma visão melhor?</h2><p>Podemos desenhar uma solução sob medida para organizar serviços, equipes, prioridades e integrações no ritmo do seu negócio.</p><div className="hero-actions"><a className="button button-light" href="/#contato">Solicitar solução semelhante <span>→</span></a><a className="button fieldops-button-ghost" href="#demonstracao">Explorar novamente <span>↑</span></a></div></Reveal></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
