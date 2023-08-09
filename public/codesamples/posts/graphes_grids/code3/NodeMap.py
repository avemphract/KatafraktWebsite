from Node import Node;
from Connection import Connection;

nodes = dict()
neighbours = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]
horizontalNodeCount = 10
verticalNodeCount = 10

def getNeigboor(node):
  result = []
  for arr in neighbours:
    if nodes in arr[1]+node.y:
      if nodes[arr[1]+node.y] in arr[0]+node.x:
        result.append(nodes[arr[1]+node.y][arr[0]+node.x])
  return result

for i in range(verticalNodeCount):
  if not (nodes in i):
    nodes[i]=dict()
  for j in range(horizontalNodeCount):
    nodes[i][j]=Node(j,i)

for item in nodes.values():
  for node in item.values():
    for neigboor in getNeigboor(node):
      node.connections.add(Connection(node,neigboor))