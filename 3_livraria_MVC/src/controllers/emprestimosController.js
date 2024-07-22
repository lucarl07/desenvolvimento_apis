import conn from "../config/conn.js";

export const buscarEmprestimos = (req, res) => {
  const SQL = /*sql*/ `SELECT * FROM emprestimos`

  conn.query(SQL, (err, data) => {
    if (err) {
      res.status(500).json({ mensagem: "Erro ao buscar lista de empréstimos." })
      return console.log(err);
    }
    res.status(200).json(data)
  })
}

export const criarEmprestimo = (req, res) => {}

export const buscarEmprestimoPorId = (req, res) => {}

export const alterarEmprestimo = (req, res) => {}

export const removerEmprestimo = (req, res) => {}