import mongoose, { Schema } from 'mongoose'
export const tgScema = new Schema({

    userId: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String
    },
    role: {
        type:String,
        default: 'admin'
    }
})


export const tgModel = mongoose.model('tg', tgScema)