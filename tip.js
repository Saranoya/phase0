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

function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price, 0);
}

function lines(items) {
    const receiptLines = items.map((item) => `${item.name}: $${item.price.toFixed(2)}`);
    receiptLines.forEach(line => {
        console.log(line);
    });
}

function printReceipt(items) {
    console.log("Receipt:");
    lines(items);
    console.log("Pricey items:");
    lines(items.filter((item) => item.price > 3));
}

const items = [
    { name: "Burger", price: 12.99 },
    { name: "Fries", price: 3.49 },
    { name: "Soda", price: 1.99 }
];

const foodCost = calculateTotal(items);
const percent = 15;
const numPeople = 3;
const tip = calculateTip(foodCost, percent);
const split = calculateSplit(foodCost, percent, numPeople);

printReceipt(items);
console.log(`The ${percent}% tip for a bill of $${foodCost.toFixed(2)} is $${tip.toFixed(2)}.`); 
console.log(`If you split the bill among ${numPeople} people, each person should pay $${split.toFixed(2)}.`);

