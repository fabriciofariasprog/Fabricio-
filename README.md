# 🧪 KAM-7 — Automação de Testes com Cypress

Projeto de automação de testes desenvolvido para validar funcionalidades de uma aplicação web, utilizando **Cypress** e **JavaScript**, com organização baseada no padrão **Page Object Model (POM)**.

O projeto tem como principal objetivo automatizar cenários relacionados ao gerenciamento de **Contas Fixas**, garantindo maior confiabilidade, organização e facilidade de manutenção dos testes.

---

## 🚀 Tecnologias utilizadas

* [Cypress](https://www.cypress.io/)
* JavaScript
* Node.js
* Page Object Model (POM)
* Fixtures
* Git
* GitHub

---

## 📋 Funcionalidades automatizadas

Atualmente, o projeto possui automações voltadas principalmente para:

### 🔐 Login

* Preenchimento das credenciais de acesso
* Utilização de dados através de fixture
* Validação do fluxo de autenticação
* Navegação pelo menu da aplicação

### 💰 Contas Fixas

Automação do fluxo de cadastro de contas fixas, contemplando informações como:

* Valor da conta
* Categoria
* Dia do vencimento
* Descrição opcional
* Navegação até a funcionalidade de Contas Fixas
* Preenchimento do formulário
* Validação do fluxo de cadastro

---

## 🏗️ Arquitetura do projeto

O projeto utiliza o padrão **Page Object Model (POM)** para separar a lógica de interação com a aplicação dos cenários de teste.

```text
KAM-7/
│
├── cypress/
│   │
│   ├── e2e/
│   │   ├── 1-getting-started/
│   │   ├── 2-advanced-examples/
│   │   └── contas-fixas/
│   │       └── contasFixas.cy.js
│   │
│   ├── fixtures/
│   │   ├── Login.json
│   │   └── contaFixa.Json
│   │
│   ├── pages/
│   │   ├── LoginPage.js
│   │   └── ContaFixaPage.js
│   │
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   │
│   └── README.md
│
├── .gitignore
├── cypress.config.js
├── package.json
└── package-lock.json
```

> Os exemplos padrão do Cypress presentes nas pastas `1-getting-started` e `2-advanced-examples` fazem parte da estrutura inicial do framework.

---

## 📂 Organização das pastas

### `cypress/e2e`

Contém os arquivos responsáveis pelos **cenários de teste**.

Exemplo:

```text
cypress/e2e/contas-fixas/contasFixas.cy.js
```

É nesse local que ficam as especificações dos testes automatizados.

---

### `cypress/pages`

Contém as classes do **Page Object Model**.

```text
LoginPage.js
ContaFixaPage.js
```

Essa separação permite centralizar os elementos e ações das páginas, evitando duplicação de código nos testes.

---

### `cypress/fixtures`

Contém os dados utilizados pelos testes.

```text
Login.json
contaFixa.Json
```

Essa abordagem permite separar os **dados de teste** da lógica de automação.

---

### `cypress/support`

Contém configurações e comandos de suporte utilizados pelo Cypress.

```text
commands.js
e2e.js
```

---

## ⚙️ Instalação

### 1. Clonar o projeto

```bash
git clone https://github.com/fabriciofariasprog/Fabricio-.git
```

### 2. Acessar a pasta

```bash
cd Fabricio-
```

### 3. Instalar as dependências

```bash
npm install
```

---

## ▶️ Executando os testes

Para abrir o Cypress em modo interativo:

```bash
npx cypress open
```

Depois:

1. Selecione **E2E Testing**
2. Escolha o navegador
3. Selecione o cenário que deseja executar

---

### Executar os testes pelo terminal

Para executar os testes em modo headless:

```bash
npx cypress run
```

---

## 🧪 Exemplo de fluxo automatizado

Um dos principais fluxos automatizados pelo projeto é o cadastro de uma conta fixa:

```text
Login
  ↓
Acesso ao Menu
  ↓
Contas Fixas
  ↓
Cadastro de Conta Fixa
  ↓
Preenchimento dos dados
  ↓
Salvar
  ↓
Validação do resultado
```

---

## 🎯 Objetivos do projeto

Este projeto foi desenvolvido com foco em práticas importantes de **Quality Assurance**, incluindo:

* Automação de testes end-to-end
* Organização utilizando Page Object Model
* Reutilização de componentes
* Separação entre dados e lógica de teste
* Manutenibilidade dos scripts
* Validação de fluxos funcionais
* Redução de testes manuais repetitivos

---

## 🔄 Fluxo de versionamento

O projeto utiliza Git para controle de versão.

Após realizar alterações:

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "descrição da alteração"
```

```bash
git push
```

---

## 📌 Próximas evoluções

Algumas possibilidades de evolução do projeto:

* [ ] Aumentar a cobertura dos cenários de Contas Fixas
* [ ] Adicionar testes negativos
* [ ] Adicionar validações de mensagens de erro
* [ ] Criar testes para outras funcionalidades da aplicação
* [ ] Implementar execução em CI/CD
* [ ] Gerar relatórios automatizados
* [ ] Melhorar a cobertura de testes de API
* [ ] Expandir a reutilização dos Page Objects

---

## 👨‍💻 Autor

**Fabrício Farias**

Analista de Qualidade de Software | QA

Projeto desenvolvido para prática e demonstração de conhecimentos em **automação de testes, Cypress, JavaScript e qualidade de software**.

---

## ⭐ Projeto

Se este projeto for útil para estudos ou demonstração de automação de testes, fique à vontade para explorar o código e acompanhar sua evolução.
