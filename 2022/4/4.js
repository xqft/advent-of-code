
const fs = require("fs");
const sections = fs.readFileSync("./input.txt").toString().trimEnd(); 


/* ======== Part one ======== */


const fully_contained_count = sections
  .split('\n')
  .map(pair => pair.replace(',', '-').split('-').map(Number))
  .filter(([a, b, c, d]) => (a <= c && b >= d) || (a >= c && b <= d))
  .length

console.log(fully_contained_count);
