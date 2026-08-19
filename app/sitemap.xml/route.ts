export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const routes = ["", "/sites", "/blog", "/projetos/flowlead", "/projetos/fieldops"];
  const urls = routes
    .map((route) => `<url><loc>${origin}${route || "/"}</loc><changefreq>${route === "" ? "weekly" : "monthly"}</changefreq><priority>${route === "" ? "1.0" : "0.8"}</priority></url>`)
    .join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
