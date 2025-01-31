import validator from 'validator';
import { handler } from '../utils/handler.js'
import { apiError } from '../utils/apiError.js'
import { apiResponce } from '../utils/apiResponce.js'
import { userModel } from '../models/user.models.js';
import { tgModel } from '../models/tg.models.js';
import { sendMessage } from '../function/tg.function.js';

//global variable
const SECERATE_kEY = process.env.ADMIN_ACCESS_KEY
let userStates={}



//admin-master route
const createAdmin = handler(async (req, res) => {
    let body = req.body
    let phone = body.phone
    let password = body.password
    let referrerId = body.referrerId
    let key = body.key

    if (validator.isEmpty(phone) || validator.isEmpty(password)) {
        return res.status(400).json(new apiError(401, "Mobile Number or Password can't be empty"))
    }
    if (!validator.isMobilePhone(phone)) {
        return res.status(400).json(new apiError(402, "Enter Valid Mobile Number"))
    }
    if (phone.length !== 10) {
        return res.status(400).json(new apiError(401, "Enter Valid Mobile Number"))
    }
    if (key !== SECERATE_kEY) {
        return res.status(400).json(new apiError(401, "Enter Valid Key"))
    }

    let findPhone = await userModel.findOne({ phone: phone });
    if (findPhone !== null) {
        return res.status(400).json(new apiError(401, "User already exist"))
    }
    try {
        referrerId == phone ? referrerId = '' : ''
        const isSignup = new userModel({ phone: phone, password: password, referrerId: referrerId, referralCode: phone, role: 'admin' });
        const signupStatus = await isSignup.save();
        if (signupStatus) {

            return res.status(201)
                .json(
                    new apiResponce(200, signupStatus, "User registered Successfully")
                )
        }
    }
    catch (err) {

        return res.status(500).json(new apiError(500, "Internal server error"))
    }
})


//admin-master route
const getAdmin = handler(async (req, res) => {
    const key = req.body.key
    if (key !== SECERATE_kEY) {
        return res.status(400).json(new apiError(401, "Enter Valid Key"))
    }
    try {
        const admins = await userModel.find({ role: 'admin' })
        return res.status(200).json(new apiResponce(201, admins, "Admin List"))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiError(500, "Internal server error"))
    }
})


//admin-master route
const deleteAdmin = handler(async (req, res) => {

    let body = req.body
    let phone = body.phone
    let key = body.key

    if (validator.isEmpty(phone)) {
        return res.status(400).json(new apiError(401, "Mobile Number can't be empty"))
    }
    if (!validator.isMobilePhone(phone)) {
        return res.status(400).json(new apiError(402, "Enter Valid Mobile Number"))
    }
    if (phone.length !== 10) {
        return res.status(400).json(new apiError(401, "Enter Valid Mobile Number"))
    }
    if (key !== SECERATE_kEY) {
        return res.status(400).json(new apiError(401, "Enter Valid Key"))
    }

    try {
        const deletedUser = await userModel.findOneAndDelete({ phone });
        if (!deletedUser) {
            return res.status(400).json(new apiError(404, "User not found"));
        }

        return res.status(200).json(new apiResponce(201, deletedUser, "Delete sucessful"));
    }
    catch (err) {
        return res.status(500).json(new apiError(500, "Internal server error"))
    }

})



const tgWebhook = handler(async (req, res) => {
    const password = process.env.BOT_ACCESS_KEY
    const update = req.body;

    if (!update.message) {
        res.sendStatus(200);
        return;
    }
    const chatId = update.message.chat.id;
    const message = update.message.text;
    console.log(message)
    const Name = {
        firstName: update.message.chat.first_name || '',
        lastName: update.message.chat.last_name || '',
        userName: update.message.chat.username || ''
    }

    console.log(userStates[chatId]?.waitingForPassword)
    if (userStates[chatId]?.waitingForPassword) {
        if (message === password) {
            // Password is correct
            userStates[chatId].waitingForPassword = false;
            let tgUser = new tgModel({ userId: chatId, firstName: Name.firstName, lastName: Name.lastName, userName: Name.userName })
            let saveTGUser=await tgUser.save()
            saveTGUser ? await sendMessage(chatId, 'You are now logged in.') : await sendMessage(chatId, 'Internal error, try sometime later.');
        } else {
            // Password is incorrect, ask again
            await sendMessage(chatId, 'Incorrect password. Please try again.');
        }
    } else if (message === '/login') {
        // User starts the bot, begin the password process
        const findUserbyTelegramId = await tgModel.findOne({ userId: chatId })
        if (findUserbyTelegramId) {
            await sendMessage(chatId, 'You already login 🙂')
        }
        else {
            userStates[chatId] = { waitingForPassword: true };
            console.log(userStates[chatId]?.waitingForPassword)
            await sendMessage(chatId, 'Please enter your password :');
        }
    }

    res.sendStatus(200);
})







const getUsersData = handler(async (req, res) => {

    let body = req.body
    let phone = body.phone

    if (!validator.isMobilePhone(phone)) {
        return res.status(400).json(new apiError(402, "Enter Valid Mobile Number"))
    }
    if (phone.length !== 10) {
        return res.status(400).json(new apiError(401, "Enter Valid Mobile Number"))
    }

    //find the user
    try {
        let findUserByPhone = await userModel.findOne({ phone: phone, role: 'user' });

        if (findUserByPhone) {
            return res.status(200).json(new apiResponce(201, findUserByPhone, "User founded"))
        }
        else {
            return res.status(400).json(new apiError(404, "User not found"))
        }
    } catch (error) {
        return res.status(500).json(new apiError(500, "Internal server error"))
    }
})



const getUsersByFilter = handler(async (req, res) => {

})


const viewDeposit = handler(async (req, res) => {

})

const viewWithdrawal = handler(async (req, res) => {

})

const updateDeposit = handler(async (req, res) => {

})

const updateWithdrawal = handler(async (req, res) => {

})



export { createAdmin, getAdmin, deleteAdmin, tgWebhook, getUsersData, viewDeposit, viewWithdrawal, updateDeposit, updateWithdrawal }