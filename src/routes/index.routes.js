import { Router } from "express";
import userRouter from "./user.routes.js";
import serviceRouter from "./service.routes.js";

const router = Router()

router.use(userRouter);
router.use(serviceRouter)

export default router;
