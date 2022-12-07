const fs = require("fs");


/* ======== Part one ======== */


const input = fs.readFileSync("./input.txt").toString().trimEnd().split('');

function check_marker(arr) {
  for (let i = 4; i <= arr.length; i++) {
    const set = new Set(arr.slice(i - 4, i));
    if (set.size === 4) return i;
  }

  return NaN;
}

console.log(check_marker(input));
