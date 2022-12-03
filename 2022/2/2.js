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

function inc(n) {
  if (n >= 3) return 1;
  else return n + 1;
}

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
  return response + 6 * (response === inc(play)) + 3 * (response === play);
}

const scores_1 = encrypted_list
  .map(([a, b]) => [map_plays[a], map_plays[b]]) // maps each column
  .map(round => round_score(...round));

const total_score_1 = scores_1.reduce((prev, curr) => Number(prev) + Number(curr), 0);

console.log(total_score_1);


/* ======== Part one ======== */

// This part can be solved just by mapping the round's elements [play, game_result] 
// into the map_plays enumeration, by first mapping game_result to the appropiate response.
// Now a decrement function is needed to map a losing response.

function dec(n) {
  if (n <= 1) return 3;
  else return n - 1;
}

function map_round_response(round) {
  const play = map_plays[round[0]];
  const game_result = round[1]

  switch(game_result) {
    case 'X': return dec(play);
    case 'Y': return play;
    case 'Z': return inc(play);
  }
}

const scores_2 = encrypted_list
  .map(([a, b]) => [map_plays[a], map_round_response([a, b])]) // maps each column
  .map(round => round_score(...round));

const total_score_2 = scores_2.reduce((prev, curr) => Number(prev) + Number(curr), 0);

console.log(total_score_2);
