-- Criação do banco de dados
CREATE DATABASE ordersdb;

-- Conectar ao banco antes de rodar os próximos comandos
-- \c ordersdb

-- Tabela principal de pedidos
CREATE TABLE orders (
  orderId VARCHAR(50) PRIMARY KEY,
  value NUMERIC NOT NULL,
  creationDate TIMESTAMP NOT NULL
);

-- Tabela de itens vinculada ao pedido
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  orderId VARCHAR(50) REFERENCES orders(orderId) ON DELETE CASCADE,
  productId INT NOT NULL,
  quantity INT NOT NULL,
  price NUMERIC NOT NULL
);
