import { Router } from "express";
import isJson from '../middlewares/isJson.middlewares.js';

import loginUser from "../controllers/login.controllers.js";
const router = Router()

router.route("/").post(isJson,loginUser)

export default router