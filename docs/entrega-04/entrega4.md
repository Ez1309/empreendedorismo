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
