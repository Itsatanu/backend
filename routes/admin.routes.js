import { Router } from "express";
import isJson from '../middlewares/isJson.middlewares.js';
import auth from "../middlewares/auth.middlewares.js";
import {createAdmin, getAdmin, deleteAdmin,tgWebhook, getUsersData, viewDeposit, viewWithdrawal, updateDeposit, updateWithdrawal} from '../controllers/admin.controllers.js'


const router = Router()

//super-admin routes
router.route("/create").post(isJson, createAdmin)
router.route("/admins").post(isJson, getAdmin)
router.route("/delete").delete(isJson, deleteAdmin)

//tg-webhook
router.route("/tg").post(isJson,(req,res,next)=>{console.log({resToTG:req.body}); next() }, tgWebhook)

//admin routes
router.route("/get-users").post(isJson, auth, getUsersData)
router.route("/view-deposite").post(isJson, viewDeposit)
router.route("/view-withdrawal").post(isJson, viewWithdrawal)
router.route("/update-deposit").post(isJson, updateDeposit)
router.route("/update-withdrawal").post(isJson, updateWithdrawal)

export default router