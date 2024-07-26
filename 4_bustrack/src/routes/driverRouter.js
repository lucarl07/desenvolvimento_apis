// Dependências:
import { Router } from "express";

// Controladores:
import { 
  adicionarMotorista, 
  buscarMotoristaPeloOnibus, 
  buscarTodosOsMotoristas, 
  removerMotorista 
} from "../controllers/driverController.js";

const router = Router();

router.post("/", adicionarMotorista)
router.get("/:id_onibus", buscarMotoristaPeloOnibus)
router.delete("/:id_motorista", removerMotorista)
router.get("/", buscarTodosOsMotoristas)

export default router;