import { Router } from "express";
import isJson from '../middlewares/isJson.middlewares.js';

import signupUser from "../controllers/signup.controllers.js";
const router = Router()

router.route("/").post(isJson,signupUser)

export default router