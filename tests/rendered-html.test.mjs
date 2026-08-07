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
  assert.match(html, /Projeto conceito/);
  assert.match(html, /flowlead-feature-card/);
  assert.match(html, /Explorar demonstração/);
  assert.match(html, /Classificação transparente/);
  assert.match(html, /Do novo contato à próxima ação/);
  assert.equal((html.match(/href="\/projetos\/flowlead"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders the sites, blog and FlowLead routes", async () => {
  const [sitesResponse, blogResponse, flowLeadResponse] = await Promise.all([
    request("/sites"),
    request("/blog"),
    request("/projetos/flowlead"),
  ]);

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
  assert.match(sitemap, /<loc>https:\/\/felipe-lima\.test\/sites<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/felipe-lima\.test\/blog<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/felipe-lima\.test\/projetos\/flowlead<\/loc>/);
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
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
  await access(new URL("public/og.png", projectRoot));
  await access(new URL("public/images/felipe-lima-machado-perfil.png", projectRoot));
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
  const portraitReferences = sources.reduce((total, source) => total + (source.match(/felipe-lima-machado-perfil\.png/g) ?? []).length, 0);
  const homePage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.equal(portraitReferences, 1);
  assert.equal((homePage.match(/<Founder\s*\/>/g) ?? []).length, 1);
});
