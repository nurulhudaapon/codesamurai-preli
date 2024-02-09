// implemention of floyed walsh algorithm
const N = 500;
const M = 500;
var grid = new Array(N);
for (let i = 0; i < N; i++) {
  let arr = [];
  for (let j = 0; j < M; j++) {
    arr.push(0);
  }
  grid[i] = arr;
}
