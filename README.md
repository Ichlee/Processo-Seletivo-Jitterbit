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
```text /orders-api
  ├── index.js
  ├── package.json
  ├── package-lock.json
  ├── README.md
  └── /db
      └── schema.sql
```
## ⚙️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/orders-api.git
   cd orders-api
2. Instale as dependências

3. ▶️ Executando a API:
    ```bash
    npm start
A API estará disponível em:
http://localhost:3000

4. 📘 Exemplos de requisições
 
 Criar pedido:
```bash
    curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'

```
Obter pedido por ID:
```bash
    curl http://localhost:3000/order/v10089015vdb-01
```

Listar todos os pedidos:
```bash
    curl http://localhost:3000/order/list
```

Atualizar pedido:
```bash
    curl -X PUT http://localhost:3000/order/v10089015vdb-01 \
    --header 'Content-Type: application/json' \
    --data '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 12000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
        {
      "idItem": "2434",
      "quantidadeItem": 2,
      "valorItem": 2000
    }
    ]
        }'
```

Deletar pedido:
```bash
    curl -X DELETE http://localhost:3000/order/v10089015vdb-01
```

## ✅ Critérios atendidos
- CRUD completo de pedidos
- Estrutura organizada e comentada
- Tratamento de erros com respostas HTTP adequadas
- Banco relacional com tabelas normalizadas
- Documentação clara no GitHub
