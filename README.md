# Felipe Lima Digital

Site institucional, portfólio conceito e apresentação de serviços digitais de Felipe Lima Machado.

A aplicação apresenta desenvolvimento web, sistemas, automações e soluções com inteligência artificial em uma experiência responsiva, acessível e orientada a performance.

## Executar localmente

Requisitos: Node.js 22.13 ou superior e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo terminal.

## Verificação de produção

```bash
npm run lint
npm run build
```

Para validar especificamente a saída oficial do Next.js usada pela Vercel:

```bash
npm run build:vercel
```

## Estrutura principal

```text
app/
  blog/             página de insights
  servicos/         página de serviços e pacotes
  sites/            página do serviço de criação de sites
  robots.txt/       robots gerado com a origem atual
  sitemap.xml/      sitemap gerado com a origem atual
components/         componentes visuais e interativos
data/site.ts        conteúdo editável e configurações
data/services.ts    pacotes, contratação e dúvidas da página de serviços
public/images/      fotografia do fundador e imagens gerais
public/media/       vídeos ou fundos futuros
public/projects/    imagens futuras de projetos reais
```

## Alterar textos, projetos e links

Edite `data/site.ts`. O arquivo concentra:

- dados institucionais;
- navegação;
- contato e redes sociais;
- serviços;
- projetos conceito;
- processo;
- diferenciais;
- artigos;
- perguntas frequentes.

### Serviços e pacotes

A rota `/servicos` apresenta a jornada “Da presença digital à operação inteligente”, demonstrações locais dos serviços, pacotes comerciais, contratação e FAQ.

- Edite nomes, públicos, benefícios, entregáveis e dúvidas em `data/services.ts`.
- Edite a composição e os textos editoriais em `app/servicos/page.tsx`.
- As demonstrações interativas ficam em `components/services/`.
- Os visuais autorais usados pela página ficam em `public/images/services/`.

As demonstrações são identificadas como simulações e não enviam dados nem executam automações ou chamadas de inteligência artificial.

### Contato

Preencha `siteConfig.contact.email` e `siteConfig.contact.whatsapp` em `data/site.ts`.

O WhatsApp deve conter apenas o número completo com código do país e DDD. Enquanto os dados estiverem vazios, o site não cria links quebrados: o formulário prepara e copia um resumo local da solicitação.

### GitHub e LinkedIn

Preencha os endereços em `siteConfig.social`. Links vazios não são exibidos.

### Foto de Felipe

Adicione a fotografia otimizada neste caminho:

```text
public/images/felipe-lima-machado-perfil.webp
```

A fotografia oficial é usada somente no bloco do fundador. Sem o arquivo, um placeholder institucional permanece visível.

### Adicionar projetos reais

Substitua ou amplie o array `projects` em `data/site.ts`. Imagens futuras podem ficar em `public/projects/`. Mantenha a indicação “Projeto conceito” enquanto o item não representar um trabalho real autorizado.

## SEO e publicação

Metadados, Open Graph, Twitter Cards, dados estruturados, `robots.txt` e `sitemap.xml` estão configurados. A origem usada nos links absolutos é derivada da requisição, o que permite publicar em diferentes provedores sem caminhos locais.

O projeto usa Next.js com App Router. O comando padrão gera a saída Vinext/Vite compatível com o ambiente de hospedagem configurado no repositório. O arquivo `vercel.json` direciona a Vercel para a compilação oficial do Next.js, preservando a mesma base de código para os dois destinos.
