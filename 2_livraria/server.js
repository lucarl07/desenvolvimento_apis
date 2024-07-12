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
  console.log("[Banco de dados conectado com sucesso.]");

  app.listen(PORT, () => {
    console.log(`Bem-vindo à Livraria API! \nServidor on PORT: ${PORT} 🚀 \n`);
  });
});

// Ver o catálogo de livros
app.get("/livros", (req, res) => {
  // Query para o banco de dados:
  const sql = "SELECT * FROM livros";
  console.log(`Query --> ${sql}`);

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar os livros." });
      return console.log(err);
    }

    const livros = data;
    // console.log(data);
    // console.log(typeof data);
    res.status(200).json(livros);
  });
});

// Cadastrar um novo livro na plataforma
app.post("/livros", (req, res) => {
  const { titulo, autor, ano_publicacao, genero, preco } = req.body;

  if (!titulo || !autor || !ano_publicacao || !genero || !preco) {
    res
      .status(401)
      .json({ message: "Dados insuficientes para realizar o cadastro." });
  }

  const checkSql = `SELECT * FROM livros 
    WHERE titulo = "${titulo}" 
    AND autor = "${autor}"
    AND ano_publicacao = "${ano_publicacao}"`;

  conn.query(checkSql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar os livros." });
      return console.log(err);
    }

    if (data.length > 0) {
      res.status(409).json({ message: "O livro já existe na livraria." });
      return console.log(err);
    }
  });
});

// Rota 404
app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada." });
});
