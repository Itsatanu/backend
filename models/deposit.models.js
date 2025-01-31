import mongoose, { Schema } from 'mongoose'
export const dipositScema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    currencyTypes:{
        type:String,
        require:true
    },
    network:{
        type:String,
        require:true
    },
    walletAddress:{
        type:String,
        require:true
    },
    tnxID:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:['successful', 'pending', 'failed'],
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})



export const dipositModel = mongoose.model('diposit', dipositScema)



