import mongoose, { Schema } from 'mongoose'
export const logsScema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    data:{
        number: {type:Number, require:true},
        betAmount: {type:Number, require:true},
        balance: {type:Number, require:true},
        winAmount:{type:Number, require:false},
        win: {type:Boolean, require:true}
    },
    gameType:{
        type:String,
        require:true
    },
    time:{
        type:Date,
        default:Date.now
    }

})


export const logsModel = mongoose.model('log', logsScema)