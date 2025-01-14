# Plataforma de cursos

Uma breve descrição da API, o que ela faz e para que serve.

## Índice

- [Introdução](#introdução)
- [Requisitos](#requisitos)
- [Instalação com Docker](#instalação-com-docker)
- [Instalação sem Docker](#instalação-sem-docker)
- [Stack](#stack)
- [Distribuição](#distribuição)

## Introdução

  Este projeto é composto por uma API rest que fornece endpoints para gerenciar usuários e cursos;
  Também contém seu frontend para manuseio do sistema.

## Requisitos

Liste os requisitos para rodar a API:

- Node.js (v16 ou superior)
- npm ou yarn
- Docker

## Instalação com Docker

1. Clone este repositório:
  ```bash
  git clone https://github.com/seu-usuario/nome-da-api.git
  ```

2. Acesse o diretório do backend, instale as dependências e execute o build:
  ```bash
  cd backend && npm i && npm run build
  ```
3. Acesse o diretório do frontend e instale as dependências:
  ```bash
  cd frontend && npm i && npm run build
  ```

4. Suba o container na raiz do projeto:
  ```bash
  docker compose up --build
  ```

## Instalação sem Docker

1. Crie um banco de dados com o nome de `courses` no Postgres:
  ```sql
  CREATE DATABASE courses;
  ```

2. Altere o arquivo /backend/.env com as credenciais de acesso.
  Em DATABASE_HOST deixar localhost

3. Acesse o diretório do backend, instale as dependências e execute:
  ```bash
  cd backend && npm i && npm run dev
  ```
4. Acesse o diretório do frontend e instale as dependências e execute:
  ```bash
  cd frontend && npm i && npm run dev
  ```

## Stack
  Para o backend, eu escolhi usar o Express devido o sistema não ter uma complexidade muito grande, não ter muitas rotas e não ter muitas entidades.
  Para o caso, o Express, no meu julgamento, funciona bem, a sintaxe é mais simples comparado ao Nest.js.

  Usei Typescript para tipar as entidades, assim, mantenho a organização e tenho o apoio da IDE para acessar melhor os dados.

  Como foi requisitado um hash de senha, usei o bcrypt para embaralhar a senha e guardar no banco.
  Usei JWT para proteger as rotas de acesso a dados mais sensiveis.

  Optei por usar middlewares tanto para a autenticação como para a validação dos dados vindos do frontend.

  Optei por usar a arquitetura em camadas para separar melhor as responsabilidades (controller/services/repositories)

  Estou usando query raw com a biblioteca Postgres.js (https://github.com/porsager/postgres)
  Esta biblioteca me permite usar query pura no postgres. Ela já possui tratamento de Prepared Statement.
  Por que optei por usar assim? Gosto de ter o controle do SQL ao usar um ORM. Por mais que os ORM's de hoje sejam rápidos e práticos, Não gosto do overhead que eles causam.

  No frontend estamos usando React.js com Mui (Material UI)
  Fiz o app mobile first apesar dele também ser responsivo para a web.
  Estou usando axios para as requisições e acesso ao localStorage para salvar as informações do usuário.
  As datas estão sendo tratadas para serem exibidas no front em conformidade ao que foi pedido no retorno do backend.


## Endpoints

Aqui estão os principais endpoints disponíveis na API:

### Autenticação

- **POST** `/login`
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
      "id": 1,
      "name": "name",
      "email": "email@mail.com",
      "created_at": "2025-01-13T10:43:30-03:00",
      "token": "eyJhbGciOi..."
    }
    ```
- **POST** `/users`
  - **Descrição:** Realiza o cadastro de um usuário.
  - **Payload:**
    ```json
    {
      "name": "User",
      "email": "user@mail.com",
      "password": "123456"
    }
    ```
  - **Resposta:**
    ```json
    {
      "id": 2,
      "name": "User",
      "email": "user@mail.com",
      "created_at": "2025-01-14T10:45:55-03:00"
    }
    ```
- **GET** `/refresh`
  - **Descrição:** Realiza a atualização do token.
  - **Headers:**
    - `Authorizarion`:{{token}}.
  - **Resposta:**
    ```json
    {
      "token": "eyJhbGciOi..."
    }
    ```

### Usuários

- **GET** `/users/all`
  - **Descrição:** Retorna a lista de usuários com seus cursos.
  - **Autenticação:** Token JWT necessário.
  - **Resposta:**
    ```json
    [
      {
        "id": 1,
        "name": "User1",
        "email": "user1@mail.com",
        "created_at": "2025-01-14T09:08:56-03:00",
        "courses": [
          {
            "id": 1,
            "title": "Course 1",
            "description": "description",
            "enrolled_at": "2025-01-14T09:09:46-03:00"
          }
        ]
      },
      {...}
    ]
    ```

- **GET** `/users/:id`
  - **Descrição:** Retorna os dados do usuário (obs: Apenas o próprio usuário pode pesquisar os seus dados).
  - **Autenticação:** Token JWT necessário.
  - **Resposta:**
    ```json
    {
      "id": 1,
      "name": "user",
      "email": "user@mail.com",
      "created_at": "2025-01-14T09:08:56-03:00"
    }
    ```



### Cursos

- **GET** `/courses`
  - **Descrição:** Retorna os cursos criados.
  - **Autenticação:** Token JWT necessário.
  - **Resposta:**
    ```json
    [
      {
        "id": 1,
        "title": "Curso 1",
        "description": "Description 1",
        "hours": 10,
        "created_at": "2025-01-14T09:09:44-03:00"
      }
    ]
    ```
- **POST** `/courses`
  - **Descrição:** Cadastra um novo curso.
  - **Autenticação:** Token JWT necessário.
  - **Payload:**
    ```json
    {
      "title": "Curso 2",
      "description": "Descrição 2",
      "hours": 30
    }
    ```
  - **Resposta:**
    ```json
    {
      "id": 2,
      "title": "Curso 2",
      "description": "Descrição 2",
      "hours": 30,
      "created_at": "2025-01-14T11:10:05-03:00"
    }
    ```

### Matriculas
- **GET** `/enrollments/:userId`
  - **Descrição:** Retorna os cursos em que um aluno está matriculado.
  - **Autenticação:** Token JWT necessário.
  - **Resposta:**
    ```json
    [
      {
        "course_id": 1,
        "title": "Curso 1",
        "description": "Descrição 1",
        "hours": 10,
        "enrolled_at": "2025-01-14T09:09:46-03:00",
        "created_at": "2025-01-14T11:15:41-03:00"
      }
    ]
    ```
- **POST** `/enrollments`
  - **Descrição:** Cadastra um novo curso.
  - **Autenticação:** Token JWT necessário.
  - **Payload:**
    ```json
    {
      "title": "Curso 2",
      "description": "Descrição 2",
      "hours": 30
    }
    ```
  - **Resposta:**
    ```json
    {
      "id": 2,
      "title": "Curso 2",
      "description": "Descrição 2",
      "hours": 30,
      "created_at": "2025-01-14T11:10:05-03:00"
    }
    ```




## Contribuição

O aplicativo está disponível no endereço: https://courseproject.henriquelabs.com.br/
o deploy foi feito usando Docker em produção.

