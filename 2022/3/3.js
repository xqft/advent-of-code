const fs = require("fs");

/* ======== Part one ======== */


function to_priority(item) {
  const order = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return order.indexOf(item) + 1;
}

function sum(accum, current) {
  return accum + current;
}
 
const rucksacks = fs.readFileSync("./input.txt").toString().trimEnd().split('\n'); 
// trims last newline

const repeated_items = rucksacks
  .map(items => [ items.slice(0, items.length / 2), 
                  items.slice(-items.length / 2)]) // maps into array of arrays of compartments.
  .map(([left, right]) => left.split('').find(item => right.includes(item)));
  // and maps into an array of the items which are repeated in both left and right compartments.

console.log(repeated_items.map(to_priority).reduce(sum, 0));
