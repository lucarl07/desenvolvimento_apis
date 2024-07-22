import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const buscarClientes = (req, res) => {
  const SQL = /*sql*/ `SELECT * FROM clientes`;

  conn.query(SQL, (err, data) => {
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

  const verifySQL = /*sql*/ `SELECT * FROM clientes WHERE ?? = ?`
  const verifySQLData = ["email", email]

  conn.query(verifySQL, verifySQLData, (err, data) => {
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
      INSERT INTO clientes (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)
    `;
    const insertSQLData = [
      "cliente_id", "nome", "email", "senha", "imagem", 
      id, nome, email, senha, imagem
    ]

    conn.query(insertSQL, insertSQLData, (err) => {
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

  const SQL = /*sql*/ `SELECT * FROM clientes WHERE ?? = ?`
  const SQLData = ["cliente_id", id];

  conn.query(SQL, SQLData, (err, data) => {
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

export const alterarClientes = (req, res) => {
  const id = req.params.id;
  const { nome, email, senha, imagem } = req.body;
  const emailRegEx =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  if (!nome || !senha || !imagem || !email) {
    return res
      .status(401)
      .json({ message: "Dados insuficientes para atualização." });
  }

  if (!emailRegEx.test(email)) {
    return res.status(422).json({
      message:
        "O e-mail inserido não é válido. Lembre-se de utilizar o arroba (@) e pontuação adequada.",
    });
  }

  const searchSQL = /*sql*/ `
    SELECT * FROM clientes WHERE ?? = ?
  `;
  const searchSQLData = ["cliente_id", id]

  conn.query(searchSQL, searchSQLData, ($err, $data) => {
    if ($err) {
      res.status(500).json({ message: "Erro ao buscar cliente." });
      return console.error($err);
    }

    if ($data.length === 0) {
      res.status(404).json({ message: "Cliente não encontrado." });
      return;
    }

    const verifySQL = /*sql*/ `
      SELECT * FROM clientes WHERE ?? = ? AND ?? != ?
    `;
    const verifySQLData = ["email", email, "cliente_id", id]

    conn.query(verifySQL, verifySQLData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar funcionário." });
        return console.error(err);
      }

      if (data.length > 0) {
        return res
          .status(409)
          .json({ message: "O e-mail já foi utilizado em outro cadastro." });
      }

      const updateSQL = /*sql*/ `
        UPDATE clientes 
        SET ?? = ?, ?? = ?, ?? = ?, ?? = ?
        WHERE ?? = ?
      `;
      const updateSQLData = [
        "nome", nome, 
        "email", email, 
        "senha", senha, 
        "imagem", imagem, 
        "cliente_id", id
      ]

      conn.query(updateSQL, updateSQLData, (err) => {
        if (err) {
          res.status(500).json({ message: "Erro ao atualizar cliente." });
          return console.error(err);
        }

        res.status(200).json({
          message: "Cliente atualizado com sucesso!"
        });
      });
    });
  });
}
