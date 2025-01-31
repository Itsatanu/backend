// import crypto from 'crypto'

// function getRandomFloat(min, max) {
//     const randomBuffer = crypto.randomBytes(4); // Get 4 random bytes
//     const randomValue = randomBuffer.readUInt32BE(0) / 0xFFFFFFFF; // Scale to [0, 1]
//     return min + (randomValue * (max - min)); // Scale to [min, max]
// }

// //Get the final value for the game
// function getRandomValue(winningChance, customProbability) {
//     if (winningChance < 1 || winningChance > 99) {
//         throw new Error('winningChance must be between 1 and 99');
//     }
//     if (customProbability < 0 || customProbability > 100) {
//         throw new Error('customProbability must be between 0 and 100');
//     }

//     // Generate a random float between 0 and 100
//     const randomNum = getRandomFloat(0, 100);

//     if (randomNum <= customProbability) {
//         return getRandomFloat(0, winningChance);
//     } else {
//         return getRandomFloat(winningChance, 100);
//     }
// }


// //calculate betting ratio 
// function betingPercentCalculate(accountBalance, betAmount) {
//     let ratio = (betAmount * 100) / accountBalance
//     return ratio.toFixed(4)
// }



// //calculate custom - Probability for the winings
// function calculateProbabilityByBetingAmount(betingAmount) {
//     if (betingAmount < 0) {
//         throw new Error('betingAmount must be greater than or equal to 0');
//     }
//     const points = [
//         { amount: 0, probability: 0.9 },
//         { amount: 0.10, probability: 0.81 },
//         { amount: 1, probability: 0.729 },
//         { amount: 10, probability: 0.6561 },
//         { amount: 100, probability: 0.59049 },
//         { amount: 1000, probability: 0.531441 },
//         { amount: 10000, probability: 0.4782969 },
//         { amount: Infinity, probability: 0.43046721 },
//     ];

//     // If betingAmount exceeds the highest defined amount
//     if (betingAmount >= points[points.length - 1].amount) {
//         return points[points.length - 1].probability;
//     }

//     // Find the segment in which the betingAmount falls
//     for (let i = 0; i < points.length - 1; i++) {
//         const p1 = points[i];
//         const p2 = points[i + 1];

//         if (betingAmount >= p1.amount && betingAmount < p2.amount) {
//             // Linear interpolation
//             const slope = (p2.probability - p1.probability) / (p2.amount - p1.amount);
//             const customProbability = p1.probability + slope * (betingAmount - p1.amount);
//             return customProbability;
//         }
//     }
// }




// //calculate custom - Probability for the winings
// function calculateProbabilityByBetingPercent(betingPercent) {
//     const points = [
//         { percent: 0, probability: 1 },
//         { percent: 10, probability: 0.9 },
//         { percent: 20, probability: 0.81 },
//         { percent: 30, probability: 0.729 },
//         { percent: 40, probability: 0.6561 },
//         { percent: 50, probability: 0.59049 },
//         { percent: 60, probability: 0.531441 },
//         { percent: 70, probability: 0.4782969 },
//         { percent: 80, probability: 0.43046721 },
//         { percent: 90, probability: 0.387420489 },
//         { percent: 100, probability: 0.3486784410 },
//     ];

//     for (let i = 0; i < points.length - 1; i++) {
//         const p1 = points[i];
//         const p2 = points[i + 1];

//         if (betingPercent >= p1.percent && betingPercent <= p2.percent) {
//             // Linear interpolation
//             const slope = (p2.probability - p1.probability) / (p2.percent - p1.percent);
//             const customProbability =
//                 p1.probability + slope * (betingPercent - p1.percent);
//             return customProbability;
//         }
//     }

//     // If betingPercent is exactly 100, return the last probability
//     return points[points.length - 1].probability;

// }


// function less10Probabality(probability, downPercent) {
//     let newProbability = 0

//     if (downPercent <= 0 || 100 < downPercent) {
//         throw new Error("downPercent can't be more than 100 and less then or equall to 0 ")
//     }

//     downPercent = 1 - (downPercent / 100)

//     newProbability = Math.min(probability * downPercent, probability - 10)

//     if (newProbability < 0) {
//         newProbability = 0
//     }

//     return Number(newProbability.toFixed(4))
// }


// function more10Probabality(probability, upPercent) {
//     let newProbability = 0

//     if (upPercent <= 0 || 100 < upPercent) {
//         throw new Error("downPercent can't be more than 100 and less then or equall to 0 ")
//     }

//     upPercent = 1 + (upPercent / 100)

//     newProbability = Math.max(probability * upPercent, probability + 10)

//     if (newProbability > 99.99) {
//         newProbability = 99.99
//     }

//     return Number(newProbability.toFixed(4))
// }




// function highManipulation(customProbability, game) {


//     if (game.lose == 3) { return less10Probabality(customProbability, 50) }
//     else if(game.lose == 4) { return less10Probabality(customProbability, 90) }
//     else if(game.lose == 5) { return less10Probabality(customProbability, 99) }
//     else if(5<game.lose && game.lose<14) { return 0 }

//     else if(game.win == 0) { return more10Probabality(customProbability, 90) }
//     // else if(game.win == 1) { return more10Probabality(customProbability, 70) }
//     // else if(game.win == 2) { return more10Probabality(customProbability, 50) }
//     else if(game.win == 3) { return less10Probabality(customProbability, 50) }
//     else if(game.win == 4) { return less10Probabality(customProbability, 90) }
//     else {return customProbability}


// }




// function numberCalculation(accountBalance, betAmount, winChance, game) {

//     let customProbability = winChance

//     let customProbabilityMultiplierByBetingAmount = calculateProbabilityByBetingAmount(betAmount)

//     //multiply the probability by betAmount
//     customProbability *= customProbabilityMultiplierByBetingAmount


//     let betingPercent = betingPercentCalculate(accountBalance, betAmount)
//     let customProbabilityMultiplierByBetingPercent = calculateProbabilityByBetingPercent(betingPercent)

//     //multiply the probability by betingPercent
//     customProbability *= customProbabilityMultiplierByBetingPercent


//     customProbability = highManipulation(customProbability, game)

//     customProbability = customProbability.toFixed(4)
//     return getRandomValue(winChance, customProbability)
// }




// import calculateMultiplier from './function/calculateMultiplier.function.js';
// let game={win:0, lose:0}
// let val=50
// let balance=100
// let betAmt=1
// let pickBalance=balance
// let count={total_win:0, total_lose:0}


// for(let i=0;i<20;i++){
//     if(balance<betAmt){
        
//         console.log("You don't have enough blance to bet ")
//         console.log({balance, betAmt, val, game , i:i+1})
//         break
//     }
//     let random=numberCalculation(balance, betAmt, val, game)
//     console.log({balance, betAmt, val, game, random})

//     balance=balance - betAmt
//     if (random<=val) {
//         game.win++
//         game.lose=0
//         let winAmt= betAmt * calculateMultiplier(val) * 0.98
//         balance = balance + winAmt
//         betAmt=0.1
//         console.log('win',balance)
//         pickBalance= Math.max(pickBalance,balance)
//         count.total_win++
//     }
//     else{
//         game.lose++
//         game.win=0
//         betAmt *=2
//         console.log('lose',balance)
//         count.total_lose++
//     }
// }
// console.log({pickBalance, balance})
// console.log(count)



// console.log(numberCalculation(100,0.1, 49, game))
// console.log(more10Probabality(30,50))







// import express from 'express';
// import fetch from 'node-fetch';
// import bodyParser from 'body-parser';
// import 'dotenv/config'

// const app = express();

// // Your Telegram bot API token
// const token = process.env.BOT_API_KEY;
// const password = '123'; // Set the password for your bot

// // Store user states
// let userStates = {}; // This will hold user chatId and the current step (waiting for password)

// // Set up webhook endpoint for Telegram
// app.use(bodyParser.json());

// // Webhook URL set by Telegram
// const webhookUrl = `${process.env.WEBHOOK_URL}/webhook`;

// // Set your webhook with Telegram
// async function setWebhook() {
//   const url = `https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`;
//   await fetch(url);
//   console.log('Webhook set!');
// }

// // Set the webhook
// setWebhook();

// // Webhook to handle incoming updates from Telegram
// app.post('/webhook', async (req, res) => {
//   const update = req.body;
//   if (!update.message) {
//     res.sendStatus(200);
//     return;
//   }

//   const chatId = update.message.chat.id;
//   const message = update.message.text;

//   // Check if user is in the process of entering a password
//   if (userStates[chatId] && userStates[chatId].waitingForPassword) {
//     if (message === password) {
//       // Password is correct
//       userStates[chatId].waitingForPassword = false;
//       await sendMessage(chatId, 'Password correct! You are now logged in.');
//     } else {
//       // Password is incorrect, ask again
//       await sendMessage(chatId, 'Incorrect password. Please try again.');
//     }
//   } else if (message === '/start') {
//     // User starts the bot, begin the password process
//     userStates[chatId] = { waitingForPassword: true };
//     await sendMessage(chatId, 'Welcome! Please enter your password to continue:');
//   }

//   res.sendStatus(200);
// });

// // Helper function to send message
// async function sendMessage(chatId, text) {
//   const url = `https://api.telegram.org/bot${token}/sendMessage`;
//   const body = JSON.stringify({
//     chat_id: chatId,
//     text: text,
//   });

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: body,
//   });

//   if (!response.ok) {
//     console.log('Failed to send message', response);
//   }
// }

// app.use(express.json());
// // Start the server on port 3000 (or any other port)
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });











