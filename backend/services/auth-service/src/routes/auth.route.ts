import { Router } from "express";
import { login, register, verifyEmail } from "../controllers/auth.controller";
import { loginValidation, registerValidation} from "../../../../shared/middlewares/validators";

const router = Router();

router.post("/login", loginValidation, login);
router.post("/register", registerValidation, register);
router.get('/verify-email', verifyEmail)

export default router;
