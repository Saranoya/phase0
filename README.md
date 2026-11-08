# Tip and Split Calculator

A small command-line script, written in Node.js, that works out a restaurant bill. It takes a list of items, prints a receipt, adds a tip and shows what each person pays.

I built it in Phase 0 of my learning plan to get my JavaScript back. Below is how to run it and what I learned along the way, with lines from the code.

## Usage

Requires [Node.js](https://nodejs.org/).

```
node tip.js
```

Example output:

```
Receipt:
Burger: $12.99
Fries: $3.49
Soda: $1.99
Pricey items:
Burger: $12.99
Fries: $3.49
Price of fries:
Fries: $3.49
The 15% tip for a bill of $18.47 is $2.77.
If you split the bill among 3 people, each person should pay $7.08.
```

To change the bill, edit the `items` list, `percent` or `numPeople` in `tip.js`.

The folder also holds `hello.js`, my first script to check that Node works.

## What I learned

### Functions and `return`

A function does one job and gives back its result with `return`. Then I can use that result somewhere else:

```js
function calculateTip(bill, percent) {
    return bill * percent / 100;
}

const tip = calculateTip(foodCost, percent);
```

A function without `return` gives back `undefined`. `printLines` only prints and returns nothing, so this printed the receipt **and then** the word `undefined`:

```js
console.log(printLines(items));   // prints the lines, then "undefined"
printLines(items);                // just call it
```

Arguments are filled in **by position**, not by name. `findItem("Fries")` put `"Fries"` into `items` and left `name` empty. It has to be:

```js
findItem(items, "Fries");
```

Functions can use other functions: `calculateSplit` calls `calculateTip`, and `printReceipt` calls `printLines` twice.

### Checking input with `throw`

You can't split a bill among 0 or 2.5 people. `throw` stops the program with a clear message instead of giving a wrong answer:

```js
if (!Number.isInteger(numPeople) || numPeople <= 0) {
    throw new Error("Number of people must be a positive integer.");
}
```

### Showing money

`toFixed(2)` always shows two decimals, so `4.5` becomes `4.50`. In a template literal, `$${...}` gives a dollar sign followed by a value: the first `$` is plain text.

```js
`${item.name}: $${item.price.toFixed(2)}`   // "Burger: $12.99"
```

### Arrays of objects

The bill is an **array** of **objects**. Each object has a `name` and a `price`:

```js
const items = [
    { name: "Burger", price: 12.99 },
    { name: "Fries", price: 3.49 },
    { name: "Soda", price: 1.99 }
];
```

`items` (plural) is the whole list. `item` (singular) is one thing on it. The list has no name or price of its own, so `items.name` is `undefined`. To reach inside **one** item, use a dot: `item.name`, `item.price`.

### Array methods

All of these methods have the **same structure**. Only the method name changes:

```js
items.find(  (item) => item.name === name  )
```

- `items` is the array, and `.find` is the method.
- Everything between the method's brackets is **one** arrow function. If the brackets close too early, as in `items.find(name) => ...`, you get `SyntaxError: Malformed arrow function parameter list`.
- `(item)` is a name I choose for **one** item. The method fills it in itself, with each item in turn.
- After `=>` comes what to give back for that one item.

What comes out depends on the method:

| Method | The arrow function returns... | You get back |
|---|---|---|
| `forEach` | nothing that matters | nothing: it only does something for each item |
| `map` | something new for each item | a new array of the same length |
| `filter` | `true` or `false` | an array with only the `true` items |
| `find` | `true` or `false` | the **first** `true` item, or `undefined` |
| `reduce` | the new running total | one value |

**`reduce`** adds up the prices. It starts at `0`, and whatever each step returns becomes `total` for the next item:

```js
items.reduce((total, item) => total + item.price, 0);
```

| Item | `total` going in | Returns |
|---|---|---|
| Burger | 0 | 12.99 |
| Fries | 12.99 | 16.48 |
| Soda | 16.48 | 18.47 |

I first wrote this with `forEach` and `total +=`. With `reduce` there's no `+=`, because the arrow function only returns the new total and `reduce` passes it on.

**`map`** turns every item into a line of text:

```js
const receiptLines = items.map((item) => `${item.name}: $${item.price.toFixed(2)}`);
```

**`filter`** keeps only the items that cost more than $3. The items themselves don't change:

```js
items.filter((item) => item.price > 3)
```

**`find`** gives back **one object**, not an array. That's why I can't pass its result to `printLines`, which uses `.map`: only arrays have `.map`.

```js
const foundItem = findItem(items, "Fries");   // { name: "Fries", price: 3.49 }
```

When nothing matches, as with `"Pizza"`, `find` gives back `undefined`.

### Don't reuse a name for a parameter

This `find` never matched anything:

```js
items.find((name) => items.name === name);
```

Inside the arrow function, `name` meant the item, not `"Fries"` anymore. A parameter with the same name **hides** the outer variable. The fix is a new name:

```js
items.find((item) => item.name === name);
```

### Code runs from top to bottom

A variable has to exist before I use it, so the `items` list comes before `calculateTotal(items)`. The order of the lines is also the order of the output, so `printReceipt(items)` comes before the tip lines.

`console.log` already ends every line with a newline, so `console.log("\n")` gives **two** blank lines. `console.log()` gives one.

### Reading error messages

The first line says **what** went wrong. The lines starting with `at` show **where**, and the path the code took to get there:

```
TypeError: items.find is not a function
    at findItem (tip.js:26)
    at printReceipt (tip.js:35)
```

The errors I met:

| Error | What it meant here |
|---|---|
| `SyntaxError` | the code isn't valid JavaScript, such as brackets in the wrong place. Nothing runs |
| `ReferenceError: bill is not defined` | I renamed `bill` to `foodCost` but missed one place |
| `TypeError: items.find is not a function` | `items` was the text `"Fries"`, not an array |
| `TypeError: Cannot read properties of undefined (reading 'map')` | a function gave back `undefined`, because there was no `return` or `find` found nothing |
| `TypeError: items.map is not a function` | I passed one object where an array was expected |

When an error **changes**, that's progress: the code got further than before.

### Names

A function name says what the function **does**, often starting with a verb: `calculateTip`, `printLines`, `findItem`. A variable name says what's inside it: `foundItem` instead of `firstPricey`. In VS Code, `F2` (**Rename Symbol**) renames every use at once.

### Habits

- **Type every line myself.** I turned off Copilot's suggestions so I learn the syntax instead of accepting it.
- **Run it before you say it works**, and know what output to expect.
- **Say the line out loud**: "Go through `items`; call each one `item`; keep the one where `item.name` equals `name`."
- **Add `console.log`** to see what a variable really holds.
- **Commit after every working step.**
