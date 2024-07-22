import conn from "../config/conn.js";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";

dayjs.extend(isBetween)

export const buscarEmprestimos = (req, res) => {
  const SQL = /*sql*/ `SELECT * FROM emprestimos`;

  conn.query(SQL, (err, data) => {
    if (err) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar lista de empréstimos." });
      return console.log(err);
    }
    res.status(200).json(data);
  });
};

export const criarEmprestimo = (req, res) => {
  const { cliente_id, livro_id, data_emprestimo, data_devolucao } = req.body;

  if (!cliente_id || !livro_id || !data_emprestimo || !data_devolucao) {
    return res.status(401).json({
      message: "Dados insuficientes para criar o empréstimo.",
    });
  }

  const currentDate = dayjs(),
  leaseDate = dayjs(data_emprestimo),
  returnDate = dayjs(data_devolucao),
  maxReturnDate = returnDate.set('date', returnDate.date() + 14) // REVISAR ESTA LÓGICA!!

  if (leaseDate.isBefore(currentDate, "day")) {
    return res.status(400).json({
      message: "A data de empréstimo é anterior a data atual."
    })
  }

  if (returnDate.isBefore(leaseDate)) {
    return res.status(400).json({
      message: "A data de devolução é anterior a data de empréstimo."
    })
  }

  if (!returnDate.isBetween(leaseDate, maxReturnDate)) { // REVISAR ESTA LÓGICA!!
    return res.status(400).json({
      message: "A data de devolução é maior que 2 semanas."
    })
  }
};

export const buscarEmprestimoPorId = (req, res) => {};

export const alterarEmprestimo = (req, res) => {};

export const removerEmprestimo = (req, res) => {};
