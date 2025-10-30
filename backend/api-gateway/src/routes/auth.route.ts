import { Router } from "express";
import { proxyHelper } from "../utils/proxyHelper";
import { config } from "../config/env";

const router = Router();

router.use("/", (req, res) => proxyHelper(req, res, config.authServiceUrl));

export default router;
