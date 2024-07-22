import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const buscarLivros = (req, res) => {
  const sql = /*sql*/ `SELECT * FROM livros`;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ mensagem: "Erro ao buscar os livros." });
      return;
    }

    const livros = data;
    res.status(200).json(livros);
  });
};

export const cadastrarLivro = (req, res) => {
  const { titulo, autor, ano_publicacao, genero, preco } = req.body;

  if (!titulo || !autor || !ano_publicacao || !genero || !preco) {
    return res
      .status(401)
      .json({ message: "Dados insuficientes para realizar o cadastro." });
  }

  const checkSQL = /*sql*/ `
    SELECT * FROM livros WHERE ?? = ? AND ?? = ? AND ?? = ?
  `;

  const checkSQLData = [
    "titulo", titulo,
    "autor", autor,
    "ano_publicacao", ano_publicacao
  ];

  conn.query(checkSQL, checkSQLData, (err, data) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Erro ao fazer uma verificação no banco de dados." });
      return console.log(err);
    }

    if (data.length > 0) {
      res.status(409).json({ message: "O livro já existe na livraria." });
      return;
    }

    const id = uuidv4();
    const disponibilidade = 1;

    const insertSQL = /*sql*/ `
      INSERT INTO livros (??, ??, ??, ??, ??, ??, ??) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const insertSQLData = [
      "livro_id", "titulo", "autor", "ano_publicacao", "genero", "preco", "disponibilidade",
      id, titulo, autor, ano_publicacao, genero, preco, disponibilidade
    ]

    conn.query(insertSQL, insertSQLData, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro interno ao adicionar o livro." });
        return console.log(err);
      }

      res.status(201).json({ message: "Livro cadastrado com sucesso." });
    });
  });
};

export const alterarLivro = (req, res) => {
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

  const sql = /*sql*/ `SELECT * FROM livros WHERE ?? = ?`
  const sqlData = ["livro_id", id];

  conn.query(sql, sqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar livro." });
      return console.error(err);
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Livro não encontrado." });
      return;
    }

    const updateSQL = /*sql*/ `
      UPDATE livros 
      SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?
      WHERE ?? = ?
    `;
    const updateSQLData = [
      "titulo", titulo, 
      "autor", autor, 
      "ano_publicacao", ano_publicacao, 
      "genero", genero, 
      "preco", preco, 
      "disponibilidade", disponibilidade,
      "livro_id", id
    ]

    conn.query(updateSQL, updateSQLData, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar livro." });
        return console.error(err);
      }

      res
        .status(200)
        .json({ message: "Livro atualizado com sucesso.", data: data[0] });
    });
  });
};

export const removerLivro = (req, res) => {
  const { id } = req.params;

  const sql = /*sql*/ `DELETE FROM livros WHERE ?? = ?`;
  const sqlData = ["livro_id", id]

  conn.query(sql, sqlData, (err, info) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar livro." });
    }

    if (info.affectedRows === 0) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    res.status(200).json({ message: "Livro removido com sucesso." });
  });
};

export const buscarLivroPorId = (req, res) => {
  const { id } = req.params;

  const sql = /*sql*/ `SELECT * FROM livros WHERE ?? = ?`;
  const sqlData = ["livro_id", id]

  conn.query(sql, sqlData, (err, data) => {
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
};

export const buscarLivroPorNome = (req, res) => {
  const { nome } = req.query;

  const sql = /*sql*/ `SELECT * FROM livros WHERE ?? LIKE ?`;
  const sqlData = ["titulo", `%${nome}%`]

  conn.query(sql, sqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar livro." });
      return console.error(err);
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Livro não encontrado." });
      return;
    }

    res.status(200).json(data);
  });
};
