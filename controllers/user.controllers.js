import { apiResponce } from "../utils/apiResponce.js"
import { apiError } from '../utils/apiError.js'
import { handler } from "../utils/handler.js"

import numberCalculation from "../function/numberPredection.function.js"
import calculateMultiplier from "../function/calculateMultiplier.function.js"

import { userModel } from "../models/user.models.js"
import { logsModel } from "../models/logs.models.js"
import { dipositModel } from "../models/deposit.models.js"
import { withdrawalModel } from "../models/withdrawal.models.js"

//   route:' /' ---for basic user details
//   route:' /' ---for basic user details
let user = handler(async (req, res) => {
    let userDetails = req.userDetails

    let balance = userDetails.balance
    let phone = userDetails.phone
    let referralCode = userDetails.referralCode
    let referralBonus = userDetails.referralBonus
    let claimReferralBonus = userDetails.claimReferralBonus


    return res.status(201).json(
        new apiResponce(200, { balance, phone, referralCode, referralBonus, claimReferralBonus }, "User found Successfully")
    )

})


//   route:' /number-predection' ---price prediction game
//   route:' /number-predection' ---price prediction game
let numberPrediction = handler(async (req, res) => {

    let userDetails = req.userDetails
    let balance = Number(userDetails.balance)
    let game = userDetails.game
    game.win = Number(game.win)
    game.lose = Number(game.lose)


    let body = req.body
    let betAmount = Number(body.betAmount)
    let winChance = Number(body.winChance)

    if (betAmount < 0.05) {
        return res.status(400).json(new apiError(401, "Bet amount can't be less then 0.05 USDT"))
    }
    if (!winChance >= 1 && !winChance <= 99) {
        return res.status(500).json(new apiError(500, "Something  went wrong"))
    }
    if (balance < betAmount) {
        return res.status(400).json(new apiError(401, "You don't have enough balance to bet"))
    }


    try {
        let num = numberCalculation(balance, betAmount, winChance, game)
        balance = balance - betAmount
        if (num > winChance) {
            let newBalance = balance

            let newData = { balance: newBalance, "game.win": 0, "game.lose": ++game.lose }
            let amountUpdate = await userModel.findByIdAndUpdate({ _id: userDetails._id }, newData, { new: true })

            // let addLogs=new logsModel({userId:userDetails._id, data:{number:num, betAmount: betAmount, balance: amountUpdate.balance, win: false}, gameType:'number-game'})
            // await addLogs.save()

            return res.status(200).json(
                new apiResponce(201, { number: num, betAmount: betAmount, balance: amountUpdate.balance, win: false }, "lost")
            )

        }
        else {
            let winAmount = betAmount * calculateMultiplier(winChance) * 0.98
            let newBalance = balance + winAmount

            let newData = { balance: newBalance, "game.win": ++game.win, "game.lose": 0 }
            let amountUpdate = await userModel.findByIdAndUpdate({ _id: userDetails._id }, newData, { new: true })

            // let addLogs=new logsModel({userId:userDetails._id, data:{number:num, betAmount: betAmount, winAmount:winAmount, balance: amountUpdate.balance, win: true}, gameType:'number-game'})
            // await addLogs.save()

            return res.status(200).json(
                new apiResponce(201, { number: num, betAmount: betAmount, winAmount: winAmount, balance: amountUpdate.balance, win: true }, "win")
            )
        }
    }
    catch (e) {
        return res.status(500).json(new apiError(500, "Something  went wrong"))
    }

})



//   route:' /withdrawal' ---for withdrawal balance 
//   route:' /withdrawal' ---for withdrawal balance 
let withdrawal = handler(async (req, res) => {

    let userDetails = req.userDetails

    let body = req.body

    let id = userDetails._id
    let balance = userDetails.balance
    let totalWithdrawal = userDetails.totalWithdrawal
    let amount = body.amount
    let walletAddress = body.walletAddress


    if (amount < 10) {
        return res.status(400).json(new apiError(401, "Min withdrawal amount is 10 USDT"))
    }
    else if (amount > balance) {
        return res.status(400).json(new apiError(401, "Enter valid amount"))
    }

    try {
        let balanceUpdate = await userModel.findByIdAndUpdate({ _id: id }, { balance: balance - amount, totalWithdrawal: totalWithdrawal + amount }, { new: true })
        if (balanceUpdate) {
            let datas = {
                userId: id,
                currencyTypes: 'USDT',
                network: 'TRC20',
                walletAddress: walletAddress,
                amount: amount,
                status: 'pending'
            }
            let isWithdrawal = new withdrawalModel(datas)
            await isWithdrawal.save()
            return res.status(200).json(
                new apiResponce(201, { balance: balanceUpdate.balance, status: 'pending' }, "You have made successful withdrawal request")
            )
        }

    } catch (error) {
        return res.status(400).json(new apiError(500, "Internal Error"))
    }


})





//   route:' /deposit' ---for deposit balance 

//   route:' /deposit' ---for deposit balance 
let deposit= handler(async(req, res)=>{

    let userDetails = req.userDetails

    let body = req.body

    let id = userDetails._id
    let balance = userDetails.balance
    let totalWithdrawal = userDetails.totalWithdrawal
    let amount = body.amount
    let walletAddress = body.walletAddress


    if (amount < 10) {
        return res.status(400).json(new apiError(401, "Min withdrawal amount is 10 USDT"))
    }
    else if (amount > balance) {
        return res.status(400).json(new apiError(401, "Enter valid amount"))
    }

    try {
        let balanceUpdate = await userModel.findByIdAndUpdate({ _id: id }, { balance: balance - amount, totalWithdrawal: totalWithdrawal + amount }, { new: true })
        if (balanceUpdate) {
            let datas = {
                userId: id,
                currencyTypes: 'USDT',
                network: 'TRC20',
                walletAddress: walletAddress,
                amount: amount,
                status: 'pending'
            }
            let isWithdrawal = new withdrawalModel(datas)
            await isWithdrawal.save()
            return res.status(200).json(
                new apiResponce(201, { balance: balanceUpdate.balance, status: 'pending' }, "You have made successful withdrawal request")
            )
        }

    } catch (error) {
        return res.status(400).json(new apiError(500, "Internal Error"))
    }


})

export { user, numberPrediction, withdrawal, deposit }

