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
