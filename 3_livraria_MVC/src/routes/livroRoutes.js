// Dependencies:
import { Router } from "express";

// Controllers:
import {
  alterarLivro,
  buscarLivroPorId,
  buscarLivroPorNome,
  buscarLivros,
  cadastrarLivro,
  removerLivro,
} from "../controllers/livrosController.js";

const router = Router();

router.get("/", buscarLivros);
router.post("/", cadastrarLivro);
router.put("/:id", alterarLivro);
router.delete("/:id", removerLivro);
router.get("/:id", buscarLivroPorId);
router.get("/:nome", buscarLivroPorNome);

export default router;
