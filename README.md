# Orders API
Projeto desenvolvido como parte do processo seletivo da Jitterbit 

API simples em **Node.js + Express** para gerenciamento de pedidos, com integração ao banco de dados **PostgreSQL**.

## 🚀 Funcionalidades
- Criar um novo pedido (`POST /order`)
- Obter pedido por número (`GET /order/:id`)
- Listar todos os pedidos (`GET /order/list`)
- Atualizar pedido (`PUT /order/:id`)
- Deletar pedido (`DELETE /order/:id`)

## 🛠️ Tecnologias
- Node.js
- Express
- PostgreSQL
- pg (node-postgres)

## 📂 Estrutura do projeto
/orders-api
  ├── index.js
  ├── package.json
  ├── package-lock.json
  ├── README.md
  └── /db
      └── schema.sql
## ⚙️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/orders-api.git
   cd orders-api
2. Instale as dependências

## ✅ Critérios atendidos
- CRUD completo de pedidos
- Estrutura organizada e comentada
- Tratamento de erros com respostas HTTP adequadas
- Banco relacional com tabelas normalizadas
- Documentação clara no GitHub