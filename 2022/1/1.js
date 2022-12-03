const fs = require("fs")

/* ======== Part one ======== */


// individual elves' food calories lists.
const calories_lists = fs.readFileSync("./input.txt")
  .toString()
  .split("\n\n") // split by blank lines
  .map(list => list.split("\n")); // map to array of individual calories lists for each elve.

const calories_sums = calories_lists
  .map(list => list.reduce((prev, current) => Number(prev) + Number(current), 0));

const max_calories = Math.max(...calories_sums);

console.log(max_calories);


/* ======== Part two ======== */


const sorted_calories_sum = calories_sums.sort((a, b) => b - a); // descending order
const top_three_calories = sorted_calories_sum.splice(0, 3);
const top_three_sum = top_three_calories.reduce((prev, current) => Number(prev) + Number(current), 0);

console.log(top_three_sum);
