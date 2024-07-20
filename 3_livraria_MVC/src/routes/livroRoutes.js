// Dependencies:
import { Router } from "express";

// Controllers:
import {
  buscarLivros,
  cadastrarLivro,
} from "../controllers/livrosController.js";

const router = Router();

router.get("/", buscarLivros);
router.post("/", cadastrarLivro);
router.put("/:id");
router.delete("/:id");
router.get("/:id");
router.get("/:nome");

export default router;
