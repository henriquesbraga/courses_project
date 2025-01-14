# Plataforma de cursos

Uma breve descrição da API, o que ela faz e para que serve.

## Índice

- [Introdução](#introdução)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Endpoints](#endpoints)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Introdução

> Esta API fornece endpoints para gerenciar usuários, autenticação e produtos em uma aplicação de e-commerce.

## Requisitos

Liste os requisitos para rodar a API:

- Node.js (v16 ou superior)
- npm ou yarn
- Banco de dados (ex.: MySQL, PostgreSQL, MongoDB, etc.)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-da-api.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd nome-da-api
   ```

3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias. Aqui está um exemplo:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome-do-banco
   JWT_SECRET=sua_chave_secreta
   ```

2. Certifique-se de que o banco de dados está configurado e rodando.

## Execução

- Rodar em modo de desenvolvimento:
  ```bash
  npm run dev
  # ou
  yarn dev
  ```

- Rodar em modo de produção:
  ```bash
  npm start
  # ou
  yarn start
  ```

## Endpoints

Aqui estão os principais endpoints disponíveis na API:

### Autenticação

- **POST** `/auth/login`
  - **Descrição:** Realiza login e retorna um token JWT.
  - **Payload:**
    ```json
    {
      "email": "usuario@exemplo.com",
      "password": "senha123"
    }
    ```
  - **Resposta:**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    }
    ```

### Usuários

- **GET** `/users`
  - **Descrição:** Retorna a lista de usuários.
  - **Autenticação:** Token JWT necessário.
  - **Resposta:**
    ```json
    [
      {
        "id": 1,
        "name": "João",
        "email": "joao@exemplo.com"
      }
    ]
    ```

- **POST** `/users`
  - **Descrição:** Cria um novo usuário.
  - **Payload:**
    ```json
    {
      "name": "João",
      "email": "joao@exemplo.com",
      "password": "senha123"
    }
    ```
  - **Resposta:**
    ```json
    {
      "id": 1,
      "name": "João",
      "email": "joao@exemplo.com"
    }
    ```

(Adicione mais endpoints conforme necessário)

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).
