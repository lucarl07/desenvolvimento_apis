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

export const adicionarFuncionario = (req, res) => {}

export const buscarFuncionarioPorId = (req, res) => {}

export const atualizarFuncionario = (req, res) => {}

export const removerFuncionario = (req, res) => {}
