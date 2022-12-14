const fs = require("fs");


/* ======== Part one ======== */


const input = fs.readFileSync("./input.txt").toString().trimEnd()

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  norm() {
    return Math.max(Math.abs(this.x), Math.abs(this.y));
  }

  sum(w) {
    return new Vector(this.x + w.x, this.y + w.y);
  }

  distance(w) { // vector space of 'norm-infinite', Chebyshev distance
    return this.sum(w.multiply(-1)).norm();
  }

  multiply(k) {
    return new Vector(this.x * k, this.y * k)
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

// returns the closest adjacent cell (up, down, left, right) of w respect to v.
function closest_adjacent(v, w) {
  const cells = new Map(
    Array.from(move_vec)
    .map(([key, value]) => [value.sum(w).distance(v), value.sum(w)]));

  const min_distance = Math.min(...cells.keys())

  return cells.get(min_distance);
}

{
  let head = new Vector(0, 0);
  let tail = new Vector(0, 0);

  let visited_positions = new Set();

  for (const { dir, count } of movements) {
    for (let i = 0; i < count; i++) {
      head = head.sum(dir);

      if (head.distance(tail) > 1)
        tail = closest_adjacent(tail, head);

      visited_positions.add(make_unique(tail.x, tail.y));
    }
  }

  console.log(visited_positions.size);
}


/* ======== Part two ======== */


{
  let knots = Array(10).fill().map(_ => new Vector(0, 0));

  let visited_positions = new Set();

  for (const { dir, count } of movements) {
    for (let n = 0; n < count; n++) {
      knots[0] = knots[0].sum(dir); // head

      for (let i = 1; i <= 9; i++)
        if (knots[i].distance(knots[i - 1]) > 1)
          knots[i] = closest_adjacent(knots[i], knots[i - 1]);

      visited_positions.add(make_unique(knots[9].x, knots[9].y));
//      console.log(knots[0])
    }
  }

  console.log(visited_positions.size);
}

// i've been stuck with this for a while, second part is not giving the correct answer.
