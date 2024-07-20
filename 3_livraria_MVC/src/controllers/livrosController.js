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
};
