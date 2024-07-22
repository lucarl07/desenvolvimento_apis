import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const buscarFuncionarios = (req, res) => {
  const sql = /*sql*/ `SELECT * FROM funcionarios`;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar funcionários." });
      return console.log(err);
    }

    res.status(200).json(data);
  });
}

export const adicionarFuncionario = (req, res) => {
  const { nome, cargo, dt_contratacao, salario, email } = req.body;

  const emailRegEx =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  if (!nome || !cargo || !dt_contratacao || !salario || !email) {
    return res.status(401).json({
      message: "Dados insuficientes para realizar o cadastro.",
    });
  }

  if (!emailRegEx.test(email)) {
    return res.status(422).json({
      message:
        "O e-mail inserido não é válido. Lembre-se de utilizar o arroba (@) e pontuação adequada.",
    });
  }

  const verifySQL = /*sql*/ `SELECT * FROM funcionarios WHERE ?? = ?`;
  const verifySQLData = ["email", email]

  conn.query(verifySQL, verifySQLData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao acessar o banco de dados." });
      return console.log(err);
    }

    if (data.length > 0) {
      return res
        .status(409)
        .json({ message: "O funcionário já está cadastrado na livraria." });
    }

    const id = uuidv4();
    
    const insertSQL = /*sql*/ `
      INSERT INTO funcionarios (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)
    `;
    const insertSQLData = [
      "funcionario_id", "nome", "cargo", "dt_contratacao", "salario", "email",
      id, nome, cargo, dt_contratacao, salario, email
    ]

    conn.query(insertSQL, insertSQLData, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro interno ao adicionar o livro." });
        return console.log(err);
      }

      res.status(201).json({ message: "Funcionário cadastrado com sucesso." });
    });
  });
}

export const buscarFuncionarioPorId = (req, res) => {
  const id = req.params.id;

  const SQL = /*sql*/ `
    SELECT * FROM funcionarios
    WHERE ?? = ?
  `;
  const SQLData = ["funcionario_id", id]

  conn.query(SQL, SQLData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar funcionário." });
      return console.log(err);
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Funcionário não encontrado." });
      return;
    }

    res.status(200).json(data[0]);
  });
}

export const atualizarFuncionario = (req, res) => {
  const id = req.params.id;
  const { nome, cargo, dt_contratacao, salario, email } = req.body;
  const emailRegEx =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  if (!nome || !cargo || !dt_contratacao || !salario || !email) {
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
    SELECT * FROM funcionarios WHERE ?? = ?
  `;
  const searchSQLData = ["funcionario_id", id]

  conn.query(searchSQL, searchSQLData, ($err, $data) => {
    if ($err) {
      res.status(500).json({ message: "Erro ao buscar funcionário." });
      return console.error($err);
    }

    if ($data.length === 0) {
      res.status(404).json({ message: "Funcionário não encontrado." });
      return;
    }

    const verifySQL = /*sql*/ `SELECT * FROM funcionarios WHERE ?? = ? AND ?? != ?`;
    const verifySQLData = ["email", email, "funcionario_id", id]

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
        UPDATE funcionarios 
        SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?
        WHERE ?? = ?
      `;
      const updateSQLData = [
        "nome", nome, 
        "cargo", cargo, 
        "dt_contratacao", dt_contratacao, 
        "salario", salario, 
        "email", email, 
        "funcionario_id", id
      ]

      conn.query(updateSQL, updateSQLData, (err) => {
        if (err) {
          res.status(500).json({ message: "Erro ao atualizar funcionário." });
          return console.error(err);
        }

        res.status(200).json({
          message: "Funcionário atualizado com sucesso",
          data: $data[0],
        });
      });
    });
  });
}

export const removerFuncionario = (req, res) => {
  const id = req.params.id;

  const SQL = /*sql*/ `DELETE FROM funcionarios WHERE ?? = ?`;
  const SQLData = ["funcionario_id", id]

  conn.query(SQL, SQLData, (err, info) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar funcionário." });
      return console.log(err);
    }

    if (info.affectedRows === 0) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    res.status(200).json({ message: "Funcionário removido com sucesso." });
  });
}
