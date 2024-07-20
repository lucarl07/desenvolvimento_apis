import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const buscarClientes = (req, res) => {
  const sql = /*sql*/ `
    SELECT * FROM clientes
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar clientes." });
      return console.log(err);
    }

    res.status(200).json(data);
  });
}

export const adicionarClientes = (req, res) => {
  const { nome, email, senha, imagem } = req.body;

  const emailRegEx =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  if (!nome || !email || !senha || !imagem) {
    return res.status(401).json({
      message: "Dados insuficientes para realizar o cadastro."
    });
  }

  if (!emailRegEx.test(email)) {
    return res.status(422).json({
      message:
        "O e-mail inserido não é válido. Lembre-se de utilizar o arroba (@) e pontuação adequada."
    });
  }

  const verifySQL = /*sql*/ `
    SELECT * FROM funcionarios
    WHERE email = "${email}"
  `;

  conn.query(verifySQL, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao acessar o banco de dados." });
      return console.log(err);
    }

    if (data.length > 0) {
      return res
        .status(409)
        .json({ message: "O cliente já está cadastrado na livraria." });
    }

    const id = uuidv4();
    const insertSQL = /*sql*/ `
      INSERT INTO funcionarios (id, nome, email, senha, imagem)
      VALUES ("${id}", "${nome}", "${email}", "${senha}", "${imagem}")
    `;

    conn.query(insertSQL, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro interno ao cadastrar o cliente." });
        return console.log(err);
      }

      res.status(201).json({ message: "Cliente cadastrado com sucesso." });
    });
  });
}

export const buscarClientePorId = (req, res) => {
  const id = req.params.id;

  const sql = /*sql*/ `
    SELECT * FROM clientes
    WHERE id = "${id}"
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar cliente." });
      return console.log(err);
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Cliente não encontrado." });
      return;
    }

    res.status(200).json(data[0]);
  });
}

export const alterarClientes = (req, res) => {}
