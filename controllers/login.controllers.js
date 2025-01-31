import validator from 'validator';
import bcrypt from 'bcrypt'
import { handler } from '../utils/handler.js'
import { apiError } from '../utils/apiError.js'
import { apiResponce } from '../utils/apiResponce.js'
import { userModel } from '../models/user.models.js'
import { generateAccessToken, generateRefreshToken } from '../function/jwt.function.js';



const loginUser = handler(async (req, res) => {


    async function createToken(id) {
        let accessToken = generateAccessToken({ _id: id })
        let refreshToken = generateRefreshToken({ _id: id })
        return { accessToken, refreshToken }
    }




    let body = req.body
    let phone = body.phone
    let password = body.password


    const options = {
        httpOnly: true,
        secure: true
    }

    //handle error
    try {
        if (validator.isEmpty(phone) || validator.isEmpty(password)) {
            return res.status(400).json( new apiError(401, "Email or Password can't be empty"))
        }
        if (!validator.isMobilePhone(phone)) {
            return res.status(400).json( new apiError(402, "Enter Valid Mobile Number"))
        }
        let findPhone = await userModel.findOne({ phone: phone });
        if (findPhone === null) {
            return res.status(400).json( new apiError(409, "Not valid Mobile Number"))
        }
        else {
            try {
                if (password == findPhone.password) {
                    let { accessToken, refreshToken } = await createToken(findPhone._id)
                    findPhone.token = refreshToken
                    await findPhone.save()
                    return res.status(201)
                        .cookie("accessToken", accessToken, options)
                        .cookie("refreshToken", refreshToken, options)
                        .json(
                            new apiResponce(200, { accessToken: accessToken, refreshToken: refreshToken }, "User login Successfully")
                        )
                }
                else {
                    return res.status(500).json( new apiError(500, "Internal sarver error from login to DB"))
                }
            }
            catch (err) {
                console.log(err)
                return res.status(400).json( new apiError(400, "Password is not valid"))
            }
        }
    }
    catch (err) {
        return res.status(200).json( new apiError(201,"Invalid User"))
    }

})

export default loginUser