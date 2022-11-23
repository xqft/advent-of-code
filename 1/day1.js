const input = require("./input.js");

const isGreater = (elem, index, arr) => index !== 0 && elem > arr[index-1];

const result = input
  .map(isGreater)
  .reduce((acc, elem) => acc + (elem? 1 : 0), 0);

console.log(result);
