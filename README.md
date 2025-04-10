# Mini TabNews API

Uma API REST simples inspirada no [TabNews](https://www.tabnews.com.br/), desenvolvida com foco educacional e para projetos pequenos. Permite a criação, leitura, atualização e exclusão de conteúdos como posts e comentários.

## 🛠 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [Prisma ORM](https://www.prisma.io/)
- [Nodemon](https://nodemon.io/) (para desenvolvimento)

## 🚀 Funcionalidades

- [x] Criar conteúdo
- [x] Listar conteúdos
- [x] Atualizar conteúdos
- [x] Deletar conteúdos
- [x] Relacionamento entre posts e comentários
- [x] Documentação pelo Fastify Swagger

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/thecaKo/mini-tabnews-api.git
cd mini-tabnews-api
```

2. Instale as dependências
```
npm install
```

3. Realize as migrations do Banco de Dados
```
npx prisma migrate dev
```

4. Inicie o servidor
```
npm run dev
```

Desenvolvido por @thecaKo

