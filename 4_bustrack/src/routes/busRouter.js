// Dependências:
import { Router } from "express";

// Controladores:
import { 
  adicionarOnibus, 
  buscarOnibusPorId, 
  buscarTodosOsOnibus 
} from "../controllers/busController.js";

const router = Router();

router.post("/", adicionarOnibus)
router.get("/:id_onibus", buscarOnibusPorId)
router.get("/", buscarTodosOsOnibus)

export default router;