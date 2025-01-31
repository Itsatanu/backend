import crypto from 'crypto'

function getRandomFloat(min, max) {
    const randomBuffer = crypto.randomBytes(4); // Get 4 random bytes
    const randomValue = randomBuffer.readUInt32BE(0) / 0xFFFFFFFF; // Scale to [0, 1]
    return min + (randomValue * (max - min)); // Scale to [min, max]
}

//Get the final value for the game
function getRandomValue(winningChance, customProbability) {
    if (winningChance < 1 || winningChance > 99) {
        throw new Error('winningChance must be between 1 and 99');
    }
    if (customProbability < 0 || customProbability > 100) {
        throw new Error('customProbability must be between 0 and 100');
    }

    // Generate a random float between 0 and 100
    const randomNum = getRandomFloat(0, 100);

    if (randomNum <= customProbability) {
        return getRandomFloat(0, winningChance);
    } else {
        return getRandomFloat(winningChance, 100);
    }
}


//calculate betting ratio 
function betingPercentCalculate(accountBalance, betAmount) {
    let ratio = (betAmount * 100) / accountBalance
    return ratio.toFixed(4)
}



//calculate custom - Probability for the winings
function calculateProbabilityByBetingAmount(betingAmount) {
    if (betingAmount < 0) {
        throw new Error('betingAmount must be greater than or equal to 0');
    }
    const points = [
        { amount: 0, probability: 0.9 },
        { amount: 0.10, probability: 0.81 },
        { amount: 1, probability: 0.729 },
        { amount: 10, probability: 0.6561 },
        { amount: 100, probability: 0.59049 },
        { amount: 1000, probability: 0.531441 },
        { amount: 10000, probability: 0.4782969 },
        { amount: Infinity, probability: 0.43046721 },
    ];

    // If betingAmount exceeds the highest defined amount
    if (betingAmount >= points[points.length - 1].amount) {
        return points[points.length - 1].probability;
    }

    // Find the segment in which the betingAmount falls
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        if (betingAmount >= p1.amount && betingAmount < p2.amount) {
            // Linear interpolation
            const slope = (p2.probability - p1.probability) / (p2.amount - p1.amount);
            const customProbability = p1.probability + slope * (betingAmount - p1.amount);
            return customProbability;
        }
    }
}




//calculate custom - Probability for the winings
function calculateProbabilityByBetingPercent(betingPercent) {
    const points = [
        { percent: 0, probability: 1 },
        { percent: 10, probability: 0.9 },
        { percent: 20, probability: 0.81 },
        { percent: 30, probability: 0.729 },
        { percent: 40, probability: 0.6561 },
        { percent: 50, probability: 0.59049 },
        { percent: 60, probability: 0.531441 },
        { percent: 70, probability: 0.4782969 },
        { percent: 80, probability: 0.43046721 },
        { percent: 90, probability: 0.387420489 },
        { percent: 100, probability: 0.3486784410 },
    ];

    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        if (betingPercent >= p1.percent && betingPercent <= p2.percent) {
            // Linear interpolation
            const slope = (p2.probability - p1.probability) / (p2.percent - p1.percent);
            const customProbability =
                p1.probability + slope * (betingPercent - p1.percent);
            return customProbability;
        }
    }

    // If betingPercent is exactly 100, return the last probability
    return points[points.length - 1].probability;

}


function less10Probabality(probability, downPercent) {
    let newProbability = 0

    if (downPercent <= 0 || 100 < downPercent) {
        throw new Error("downPercent can't be more than 100 and less then or equall to 0 ")
    }

    downPercent = 1 - (downPercent / 100)

    newProbability = Math.min(probability * downPercent, probability - 10)

    if (newProbability < 0) {
        newProbability = 0
    }

    return Number(newProbability.toFixed(4))
}


function more10Probabality(probability, upPercent) {
    let newProbability = 0

    if (upPercent <= 0 || 100 < upPercent) {
        throw new Error("downPercent can't be more than 100 and less then or equall to 0 ")
    }

    upPercent = 1 + (upPercent / 100)

    newProbability = Math.max(probability * upPercent, probability + 10)

    if (newProbability > 99.99) {
        newProbability = 99.99
    }

    return Number(newProbability.toFixed(4))
}




function highManipulation(customProbability, game) {


    if (game.lose == 3) { return less10Probabality(customProbability, 50) }
    else if(game.lose == 4) { return less10Probabality(customProbability, 90) }
    else if(game.lose == 5) { return less10Probabality(customProbability, 99) }
    else if(5<game.lose && game.lose<14) { return 0 }

    else if(game.win == 0) { return more10Probabality(customProbability, 90) }
    else if(game.win == 1) { return more10Probabality(customProbability, 70) }
    else if(game.win == 2) { return more10Probabality(customProbability, 50) }
    else if(game.win == 3) { return less10Probabality(customProbability, 50) }
    else if(game.win == 4) { return less10Probabality(customProbability, 90) }
    else {return customProbability}


}




function numberCalculation(accountBalance, betAmount, winChance, game) {

    let customProbability = winChance

    let customProbabilityMultiplierByBetingAmount = calculateProbabilityByBetingAmount(betAmount)

    //multiply the probability by betAmount
    customProbability *= customProbabilityMultiplierByBetingAmount


    let betingPercent = betingPercentCalculate(accountBalance, betAmount)
    let customProbabilityMultiplierByBetingPercent = calculateProbabilityByBetingPercent(betingPercent)

    //multiply the probability by betingPercent
    customProbability *= customProbabilityMultiplierByBetingPercent


    customProbability = highManipulation(customProbability, game)

    customProbability = customProbability.toFixed(4)
    return getRandomValue(winChance, customProbability)
}


export default numberCalculation