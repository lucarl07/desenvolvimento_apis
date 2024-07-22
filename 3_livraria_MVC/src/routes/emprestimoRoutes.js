// Dependencies:
import { Router } from "express";

// Controllers:
import {
  criarEmprestimo,
  alterarEmprestimo,
  buscarEmprestimoPorId,
  buscarEmprestimos,
  removerEmprestimo,
} from "../controllers/emprestimosController.js";

const router = Router();

router.get("/", buscarEmprestimos);
router.post("/", criarEmprestimo);
router.get("/:id", buscarEmprestimoPorId);
router.put("/:id", alterarEmprestimo);
router.delete("/:id", removerEmprestimo);

export default router;
