import type { Metadata } from "next";
import { ContactCTA } from "../../components/ContactCTA";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { Reveal } from "../../components/Reveal";
import { articles } from "../../data/site";

export const metadata: Metadata = {
  title: "Insights sobre Web, Automação e IA | Felipe Lima Digital",
  description: "Conteúdo claro sobre desenvolvimento web, automação, inteligência artificial, performance e tecnologia para negócios.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="inner-page blog-page">
        <section className="blog-hero">
          <div className="blog-hero-grid" aria-hidden="true" />
          <div className="container blog-hero-content">
            <span className="eyebrow"><i /> Insights</span>
            <h1>Tecnologia para quem<br /><span>tem um negócio para cuidar.</span></h1>
            <p>Reflexões práticas sobre web, automação, IA e as decisões digitais que ajudam empresas a trabalhar melhor.</p>
          </div>
        </section>

        <section className="section blog-index-section">
          <div className="container">
            <Reveal>
              <div className="blog-index-top"><p>Conteúdo inicial • estrutura preparada para crescer</p><div><span>Todos</span><span>Web</span><span>Automação</span><span>IA</span></div></div>
            </Reveal>
            <div className="blog-featured-grid">
              {articles.map((article, index) => (
                <Reveal key={article.slug} delay={index * 70} className={index === 0 ? "article-featured-wrap" : ""}>
                  <article className={`blog-index-card ${index === 0 ? "is-featured" : ""}`}>
                    <div className={`blog-index-art blog-index-art-${index + 1}`} aria-hidden="true">
                      {index === 0 && <div className="trust-composition"><span>Clareza</span><i /><span>Velocidade</span><i /><span>Confiança</span></div>}
                      {index === 1 && <div className="automation-composition"><span>Entrada</span><i /><span>Processo</span><i /><span>Resultado</span></div>}
                      {index === 2 && <div className="ai-composition"><span>Contexto</span><i>IA</i><span>Resposta</span></div>}
                    </div>
                    <div className="blog-index-copy">
                      <div className="article-meta"><span>{article.category}</span><i />{article.readingTime}</div>
                      <h2>{article.title}</h2>
                      <p>{article.excerpt}</p>
                      <span className="text-link text-link-muted">Artigo em preparação <span>↗</span></span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="editorial-note"><span>Nota editorial</span><p>Estes são os primeiros temas da publicação. Os artigos completos serão adicionados de forma incremental, sem conteúdo fictício apresentado como final.</p></div>
            </Reveal>
          </div>
        </section>
        <ContactCTA compact />
      </main>
      <Footer />
    </>
  );
}

