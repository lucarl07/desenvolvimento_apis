import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

// Variáveis do ambiente (environment variables):
const PORT = process.env.PORT;

// Inicializando o Express (e permitindo o uso de JSON)
const app = express();
app.use(express.json());

// Criando a conexão com o banco de dados SQL
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
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

/* =:=:=:=:=:=:=:=:= ROTAS DE LIVROS =:=:=:=:=:=:=:=:= */

// Ver o catálogo de livros
app.get("/livros", (req, res) => {
  // Query para o banco de dados:
  const sql = /*sql*/ `SELECT * FROM livros`;
  console.log(`Query --> ${sql}`);

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar os livros." });
      return console.log(err);
    }

    const livros = data;
    res.status(200).json(livros);
  });
});

// Cadastrar um novo livro na plataforma
app.post("/livros", (req, res) => {
  const { titulo, autor, ano_publicacao, genero, preco } = req.body;

  if (!titulo || !autor || !ano_publicacao || !genero || !preco) {
    return res
      .status(401)
      .json({ message: "Dados insuficientes para realizar o cadastro." });
  }

  const checkSQL = /*sql*/ `
    SELECT * FROM livros 
    WHERE titulo = "${titulo}" 
    AND autor = "${autor}"
    AND ano_publicacao = "${ano_publicacao}"
  `;

  conn.query(checkSQL, (err, data) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Erro ao fazer uma verificação no banco de dados." });
      return console.log(err);
    }

    if (data.length > 0) {
      res.status(409).json({ message: "O livro já existe na livraria." });
      return console.log(err);
    }

    const id = uuidv4();
    const disponibilidade = 1;

    const insertSQL = /*sql*/ `
      INSERT INTO livros (id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
      VALUES ("${id}", "${titulo}", "${autor}", "${ano_publicacao}", "${genero}", "${preco}", "${disponibilidade}")
    `;

    conn.query(insertSQL, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro interno ao adicionar o livro." });
        return console.log(err);
      }

      res.status(201).json({ message: "Livro cadastrado com sucesso." });
    });
  });
});

// Listar um livro específico
app.get("/livros/:id", (req, res) => {
  const { id } = req.params;

  const sql = /*sql*/ `
    SELECT * FROM livros WHERE id = "${id}"
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar livro." });
      return console.error(err);
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Livro não encontrado." });
      return;
    }

    res.status(200).json(data[0]);
  });
});

// Atualizando um livro
app.put("/livros/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } =
    req.body;

  if (!titulo || !autor || !ano_publicacao || !genero || !preco) {
    return res
      .status(401)
      .json({ message: "Dados insuficientes para realizar o cadastro." });
  }

  if (disponibilidade === undefined) {
    return res
      .status(400)
      .json({ message: "Enviar a disponibilidade do livro é obrigatória." });
  }

  const sql = /*sql*/ `
    SELECT * FROM livros WHERE id = "${id}"
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar livro." });
      return console.error(err);
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Livro não encontrado." });
      return;
    }

    const updateSql = /*sql*/ `
      UPDATE livros SET 
      titulo = "${titulo}",
      autor = "${autor}",
      ano_publicacao = "${ano_publicacao}",
      genero = "${genero}",
      preco = "${preco}",
      disponibilidade = "${disponibilidade}"
      WHERE id = "${id}"
    `;

    conn.query(updateSql, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar livro." });
        return console.error(err);
      }

      res
        .status(200)
        .json({ message: "Livro atualizado com sucesso.", data: data[0] });
    });
  });
});

// Removendo um livro
app.delete("/livros/:id", (req, res) => {
  const { id } = req.params;

  const sql = /*sql*/ `
    DELETE FROM livros WHERE id = "${id}"
  `;

  conn.query(sql, (err, info) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar livro." });
    }

    // Para verificar as informações do query, usamos o comando:
    // --> console.log(info);

    if (info.affectedRows === 0) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    res.status(200).json({ message: "Livro removido com sucesso." });
  });
});

/* =:=:=:=:=:=:=:=:= ROTAS DE FUNCIONÁRIOS =:=:=:=:=:=:=:=:= */

// Rota 404
app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada." });
});
