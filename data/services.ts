export type ServiceCategoryId = "sites" | "maintenance" | "social";

export type ServicePackage = {
  category: string;
  categoryId: ServiceCategoryId;
  name: string;
  audience: string;
  benefit: string;
  deliverables: readonly string[];
};

export const servicePackages: readonly ServicePackage[] = [
  {
    category: "Criação de sites",
    categoryId: "sites",
    name: "Presença Digital",
    audience: "Para negócios que precisam apresentar uma oferta com clareza e facilitar o primeiro contato.",
    benefit: "Uma apresentação premium com contato facilitado.",
    deliverables: [
      "Site institucional ou landing page premium",
      "Responsividade e animações",
      "WhatsApp e SEO básico",
    ],
  },
  {
    category: "Criação de sites",
    categoryId: "sites",
    name: "Site Profissional",
    audience: "Para empresas com mais conteúdo, serviços ou frentes que precisam de uma estrutura completa.",
    benefit: "Uma apresentação empresarial mais completa.",
    deliverables: [
      "Múltiplas páginas",
      "Galerias e formulários",
      "Efeitos visuais avançados",
    ],
  },
  {
    category: "Criação de sites",
    categoryId: "sites",
    name: "Experiência Premium",
    audience: "Para marcas que precisam de uma experiência digital mais exclusiva e personalizada.",
    benefit: "Maior exclusividade e personalização.",
    deliverables: [
      "Experiência visual exclusiva",
      "Animações sofisticadas",
      "Integrações previamente definidas",
      "Maior personalização",
    ],
  },
  {
    category: "Manutenção",
    categoryId: "maintenance",
    name: "Essencial",
    audience: "Para sites que precisam de ajustes específicos sem uma rotina frequente de conteúdo.",
    benefit: "Cuidado para necessidades pontuais.",
    deliverables: ["Atualizações pontuais", "Suporte básico"],
  },
  {
    category: "Manutenção",
    categoryId: "maintenance",
    name: "Profissional",
    audience: "Para negócios com conteúdo, eventos e materiais que mudam com frequência.",
    benefit: "Conteúdo atualizado e cuidado preventivo.",
    deliverables: [
      "Atualizações frequentes de conteúdo",
      "Eventos, fotos e banners",
      "Manutenção preventiva",
    ],
  },
  {
    category: "Manutenção",
    categoryId: "maintenance",
    name: "Premium",
    audience: "Para operações que precisam de prioridade e maior capacidade de atualização.",
    benefit: "Atenção prioritária e maior capacidade de atualização.",
    deliverables: [
      "Acompanhamento prioritário",
      "Otimizações",
      "Maior volume de atualizações",
    ],
  },
  {
    category: "Redes sociais",
    categoryId: "social",
    name: "Conteúdo Essencial",
    audience: "Para negócios que querem organizar a comunicação e manter uma presença coerente.",
    benefit: "Comunicação organizada.",
    deliverables: ["Artes", "Legendas", "Organização de publicações"],
  },
  {
    category: "Redes sociais",
    categoryId: "social",
    name: "Conteúdo Plus",
    audience: "Para marcas que precisam ampliar a presença e variar os formatos de conteúdo.",
    benefit: "Maior presença e variedade de conteúdo.",
    deliverables: [
      "Maior volume de publicações",
      "Edição de vídeos curtos",
      "Acompanhamento",
    ],
  },
] as const;

export const serviceContractSteps = [
  {
    number: "01",
    title: "Entendimento",
    text: "A conversa inicial organiza o momento do negócio, a prioridade e a combinação de serviços que faz sentido.",
  },
  {
    number: "02",
    title: "Escopo",
    text: "Entregáveis, quantidades, canais, integrações, responsabilidades e recorrência são definidos na proposta.",
  },
  {
    number: "03",
    title: "Produção",
    text: "O trabalho avança com pontos de acompanhamento adequados ao formato e ao escopo aprovado.",
  },
  {
    number: "04",
    title: "Evolução",
    text: "Serviços avulsos, combinações e novas etapas podem ser avaliados conforme a necessidade do projeto.",
  },
] as const;

export const serviceFaqs = [
  {
    question: "Preciso contratar mais de um serviço?",
    answer:
      "Não. Cada categoria pode ser contratada separadamente. Uma composição entre serviços também pode ser solicitada e terá escopo próprio na proposta.",
  },
  {
    question: "Os pacotes são cumulativos?",
    answer:
      "Não são presumidos como cumulativos. Cada opção descreve sua finalidade e seus entregáveis; a proposta confirma exatamente o que será contratado.",
  },
  {
    question: "Manutenção ou redes sociais acompanham a criação do site?",
    answer:
      "Não por padrão. Manutenção e redes sociais são categorias independentes e podem ser combinadas com a criação do site quando fizer sentido.",
  },
  {
    question: "Como funciona uma solução de automação ou IA?",
    answer:
      "Ela começa com um diagnóstico. Processos, canais e integrações são avaliados antes de definir uma solução personalizada e seu escopo.",
  },
  {
    question: "O que será definido na proposta?",
    answer:
      "A proposta registra entregáveis, quantidades, frequência, canais, integrações, prazos, responsabilidades, recorrência e condições de atendimento aplicáveis ao projeto.",
  },
] as const;

