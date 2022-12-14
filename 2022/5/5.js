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

const input_stacks = transpose(input_matrix)
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

function cratemover_9000(stacks) {
  const stacks_clone = stacks.map(stack => stack.slice());

  for (const instruction of instructions) {
    const [ count, origin_id, receiver_id ] = instruction;

    const origin    = stacks_clone[origin_id - 1];
    const receiver  = stacks_clone[receiver_id - 1];

    receiver.push(...popn(origin, count));
  }

  return stacks_clone;
}

const transformed_stacks = cratemover_9000(input_stacks);
console.log(transformed_stacks.map(stack => stack.pop()));


/* ======== Part two ======== */


function cratemover_9001(stacks) {
  const stacks_clone = stacks.map(stack => stack.slice());

  for (const instruction of instructions) {
    const [ count, origin_id, receiver_id ] = instruction;

    const origin    = stacks_clone[origin_id - 1];
    const receiver  = stacks_clone[receiver_id - 1];

    receiver.push(...popn(origin, count).reverse());
    // difference with 9000 version      ^^^^^^^^^
  }

  return stacks_clone;
}

const actual_transformed_stacks = cratemover_9001(input_stacks);
console.log(actual_transformed_stacks.map(stack => stack.pop()));

