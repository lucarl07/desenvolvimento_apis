// Dependências:
import { Router } from "express";

// Controladores:
import { 
  adicionarMotorista, 
  buscarMotoristaPorId, 
  buscarTodosOsMotoristas, 
  removerMotorista 
} from "../controllers/driverController.js";

const router = Router();

router.post("/", adicionarMotorista)
router.get("/:id_motorista", buscarMotoristaPorId)
router.delete("/:id_motorista", removerMotorista)
router.get("/", buscarTodosOsMotoristas)

export default router;