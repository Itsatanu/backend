import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../function/jwt.function.js";
import { userModel } from "../models/user.models.js";
async function auth(req, res, next) {

    const options = {
        httpOnly: true,
        secure: true
    }
    let authHeader = req.headers['authorization'];
    let token=authHeader && authHeader.replace("Bearer ","")
    let accessToken = token && token.split(',')[0];
    let refreshToken=token && token.split(',')[1];

    async function createToken(id) {
        let accessToken = generateAccessToken({ _id: id })
        let refreshToken = generateRefreshToken({ _id: id })
        return { accessToken, refreshToken }
    }

  

    async function tryRefresh() {
        try {
            let isRefreshTokenId = verifyRefreshToken(refreshToken)
            isRefreshTokenId = isRefreshTokenId._id
            let isIdValid = await userModel.findById(isRefreshTokenId)
            if (isIdValid === "") {
                res.status(400).json({ success: false, message: 'Invalid Unauthorized User' });
            }
            else {
                let { accessToken, refreshToken } = await createToken(isIdValid._id)
                isIdValid.token = refreshToken
                await isIdValid.save()
                return res.status(201)
                    .clearCookie("accessToken")
                    .clearCookie("refreshToken")
                    .cookie("accessToken", accessToken, options)
                    .cookie("refreshToken", refreshToken, options)
                    .json({ statusCode: 200, data: { accessToken: accessToken, refreshToken: refreshToken }, message: "Refresh Token sucessfull" })
            }
        }
        catch (err) {
            res.status(400).json({ success: false, message: 'Invalid Token' });
        }
    }



    try {
        if (!accessToken || !refreshToken) {
            res.status(400).json({ success: false, message: 'Unauthorized' });
        }
        else {
            let isAccessTokenId = verifyAccessToken(accessToken)
            isAccessTokenId = isAccessTokenId._id
            let userDetails = await userModel.findById(isAccessTokenId)
            if (userDetails === "") {
                res.status(400).json({ success: false, message: 'Invalid Unauthorized Token' });
            }
            else {
                req.userDetails = userDetails
                next()
            }
        }
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
             tryRefresh()        }
        else {
            res.status(400).json({ success: false, message: 'Token Invalid Error' });
        }

    }

 }

 export default auth