const fs = require("fs");

/* ======== Part one ======== */


function to_priority(item) {
  const order = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return order.indexOf(item) + 1;
}

function sum(accum, current) {
  return accum + current;
}
 
const rucksacks = fs.readFileSync("./input.txt").toString().trimEnd(); 
// trims last newline

const repeated_items = rucksacks.split('\n')
  .map(items => [ items.slice(0, items.length / 2), 
                  items.slice(-items.length / 2)]) // maps into array of arrays of compartments.
  .map(([left, right]) => left.split('').find(item => right.includes(item)));
  // and maps into an array of the items which are repeated in both left and right compartments.

console.log(repeated_items.map(to_priority).reduce(sum));


/* ======== Part two ======== */


const badges = rucksacks.split('\n')
  .reduce((accum, current, index) => {
    if (index % 3 === 0) accum.push([]);   // pushes new array that will hold the next 3 rucksacks
    accum[accum.length - 1].push(current); // pushes to the last array
    return accum;
  }, [])
  .map(group => group[0]
    .split('')
    .find(item => group[1].includes(item) && group[2].includes(item))
  );

console.log(badges.map(to_priority).reduce(sum));
