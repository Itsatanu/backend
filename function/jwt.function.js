import jwt from 'jsonwebtoken'
import 'dotenv/config'

export let generateAccessToken = function (id) {
    return jwt.sign(
        {
            _id: id,
        },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
        }
    )
}


export let generateRefreshToken = function (id) {
    return jwt.sign(
        {
            _id: id,
        },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
        }
    )
}



export let verifyAccessToken = (token) => {
    let decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    return decoded

}
export let verifyRefreshToken = (token) => {
    let decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    return decoded
}
