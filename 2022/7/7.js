const fs = require("fs");


/* ======== Part one ======== */


class DirectoryList {
  constructor(data = []) {
    this.data = data;
  }

  get(path) {
    return this.data.find(dir => dir.path === path);
  }
  push(path) {
    return this.data.push(path);
  }
  map(lambda) {
    return this.data.map(lambda);
  }
}

class PathStack {
  constructor(data = []) {
    this.data = data;
  }

  get path() {
    return this.data.join('/');
  }
  
  push(path) {
    return this.data.push(path);
  }
  pop() {
    return this.data.pop();
  }
}

const input = fs.readFileSync("./input.txt").toString().trimEnd()

// the input are instructions of how to preorder-traverse the file system tree.
// this hypothesis can be pretty useful if assumed true.

const cmd_chunks = input
  .split("$ ls\n")
  .map(chunk => chunk
    .split('\n')
    .filter(line => line.startsWith('$ cd')))
  .slice(0, -1); // removes last array which is empty.

const outputs = input
  .split("$ ls\n")
  .map(chunk => chunk
    .trim()
    .split('\n')
    .filter(line => !line.startsWith('$ cd')))
  .slice(1); // removes first array which is empty.

let pwd  = new PathStack();
let dirs = new DirectoryList();

for (const [index, cmd_chunk] of cmd_chunks.entries()) {
  for (const cmd of cmd_chunk) {
    const arg = cmd.split(' ')[2];

    if (arg === "..") {
      const prev_dir_size = dirs.get(pwd.path).size;
      pwd.pop();
      dirs.get(pwd.path).size += prev_dir_size;
      // because of the hypothesis, this exists.
    } else {
      const files_size = outputs[index]
        .filter(line => !line.startsWith("dir"))
        .map(line => Number(line.split(' ')[0]))
        .reduce((accum, current) => accum + current, 0);

      pwd.push(arg);

      const new_dir = {
        path: pwd.path,
        size: files_size,
      }
      dirs.push(new_dir);
    }
  }
}

console.log(dirs
    .map(dir => dir.size)
    .filter(size => size <= 100_000)
    .reduce((accum, curr) => accum + curr, 0)
);
