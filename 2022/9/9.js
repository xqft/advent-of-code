const fs = require("fs");


/* ======== Part one ======== */


const input = fs.readFileSync("./input.txt").toString().trimEnd()

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(v, w) { // vector space of 'norm-infinite', Chebyshev distance
    return Math.max(Math.abs(v.x - w.x), Math.abs(v.y - w.y))
  }

  static sum(v, w) {
    return new Vector(v.x + w.x, v.y + w.y);
  }
}

const move_vec = new Map();

move_vec.set("L", new Vector(-1, 0));
move_vec.set("R", new Vector(1, 0));
move_vec.set("U", new Vector(0, 1));
move_vec.set("D", new Vector(0, -1));

const movements = input
  .split('\n')
  .map(move => {
    const dir   = move_vec.get(move.split(' ')[0]) 
    const count = Number      (move.split(' ')[1]);

    return {
      "dir":    dir,
      "count":  count
    }
  });

function make_unique(n, m) {
  return Number([n, m >>> 0].join(''))
}
// Takes a pair of numbers and converts them in a unique number.
// This means that no other pair, which is different than (n, m), returns the same
// from this function.
//
// The unsigned right shift (>>>) converts m into its unsigned int representation,
// eliminating its sign (this is so .join('') doesn't return a string like "14-345", which
// can't be parsed into a number).

let head = new Vector(0, 0);
let tail = new Vector(0, 0);

let visited_positions = new Set();

for (const { dir, count } of movements) {
  for (let i = 0; i < count; i++) {
    const new_head = Vector.sum(head, dir);

    if (Vector.distance(new_head, tail) > 1)
      tail = head;

    head = new_head
    visited_positions.add(make_unique(tail.x, tail.y));
  }
}

console.log(visited_positions.size);
