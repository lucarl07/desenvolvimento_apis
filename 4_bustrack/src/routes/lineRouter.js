// Dependências:
import { Router } from "express";

// Controladores:
import {
  adicionarLinha,
  alterarLinha,
  buscarLinhaPorId,
  buscarTodasAsLinhas,
} from "../controllers/linesController.js";

const router = Router();

router.post("/", adicionarLinha);
router.get("/:id_linha", buscarLinhaPorId);
router.put("/:id_linha", alterarLinha);
router.get("/", buscarTodasAsLinhas);

export default router;
