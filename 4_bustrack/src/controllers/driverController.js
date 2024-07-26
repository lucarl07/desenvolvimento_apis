import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const adicionarMotorista = (req, res) => {
  const { nome, data_nascimento: dt_nasc, numero_carteira_habilitacao: num_ch } = req.body

  const validationSQL = /*sql*/ `
    SELECT * FROM motoristas
    WHERE ?? = ?
  `, validationValues = ["numero_carteira_habilitacao", num_ch]

  conn.query(validationSQL, validationValues, ($err, $data) => {
    if ($err) {
      res.status(500).json({ message: "Erro ao buscar os motoristas." });
      return console.log($err);
    }
    if ($data.length > 0) {
      return res.status(409)
        .json({ 
          mensagem: `O número da Carteira de Habilitação já está cadastrado no sistema.` 
        })
    }
    if (!nome || !dt_nasc || !num_ch) {
      return res.status(401)
        .json({ message: "Dados insuficientes para cadastrar o motorista." })
    } 
    if (num_ch.length != 9) {
      return res.status(401)
        .json({ message: "Número da Carteira de Habilitação inválido." })
    }

    const id = uuidv4();

    const insertSQL = /*sql*/ `
      INSERT INTO motoristas (??, ??, ??, ??)
      VALUES (?, ?, ?, ?)
    `, insertValues = [
      "motorista_id", "nome", "data_nascimento", 
      "numero_carteira_habilitacao",
      id, nome, dt_nasc, num_ch
    ]

    conn.query(insertSQL, insertValues, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro interno ao cadastrar o motorista." });
        return console.log(err);
      }

      res.status(201).json({ message: "Motorista cadastrado com sucesso." });
    })
  })
}

export const buscarMotoristaPorId = (req, res) => {
  const id = req.params.id_motorista;

  const searchSQL = /*sql*/ `SELECT * FROM motoristas WHERE ?? = ?`,
  searchValues = ["motorista_id", id]

  conn.query(searchSQL, searchValues, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar o motorista." });
      return console.log(err);
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Motorista não encontrado." });
      return;
    }

    res.status(200).json(data[0]);
  })
}

export const removerMotorista = (req, res) => {
  const id = req.params.id_motorista;

  const deleteFromSQL = /*sql*/ `DELETE FROM motoristas WHERE ?? = ?`,
  deleteFromValues = ["motorista_id", id]

  conn.query(deleteFromSQL, deleteFromValues, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar o motorista." });
      return console.log(err);
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Motorista não encontrado." });
      return;
    }

    res.status(200).json({ message: "Motorista removido do sistema com sucesso." });
  })
}

export const buscarTodosOsMotoristas = (req, res) => {
  const searchSQL = /*sql*/ `SELECT * FROM motoristas`;

  conn.query(searchSQL, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar os motoristas." });
      return console.log(err);
    }

    const motoristas = data
    res.status(200).json(motoristas)
  })
}