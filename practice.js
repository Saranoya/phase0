// Practice: map, filter, find and reduce
//
// How to work:
// - Type every answer yourself, under the exercise, and print it with console.log.
// - Run `node practice.js` after EVERY exercise, and compare with "Expected".
// - Before you type, say the line in words first:
//   "Go through ___; call each one ___; give back ___."
//
// The structure is always the same:
//   array.method((oneItem) => what to give back for that one item)
//   reduce has one extra part:  array.reduce((total, oneItem) => new total, startValue)

const numbers = [4, 8, 15, 16, 23, 42];

const students = [
    { name: "Amira", score: 14, group: "A" },
    { name: "Bram", score: 9, group: "B" },
    { name: "Chloé", score: 17, group: "A" },
    { name: "Daan", score: 11, group: "B" },
    { name: "Elif", score: 8, group: "A" }
];


// ===== Round 1: plain numbers (one method each) =====

// 1. map: multiply every number by 10.
// Expected: [ 40, 80, 150, 160, 230, 420 ]

console.log(numbers.map((number) => number * 10));


// 2. filter: keep only the even numbers.
// Hint: a number is even when  n % 2 === 0
// Expected: [ 4, 8, 16, 42 ]

console.log(numbers.filter((number) => number%2 === 0));


// 3. find: the first number bigger than 20.
// Expected: 23   (one number, no brackets)

console.log(numbers.find((number) => number > 20));

// 4. reduce: add up all the numbers.
// Expected: 108

console.log(numbers.reduce((total, number) => total + number, 0));

// ===== Round 2: objects (remember: items vs. item) =====

// 5. map: an array with only the students' names.
// Expected: [ 'Amira', 'Bram', 'Chloé', 'Daan', 'Elif' ]

console.log(students.map((student) => student.name));

// 6. map: a line of text for each student, like "Amira: 14/20".
// Expected: [ 'Amira: 14/20', 'Bram: 9/20', 'Chloé: 17/20', 'Daan: 11/20', 'Elif: 8/20' ]
// (Node may print this over several lines; that's fine.)

console.log(students.map((student) => `${student.name}: ${student.score}/20`));

// 7. filter: the students in group "A".
// Expected: 3 objects: Amira, Chloé and Elif

console.log(students.filter((student) => student.group === "A"));

// 8. find: the student named "Daan".
// Expected: { name: 'Daan', score: 11, group: 'B' }
// Then try "Zoë". What do you get, and why?

console.log(students.find((student) => student.name === "Daan"));
// console.log(students.find((student) => student.name === "Zoë")); 
// Will return undefined, since there is no Zoë?

// 9. reduce: the total of all scores.
// Expected: 59

console.log(students.reduce((total, student) => total + student.score, 0));

// ===== Round 3: fix the line =====
// Each line below has a mistake. Read it, predict the error or wrong result,
// then remove the // in front, run it, and fix it.

// 10. Should give: [ 14, 9, 17, 11, 8 ]
console.log(students.map((student) => student.score));

// 11. Should give: { name: 'Bram', score: 9, group: 'B' }
const name = "Bram";
console.log(students.find((student) => student.name === name));

// 12. Should give: 59
console.log(students.reduce((total, student) => total + student.score, 0));

// ===== Round 4: two steps =====

// 13. The names of the students who passed (score of 10 or more).
// Hint: first filter, then map. You can put the filter's result in a variable first.
// Expected: [ 'Amira', 'Chloé', 'Daan' ]

const passed = students.filter((student) => student.score >= 10);
console.log(passed.map((student) => student.name));

// 14. The class average, with one decimal.
// Hint: the total from exercise 9, divided by the number of students (students.length).
// Expected: 11.8

const total = students.reduce((total, student) => total + student.score, 0);
const average = total / students.length;
console.log(average.toFixed(1));

// 15. How many students are in group "B"?
// Hint: filter gives back an array, and every array has a .length
// Expected: 2

console.log(students.filter((student) => student.group === "B").length);
