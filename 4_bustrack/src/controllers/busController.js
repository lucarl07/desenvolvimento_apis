import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const adicionarOnibus = (req, res) => {
  const { placa, modelo, ano_fabricacao, capacidade, id_linha, id_motorista }
    = req.body;
  
  const validateBusSQL = /*sql*/ `
    SELECT * FROM onibus
    WHERE ?? = ? 
    OR ?? = ? OR ?? = ?
  `, validateBusValues = ["placa", placa, "id_linha", id_linha, "id_motorista", id_motorista]

  conn.query(validateBusSQL, validateBusValues, ($err, $data) => {
    if ($err) {
      res.status(500).json({ message: "Erro ao buscar os ônibus." });
      return console.log($err);
    }
    if ($data.length > 0) {
      return res.status(409).json({ 
        mensagem: `Um ônibus com os mesmos dados já está cadastrado no sistema.` 
      })
    }
    if (!placa || !modelo || !ano_fabricacao || !capacidade || !id_linha || !id_motorista) {
      return res.status(401)
        .json({ message: "Dados insuficientes para cadastrar o ônibus." })
    }

    const validateIdsSQL = /*sql*/ `
      SELECT * FROM linhas, motoristas
      WHERE ?? = ? OR ?? = ?
    `, validateIdsValues = [
      'linha_id', 'motorista_id',
      'linha_id', id_linha,
      'motorista_id', id_motorista
    ]

    conn.query(validateIdsSQL, validateIdsValues, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro interno ao cadastrar o ônibus." });
        return console.log(err);
      }
      if (data.length < 1) {
        return res.status(409).json({
          message: "O ID do motorista e/ou rota informada não existe(m)."
        })
      }

      const id = uuidv4();

      const insertBusSQL = /*sql*/ `
        INSERT INTO onibus (??, ??, ??, ??, ??, ??, ??)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, insertBusValues = [
        "onibus_id", "placa", "modelo", "ano_fabricacao", "capacidade", "id_linha", "id_motorista",
        id, placa, modelo, ano_fabricacao, capacidade, id_linha, id_motorista
      ];
  
      conn.query(insertBusSQL, insertBusValues, (err) => {
        if (err) {
          res.status(500).json({ message: "Erro interno ao cadastrar o ônibus." });
          return console.log(err);
        }
  
        res.status(201).json({ message: "Ônibus cadastrado com sucesso." });
      })
    })
  })
}

export const buscarOnibusPorId = (req, res) => {
  const id = req.params.id_onibus;

  const searchSQL = /*sql*/ `SELECT * FROM onibus WHERE ?? = ?`,
  searchValues = ["onibus_id", id]

  conn.query(searchSQL, searchValues, ($err, $data) => {
    if ($err) {
      res.status(500).json({ message: "Erro ao buscar o ônibus." });
      return console.log($err);
    }

    if ($data.length === 0) {
      res.status(404).json({ message: "Ônibus não encontrado." });
      return;
    }

    const onibus = $data[0]

    const getDataSQL = /*sql*/ `
      SELECT linhas.*, motoristas.* FROM onibus
      LEFT JOIN linhas ON ?? = ?
      LEFT JOIN motoristas ON ?? = ?
      WHERE ?? = ? AND ?? = ?
    `, getDataValues = [
      "linhas.linha_id", onibus.id_linha,
      "motoristas.motorista_id", onibus.id_motorista,
      "onibus.id_linha", onibus.id_linha,
      "onibus.id_motorista", onibus.id_motorista
    ]

    conn.query(getDataSQL, getDataValues, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar a linha e/ou motorista do ônibus." });
        return console.log(err);
      }

      delete onibus.id_linha;
      delete onibus.id_motorista;

      const parsedData = data[0]
      res.status(200).json({
        ...onibus,
        linha: {
          nome_linha: parsedData.nome_linha,
          numero_linha: parsedData.numero_linha,
          itinerario: parsedData.itinerario
        },
        motorista: {
          nome: parsedData.nome,
          data_nascimento: parsedData.data_nascimento,
          numero_carteira_habilitacao: parsedData.numero_carteira_habilitacao
        }
      });
    })
  })
}

export const buscarTodosOsOnibus = (req, res) => {
  const searchSQL = /*sql*/ `SELECT * FROM onibus`

  conn.query(searchSQL, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar as linhas." });
      return console.log(err);
    }

    const onibus = data
    res.status(200).json(onibus)
  })
}
