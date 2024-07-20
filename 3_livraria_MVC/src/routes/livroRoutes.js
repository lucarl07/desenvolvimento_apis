// Dependencies:
import { Router } from "express";

// Controllers:
import { getLivros, postLivros } from "../controllers/livrosController.js";

const router = Router();

router.get("/", getLivros);
router.post("/", postLivros);
router.put("/:id");
router.delete("/:id");
router.get("/:id");
router.get("/:nome");

export default router;
