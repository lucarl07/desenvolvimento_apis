// Dependencies:
import { Router } from "express";

// Controllers:
import { adicionarFuncionario, atualizarFuncionario, buscarFuncionarioPorId, buscarFuncionarios, removerFuncionario } from "../controllers/funcionariosController.js"

const router = Router();

router.get("/", buscarFuncionarios)
router.post("/", adicionarFuncionario)
router.get("/:id", buscarFuncionarioPorId)
router.put("/:id", atualizarFuncionario)
router.delete("/:id", removerFuncionario)

export default router;
