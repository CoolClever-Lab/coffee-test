import { Router } from "express";

import routerCoffee from "./routerCoffee.route.js";

const router = Router();

router.use("/", routerCoffee);

export default router;
