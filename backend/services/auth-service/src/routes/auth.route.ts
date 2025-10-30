import { Router } from "express";
import { login } from "../controllers/login.controller";
import { loginValidation } from "../../../../shared/middlewares/validators";

const router = Router();

router.post("/login", loginValidation, login);

export default router;
