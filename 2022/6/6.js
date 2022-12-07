const fs = require("fs");


/* ======== Part one ======== */


const input = fs.readFileSync("./input.txt").toString().trimEnd().split('');

function check_marker(arr, size) {
  for (let i = size; i <= arr.length; i++) {
    const set = new Set(arr.slice(i - size, i));
    if (set.size === size) return i;
  }

  return NaN;
}

function check_start_of_packet(input) {
  return check_marker(input, 4); 
}

console.log(check_start_of_packet(input));


/* ======== Part two ======== */


function check_start_of_msg(input) {
  return check_marker(input, 14); 
}

console.log(check_start_of_msg(input));
