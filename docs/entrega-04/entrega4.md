# Trabalho de Empreendedorismo - Entrega 4: MVP Funcional e Validação

## 1. Identificação do Grupo

| Nome do Empreendimento | Link do repositório |
|---|---|
| Acomoda UFLA | https://github.com/Ez1309/empreendedorismo |

| Integrantes | Usuário no GitHub |
|---|---|
| Ezequiel Dominguez Santos| [@Ez1309](https://github.com/Ez1309) |
| Nicolas Matheus Lima Oliveira | [@nicolas-mtheus](https://github.com/nicolas-mtheus) |
| Anthony Jose da Silva| [@AnthonyJSilva03](https://github.com/AnthonyJSilva03) |
| Lucas Emanuel Neves de Sousa | [@lucasensousa](https://github.com/lucasensousa) |

---

### 2.1. Arquitetura e Decisão de Engenharia (Pivô Técnico)

O objetivo central do MVP da **Acomoda UFLA** é validar a hipótese de valor formulada na Entrega 3: *a eliminação da assimetria de informações financeiras ("contas invisíveis") e de regras de convivência (fit cultural) na escolha de moradia estudantil em Lavras, promovendo uma tomada de decisão rápida e transparente com contato direto via WhatsApp*.

Para viabilizar o teste prático dessa proposta no curto prazo da disciplina, a equipe realizou um **pivô técnico na arquitetura do sistema**:

- **SPA Desacoplada e Sem Backend Dinâmico:** Em vez de alocar tempo construindo uma infraestrutura tradicional com banco de dados em nuvem (o que consumiria o prazo com autenticações e rotas), a aplicação foi construída como uma *Single Page Application* (SPA) estritamente front-end utilizando **React**, **Vite** e **Tailwind CSS**.
- **Contrato de Dados Embutido (`vagas_mock.json`):** Toda a base de dados de validação (10 imóveis realistas de Lavras) foi estruturada em um arquivo JSON estático. Esse JSON atuou como um "contrato" entre a equipe: por ter campos granulares para cada custo (IPTU, luz, taxa de limpeza) e regras de convivência (pets, fumo), a equipe pôde desenvolver a lógica de busca e o design da interface simultaneamente, sem bloqueios.
- **Isolamento Modular no Repositório:** A estrutura do repositório foi reorganizada para que toda a aplicação web resida no diretório `frontend/`, mantendo a raiz do projeto reservada para artefatos de documentação (`docs/`) e evidências empíricas (`evidencias/`).
- **Integração e Entrega Contínua (CI/CD):** Para que os usuários voluntários pudessem testar o sistema sem fricção, configurou-se um fluxo automatizado de deploy via **GitHub Actions**. A cada atualização na *branch main*, o projeto é compilado e hospedado publicamente no **GitHub Pages**.
- **UX e Identidade Institucional:** A interface foi construída com componentes que respeitam a identidade visual da UFLA (tons de verde), suportando alternância para *Dark Mode* e visualizações em Grid/Lista, garantindo conforto visual durante a navegação.

### 2.2. Instruções de Execução (Local)

O sistema está hospedado e pronto para uso público no GitHub Pages. Contudo, para reproduzir o ambiente de desenvolvimento localmente, as instruções são:

#### Pré-requisitos
- **Node.js** (v18.0.0+) e **npm**
- **Git** (Para clonagem e versionamento)

#### Passo a Passo de Instalação e Execução

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/Ez1309/empreendedorismo.git
   cd empreendedorismo
   ```

2. **Acessar a branch de desenvolvimento (`main`):**
   ```bash
   git checkout main
   ```

3. **Acessar o frontend e instalar dependências:**
   ```bash
   cd frontend
   npm install
   ```

4. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível localmente em `http://localhost:5173`.

5. **Compilação de Produção (Opcional):**
   ```bash
   npm run build
   ```
   O comando gera os pacotes estáticos otimizados na pasta `frontend/dist/`.

---

### 2.3. Experiência Visual, Decomposição de Custos e Contato Direto (UI/UX)

A experiência de usuário e interface foi desenvolvida na **Fase 3** através da integração dos componentes `VagaCard.jsx` (card do catálogo), `VagaModal.jsx` (visão rápida em pop-up modal) e `VagaDetalhes.jsx` (página dedicada com URL única). O foco central do design foi atacar diretamente a principal dor identificada nas entrevistas e pesquisas empíricas da Entrega 2: **a insegurança financeira gerada por custos ocultos e a burocracia desnecessária no contato com a moradia**.

#### Hierarquia Visual e o Combate às "Contas Invisíveis"
Em plataformas convencionais e grupos informais de redes sociais, o valor anunciado costuma referir-se exclusivamente ao "aluguel seco", omitindo taxas essenciais que elevam substancialmente o custo final (condomínio, IPTU rateado, luz, água, internet, gás de cozinha e taxas de limpeza periódica).

Para combater essa assimetria de informação, o design do **Acomoda UFLA** implementou uma **Tabela de Custos Abertos (100% Transparente)** estruturada com clara hierarquia visual:

1. **Destaque do "Total Mensal Fechado (Sem Surpresas)":** O card principal exibe como informação primária o somatório consolidado mensal (*Aluguel Base + Contas Invisíveis Mapeadas*), acompanhado do selo de auditoria e garantia visual de transparência.
2. **Discriminação Item a Item:** Tanto no modal quanto na página completa, cada despesa é detalhada linha a linha, informando o nome do custo, sua **Natureza** (*Fixo*, *Fixo rateado* ou *Variável estimada*), descrição explicativa do critério de rateio (ex: medição média da CEMIG ou COPASA) e o valor proporcional exato por morador.
3. **Diferenciação Semântica por Tags:** As despesas são visualmente categorizadas com etiquetas destacadas que informam ao estudante se o item já está incluso no condomínio, se é isento ou se sofrerá variação sazonal de consumo.

#### Acessibilidade, Contraste e Identidade Visual UFLA
A identidade visual foi projetada respeitando as cores institucionais da Universidade Federal de Lavras:

- **Modo Claro (UFLA Light):** Utiliza o Verde UFLA institucional (`#006B3E`) nos cabeçalhos, botões primários e destaques visuais, com fundo em Ghost White (`#FAFAFF`) e cards em branco puro (`#FFFFFF`). A tipografia e os textos de detalhamento financeiro foram calibrados em tons escuros e chumbo (`#2D3748` e `#19261E`), assegurando contraste estrito segundo as diretrizes de acessibilidade WCAG.
- **Modo Escuro (Space Indigo & Pastel Green):** Empregou-se uma base noturna confortável em Space Indigo profundo (`#171825` e `#23253A`) combinada a acentos em **Verde Pastel Aveludado** (`#8FD1A8` e `#A3D9B5`). Foram eliminados brilhos fluorescentes ou neon, prevenindo fadiga visual em sessões noturnas de estudo.
- **Calibração das Tags de Natureza:** Os badges da tabela de custos foram projetados com fundo verde translúcido suave (`rgba(143, 209, 168, 0.15)` no modo escuro e `#E8F5E9` no claro), com bordas suaves e tipografia de alto contraste, eliminando áreas ilegíveis e garantindo leitura nítida em qualquer dispositivo.

#### Arquitetura de Navegação: Modal Rápido e Abertura em Nova Aba (`?vaga=ID`)
O sistema oferece duas formas complementares de exploração:

- **Modal Rápido (`VagaModal.jsx`):** Permite ao aluno inspecionar a planilha de custos de um imóvel sem sair da lista principal, preservando instantaneamente a posição da rolagem e os filtros que já estavam preenchidos na barra lateral.
- **Aba Dedicada (`VagaDetalhes.jsx` via `?vaga=ID`):** O botão de detalhes do card aciona uma rota limpa por parâmetro de URL (`?vaga=ID`) que permite ao estudante abrir múltiplos imóveis simultaneamente em abas separadas do navegador (`target="_blank"`). Essa decisão de design é crucial para a jornada de decisão do estudante universitário, pois possibilita a comparação lado a lado de comodidades, distâncias até o campus e custos totais entre diferentes repúblicas.

#### Conversão Direta via WhatsApp (API `wa.me`)
Eliminando formulários morosos de cadastro ou intermediações com imobiliárias, a conversão é realizada por contato direto entre o estudante e o responsável pela moradia:

- O botão **"Chamar no WhatsApp"** integra-se à API universal `https://wa.me/{numeroResponsavel}`.
- A URL é gerada dinamicamente com uma mensagem contextualizada pré-formatada em UTF-8:
  > *"Olá! Vi a vaga '[Título do Quarto/República]' no Acomoda UFLA e gostaria de tirar algumas dúvidas sobre a disponibilidade."*
- Esse mecanismo reduz o atrito de comunicação, evita que o estudante precise salvar o contato manualmente antes de iniciar a conversa e garante que o anunciante saiba com precisão qual vaga motivou o contato.

---

### 2.4. Capturas de Tela (Screenshots Oficiais do MVP)

As imagens a seguir ilustram as principais interfaces do sistema em pleno funcionamento:

#### 1. Visão Geral da Home (Catálogo de Moradias)
Exibição do banner principal com a identidade visual da UFLA, campo de busca rápida por bairros, contador dinâmico de imóveis e os cards do catálogo destacando o Total Mensal Fechado e regras de convivência.

![Visão Geral da Home do Acomoda UFLA](../../evidencias/imagens/print-home-mvp.png)
*Figura 1: Tela inicial do MVP com catálogo de moradias, destaques de valor e alternância de temas.*

#### 2. Barra Lateral com Filtros e Ordenação Aplicados
Demonstração da barra lateral de filtragem cruzada e reativa, evidenciando o limite de orçamento financeiro (R$ 900), distância até a UFLA (2,5 km), regras de convivência (aceitação de pets) e ordenação por menor preço total.

![Barra Lateral de Filtros Aplicados](../../evidencias/imagens/print-filtros.png)
*Figura 2: Filtros cruzados aplicados na barra lateral e reorganização imediata do catálogo de vagas.*

#### 3. Tela de Detalhes com Tabela de Custos Abertos e WhatsApp
Exibição da página dedicada do imóvel (`?vaga=1`), destacando a **Tabela de Custos Abertos (100% Transparente)** com a decomposição do aluguel base e contas rateadas, ponto de referência do campus e o botão de conversão direta para o WhatsApp.

![Detalhes da Vaga com Custos Abertos](../../evidencias/imagens/print-detalhes.png)

*Figura 3: Visão de detalhes com a tabela detalhada de custos (sem contas ocultas) e botão de contato direto via WhatsApp.*

---

## 5. Decisões do Grupo e Modificações Planejadas (Evolução da Interface - UI/UX)

Com base no desenvolvimento da interface e na avaliação empírica do MVP, as seguintes melhorias visuais e funcionais estão planejadas para versões futuras da plataforma:

1. **Galeria de Fotos Expandida em Carrossel/Lightbox:** Implementar visualização com múltiplos ângulos em alta definição (quarto, banheiro compartilhado, cozinha, área de serviço e área de estudos), permitindo navegação imersiva com controles de deslize (*swipe*) em dispositivos móveis.
2. **Tour Virtual 360° e Planta Humanizada:** Adicionar integração com visualizador 360° dos cômodos para que estudantes residentes em outras cidades possam realizar visitas virtuais realistas antes de se deslocarem até Lavras, minimizando gastos de viagem.
3. **Refinamento Responsivo e Visualização Mobile-First Dedicada:** Adicionar uma barra inferior de ação fixa (*sticky bottom bar*) em telas pequenas para retenção do botão de WhatsApp e expansão em gaveta (*bottom sheet*) da Tabela de Custos Abertos.
