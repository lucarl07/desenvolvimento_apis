// Dependencies:
import { Router } from "express";

// Controllers:
import getDefaultRoute from "../controllers/defController.js";

const router = Router();

router.get("/", getDefaultRoute);

export default router;
