// Dependencies:
import { Router } from "express";

// Controllers:
import { getLivros, postLivros } from "../controllers/livrosController.js";

const router = Router();

router.get("/", getLivros);
router.post("/", postLivros);

export default router;
