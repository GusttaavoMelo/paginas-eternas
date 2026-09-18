# 📚 Páginas Eternas

> **Onde cada página guarda uma nova aventura.**

O **Páginas Eternas** é uma aplicação web de uma livraria digital, desenvolvida com React e TypeScript, com foco em uma experiência moderna, elegante e responsiva para descoberta e compra de livros.

O projeto foi desenvolvido com o objetivo de praticar e demonstrar conceitos de desenvolvimento front-end moderno, organização de código, gerenciamento de estado, formulários, persistência de dados e construção de interfaces responsivas.

---

## ✨ Funcionalidades

### 📖 Catálogo

* Visualização de livros disponíveis
* Busca por título
* Filtros por categoria, autor e faixa de preço
* Avaliação e quantidade de avaliações
* Informações de estoque
* Página individual de detalhes do livro

### ❤️ Favoritos

* Adicionar e remover livros dos favoritos
* Visualização dos livros favoritos
* Persistência dos favoritos no `localStorage`

### 🛒 Carrinho

* Adicionar livros ao carrinho
* Alterar quantidade de itens
* Remover itens
* Cálculo automático do total
* Persistência do carrinho no `localStorage`

### 👤 Autenticação

* Cadastro de usuário
* Login
* Logout
* Proteção de páginas privadas
* Persistência da sessão
* Edição de nome e e-mail do usuário

> A autenticação atualmente é uma implementação local para fins de demonstração e estudo, utilizando `localStorage`.

### 📦 Pedidos

* Finalização de pedidos
* Registro dos pedidos realizados
* Histórico de pedidos por usuário
* Visualização dos detalhes de cada pedido
* Número do pedido
* Data e status
* Produtos comprados
* Quantidades e valores
* Dados de entrega
* Forma de pagamento
* Resumo e valor total do pedido
* Compatibilidade com pedidos criados antes das últimas atualizações da estrutura

### 💳 Checkout

* Formulário de informações pessoais
* CPF e telefone
* Endereço de entrega
* Seleção da forma de pagamento
* Validação dos campos
* Criação e armazenamento do pedido
* Página de confirmação após a compra

---

## 🛠️ Tecnologias utilizadas

### Front-end

* **React**
* **TypeScript**
* **Vite**
* **React Router**
* **CSS Modules**
* **Lucide React**

### Gerenciamento de estado e dados

* **Context API**
* **TanStack React Query**
* **Axios**
* **LocalStorage**

### Formulários e validação

* **React Hook Form**
* **Zod**
* **@hookform/resolvers**

### Desenvolvimento

* **Git**
* **GitHub**
* **Visual Studio Code**

---

## 🏗️ Estrutura do projeto

A aplicação está organizada de forma modular, separando páginas, componentes, contextos, configurações, rotas, estilos e tipos.

```text
src/
├── assets/
├── components/
├── config/
├── contexts/
│   ├── AuthContext/
│   ├── CartContext/
│   └── FavoritesContext/
├── layouts/
├── pages/
│   ├── Account/
│   ├── BookDetails/
│   ├── Cart/
│   ├── Catalog/
│   ├── Checkout/
│   ├── Favorites/
│   ├── Home/
│   ├── Login/
│   ├── OrderDetails/
│   ├── OrderSuccess/
│   └── Register/
├── routes/
├── styles/
├── types/
│   └── Order/
└── ...
```

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado:

* [Node.js](https://nodejs.org/)
* npm

### Instalação

Clone o repositório:

```bash
git clone https://github.com/GusttaavoMelo/paginas-eternas.git
```

Entre na pasta do projeto:

```bash
cd paginas-eternas
```

Instale as dependências:

```bash
npm install
```

Execute o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite no terminal.

---

## 📜 Scripts disponíveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

### Build

```bash
npm run build
```

Gera a versão de produção da aplicação.

### Preview

```bash
npm run preview
```

Executa localmente a versão gerada para produção.

### Lint

```bash
npm run lint
```

Executa a verificação de lint do projeto.

---

## 💾 Persistência de dados

Como o projeto atualmente funciona sem um back-end próprio, alguns dados são armazenados localmente no navegador através do `localStorage`.

Entre eles:

```text
paginas-eternas-users
paginas-eternas-user
paginas-eternas-cart
paginas-eternas-favorites
paginas-eternas-orders
```

Isso permite simular funcionalidades de uma aplicação real, como autenticação, carrinho, favoritos e histórico de pedidos.

> **Observação:** essa implementação é destinada ao desenvolvimento e demonstração. Em uma aplicação de produção, dados de usuários, autenticação e pedidos deveriam ser tratados por um back-end e armazenados em um banco de dados adequado.

---

## 📱 Responsividade

A interface foi desenvolvida pensando em diferentes tamanhos de tela, com adaptações para dispositivos desktop e mobile.

As páginas de conta, checkout, carrinho e detalhes dos pedidos possuem ajustes específicos para telas menores.

---

## 🎯 Próximos passos

O projeto continua em desenvolvimento. Algumas melhorias planejadas incluem:

* [ ] Persistência de pedidos utilizando uma API/back-end
* [ ] Integração com banco de dados
* [ ] Melhorias na edição dos dados da conta
* [ ] Alteração de senha
* [ ] Melhorias na experiência do usuário
* [ ] Aprimoramentos de acessibilidade
* [ ] Melhorias de performance
* [ ] Testes automatizados
* [ ] Deploy da aplicação em ambiente de produção

---

## 🌐 Projeto

**Repositório:**
https://github.com/GusttaavoMelo/paginas-eternas

---

## 👨‍💻 Autor

**Gustavo de Melo Oliveira Santos**

Desenvolvedor Front-end com foco em React, TypeScript e desenvolvimento de interfaces web modernas.

### 🔗 Contatos

* **GitHub:** https://github.com/GusttaavoMelo
* **LinkedIn:** https://linkedin.com/in/desenvolvedor-front-end-gustavo-melo
* **Portfólio:** https://gusttaavomeloo.netlify.app

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo, prática e demonstração de habilidades em desenvolvimento front-end.
