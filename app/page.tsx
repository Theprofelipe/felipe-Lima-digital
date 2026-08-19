import type { Metadata } from "next";
import {
  Automation,
  BlogPreview,
  Capabilities,
  ContactCTA,
  Differentials,
  FAQ,
  Founder,
  Hero,
  Process,
  Projects,
  Services,
  SitesShowcase,
} from "../components/HomeSections";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { siteConfig } from "../data/site";

export const metadata: Metadata = {
  title: "Felipe Lima Digital | Desenvolvimento Web & Soluções com IA",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.shortName,
    founder: { "@type": "Person", name: siteConfig.name },
    description: siteConfig.description,
    areaServed: "Brasil",
    knowsAbout: ["Desenvolvimento web", "Sistemas personalizados", "Automação", "Inteligência artificial"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Capabilities />
        <Automation />
        <SitesShowcase />
        <Projects />
        <Process />
        <Differentials />
        <Founder />
        <BlogPreview />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

