import { Router } from "express";

import { coffee } from "../controllers/controller.coffee.js";

const router = Router();

router.post("/coffee", coffee);
// router.post("/amount", amountCounter);

export default router;
