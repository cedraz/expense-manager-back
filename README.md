# App

#### Expense Manager

Aplicação para gerenciamento de despesas e cobranças.

## Tecnologias utilizadas no Back-end

- Node.js
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Zod

## Como rodar o back-end do projeto

- 'docker compose up -d' para rodar o banco de dados (utilize o comando 'sudo' caso esteja no linux)
- 'npm run dev' para rodar a aplicação em modo de desenvolvimento
- 'npx prisma studio' para abrir a interface do prisma

## RFs (Requisitos funcionais)

- [x] O usuário deve poder se cadastrar na aplicação
- [x] O usuário deve poder se autenticar na aplicação
- [x] O usuário deve poder cadastrar cartões de crédito
- [x] O usuário deve poder listar todas as despesas cadastradas em um cartão de crédito
- [x] O usuário deve poder cadastrar uma nova despesa
- [x] O usuário deve poder editar uma despesa cadastrada
- [x] O usuário deve poder excluir uma despesa cadastrada
- [ ] O usuário deve poder fazer upload de um arquivo pdf com a fatura do cartão de crédito
- [ ] O usuário deve poder listar todas as cobranças cadastradas
- [ ] O usuário deve poder cadastrar uma nova cobrança
- [ ] O usuário deve poder excluir uma cobrança cadastrada
- [ ] O usuário deve poder editar uma cobrança cadastrada

## RNs (Regras de negócio)

- [x] O usuário não pode se cadastrar com um e-mail duplicado
- [x] O usuário não pode cadastrar uma despesa com um cartão de crédito inexistente

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa ser criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)
