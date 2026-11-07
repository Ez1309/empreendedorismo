## 1. Estrutura Detalhada do Repositório (Arquitetura do Código)

Abaixo está o modelo exato de como a pasta do projeto deve ser organizada. O uso dessa estrutura garante que o código fique modular, permitindo que cada membro trabalhe em sua pasta sem gerar conflitos de versão (merge conflicts) no GitHub.

```text
acomoda-ufla/
├── docs/                        # Documentação exigida pelo professor
│   ├── entrega-01.md
│   ├── entrega-02.md
│   ├── entrega-03.md
│   └── entrega-04.md            # Relatório desta entrega
├── evidencias/                  # Arquivos de mídia (PDFs, SVGs, JPGs, prints)
│   └── imagens/
│       ├── bmc.svg
│       ├── pbmc.svg
│       ├── wireframe-inicial.jpg
│       ├── print-home-mvp.jpg   # Print 1 exigido na Entrega 4
│       ├── print-filtros.jpg    # Print 2 exigido na Entrega 4
│       └── print-detalhes.jpg   # Print 3 exigido na Entrega 4
├── src/                         # Código-fonte da aplicação React
│   ├── assets/                  # Mídias estáticas do sistema
│   │   ├── logo.svg             # Logo do Acomoda UFLA
│   │   └── default-room.jpg     # Imagem genérica caso a vaga não tenha foto
│   ├── components/              # Componentes visuais do React
│   │   ├── layout/              # Elementos fixos da página
│   │   │   ├── Header.jsx       # Barra superior
│   │   │   └── Footer.jsx       # Rodapé
│   │   ├── vagas/               # Elementos relacionados aos anúncios
│   │   │   ├── VagaCard.jsx     # Card resumido da listagem
│   │   │   └── VagaModal.jsx    # Pop-up de detalhamento (com botão do WhatsApp)
│   │   └── filtros/             # Elementos de busca
│   │       └── SearchSidebar.jsx# Barra lateral ou superior com os inputs de filtro
│   ├── data/                    # Banco de dados simulado
│   │   └── vagas_mock.json      # O "contrato" de dados (JSON)
│   ├── hooks/                   # Lógica e regras de negócio separadas da UI
│   │   └── useVagas.js          # Arquivo para carregar o JSON e aplicar os filtros
│   ├── App.jsx                  # Ponto central que une Header, Filtros e Lista
│   └── main.jsx                 # Arquivo raiz gerado pelo Vite
├── index.html
├── package.json                 # Dependências (React, Tailwind, Axios)
├── tailwind.config.js           # Configuração de estilos
└── README.md                    # Instruções de execução (exigência da Entrega 4)

```

---

## 2. Divisão de Fases e Atribuições (Trabalho Paralelo)

Para que o paralelismo funcione, a **Fase 1 deve ser executada nas primeiras horas**. Assim que o arquivo `vagas_mock.json` for criado, ele atua como um "contrato". Sabendo quais são os nomes das variáveis no JSON (ex: `precoTotal`, `aceitaPet`), os Membros 2, 3 e 4 podem trabalhar isoladamente e ao mesmo tempo.

### Fase 1: Infraestrutura e Contrato de Dados

**Responsável:** Membro 1
**O que deve ser feito:** Inicializar o repositório base, configurar o ecossistema (Vite + TailwindCSS), criar o banco de dados embutido (JSON) e garantir que a aplicação esteja hospedada (Deploy).
**Como fazer:**

1. Rodar `npm create vite@latest acomoda-ufla -- --template react` e instalar o Tailwind.
2. Criar o arquivo `src/data/vagas_mock.json`.
3. Criar os componentes `Header.jsx` e `Footer.jsx` para dar uma "cara" inicial.
4. Conectar o repositório no **Vercel** ou **Netlify** para gerar o link público.
**Dicas/Exemplos:**

* Crie no mínimo 10 vagas no JSON para que os testes tenham opções suficientes.
* *Exemplo de estrutura do JSON:*
```json
[
  {
    "id": "1",
    "titulo": "Quarto Individual - República",
    "valorAluguel": 400,
    "valorContasInvisiveis": 150,
    "valorTotal": 550,
    "regras": { "aceitaPet": false, "fumo": false },
    "whatsapp": "5535999999999"
  }
]

```



### Fase 2: Motor de Busca e Lógica (Engenharia)

**Responsável:** Membro 2
**O que deve ser feito:** Criar a inteligência do sistema que lê o arquivo JSON e filtra os resultados com base na interação do usuário, sem se preocupar com a beleza estética (que é da Fase 3).
**Como fazer:**

1. Desenvolver o `SearchSidebar.jsx` com inputs (ex: um `<input type="number">` para o valor máximo e `<input type="checkbox">` para regras).
2. Desenvolver o `useVagas.js` (ou colocar direto no `App.jsx`). Essa lógica precisa cruzar o estado atual dos filtros com o array do JSON.
**Dicas/Exemplos:**

* Use a função `.filter()` do JavaScript.
* *Exemplo Lógico:* `const vagasFiltradas = vagas.filter(vaga => vaga.valorTotal <= filtroPreco && vaga.regras.aceitaPet === filtroPet);`
* Até o Membro 3 terminar, você pode testar a sua lógica imprimindo na tela apenas um `<ul><li>{vaga.titulo}</li></ul>`.

### Fase 3: UI/UX e Materialização do Valor (Frontend)

**Responsável:** Membro 3
**O que deve ser feito:** Transformar o JSON em uma interface profissional que traduza a proposta de valor (transparência e fit cultural). Responsável também por tirar as capturas de tela oficiais após a integração.
**Como fazer:**

1. Desenvolver o `VagaCard.jsx` focando na clareza.
2. Desenvolver o `VagaModal.jsx` (ou página de detalhes). É obrigatório que este componente mostre a tabela de custos abertos (Aluguel + IPTU + Luz, etc.).
3. Adicionar o botão final que valida a hipótese: redirecionamento para o WhatsApp.
**Dicas/Exemplos:**

* O link do botão deve ser dinâmico: `href={"[https://wa.me/](https://wa.me/)" + vaga.whatsapp + "?text=Olá, vi a vaga no Acomoda UFLA"}`.
* Para desenhar sem depender do Membro 2, crie um objeto `vagaTeste` direto no seu arquivo para ir aplicando o Tailwind.

### Fase 4: Operação de Validação e Relatório

**Responsável:** Membro 4
**O que deve ser feito:** Estruturar o teste assíncrono (Forms), convocar os 8 voluntários da Entrega 2, analisar os resultados e escrever o documento final.
**Como fazer:**

1. Criar um Google Forms dividido em 3 blocos: Instrução (com a "missão"), Auditoria (perguntas que provam que ele achou a vaga) e Qualitativa (perguntas do Anexo C).
2. Enviar o link do Deploy (criado pelo Membro 1) + link do Forms para os voluntários.
3. Tabular as respostas, apontar as falhas de UX relatadas e fechar o texto do Markdown.
**Dicas/Exemplos:**

* *Exemplo de pergunta de Auditoria:* "Qual foi o nome da República ou Anúncio que você escolheu ao final da simulação?"
* *Exemplo de Missão no Forms:* "Encontre uma vaga que custe no máximo R$ 600 no total e que permita fumantes."

---

## 3. Esboço do Arquivo Markdown (Entrega 04)

O arquivo abaixo mapeia exatamente quem escreve qual parte, conectando o texto ao código e às validações que foram executadas.

```markdown
# Trabalho de Empreendedorismo - Entrega 4: MVP Funcional e Validação

## 1. Identificação do Grupo
**[Responsável: Membro 4 - Preenchimento da tabela padrão]**
*(Inserir a mesma tabela das entregas anteriores)*

---

## 2. O Mínimo Produto Viável (MVP)

### 2.1. Arquitetura e Decisão de Engenharia (Pivô Técnico)
**[Responsável: Membro 1 - Relaciona com a Fase 1]**
*(Descrever que o grupo pivotou a arquitetura para um SPA em React sem backend para ganhar velocidade. Explicar que os dados foram alocados em um JSON estático embutido na aplicação, eliminando riscos de infraestrutura e permitindo focar 100% na validação da interface e da proposta de valor financeira).*
- **Repositório do Código:** `[Link do GitHub]`
- **Link do Sistema (Deploy):** `[Link do Vercel/Netlify]`

### 2.2. Instruções de Execução (Local)
**[Responsável: Membro 1 - Relaciona com a Fase 1]**
*(Listar os comandos técnicos necessários para o professor rodar na máquina dele: `git clone`, `npm install`, `npm run dev`).*

### 2.3. Descrição do Fluxo Principal Implementado
**[Responsáveis: Membro 2 e Membro 3 - Relaciona com Fases 2 e 3]**
*(Descrever o passo a passo da aplicação desenvolvida. Citar:*
*1. Acesso à Home e carregamento do catálogo.*
*2. Como funciona a lógica do filtro desenvolvida pelo Membro 2 (ex: barra lateral).*
*3. O impacto visual desenvolvido pelo Membro 3 (ex: como o card se expande revelando as contas ocultas e os ícones de convivência).*
*4. A conversão final via API do WhatsApp).*

### 2.4. Capturas de Tela (Screenshots)
**[Responsável: Membro 3 - Imagens da interface pronta]**
*(Inserir as imagens: 1. Tela Inicial; 2. Filtros sendo aplicados; 3. Modal de Detalhes mostrando as contas invisíveis quebradas).*

---

## 3. Metodologia de Validação

### 3.1. Planejamento do Teste Dirigido Assíncrono
**[Responsável: Membro 4 - Relaciona com a Fase 4]**
*(Explicar que a validação síncrona foi adaptada para um "Teste Assíncrono Dirigido" via Google Forms com 5 participantes reais oriundos da base de contatos da Entrega 2. Explicar que o Forms teve blocos de Auditoria e blocos qualitativos baseados no Anexo C).*

### 3.2. Tarefa Solicitada
**[Responsável: Membro 4 - Relaciona com a Fase 4]**
*(Copiar aqui o texto exato da "missão" que foi passada no início do Forms. Ex: "Acesse o sistema e busque uma vaga de até R$ 800 que aceite Pets...").*

### 3.3. Métricas Utilizadas
**[Responsável: Membro 4 - Relaciona com a Fase 4]**
*(Listar as métricas: Taxa de conclusão baseada na auditoria do Forms, e métricas qualitativas de compreensão da proposta).*

---

## 4. Evidências e Resultados da Validação

### 4.1. Registro Individual dos Testes
**[Responsável: Membro 4 - Tabulação do Forms]**
*(Transcrever um resumo das respostas dos 5 usuários: iniciais, facilidades, dificuldades com a interface e respostas à pergunta "O que você entendeu que o sistema faz?").*

### 4.2. Síntese dos Resultados e Problemas Identificados
**[Responsável: Membro 4 - Análise crítica]**
*(Consolidar os problemas. Citar especificamente problemas técnicos ou de design descobertos durante os testes, como botões pequenos demais para mobile ou filtros difíceis de encontrar).*

---

## 5. Decisões do Grupo e Modificações Planejadas

**[Responsabilidade Conjunta: Todo o grupo define as prioridades, Membro 4 redige]**
*(Afirmar que a hipótese de valor se confirmou. Em seguida, listar em bullet points o que será modificado nas próximas versões. Ex: "Membro 1 propõe integrar com Postgres; Membro 2 propõe colocar filtro de distância em KM; Membro 3 propõe refatorar o menu para mobile").*

```