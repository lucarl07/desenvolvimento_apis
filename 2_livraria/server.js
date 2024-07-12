import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

// Variáveis do ambiente (environment variables):
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// Criando a conexão com o banco de dados SQL
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_DB_PASSWORD,
  database: "livraria",
  port: "3306",
});

// Conectando ao banco de dados
conn.connect((err) => {
  if (err) {
    return console.log(err.stack);
  }

  console.clear();
  console.log("[Conectado ao banco de dados com êxito...]");

  app.listen(PORT, () => {
    console.log(`Bem-vindo à Livraria API! \nServidor on PORT: ${PORT} 🚀 \n`);
  });
});

// Rota 404
app.use((request, response) => {
  response.status(404).json({ mensagem: "Rota não encontrada." });
});
