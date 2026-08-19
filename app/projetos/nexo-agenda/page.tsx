/* eslint-disable @next/next/no-html-link-for-pages -- Links nativos evitam uma falha de prefetch do adaptador Vinext atual. */
import type { Metadata } from "next";
import { Footer } from "../../../components/Footer";
import { Navbar } from "../../../components/Navbar";
import { NexoAgendaDemo } from "../../../components/NexoAgendaDemo";
import { Reveal } from "../../../components/Reveal";
import "./nexo-agenda.css";

export const metadata: Metadata = {
  title: "Nexo Agenda | Agendamento e experiência do cliente",
  description: "Demonstração autoral de uma plataforma para organizar horários, confirmações, lista de espera e a experiência de atendimento.",
  alternates: { canonical: "/projetos/nexo-agenda" },
};

const capabilities = [
  { number: "01", title: "Agenda clara", text: "Horários, profissionais, serviços e disponibilidade organizados em uma visão semanal adaptável." },
  { number: "02", title: "Conflitos evitados", text: "A duração do serviço entra na regra para impedir reservas que ocupem o mesmo profissional." },
  { number: "03", title: "Atendimento acompanhado", text: "Status, observações, lembretes e histórico ajudam a preparar cada próxima ação." },
  { number: "04", title: "Oportunidades recuperadas", text: "Cancelamentos abrem espaço para comparar preferências da lista de espera." },
] as const;

const operationSteps = [
  { number: "01", title: "Horário escolhido", text: "A disponibilidade é consultada por dia, profissional e serviço." },
  { number: "02", title: "Reserva validada", text: "Campos obrigatórios e sobreposições são verificados antes da inclusão." },
  { number: "03", title: "Presença acompanhada", text: "Confirmação, atendimento, conclusão, ausência ou cancelamento ficam visíveis." },
  { number: "04", title: "Agenda reaproveitada", text: "Uma vaga liberada pode ser comparada com a lista de espera fictícia." },
] as const;

const businessProfiles = ["Clínicas", "Salões", "Barbearias", "Estúdios", "Consultorias", "Pet shops", "Serviços especializados"] as const;

const demoCapabilities = [
  "Cria agendamentos com validação local",
  "Filtra agenda e recalcula indicadores",
  "Controla progressões coerentes de status",
  "Gera lembretes sem enviar mensagens",
  "Relaciona cancelamentos à lista de espera",
] as const;

const possibleConnections = ["WhatsApp oficial", "Calendário externo", "CRM", "Pagamentos", "Notificações", "Cadastro de clientes", "Relatórios", "Permissões de equipe"] as const;

const inactiveCapabilities = [
  "Dados, contatos ou prontuários reais",
  "Envio real de mensagens",
  "Persistência ou banco de dados",
  "Autenticação e permissões",
  "Cobranças ou integrações externas",
] as const;

const technologyChoices = [
  { label: "Interface", value: "React", text: "Componentes independentes para agenda, filtros, detalhes e lista de espera." },
  { label: "Confiabilidade", value: "TypeScript", text: "Tipos estritos mantêm reservas, status e transições coerentes." },
  { label: "Experiência", value: "App Router", text: "Rota isolada, renderização do case e demonstração no mesmo fluxo." },
  { label: "Apresentação", value: "CSS responsivo", text: "Uma linguagem visual própria, adaptada da agenda ampla ao mobile." },
] as const;

function NexoAgendaHeroVisual() {
  return (
    <div className="nexo-hero-visual" aria-label="Prévia visual de uma plataforma de agendamento">
      <div className="nexo-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="nexo-product-window">
        <header><span><i /><i /><i /></span><em>Nexo Agenda · Semana</em><b><i /> Local</b></header>
        <div className="nexo-product-body">
          <aside aria-hidden="true"><strong>NL</strong><i className="is-active" /><i /><i /><i /></aside>
          <main>
            <div className="nexo-product-heading"><span><small>Casa Lume</small><strong>Agenda organizada</strong></span><em>18–22 ago</em></div>
            <div className="nexo-product-metrics"><span><small>HOJE</small><strong>03</strong></span><span><small>CONFIRMADOS</small><strong>02</strong></span><span><small>ESPERA</small><strong>03</strong></span></div>
            <div className="nexo-product-days"><span>SEG</span><span>TER</span><span className="is-current">QUA</span><span>QUI</span><span>SEX</span></div>
            <div className="nexo-product-agenda"><time>08:00</time><div><i>HD</i><span><strong>Amanda Torres</strong><small>Corte e finalização</small></span><em>Confirmado</em></div><time>10:00</time><div><i>CM</i><span><strong>Henrique Barros</strong><small>Coloração consultiva</small></span><em className="is-pending">Pendente</em></div><time>13:30</time><div><i>EP</i><span><strong>Natália Ribeiro</strong><small>Consultoria de imagem</small></span><em className="is-service">Em atendimento</em></div></div>
          </main>
        </div>
      </div>
      <div className="nexo-floating-card nexo-floating-slot"><span>Próximo horário livre</span><strong>Hoje · 14:30</strong><small>Helena Duarte</small></div>
      <div className="nexo-floating-card nexo-floating-reminder"><i aria-hidden="true" /><span><strong>Lembrete preparado</strong><small>Nenhuma mensagem enviada</small></span></div>
    </div>
  );
}

export default function NexoAgendaPage() {
  return (
    <>
      <Navbar />
      <main className="nexo-page">
        <section className="nexo-hero">
          <div className="nexo-hero-grid-pattern" aria-hidden="true" />
          <div className="nexo-hero-glow" aria-hidden="true" />
          <div className="container nexo-hero-grid">
            <div className="nexo-hero-copy">
              <div className="nexo-hero-meta"><span className="eyebrow"><i /> Agendamento e experiência do cliente</span><span>Projeto autoral</span></div>
              <span className="nexo-project-name">Nexo Agenda</span>
              <h1>Agenda organizada. <span>Atendimento no ritmo certo.</span></h1>
              <p>Uma plataforma demonstrativa que centraliza disponibilidade, reduz conflitos e mantém equipe, cliente e próxima ação no mesmo contexto.</p>
              <div className="hero-actions"><a className="button button-primary" href="#demonstracao">Acessar demonstração <span>↓</span></a><a className="button button-secondary" href="/#projetos">Voltar aos projetos <span>←</span></a></div>
              <div className="nexo-local-proof"><i aria-hidden="true">✓</i><span><strong>Demonstração segura e inteiramente local</strong>Dados fictícios, sem cadastro externo, mensagens ou persistência.</span></div>
            </div>
            <NexoAgendaHeroVisual />
          </div>
        </section>

        <section className="section nexo-problem-section">
          <div className="container nexo-problem-grid">
            <Reveal><div className="nexo-problem-label"><span>O problema</span><i /></div></Reveal>
            <Reveal delay={80}><div className="nexo-problem-copy"><h2>Quando a agenda se espalha, o atendimento perde o compasso.</h2><p>Horários em mensagens, confirmações manuais e cancelamentos sem acompanhamento criam lacunas na operação.</p><aside className="nexo-solution-callout"><span>A resposta</span><strong>Uma agenda centralizada que conecta disponibilidade, contexto do cliente e próxima ação.</strong></aside><div><span>Menos sobreposição</span><span>Mais previsibilidade</span><span>Experiência consistente</span></div></div></Reveal>
          </div>
        </section>

        <section className="section nexo-capabilities-section">
          <div className="container">
            <Reveal><div className="section-topline"><div className="section-heading"><span className="eyebrow"><i /> Visão do produto</span><h2>Uma rotina conectada<br />do horário ao retorno.</h2></div><p className="section-note">A demonstração combina decisões de interface e regras simples para tornar a agenda legível e acionável.</p></div></Reveal>
            <div className="nexo-capabilities-grid">{capabilities.map((item, index) => <Reveal key={item.number} delay={index * 60}><article><span>{item.number}</span><i aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}</div>
          </div>
        </section>

        <section className="section nexo-demo-section" id="demonstracao">
          <div className="container">
            <Reveal><div className="nexo-demo-intro"><span className="eyebrow"><i /> Demonstração interativa</span><h2>Assuma a agenda da operação.</h2><p>Escolha dias e horários, aplique filtros, crie uma reserva, acompanhe status, cancele um atendimento e relacione a vaga à lista de espera.</p><div><span><i aria-hidden="true">✓</i> Pessoas e contatos fictícios</span><span><i aria-hidden="true">✓</i> Nenhuma mensagem real</span><span><i aria-hidden="true">✓</i> Estado apenas nesta sessão</span></div></div></Reveal>
            <Reveal delay={100}><NexoAgendaDemo /></Reveal>
          </div>
        </section>

        <section className="section nexo-flow-section">
          <div className="container">
            <Reveal><div className="section-topline"><div className="section-heading"><span className="eyebrow"><i /> Fluxo de atendimento</span><h2>Da disponibilidade<br />à próxima oportunidade.</h2></div><p className="section-note">Quatro momentos ajudam a preservar clareza sem transformar a rotina em uma sequência de tarefas manuais.</p></div></Reveal>
            <div className="nexo-flow-grid">{operationSteps.map((step, index) => <Reveal key={step.number} delay={index * 60}><article><div><span>{step.number}</span>{index < operationSteps.length - 1 && <i aria-hidden="true">→</i>}</div><h3>{step.title}</h3><p>{step.text}</p></article></Reveal>)}</div>
          </div>
        </section>

        <section className="section nexo-build-section">
          <div className="container nexo-build-grid">
            <Reveal><div className="nexo-build-copy"><span className="eyebrow"><i /> Tecnologias utilizadas</span><h2>Uma base simples de entender e segura para evoluir.</h2><p>A experiência foi construída com ferramentas do próprio projeto, sem dependências extras, chamadas externas ou persistência disfarçada.</p><div><span>Estado local</span><span>Regras transparentes</span><span>Sem integrações ativas</span></div></div></Reveal>
            <div className="nexo-tech-grid">{technologyChoices.map((item, index) => <Reveal key={item.value} delay={index * 55}><article><small>{item.label}</small><strong>{item.value}</strong><p>{item.text}</p></article></Reveal>)}</div>
          </div>
        </section>

        <section className="section nexo-audience-section">
          <div className="container nexo-audience-grid">
            <Reveal><div><span className="eyebrow"><i /> Aplicações possíveis</span><h2>Para negócios que vivem de horários bem cuidados.</h2><p>A lógica pode evoluir conforme duração dos serviços, regras da equipe, canais de confirmação e particularidades de cada operação.</p></div></Reveal>
            <Reveal delay={90}><div className="nexo-audience-card" aria-label="Tipos de negócio compatíveis"><header><span>Perfis de operação</span><small>Exemplos</small></header><div>{businessProfiles.map((profile, index) => <span key={profile}><i>{String(index + 1).padStart(2, "0")}</i>{profile}<b aria-hidden="true">↗</b></span>)}</div><footer>Uma base visual, diferentes regras de negócio.</footer></div></Reveal>
          </div>
        </section>

        <section className="section nexo-technical-section">
          <div className="container">
            <Reveal><div className="nexo-technical-heading"><span className="eyebrow eyebrow-light"><i /> Escopo transparente</span><h2>Funcional no navegador.<br />Honesto sobre os limites.</h2><p>A versão demonstra o comportamento central sem simular serviços, segurança ou dados que não existem.</p></div></Reveal>
            <div className="nexo-boundaries-grid">
              <Reveal><article className="is-active"><span>01 · O que esta demonstração faz</span><h3>Organiza e reage.</h3><ul>{demoCapabilities.map((item) => <li key={item}><i aria-hidden="true">✓</i>{item}</li>)}</ul></article></Reveal>
              <Reveal delay={70}><article><span>02 · O que uma versão real poderia integrar</span><h3>Conecta a jornada.</h3><div>{possibleConnections.map((item) => <small key={item}>{item}</small>)}</div></article></Reveal>
              <Reveal delay={140}><article className="is-inactive"><span>03 · O que não está ativo aqui</span><h3>Sem infraestrutura fictícia.</h3><ul>{inactiveCapabilities.map((item) => <li key={item}><i aria-hidden="true">—</i>{item}</li>)}</ul></article></Reveal>
            </div>
          </div>
        </section>

        <section className="nexo-final-cta"><div className="nexo-final-glow" aria-hidden="true" /><div className="container"><Reveal><span className="eyebrow eyebrow-light"><i /> Nexo Agenda</span><h2>Seu atendimento precisa de uma agenda mais inteligente?</h2><p>Podemos desenhar uma solução adequada aos serviços, à equipe e à experiência que o seu negócio quer oferecer.</p><div className="hero-actions"><a className="button button-light" href="/#contato">Solicitar solução semelhante <span>→</span></a><a className="button nexo-button-ghost" href="#demonstracao">Explorar novamente <span>↑</span></a></div></Reveal></div></section>
      </main>
      <Footer />
    </>
  );
}
