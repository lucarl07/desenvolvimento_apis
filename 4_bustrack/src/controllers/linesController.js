import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const adicionarLinha = (req, res) => {
  const { nome_linha, numero_linha, itinerario } = req.body

  const validateLineSQL = /*sql*/ `
    SELECT * FROM linhas 
    WHERE ?? = ?
  `, validateLineValues = ["numero_linha", numero_linha]

  conn.query(validateLineSQL, validateLineValues, ($err, $data) => {
    if ($err) {
      res.status(500).json({ message: "Erro ao buscar as linhas." });
      return console.log($err);
    }
    if ($data.length > 0) {
      return req.status(409).json({ 
        mensagem: `Uma linha ${numero_linha} já está cadastrada no sistema.` 
      })
    }
    if (!nome_linha || !numero_linha || !itinerario) {
      return res.status(401)
        .json({ message: "Dados insuficientes para cadastrar a linha." })
    }

    const id = uuidv4();

    const insertLineSQL = /*sql*/ `
      INSERT INTO linhas (??, ??, ??, ??)
      VALUES (?, ?, ?, ?)
    `, insertLineValues = [
      "linha_id", "nome_linha", "numero_linha", "itinerario",
      id, nome_linha, numero_linha, itinerario
    ]

    conn.query(insertLineSQL, insertLineValues, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro interno ao cadastrar a rota." });
        return console.log(err);
      }

      res.status(201).json({ message: "Linha de ônibus cadastrada com sucesso." });
    })
  })
}

export const buscarLinhaPorId = (req, res) => {
  const id = req.params.id_linha;

  const searchSQL = /*sql*/ `SELECT * FROM linhas WHERE ?? = ?`,
  searchValues = ["linha_id", id]

  conn.query(searchSQL, searchValues, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar a linha de ônibus." });
      return console.log(err);
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Linha de ônibus não encontrada." });
      return;
    }

    res.status(200).json(data[0]);
  })
}

export const alterarLinha = (req, res) => {
  const id = req.params.id_linha;
  const { nome_linha, numero_linha, itinerario } = req.body;

  const searchSQL = /*sql*/ `SELECT * FROM linhas WHERE ?? = ?`,
  searchValues = ["linha_id", id]

  conn.query(searchSQL, searchValues, ($err, $data) => {
    if ($err) {
      res.status(500).json({ message: "Erro ao buscar a linha de ônibus." });
      return console.log(err);
    }
    if ($data.length === 0) {
      return res.status(404)
        .json({ message: "Linha de ônibus não encontrada." });
    }
    if (!nome_linha || !numero_linha || !itinerario) {
      return res.status(401)
        .json({ message: "Dados insuficientes para alterar a linha." })
    }

    const validateLineSQL = /*sql*/ `
      SELECT * FROM linhas 
      WHERE ?? = ? 
      AND ?? != ?
    `, validateLineValues = ["numero_linha", numero_linha, "linha_id", id]

    conn.query(validateLineSQL, validateLineValues, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar as linhas." });
        return console.log(err);
      }
      if (data.length > 0) {
        return req.status(409)
          .json({ mensagem: `Uma linha ${numero_linha} já está cadastrada no sistema.` })
      }

      const updateLineSQL = /*sql*/ `
        UPDATE linhas 
        SET ?? = ?, ?? = ?, ?? = ?
        WHERE ?? = ?
      `, updateLineValues = [
        "nome_linha", nome_linha, "numero_linha", numero_linha,
        "itinerario", itinerario, "linha_id", id
      ]

      conn.query(updateLineSQL, updateLineValues, (_err) => {
        if (_err) {
          res.status(500).json({ message: "Erro ao atualizar linha de ônibus." });
          return console.error(_err);
        }

        res.status(200).json({ message: "Linha atualizada com sucesso!" })
      })
    })
  })
}

export const buscarTodasAsLinhas = (req, res) => {
  const searchSQL = /*sql*/ `SELECT * FROM linhas`;

  conn.query(searchSQL, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar as linhas." });
      return console.log(err);
    }

    const linhas = data
    res.status(200).json(linhas)
  })
}