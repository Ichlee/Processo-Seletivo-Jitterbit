const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());

// Configuração do banco PostgreSQL
const pool = new Pool({
  user: "postgres",       // ajuste para seu usuário
  host: "localhost",      // ou o host do seu banco
  database: "ordersdb",   // nome do banco
  password: "sua_senha",  // ajuste para sua senha
  port: 5432,
});

// Função para transformar o JSON recebido
function transformOrder(data) {
  return {
    orderId: data.numeroPedido,
    value: data.valorTotal,
    creationDate: new Date(data.dataCriacao),
    items: data.items.map(item => ({
      productId: parseInt(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
}

// Criar novo pedido
app.post("/order", async (req, res) => {
  try {
    const order = transformOrder(req.body);

    await pool.query(
      "INSERT INTO orders (orderId, value, creationDate) VALUES ($1, $2, $3)",
      [order.orderId, order.value, order.creationDate]
    );

    for (const item of order.items) {
      await pool.query(
        "INSERT INTO items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)",
        [order.orderId, item.productId, item.quantity, item.price]
      );
    }

    res.status(201).json({ message: "Pedido criado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
});

// Obter pedido por ID
app.get("/order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orderResult = await pool.query("SELECT * FROM orders WHERE orderId = $1", [id]);
    const itemsResult = await pool.query("SELECT * FROM items WHERE orderId = $1", [id]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json({
      ...orderResult.rows[0],
      items: itemsResult.rows
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedido" });
  }
});

// Listar todos os pedidos
app.get("/order/list", async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    res.json(orders.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
});

// Atualizar pedido
app.put("/order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = transformOrder(req.body);

    await pool.query(
      "UPDATE orders SET value=$1, creationDate=$2 WHERE orderId=$3",
      [order.value, order.creationDate, id]
    );

    await pool.query("DELETE FROM items WHERE orderId=$1", [id]);
    for (const item of order.items) {
      await pool.query(
        "INSERT INTO items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)",
        [id, item.productId, item.quantity, item.price]
      );
    }

    res.json({ message: "Pedido atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
});

// Deletar pedido
app.delete("/order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM items WHERE orderId=$1", [id]);
    await pool.query("DELETE FROM orders WHERE orderId=$1", [id]);
    res.json({ message: "Pedido deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
