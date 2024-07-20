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

export const adicionarClientes = (req, res) => {}

export const buscarClientePorId = (req, res) => {}

export const alterarClientes = (req, res) => {}
