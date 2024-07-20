// Dependencies:
import { Router } from "express";

// Controllers:
import {
  adicionarClientes,
  alterarClientes,
  buscarClientePorId,
  buscarClientes,
} from "../controllers/clientesController.js";

const router = Router();

router.get("/", buscarClientes);
router.post("/", adicionarClientes);
router.get("/:id", buscarClientePorId);
router.put("/:id", alterarClientes);

export default router;
