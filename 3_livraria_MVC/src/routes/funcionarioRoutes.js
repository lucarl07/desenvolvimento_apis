// Dependencies:
import { Router } from "express";

// Controllers:
import { buscarFuncionarios } from "../controllers/funcionariosController.js"

const router = Router();

router.get("/", buscarFuncionarios)
router.post("/")
router.get("/:id")
router.put("/:id")
router.delete("/:id")

export default router;
