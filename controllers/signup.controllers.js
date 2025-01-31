import validator from 'validator';
import { handler } from '../utils/handler.js'
import { apiError } from '../utils/apiError.js'
import { apiResponce } from '../utils/apiResponce.js'
import { userModel } from '../models/user.models.js';

import { generateAccessToken, generateRefreshToken } from '../function/jwt.function.js';



const signupUser = handler(async (req, res) => {

    async function createToken(id) {
        let accessToken = generateAccessToken({ _id: id })
        let refreshToken = generateRefreshToken({ _id: id })
        return { accessToken, refreshToken }
    }

    let body = req.body
    let phone = body.phone
    let password = body.password
    let referrerId = body.referrerId


    const options = {
        httpOnly: true,
        secure: true
    }

    //handle error
    if (validator.isEmpty(phone) || validator.isEmpty(password)) {
        return res.status(400).json(new apiError(401, "Phone or Password can't be empty"))
    }
    if (!validator.isMobilePhone(phone)) {
        return res.status(400).json(new apiError(402, "Enter Valid Mobile Number"))
    }
    if (phone.length!==10) {
        return res.status(400).json(new apiError(401, "Enter Valid Mobile Number"))
    }
    let findPhone = await userModel.findOne({ phone: phone });
    if (findPhone !== null) {
        return res.status(400).json(new apiError(401, "User already exist"))
    }
    try {
        referrerId == phone ? referrerId = '' : ''
        const isSignup = new userModel({ phone: phone, password: password, referrerId: referrerId, referralCode: phone });
        const signupStatus = await isSignup.save();
        if (signupStatus) {
            let { accessToken, refreshToken } = await createToken(signupStatus._id)

            //update the value of 'reffreshToken'
            signupStatus.token = refreshToken
            await signupStatus.save() //{validateBeforeSave: false}

            //setupReferrer
            referrerId ? setupReferrer(referrerId, signupStatus._id) : ''

            return res.status(201)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new apiResponce(200, { accessToken: accessToken, refreshToken: refreshToken }, "User registered Successfully")
                )
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(new apiError(500, "Internal server error"))
    }
})



async function setupReferrer(referrerId, _id) {
    let referr = await userModel.findOne({ referralCode: referrerId })
    if (referr) {
        referr.referredUsers.push(_id)
        await referr.save()
    }

}
export default signupUser