import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function request(pathname = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://felipe-lima.test${pathname}`, {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete home page", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /Criamos tecnologia/);
  assert.match(html, /Soluções digitais/);
  assert.match(html, /Felipe Lima Machado/);
  assert.match(html, /flowlead-feature-card/);
  assert.match(html, /Explorar demonstração/);
  assert.match(html, /Classificação transparente/);
  assert.match(html, /Do novo contato à próxima ação/);
  assert.match(html, /FieldOps/);
  assert.match(html, /Sistema de gestão operacional/);
  assert.match(html, /href="\/projetos\/fieldops"/);
  assert.match(html, /Nexo Agenda/);
  assert.match(html, /Agendamento e experiência do cliente/);
  assert.match(html, /Plataforma interativa criada para organizar horários, clientes, confirmações e lista de espera/);
  assert.match(html, /href="\/projetos\/nexo-agenda"/);
  assert.equal((html.match(/href="\/projetos\/flowlead"/g) ?? []).length, 1);
  assert.equal((html.match(/class="project-slide"/g) ?? []).length, 2);
  assert.doesNotMatch(html, /aria-label="Felipe Lima Digital,/);
  assert.doesNotMatch(html, /aria-label="Batata Pipas,/);
  assert.doesNotMatch(html, /aria-label="Dashboard Cripto,/);
  assert.doesNotMatch(html, /aria-label="Cafeteria Landing,/);
  assert.match(html, /aria-label="Projeto 1 de 2"/);
  assert.match(html, /Projeto anterior/);
  assert.match(html, /Próximo projeto/);
  assert.match(html, /carousel-dots/);
  assert.match(html, /O que construímos/);
  assert.match(html, /Automação &amp; Inteligência Artificial/);
  assert.match(html, /Sites que trabalham/);
  assert.match(html, /Como trabalhamos/);
  assert.match(html, /O que orienta cada entrega/);
  assert.match(html, /Quem está por trás/);
  assert.match(html, /Tecnologia explicada/);
  assert.match(html, /Perguntas frequentes/);
  assert.match(html, /Seu próximo projeto/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders the services, sites, blog, FlowLead, FieldOps and Nexo Agenda routes", async () => {
  const [servicesResponse, sitesResponse, blogResponse, flowLeadResponse, fieldOpsResponse, nexoAgendaResponse] = await Promise.all([
    request("/servicos"),
    request("/sites"),
    request("/blog"),
    request("/projetos/flowlead"),
    request("/projetos/fieldops"),
    request("/projetos/nexo-agenda"),
  ]);

  assert.equal(servicesResponse.status, 200);
  const servicesHtml = await servicesResponse.text();
  assert.match(servicesHtml, /Da presença digital/);
  assert.match(servicesHtml, /Cinco formas de fazer o digital trabalhar melhor/);
  assert.match(servicesHtml, /Presença Digital/);
  assert.match(servicesHtml, /Site Profissional/);
  assert.match(servicesHtml, /Experiência Premium/);
  assert.match(servicesHtml, /Conteúdo Essencial/);
  assert.match(servicesHtml, /Conteúdo Plus/);
  assert.match(servicesHtml, /Solicitar solução personalizada/);
  assert.match(servicesHtml, /Demonstração · Página de serviço/);
  assert.match(servicesHtml, /felipelima\.digital\/servicos/);
  assert.match(servicesHtml, /presence-orbit-chrome-v2\.webp/);
  assert.match(servicesHtml, /continuity-field-chrome-v2\.webp/);
  assert.match(servicesHtml, /intelligent-flow-chrome-v2\.webp/);
  assert.match(servicesHtml, /href="\/servicos#criacao-de-sites"/);
  assert.equal((servicesHtml.match(/<a class="service-package-cta"/g) ?? []).length, 8);
  assert.doesNotMatch(servicesHtml, /R\$|mensalidade|desconto/i);
  assert.doesNotMatch(servicesHtml, /Ateliê Horizonte|Casa Lume|norte\.estúdio/);

  assert.equal(sitesResponse.status, 200);
  assert.match(await sitesResponse.text(), /Seu site precisa fazer mais/);
  assert.equal(blogResponse.status, 200);
  assert.match(await blogResponse.text(), /Tecnologia para quem/);
  assert.equal(flowLeadResponse.status, 200);
  const flowLeadHtml = await flowLeadResponse.text();
  assert.match(flowLeadHtml, /FlowLead/);
  assert.match(flowLeadHtml, /Projeto autoral demonstrativo/);
  assert.match(flowLeadHtml, /Nenhum dado é enviado ou armazenado/);
  assert.match(flowLeadHtml, /O que esta demonstração faz/);
  assert.match(flowLeadHtml, /O que uma versão real poderia integrar/);
  assert.match(flowLeadHtml, /O que não está ativo aqui/);
  assert.match(flowLeadHtml, /Solicitar solução semelhante/);

  assert.equal(fieldOpsResponse.status, 200);
  const fieldOpsHtml = await fieldOpsResponse.text();
  assert.match(fieldOpsHtml, /FieldOps/);
  assert.match(fieldOpsHtml, /Projeto autoral demonstrativo/);
  assert.match(fieldOpsHtml, /Operação de campo/);
  assert.match(fieldOpsHtml, /Dados totalmente fictícios/);
  assert.match(fieldOpsHtml, /Regra de risco transparente/);
  assert.match(fieldOpsHtml, /O que esta demonstração faz/);
  assert.match(fieldOpsHtml, /O que uma versão real poderia integrar/);
  assert.match(fieldOpsHtml, /O que não está ativo aqui/);
  assert.match(fieldOpsHtml, /Solicitar solução semelhante/);

  assert.equal(nexoAgendaResponse.status, 200);
  const nexoAgendaHtml = await nexoAgendaResponse.text();
  assert.match(nexoAgendaHtml, /Nexo Agenda/);
  assert.match(nexoAgendaHtml, /Projeto autoral/);
  assert.match(nexoAgendaHtml, /Agenda da Casa Lume/);
  assert.match(nexoAgendaHtml, /Dados fictícios/);
  assert.match(nexoAgendaHtml, /O que esta demonstração faz/);
  assert.match(nexoAgendaHtml, /O que uma versão real poderia integrar/);
  assert.match(nexoAgendaHtml, /O que não está ativo aqui/);
  assert.match(nexoAgendaHtml, /Solicitar solução semelhante/);
});

test("publishes host-aware robots and sitemap routes", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    request("/robots.txt", "text/plain"),
    request("/sitemap.xml", "application/xml"),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: https:\/\/felipe-lima\.test\/sitemap\.xml/);

  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<loc>https:\/\/felipe-lima\.test\/servicos<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/felipe-lima\.test\/sites<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/felipe-lima\.test\/blog<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/felipe-lima\.test\/projetos\/flowlead<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/felipe-lima\.test\/projetos\/fieldops<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/felipe-lima\.test\/projetos\/nexo-agenda<\/loc>/);
});

test("keeps editable content centralized and optional assets resilient", async () => {
  const [data, packageJson] = await Promise.all([
    readFile(new URL("../data/site.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(data, /export const services/);
  assert.match(data, /export const projects/);
  assert.match(data, /email: "[^"]+"/);
  assert.match(data, /whatsapp: "\d+"/);
  assert.match(data, /slug: "flowlead"/);
  assert.match(data, /detailUrl: "\/projetos\/flowlead"/);
  assert.match(data, /Classificação transparente/);
  assert.match(data, /slug: "fieldops"/);
  assert.match(data, /detailUrl: "\/projetos\/fieldops"/);
  assert.match(data, /Sistema de gestão operacional/);
  assert.match(data, /slug: "nexo-agenda"/);
  assert.match(data, /detailUrl: "\/projetos\/nexo-agenda"/);
  assert.match(data, /Agendamento e experiência do cliente/);
  assert.match(data, /slug: "dashboard-cripto"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
  await access(new URL("public/og.png", projectRoot));
  await access(new URL("public/images/felipe-lima-machado-perfil.webp", projectRoot));
});

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const target = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    if (entry.isDirectory()) files.push(...await sourceFiles(target));
    else if (/\.(?:ts|tsx)$/.test(entry.name)) files.push(target);
  }

  return files;
}

test("keeps the founder portrait in its single intended section", async () => {
  const files = [
    ...await sourceFiles(new URL("../app/", import.meta.url)),
    ...await sourceFiles(new URL("../components/", import.meta.url)),
  ];
  const sources = await Promise.all(files.map((file) => readFile(file, "utf8")));
  const portraitReferences = sources.reduce((total, source) => total + (source.match(/felipe-lima-machado-perfil\.webp/g) ?? []).length, 0);
  const homePage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.equal(portraitReferences, 1);
  assert.equal((homePage.match(/<Founder\s*\/>/g) ?? []).length, 1);
});
