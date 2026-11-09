// Checkpoint: reading error messages
//
// How to work:
// - Do ONE exercise at a time: remove the // in front of its code, run `node errors.js`,
//   then put the // back before you go on to the next one.
// - Don't fix anything yet, and don't look anything up.
// - For each one, tell me:
//     1. What kind of error is it? (the word before the colon)
//     2. What does the message mean, in your own words?
//     3. Which line, and which spot on that line, does it point to?
//     4. How would you fix it?

const students = [
    { name: "Amira", score: 14 },
    { name: "Bram", score: 9 },
    { name: "Chloé", score: 17 }
];

let average = 13.3;

console.log("The file has started running.");


// ===== A =====
// Meant to print the number of students.

// 1. This on throws a ReferenceError.
// 2. It means line 29 refers to a variable that was never created (student, instead of students).
// 3. Line 29, column 13.
// 4. It should be console.log(students.length);

console.log(students.length);


// ===== B =====
// Meant to print the first student's name in capitals: "AMIRA"

// 1. This one throws a TypeError.
// 2. It means JavaScript is trying to find a toUpperCase() method for a property with no value in it (undefined), instead of calling it on a string.
// 3. Line 38, column 27.
// 4. It should be console.log(students[0].name.toUpperCase());

console.log(students[0].name.toUpperCase());


// ===== C =====
// Meant to raise the average by one point.

// 1. This one throws a TypeError.
// 2. Average was declared as a constant; its value can't be changed while the script is running.
// 3. Line 49, column 9.
// 4. Fixed by using let instead of const when declaring average.

average += 1;


// ===== D =====
// Meant to print every name.
// Careful: something different happens with this one. Watch what gets printed, and what doesn't.

// 1. This one throws a SyntaxError.
// 2. The ForEach loop is missing a closing curly brace.
// 3. I don't think this error is thrown while running errors.js because it never starts running. Node itself is protesting.
// 4. Fixed by adding the missing curly brace.

students.forEach((student) => {
     console.log(student.name);
 });
