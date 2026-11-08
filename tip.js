function calculateTip(bill, percent) {
    return bill * percent / 100;
}

function calculateSplit(bill, percent, numPeople) {
    if (!Number.isInteger(numPeople) || numPeople <= 0) {
        throw new Error("Number of people must be a positive integer.");
    }
    const tip = calculateTip(bill, percent);
    const total = bill + tip;
    
    return total / numPeople;
}

const bill = 48.50;
const percent = 15;
const numPeople = 3;
const tip = calculateTip(bill, percent);
const split = calculateSplit(bill, percent, numPeople);
console.log(`The ${percent}% tip for a bill of $${bill.toFixed(2)} is $${tip.toFixed(2)}.`); 
console.log(`If you split the bill among ${numPeople} people, each person should pay $${split.toFixed(2)}.`);

