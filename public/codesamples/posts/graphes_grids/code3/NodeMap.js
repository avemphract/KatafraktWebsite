import Node from "./Node";
import Connection from "./Conneciton";

const nodes = new Map();
let neighbours = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
let horizontalNodeCount = 10;
let verticalNodeCount = 10;

// Düğümlerin komşularını veren fonksiyon
function getNeighbour(node) {
  let result = [];
  neighbours.forEach((arr) => {
    if (nodes.has(node.y + arr[1])) {
      if (nodes.get(node.y + arr[1]).has(node.x + arr[0])) {
        result.push(nodes.get(node.y + arr[1]).get(node.x + arr[0]));
      }
    }
  });
  return result;
}

for (let i = 0; i < verticalNodeCount; i++) {
  if (!nodes.has(i)) {
    nodes.set(i, new Map());
  }
  for (let j = 0; j < horizontalNodeCount; j++) {
    nodes.get(i).set(j, new Node(i, j));
  }
}

for (let arr of nodes.values) {
  for (let node of arr) {
    for (let neighbour of getNeighbour(node)) {
      node.connections().add(new Connection(node, neighbour));
    }
  }
}
