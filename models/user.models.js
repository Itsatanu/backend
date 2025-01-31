import mongoose, { Schema } from 'mongoose'
export const userScema = new Schema({

    //auth 
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role:{
        type:String,
        default:'user'
    },
    referralCode: {
        type: String,
        require: true,
        unique: true
    },
    referrerId: {
        type: String,
        require: true
    },
    token: {
        type: String,
        default: ''
    },


    //referr and earn
    referredUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    referralBonus: {
        type: Number,
        default: 0
    },
    claimReferralBonus:{
        type:Number,
        default:0
    },

    //balance
    balance: {
        type: Number,
        default: 0
    },
    game: {
        win: {type: Number, default: 0},
        lose: {type: Number, default: 0}
    },

    //diposite
    totalRecharge: {
        type: Number,
        default: 0
    },
    rechargeBonus: {
        type: Number,
        default: 0
    },
    noOfRecharge: {
        type: Number,
        default: 0
    },

    //withdrawal
    totalWithdrawal: {
        type: Number,
        default: 0
    },

    //ip - tracking
    ipAddress: {
        type: String
    },
})





export const userModel = mongoose.model('user', userScema)



