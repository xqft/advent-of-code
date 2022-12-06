const fs = require("fs");


/* ======== Part one ======== */


/* Input parsing (holy this was hard) */

function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

const input = fs.readFileSync("./input.txt").toString().trimEnd()
  .split('\n\n');

const input_matrix = input[0]
  .split('\n')
  .slice(0, -1)                   // remove number line
  .map(line => line
    .match(/.{1,4}/g)             // match every 4 characters, "[M] " por example
    .map(char => char.charAt(1))  // select only the letter (second char)
  );

const stacks = transpose(input_matrix)
  .map(row => row.filter(elem => elem.match(/[A-Z]/)).reverse());
  // empty slots get filtered and arrays reversed so LIFO is possible.

const instructions = input[1]
  .split('\n')
  .map(line => line.match(/\d+/g).map(Number));

/* Crane movements */

function popn(array, n) {
  let result = [];
  for (let i = 0; i < n; i++)
    result.push(array.pop());

  return result;
}

for (const instruction of instructions) {
  const [ count, origin_id, receiver_id ] = instruction;

  const origin    = stacks[origin_id - 1];
  const receiver  = stacks[receiver_id - 1];

  receiver.push(...popn(origin, count));
}

console.log(stacks.map(stack => stack.pop()));
