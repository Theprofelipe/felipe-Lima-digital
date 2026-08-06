import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders the sites and blog routes", async () => {
  const [sitesResponse, blogResponse] = await Promise.all([
    request("/sites"),
    request("/blog"),
  ]);

  assert.equal(sitesResponse.status, 200);
  assert.match(await sitesResponse.text(), /Seu site precisa fazer mais/);
  assert.equal(blogResponse.status, 200);
  assert.match(await blogResponse.text(), /Tecnologia para quem/);
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
});

test("keeps editable content centralized and optional assets resilient", async () => {
  const [data, packageJson] = await Promise.all([
    readFile(new URL("../data/site.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(data, /export const services/);
  assert.match(data, /export const projects/);
  assert.match(data, /email: ""/);
  assert.match(data, /whatsapp: ""/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
  await access(new URL("public/og.png", projectRoot));
});

