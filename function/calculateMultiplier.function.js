function calculateMultiplier(input) {
    if (input < 1 || input > 99) {
        throw new Error("Input must be between 1 and 99.");
    }
    
    // Define breakpoints and multipliers
    const breakpoints = [
        { input: 1, multiplier: 50.0000 },
        { input: 5, multiplier: 20.0000 },
        { input: 10, multiplier: 9.9000 },
        { input: 15, multiplier: 6.6000 },
        { input: 20, multiplier: 4.9500 },
        { input: 25, multiplier: 3.9600 },
        { input: 30, multiplier: 3.3000 },
        { input: 35, multiplier: 2.8286 },
        { input: 40, multiplier: 2.4750 },
        { input: 45, multiplier: 2.2000 },
        { input: 50, multiplier: 1.9800 },
        { input: 55, multiplier: 1.8000 },
        { input: 60, multiplier: 1.6500 },
        { input: 65, multiplier: 1.5231 },
        { input: 70, multiplier: 1.4143 },
        { input: 75, multiplier: 1.3200 },
        { input: 80, multiplier: 1.2375 },
        { input: 85, multiplier: 1.1650 },
        { input: 90, multiplier: 1.1000 },
        { input: 95, multiplier: 1.0400 },
        { input: 99, multiplier: 1.0050 }
    ];
    
    // Find the segment
    for (let i = 0; i < breakpoints.length - 1; i++) {
        if (input >= breakpoints[i].input && input <= breakpoints[i + 1].input) {
            const x1 = breakpoints[i].input;
            const y1 = breakpoints[i].multiplier;
            const x2 = breakpoints[i + 1].input;
            const y2 = breakpoints[i + 1].multiplier;

            // Calculate the slope (m) and intercept (b)
            const m = (y2 - y1) / (x2 - x1);
            const b = y1 - m * x1;

            // Return the calculated multiplier
            return m * input + b;
        }
    }

    return undefined;
}

export default calculateMultiplier