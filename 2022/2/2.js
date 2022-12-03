const fs = require("fs");
const encrypted_list = fs.readFileSync("./input.txt").toString().trimEnd() // trims last newline
  .split('\n')
  .map(round => round.split(' '));

/* ======== Part one ======== */


// The idea is to establish a relationship between the characters.
//
// If a play is greater than another, then it wins.
// If a play is equal to another, then it's a draw.
// else it's a loss.
//
// If we represent rock, paper and scissors as 1, 2 and 3, then 3
// needs to be lesser than 1 (rock wins to scissors).
// This can be managed by making an increment function, which
// overflows in 3 and starts in 1.

function wins(n) {
  if (n >= 3) return 1;
  else return n + 1;
}
// we alias the increment function "wins" for readability.

const map_plays = {
  'A': 1, // rock
  'B': 2, // paper
  'C': 3,  // scissors

  'X': 1, // rock
  'Y': 2, // paper
  'Z': 3  // scissors
}
// note that the mapping also matches with each play's score.

function round_score(play, response) {
  return response + 6 * (response === wins(play)) + 3 * (response === play);
}

const scores = encrypted_list
  .map(([a, b]) => [map_plays[a], map_plays[b]]) // maps each column
  .map(round => round_score(...round));

const total_score = scores.reduce((prev, curr) => Number(prev) + Number(curr), 0);

console.log(total_score);
