# Boilerplate NestJS - Documentação do Projeto

## Visão Geral

Este projeto é um **boilerplate** para aplicações backend utilizando [NestJS](https://nestjs.com/), com arquitetura modular, integração com banco de dados PostgreSQL via Prisma ORM, e práticas modernas de organização de código, testes e logging.

---

## Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/):** Framework Node.js para construção de APIs escaláveis e testáveis.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript com tipagem estática.
- **[Prisma ORM](https://www.prisma.io/):** ORM moderno para Node.js e TypeScript.
- **[PostgreSQL](https://www.postgresql.org/):** Banco de dados relacional open source.
- **[Docker](https://www.docker.com/):** Contêineres para ambiente de desenvolvimento e produção.
- **[Swagger](https://swagger.io/):** Documentação automática de API.
- **[Winston](https://github.com/winstonjs/winston):** Logger flexível para Node.js.
- **[Morgan](https://github.com/expressjs/morgan):** Middleware de logging HTTP.
- **REST Client (VS Code):** Testes de API via arquivos `.http`.

---

## Estrutura de Pastas

```
src/
  app.module.ts
  main.ts
  core/
    entities/
    errors/
    facade/
    lib/
    usecases/
  domain/
    company/
      application/
        facade/
        repositories/
        types/
        usecases/
      enterprise/
      subdomain/
  infra/
    database/
      prisma/
      repositories/
    http/
      controllers/
      dto/
      modules/
  shared/
    logger/
    middlewares/
```

### Principais Diretórios

- **core/**: Contratos, entidades base, interfaces e utilitários genéricos.
- **domain/**: Lógica de negócio, entidades, casos de uso e tipos do domínio.
- **infra/**: Implementações de infraestrutura (banco, HTTP, repositórios).
- **shared/**: Componentes compartilhados como logger e middlewares.

---

## Fluxo de Desenvolvimento

1. **Suba os containers:**
   ```bash
   docker-compose up --build
   ```

2. **O backend espera o banco de dados ficar pronto, executa as migrations do Prisma e inicia o servidor NestJS.**

3. **Acesse a documentação da API:**
   ```
   http://localhost:4000/api
   ```

4. **Testes de API:**
   - Utilize o arquivo `request.http` com a extensão REST Client do VS Code.
   - As variáveis de resposta podem ser capturadas usando request variables, por exemplo:
     ```http
     // @name createManager
     POST http://localhost:4000/manager
     Content-Type: application/json

     {
       "name": "Carlos ancelloti",
       "email": "carlao.ancelloti@example.com",
       "phone": "11988887777",
       "cpf": "12345678909"
     }

     ###

     @managerId = {{createManager.response.body.$.id}}
     ```

---

## Principais Componentes

- **Controllers:** Recebem as requisições HTTP e delegam para os casos de uso.
- **UseCases:** Implementam a lógica de negócio de cada operação.
- **Repositories:** Abstraem o acesso ao banco de dados.
- **DTOs:** Definem os contratos de entrada e saída das operações.
- **Entities:** Representam os objetos de domínio.
- **Logger:** Centraliza logs de aplicação e requisições HTTP.
- **Middlewares:** Tratamento de exceções, logging, etc.

---

## Convenções Importantes

- **Variáveis de ambiente:** Definidas no arquivo `.env` na raiz do projeto.
- **Migrations:** Executadas automaticamente no entrypoint do container backend.
- **Portas padrão:** Backend em `4000`, banco em `5432`.
- **Documentação Swagger:** Disponível em `/api`.

---

## Exemplos de Uso

### Criar um gerente e usar o ID em outras requisições

```http
// @name createManager
POST http://localhost:4000/manager
Content-Type: application/json

{
  "name": "Carlos ancelloti",
  "email": "carlao.ancelloti@example.com",
  "phone": "11988887777",
  "cpf": "12345678909"
}

###

@managerId = {{createManager.response.body.$.id}}

POST http://localhost:4000/company
Content-Type: application/json

{
  "name": "Empresa Exemplo",
  "cnpj": "12345678000100",
  "managerId": "{{managerId}}"
}
```

---

## Dicas

- Sempre execute as requisições nomeadas antes de usar variáveis dependentes.
- Para rodar comandos dentro do container backend já rodando:
  ```bash
  docker-compose exec backend sh
  ```
- Para rodar migrations manualmente:
  ```bash
  yarn prisma migrate deploy
  ```

---

## Contato

Dúvidas ou sugestões? Abra uma issue ou entre em contato com o mantenedor do projeto.
