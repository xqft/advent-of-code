const fs = require("fs");


/* ======== Part one ======== */


const input = fs.readFileSync("./input.txt").toString().trimEnd()

const matrix = input.split('\n').map(row => row.split('').map(Number));

function visible(matrix, row, col) {
  const sides = [
    matrix[row].slice(0, col),                  // left
    matrix[row].slice(col + 1),                 // right
    matrix.map(row => row[col]).slice(0, row),  // top
    matrix.map(row => row[col]).slice(row + 1), // bottom
  ];

  return sides.some(side => side.every(height => height < matrix[row][col]));
}

console.log(matrix
  .map((row, i) => row.filter((col, j) => visible(matrix, i, j)))
  .flat()
  .length);


/* ======== Part two ======== */


Array.prototype.endWhen = function(lambda) {
  const end = this.findIndex(lambda) + 1 || this.length;
  return this.slice(0, end);
}

Array.prototype.endWhenRight = function(lambda) {
  return this.reverse().endWhen(lambda).reverse();
}

function scenic_score(matrix, row, col) {
  const row_arr = matrix[row];
  const col_arr = matrix.map(row => row[col]);

  const taller = (height) => height >= matrix[row][col];

  const visible_sides = [
    row_arr.slice(0, col) .endWhenRight(taller),  // left
    row_arr.slice(col + 1).endWhen(taller),       // right
    col_arr.slice(0, row) .endWhenRight(taller),  // top
    col_arr.slice(row + 1).endWhen(taller),       // bottom
  ];

  return visible_sides
    .map(arr => arr.length)
    .reduce((acc, curr) => acc * curr);
}

console.log(Math.max(...matrix
  .map((row, row_index) => row.map((_, col_index) => scenic_score(matrix, row_index, col_index)))
  .flat()));
