import type { Metadata } from "next";
import { headers } from "next/headers";
import { BudgetWizard } from "../components/BudgetWizard";
import { siteConfig } from "../data/site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Felipe Lima Digital | Tecnologia para empresas",
      template: "%s",
    },
    description: siteConfig.description,
    applicationName: siteConfig.shortName,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    category: "technology",
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: siteConfig.shortName,
      title: "Criamos tecnologia para empresas.",
      description: siteConfig.description,
      images: [
        {
          url: `${origin}/og.png`,
          width: 1731,
          height: 909,
          alt: "Felipe Lima Digital — Criamos tecnologia para empresas.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Criamos tecnologia para empresas.",
      description: siteConfig.description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
        <div id="conteudo-principal" tabIndex={-1}>{children}</div>
        <BudgetWizard />
      </body>
    </html>
  );
}
