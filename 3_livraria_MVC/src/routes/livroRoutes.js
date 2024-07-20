// Dependencies:
import { Router } from "express";

// Controllers:
import { getLivros } from "../controllers/livrosController.js";

const router = Router();

router.get("/", getLivros);

export default router;
