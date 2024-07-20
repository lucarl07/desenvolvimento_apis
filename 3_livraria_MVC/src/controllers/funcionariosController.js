import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const buscarFuncionarios = (req, res) => {
  const sql = /*sql*/ `
    SELECT * FROM funcionarios
  `;

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
        .json({ message: "O funcionário já está cadastrado na livraria." });
    }

    const id = uuidv4();
    const insertSQL = /*sql*/ `
      INSERT INTO funcionarios (id, nome, cargo, dt_contratacao, salario, email)
      VALUES ("${id}", "${nome}", "${cargo}", "${dt_contratacao}", "${salario}", "${email}")
    `;

    conn.query(insertSQL, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro interno ao adicionar o livro." });
        return console.log(err);
      }

      res.status(201).json({ message: "Funcionário cadastrado com sucesso." });
    });
  });
}

export const buscarFuncionarioPorId = (req, res) => {}

export const atualizarFuncionario = (req, res) => {}

export const removerFuncionario = (req, res) => {}
