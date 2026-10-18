import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import {
  AiDemo,
  AutomationDemo,
  MaintenanceDemo,
  SitesDemo,
  SocialDemo,
} from "../../components/services/ServiceDemos";
import { ServicesMotion } from "../../components/services/ServicesMotion";
import { serviceContractSteps, serviceFaqs, servicePackages, type ServicePackage } from "../../data/services";
import { siteConfig } from "../../data/site";
import "./servicos.css";

export const metadata: Metadata = {
  title: "Serviços e pacotes | Felipe Lima Digital",
  description:
    "Criação de sites, manutenção, conteúdo para redes sociais e soluções personalizadas de automação e inteligência artificial.",
  alternates: { canonical: "/servicos" },
};

function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

function packageMessage(item: ServicePackage) {
  return `Olá! Vim pelo site da Felipe Lima Digital e gostaria de solicitar uma proposta de ${item.category} — ${item.name}.`;
}

function PackageEntry({
  item,
  index,
  composition,
}: {
  item: ServicePackage;
  index: number;
  composition: "anchor" | "support" | "stream" | "duet";
}) {
  return (
    <article
      className={`service-package-entry service-package-entry-${index} is-${composition}`}
      data-service-sequence-item
    >
      <div className="service-package-heading">
        <span>{String(index).padStart(2, "0")}</span>
        <div>
          <small>{item.category}</small>
          <h4>{item.name}</h4>
        </div>
      </div>
      <div className="service-package-story">
        <div className="service-package-audience">
          <span>Quando faz sentido</span>
          <p>{item.audience}</p>
        </div>
        <div className="service-package-benefit">
          <span>O avanço</span>
          <strong>{item.benefit}</strong>
        </div>
      </div>
      <div className="service-package-deliverables">
        <span>O que entra em cena</span>
        <ul>
          {item.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
        </ul>
      </div>
      <a
        className="service-package-cta"
        href={whatsappUrl(packageMessage(item))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Solicitar proposta de ${item.category} — ${item.name} pelo WhatsApp`}
      >
        Solicitar proposta <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

const sitesPackages = servicePackages.filter((item) => item.categoryId === "sites");
const maintenancePackages = servicePackages.filter((item) => item.categoryId === "maintenance");
const socialPackages = servicePackages.filter((item) => item.categoryId === "social");

const generalContactUrl = whatsappUrl(
  "Olá! Vim pelo site da Felipe Lima Digital e gostaria de conversar sobre uma composição de serviços ou um serviço avulso.",
);
const customSolutionUrl = whatsappUrl(
  "Olá! Vim pelo site da Felipe Lima Digital e gostaria de solicitar uma solução personalizada de Automações e inteligência artificial.",
);

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="services-page">
        <ServicesMotion />

        <section className="services-hero" id="topo">
          <div className="services-hero-grid" aria-hidden="true" />
          <div className="container services-hero-layout">
            <div className="services-hero-copy">
              <p className="services-kicker"><i /> Serviços e pacotes</p>
              <h1>
                <span>Da presença digital</span>
                <span>à operação inteligente.</span>
              </h1>
              <p className="services-hero-lead">
                Uma jornada para apresentar melhor, manter a comunicação ativa e transformar processos com tecnologia sob medida.
              </p>
              <div className="services-hero-actions">
                <a className="button button-primary" href="#experiencias">Conhecer os serviços <span aria-hidden="true">↓</span></a>
                <a className="services-inline-link" href={generalContactUrl} target="_blank" rel="noopener noreferrer">
                  Planejar uma composição <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="services-hero-signal" aria-label="Percurso dos serviços">
                <span>Apresentar</span><i /><span>Manter</span><i /><span>Conectar</span>
              </div>
            </div>

            <div className="services-journey-shell" data-service-parallax="0.08">
              <Image
                className="services-journey-art"
                src="/images/services/presence-orbit-chrome-v2.webp"
                alt="Composição autoral de planos translúcidos em prata e dourado champanhe"
                fill
                priority
                sizes="(max-width: 1020px) 92vw, 42vw"
              />
              <div className="services-journey" aria-label="Da presença digital à operação inteligente">
                <div className="services-journey-head">
                  <span>Mapa de evolução</span>
                  <small>Escolha o ponto que faz sentido agora</small>
                </div>
                <ol>
                  <li className="is-current">
                    <span>01</span>
                    <div><strong>Posicionar</strong><small>Sites que apresentam com clareza.</small></div>
                  </li>
                  <li>
                    <span>02</span>
                    <div><strong>Evoluir</strong><small>Manutenção e conteúdo em movimento.</small></div>
                  </li>
                  <li>
                    <span>03</span>
                    <div><strong>Conectar</strong><small>Automações e IA sob medida.</small></div>
                  </li>
                </ol>
                <div className="services-journey-orbit" aria-hidden="true"><i /><i /><i /><span>FL</span></div>
              </div>
              <p className="services-journey-caption"><span>Demonstração visual autoral</span> Clareza antes da complexidade.</p>
            </div>
          </div>
          <div className="container services-hero-foot">
            <span>Oito pacotes em categorias independentes</span>
            <i />
            <span>Soluções personalizadas quando o problema pede outro caminho</span>
          </div>
        </section>

        <section className="services-manifesto" aria-labelledby="services-manifesto-title">
          <div className="container services-manifesto-layout">
            <p id="services-manifesto-title">Uma identidade.<br />Três movimentos.</p>
            <div className="services-manifesto-words" aria-hidden="true">
              <span>Presença</span><span>Ritmo</span><span>Inteligência</span>
            </div>
            <p className="services-manifesto-copy">Cada categoria resolve uma etapa diferente. A composição nasce do momento do negócio, sem misturar escopos ou esconder o próximo passo.</p>
          </div>
        </section>

        <section className="services-experiences" id="experiencias">
          <div className="container services-section-intro" data-service-reveal>
            <p className="services-kicker"><i /> Serviços em composição</p>
            <div>
              <h2>Cinco formas de fazer o digital trabalhar melhor.</h2>
              <p>Explore demonstrações do processo Felipe Lima Digital: interfaces simuladas em código para mostrar como cada serviço organiza uma decisão real.</p>
            </div>
          </div>

          <div className="container service-labs">
            <article className="service-lab service-lab-sites" id="criacao-de-sites" data-service-reveal>
              <div className="service-lab-copy">
                <span className="service-lab-number">01</span>
                <p className="service-lab-category">Criação de sites</p>
                <h3>Uma presença que muda de escala sem perder personalidade.</h3>
                <p>Alterne a visualização para perceber como conteúdo, hierarquia e contato se reorganizam entre telas.</p>
              </div>
              <SitesDemo />
            </article>

            <article className="service-lab service-lab-maintenance" id="manutencao" data-service-reveal>
              <div className="service-lab-copy">
                <span className="service-lab-number">02</span>
                <p className="service-lab-category">Manutenção</p>
                <h3>O site continua vivo depois da entrega.</h3>
                <p>Veja como diferentes tipos de atualização aparecem na prévia sem interromper a leitura da página.</p>
              </div>
              <MaintenanceDemo />
            </article>

            <article className="service-lab service-lab-social" id="redes-sociais" data-service-reveal>
              <div className="service-lab-copy">
                <span className="service-lab-number">03</span>
                <p className="service-lab-category">Redes sociais</p>
                <h3>Uma ideia pode ocupar mais de um formato.</h3>
                <p>Alterne entre peça, carrossel e vídeo curto para visualizar uma comunicação organizada e coerente.</p>
              </div>
              <SocialDemo />
            </article>

            <article className="service-lab service-lab-automation" id="automacoes" data-service-reveal>
              <div className="service-lab-copy">
                <span className="service-lab-number">04</span>
                <p className="service-lab-category">Automações</p>
                <h3>Etapas conectadas deixam o próximo passo mais claro.</h3>
                <p>Selecione uma etapa para acompanhar um percurso ilustrativo de atendimento, do pedido ao encaminhamento.</p>
              </div>
              <AutomationDemo />
            </article>

            <article className="service-lab service-lab-ai" id="inteligencia-artificial" data-service-reveal>
              <div className="service-lab-copy">
                <span className="service-lab-number">05</span>
                <p className="service-lab-category">Inteligência artificial</p>
                <h3>Contexto antes da resposta.</h3>
                <p>Escolha solicitações de exemplo para observar respostas e triagens previamente definidas, sem envio de dados.</p>
              </div>
              <AiDemo />
            </article>
          </div>
        </section>

        <section className="services-catalog" id="pacotes">
          <div className="container services-catalog-intro" data-service-reveal>
            <p className="services-kicker services-kicker-light"><i /> Catálogo comercial</p>
            <h2>Três capítulos.<br />Quatro categorias claras.</h2>
            <p>Os capítulos organizam a história. Os pacotes permanecem independentes, com escopo confirmado na proposta.</p>
          </div>

          <div className="services-chapters">
            <section className="service-chapter service-chapter-one" data-service-chapter>
              <div className="container service-chapter-layout">
                <header className="service-chapter-heading">
                  <span>Capítulo 01</span>
                  <h2>Presença que posiciona</h2>
                  <p>Criação de sites para apresentar a empresa com qualidade, personalidade e um próximo passo claro.</p>
                </header>
                <div className="service-package-group">
                  <div className="service-package-group-heading" data-service-reveal>
                    <span>Categoria</span><h3>Criação de sites</h3><small>{sitesPackages.length} opções</small>
                  </div>
                  <div className="service-package-atlas service-package-atlas-sites" data-service-sequence>
                    <div className="service-package-guide">
                      <span>Como comparar</span>
                      <p>Comece pelo momento do negócio. Depois compare o avanço desejado e o que precisa entrar em cena.</p>
                    </div>
                    {sitesPackages.map((item, index) => (
                      <PackageEntry
                        key={item.name}
                        item={item}
                        index={index + 1}
                        composition={index === 0 ? "anchor" : "support"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="service-chapter service-chapter-two" data-service-chapter>
              <div className="container service-chapter-layout">
                <header className="service-chapter-heading">
                  <span>Capítulo 02</span>
                  <h2>Presença que evolui</h2>
                  <p>Continuidade para o site e para a comunicação, em duas categorias separadas e combináveis quando necessário.</p>
                </header>
                <div className="service-chapter-groups">
                  <figure className="service-chapter-visual" data-service-parallax="0.055" data-service-reveal>
                    <Image
                      src="/images/services/continuity-field-chrome-v2.webp"
                      alt="Composição autoral de módulos editoriais em vidro conectados por linhas metálicas"
                      fill
                      sizes="(max-width: 1020px) 92vw, 64vw"
                    />
                    <figcaption><span>Demonstração visual</span><strong>Continuidade transforma presença em ritmo.</strong></figcaption>
                  </figure>
                  <div className="service-package-group">
                    <div className="service-package-group-heading" data-service-reveal>
                      <span>Categoria</span><h3>Manutenção</h3><small>{maintenancePackages.length} opções</small>
                    </div>
                    <div className="service-package-stream" data-service-sequence>
                      {maintenancePackages.map((item, index) => (
                        <PackageEntry key={item.name} item={item} index={index + 4} composition="stream" />
                      ))}
                    </div>
                  </div>
                  <div className="service-package-group service-package-group-social">
                    <div className="service-package-group-heading" data-service-reveal>
                      <span>Categoria</span><h3>Redes sociais</h3><small>{socialPackages.length} opções</small>
                    </div>
                    <div className="service-package-duet" data-service-sequence>
                      {socialPackages.map((item, index) => (
                        <PackageEntry key={item.name} item={item} index={index + 7} composition="duet" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="service-chapter service-chapter-three" data-service-chapter>
              <div className="container service-chapter-layout">
                <header className="service-chapter-heading">
                  <span>Capítulo 03</span>
                  <h2>Operação inteligente</h2>
                  <p>Soluções desenhadas a partir do processo, dos canais e das integrações de cada cliente.</p>
                </header>
                <article className="custom-solution" data-service-reveal>
                  <Image
                    className="custom-solution-art"
                    src="/images/services/intelligent-flow-chrome-v2.webp"
                    alt="Composição autoral de um fluxo de luz conectando módulos de vidro"
                    fill
                    sizes="(max-width: 1020px) 92vw, 64vw"
                  />
                  <div className="custom-solution-shade" aria-hidden="true" />
                  <div className="custom-solution-title">
                    <span>Demonstração visual · Contratação sob medida</span>
                    <h3>Automações e inteligência artificial</h3>
                    <p>Não existe plano fechado: o trabalho começa pelo diagnóstico e ganha um escopo próprio na proposta.</p>
                  </div>
                  <div className="custom-solution-path" aria-label="Etapas para uma solução personalizada">
                    <span><i>01</i> Necessidade</span>
                    <b aria-hidden="true">→</b>
                    <span><i>02</i> Diagnóstico</span>
                    <b aria-hidden="true">→</b>
                    <span><i>03</i> Escopo</span>
                  </div>
                  <a className="custom-solution-cta" href={customSolutionUrl} target="_blank" rel="noopener noreferrer">
                    Solicitar solução personalizada <span aria-hidden="true">↗</span>
                  </a>
                </article>
              </div>
            </section>
          </div>
        </section>

        <section className="services-contracting" id="contratacao">
          <div className="container services-contracting-layout">
            <div className="services-contracting-heading" data-service-reveal>
              <p className="services-kicker"><i /> Escopo e contratação</p>
              <h2>A proposta transforma a conversa em um combinado claro.</h2>
              <p>Pacotes, serviços avulsos e composições podem ser avaliados sem presumir inclusões entre categorias.</p>
              <a className="services-inline-link" href={generalContactUrl} target="_blank" rel="noopener noreferrer">Conversar sobre uma composição <span aria-hidden="true">↗</span></a>
            </div>
            <ol className="services-contracting-steps">
              {serviceContractSteps.map((step) => (
                <li key={step.number} data-service-reveal>
                  <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="services-faq" id="duvidas">
          <div className="container services-faq-layout">
            <div className="services-faq-heading" data-service-reveal>
              <p className="services-kicker"><i /> Dúvidas essenciais</p>
              <h2>Antes da proposta.</h2>
              <p>O suficiente para entender a lógica de contratação sem antecipar decisões que dependem do seu contexto.</p>
            </div>
            <div className="services-faq-list">
              {serviceFaqs.map((faq, index) => (
                <details key={faq.question} data-service-reveal>
                  <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<i aria-hidden="true">+</i></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="services-final-cta">
          <div className="services-final-orbit" aria-hidden="true"><i /><i /><i /></div>
          <div className="container services-final-content" data-service-reveal>
            <p>Seu próximo passo pode começar por uma categoria.</p>
            <h2>Vamos montar uma presença digital que acompanhe o momento do seu negócio?</h2>
            <a className="button button-light" href={generalContactUrl} target="_blank" rel="noopener noreferrer">
              Conversar pelo WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
