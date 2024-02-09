// implemention of floyed walsh algorithm
const N = 500;
const M = 500;
var graph = new Array(N);
for (let i = 0; i < N; i++) {
  let arr = [];
  for (let j = 0; j < M; j++) {
    arr.push(0);
  }
  graph[i] = arr;
}

function floydWarshall() {
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (graph[i][k] + graph[k][j] < graph[i][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }
    }
  }
  return graph;
}

export { floydWarshall, graph };
