type SiteConfig = {
  name: string;
  shortName: string;
  position: string;
  description: string;
  contact: { email: string; whatsapp: string };
  social: { github: string; linkedin: string };
};

export const siteConfig: SiteConfig = {
  name: "Felipe Lima Machado",
  shortName: "Felipe Lima Digital",
  position: "Desenvolvimento Web & Soluções Digitais com IA",
  description:
    "Soluções digitais sob medida: sites, sistemas, automações e inteligência artificial para empresas.",
  contact: {
    email: "",
    whatsapp: "",
  },
  social: {
    github: "",
    linkedin: "",
  },
};

export const navigation = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Sites", href: "/sites" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
] as const;

export const services = [
  {
    index: "01",
    title: "Sites & experiências digitais",
    description:
      "Sites rápidos, responsivos e claros, pensados para transformar atenção em oportunidades reais para o negócio.",
    tags: ["Institucional", "Landing pages", "SEO técnico"],
  },
  {
    index: "02",
    title: "Sistemas & plataformas",
    description:
      "Ferramentas que organizam operações, centralizam informações e acompanham o ritmo da sua empresa.",
    tags: ["Sistemas web", "Dashboards", "Ferramentas internas"],
  },
  {
    index: "03",
    title: "Automação & IA",
    description:
      "Fluxos inteligentes para reduzir tarefas repetitivas, responder mais rápido e apoiar decisões com contexto.",
    tags: ["Agentes de IA", "Chatbots", "WhatsApp"],
  },
  {
    index: "04",
    title: "E-commerce",
    description:
      "Lojas digitais confiáveis e simples de comprar, preparadas para apresentar produtos com clareza e vender melhor.",
    tags: ["Catálogos", "Checkout", "Integrações"],
  },
  {
    index: "05",
    title: "Integrações & APIs",
    description:
      "Sistemas diferentes trabalhando juntos para evitar retrabalho, informação duplicada e processos manuais.",
    tags: ["CRM", "APIs", "Dados conectados"],
  },
  {
    index: "06",
    title: "Performance & evolução",
    description:
      "Melhorias contínuas para manter produtos digitais rápidos, seguros, encontráveis e prontos para crescer.",
    tags: ["Performance", "Manutenção", "Deploy"],
  },
] as const;

export const capabilities = [
  "Site",
  "Sistema",
  "Automação",
  "Dashboard",
  "Integração",
  "IA",
  "Ferramenta personalizada",
] as const;

export const automationSteps = [
  { index: "01", label: "Lead recebido", detail: "Formulário ou WhatsApp" },
  { index: "02", label: "IA interpreta", detail: "Contexto e intenção" },
  { index: "03", label: "CRM atualizado", detail: "Dados organizados" },
  { index: "04", label: "Resposta enviada", detail: "Contato no momento certo" },
  { index: "05", label: "Equipe notificada", detail: "Próxima ação clara" },
] as const;

export const projects = [
  {
    slug: "atlas-gestao",
    name: "Atlas Gestão",
    category: "Sistema web • Projeto conceito",
    description:
      "Uma central operacional que transforma dados dispersos em uma visão clara do negócio.",
    tags: ["Dashboard", "Automação", "Integrações"],
    tone: "blue",
  },
  {
    slug: "nativa-arquitetura",
    name: "Nativa Arquitetura",
    category: "Site institucional • Projeto conceito",
    description:
      "Uma experiência editorial e responsiva para apresentar projetos com elegância e gerar novos contatos.",
    tags: ["Website", "Performance", "SEO"],
    tone: "sand",
  },
  {
    slug: "elo-atendimento",
    name: "Elo Atendimento",
    category: "Automação com IA • Projeto conceito",
    description:
      "Um fluxo inteligente de triagem, registro e encaminhamento para agilizar o primeiro atendimento.",
    tags: ["IA", "WhatsApp", "CRM"],
    tone: "violet",
  },
] as const;

export const processSteps = [
  { number: "01", title: "Entendemos seu negócio", text: "O ponto de partida é o problema, o público e o resultado que importa." },
  { number: "02", title: "Planejamos a solução", text: "Definimos prioridades, escopo e um caminho claro para a entrega." },
  { number: "03", title: "Desenvolvemos", text: "A solução ganha forma com cuidado visual, técnico e comercial." },
  { number: "04", title: "Integramos", text: "Conectamos serviços e dados necessários para o fluxo funcionar." },
  { number: "05", title: "Testamos e publicamos", text: "Validamos a experiência em diferentes telas antes de colocar no ar." },
  { number: "06", title: "Acompanhamos", text: "A entrega continua com suporte, ajustes e evolução quando fizer sentido." },
] as const;

export const differentials = [
  { title: "Atendimento direto", text: "Você conversa com quem entende o projeto e participa das decisões técnicas." },
  { title: "Escopo com clareza", text: "Prioridades e entregas bem definidas para reduzir surpresa e manter o foco." },
  { title: "Velocidade de verdade", text: "Performance é tratada desde o início, não como correção de última hora." },
  { title: "Solução sob medida", text: "A tecnologia se adapta ao problema — e não o problema a um pacote pronto." },
  { title: "Cuidado depois da entrega", text: "Suporte para publicar, acompanhar e evoluir o que foi construído." },
  { title: "Investimento consciente", text: "Decisões equilibradas entre impacto, prazo e complexidade do projeto." },
] as const;

export const articles = [
  {
    slug: "site-que-gera-confianca",
    category: "Desenvolvimento web",
    title: "O que faz um site gerar confiança antes do primeiro contato?",
    excerpt: "Clareza, velocidade e consistência visual trabalham juntas para diminuir a insegurança de quem visita.",
    readingTime: "5 min de leitura",
  },
  {
    slug: "automacao-primeiros-passos",
    category: "Automação",
    title: "Por onde começar a automatizar um pequeno negócio?",
    excerpt: "Um bom primeiro fluxo economiza tempo sem criar uma operação mais difícil de manter.",
    readingTime: "6 min de leitura",
  },
  {
    slug: "ia-com-contexto",
    category: "Inteligência artificial",
    title: "IA no atendimento: utilidade vem antes da novidade",
    excerpt: "Como pensar em contexto, encaminhamento e limites para oferecer respostas realmente úteis.",
    readingTime: "7 min de leitura",
  },
] as const;

export const faqs = [
  { question: "Quanto custa desenvolver um site?", answer: "O valor depende do objetivo, do volume de conteúdo, das integrações e da complexidade visual. Depois de uma conversa inicial, você recebe uma proposta com escopo e investimento claros." },
  { question: "Quanto tempo leva?", answer: "Um site enxuto costuma levar menos tempo que um sistema ou uma experiência com muitas integrações. O prazo é definido após entender o escopo, sem promessas que comprometam a qualidade." },
  { question: "Vocês trabalham com projetos personalizados?", answer: "Sim. O trabalho parte da necessidade do negócio e pode envolver site, sistema, automação, integração ou uma combinação dessas frentes." },
  { question: "Posso solicitar algo que não aparece nos serviços?", answer: "Pode. A lista apresenta as frentes mais comuns, mas ideias e problemas diferentes são bem-vindos para uma avaliação técnica." },
  { question: "Existe suporte depois da entrega?", answer: "Sim. O formato de suporte e manutenção é combinado conforme a necessidade do projeto e pode incluir acompanhamento, correções e evoluções." },
  { question: "É possível integrar inteligência artificial?", answer: "Sim, quando a IA acrescenta valor real ao processo. Primeiro entendemos a tarefa e os dados disponíveis; depois definimos a integração mais adequada." },
  { question: "Meu site funcionará bem no celular?", answer: "Sim. Responsividade, navegação por toque, legibilidade e performance em telas menores fazem parte do desenvolvimento desde o início." },
] as const;

export const siteTypes = [
  { title: "Site institucional", text: "Posiciona a marca, apresenta serviços e facilita o primeiro contato." },
  { title: "Landing page", text: "Concentra uma oferta e conduz o visitante a uma ação específica." },
  { title: "Portfólio profissional", text: "Organiza projetos e competências em uma narrativa que gera confiança." },
  { title: "Catálogo ou e-commerce", text: "Apresenta produtos com clareza e cria uma jornada de compra simples." },
  { title: "Portal de conteúdo", text: "Estrutura artigos e materiais para crescer com organização e SEO." },
  { title: "Experiência personalizada", text: "Combina conteúdo, integrações e funções específicas para o negócio." },
] as const;
