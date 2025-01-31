import {Router} from 'express';
import auth from '../middlewares/auth.middlewares.js';
import isJson from '../middlewares/isJson.middlewares.js';
import {user, numberPrediction, withdrawal, deposit} from '../controllers/user.controllers.js'

const router = Router()




router.route("/").post(isJson,auth,user)
router.route("/deposit").post(isJson,deposit)
router.route('/withdrawal').post(isJson,auth,withdrawal)
router.route('/number-predection').post(isJson,auth,numberPrediction)


//webhook callback endpoint for payment conformation
//router.route("/deposit/webhook/payment-successful").post(isJson,auth)


export default router