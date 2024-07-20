import { Router } from "express";
import conn from "../config/conn.js";

const router = Router();

router.get("/livros", (req, res) => {
  const sql = /*sql*/ `SELECT * FROM livros`;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ mensagem: "Erro ao buscar os livros." });
      return;
    }

    const livros = data;
    res.status(200).json(livros);
  });
});

export default router;
