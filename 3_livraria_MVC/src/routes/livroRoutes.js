// Dependencies:
import { Router } from "express";

// Controllers:
import {
  buscarLivroPorId,
  buscarLivros,
  cadastrarLivro,
} from "../controllers/livrosController.js";

const router = Router();

router.get("/", buscarLivros);
router.post("/", cadastrarLivro);
router.put("/:id");
router.delete("/:id");
router.get("/:id", buscarLivroPorId);
router.get("/:nome");

export default router;
