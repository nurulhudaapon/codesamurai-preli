var dx = [0, 0, +1, -1];
var dy = [+1, -1, 0, 0];

// This is node information of the grid
// {
//     station_id: 1,
//     arrival_time: null,
//     departure_time: "07:00",
//     fare: 0,
//  }

// var grid = new Array(N);
// for (let i = 0; i < N; i++) {
//   let arr = [];
//   for (let j = 0; j < M; j++) {
//     arr.push({
//       station_id: 1,
//       arrival_time: "07:00",
//       departure_time: "07:00",
//       fare: 0,
//     });
//   }
//   grid[i] = arr;
// }

function Dijkstra(Grid, startNode, endNode, N, M) {
  var visitedNodes = [];
  var path = [];

  var priority_queue = [];
  priority_queue.push({ fare: 0, station_id: startNode });

  //   grid[startNode.x][startNode.y].distance = 0;
  visitedNodes.push({ startNode });

  while (priority_queue.length > 0) {
    priority_queue.sort((a, b) => a.fare - b.fare);
    var top = priority_queue.shift();
    // if (top.cost !== grid[top.x][top.y].distance) continue;

    // for (let i = 0; i < 4; i++) {
    //   var x = dx[i] + top.x
    //   var y = dy[i] + top.y;
    //   if (!(x >= 0 && x < N && y >= 0 && y < M) || Grid[x][y].isWall) continue;

    //   if (x === endNode.x && y === endNode.y) {
    //     // path found
    //     visitedNodes.push({ x, y });
    //     grid[x][y].x = top.x;
    //     grid[x][y].y = top.y;
    //     var tmp = { x, y };
    //     path.push({ x: tmp.x, y: tmp.y });

    //     while (grid[tmp.x][tmp.y].x !== -1 || grid[tmp.x][tmp.y].y !== -1) {
    //       let tmpX = grid[tmp.x][tmp.y].x;
    //       let tmpY = grid[tmp.x][tmp.y].y;
    //       tmp.x = tmpX;
    //       tmp.y = tmpY;
    //       path.push({ x: tmp.x, y: tmp.y });
    //     }
    //     return { path, visitedNodes, error: "" };
    //   } else if (grid[x][y].distance > 1 + grid[top.x][top.y].distance) {
    //     grid[x][y].distance = 1 + grid[top.x][top.y].distance;
    //     grid[x][y].x = top.x;
    //     grid[x][y].y = top.y;

    //     visitedNodes.push({ x, y });
    //     priority_queue.push({ cost: grid[x][y].distance, x, y });
    //   }
    // }

    for (let i = 0; i < Grid[top.station_id].length; i++) {
      var x = Grid[top.station_id][i].station_id;
      var y = Grid[top.station_id][i].fare;
      if (x === endNode) {
        // path found
        visitedNodes.push({ x });
        path.push({ x });
        return { path, visitedNodes, error: "" };
      } else if (y > 1 + top.fare) {
        visitedNodes.push({ x });
        priority_queue.push({ fare: y, station_id: x });
      }
    }
  }
  return { path, visitedNodes, error: "path is not found" };
}

export default Dijkstra;
