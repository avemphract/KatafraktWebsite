package posts.graphes_grids.code3;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

public class NodeMap {
  private Map<Integer, HashMap<Integer, Node>> nodes = new HashMap<>();
  private int[][] neighbours = new int[][] { { 0, 1 }, { 0, -1 }, { 1, 0 }, { -1, 0 } };

  // Haritayı oluşturan fonksiyon
  public void createMap(int horizontalNodeCount, int verticalNodeCount) {
    for (int i = 0; i < verticalNodeCount; i++) {
      if (!nodes.keySet().contains(i)) {
        nodes.put(i, new HashMap<>());
      }
      for (int j = 0; j < horizontalNodeCount; j++) {
        nodes.get(i).put(j, new Node(j, i));
      }
    }
    for (Map.Entry<Integer, HashMap<Integer, Node>> i : nodes.entrySet()) {
      for (Map.Entry<Integer, Node> node : i.getValue().entrySet()) {
        for (Node neighbour : getNeighbour(node.getValue())) {
          node.getValue().getConnections().add(new Connection(node.getValue(), neighbour));
        }
      }
    }
  }

  // Düğümlerin komşularını veren fonksiyon
  public List<Node> getNeighbour(Node node) {
    List<Node> result = new ArrayList<>();
    for (int[] arr : neighbours) {
      if (nodes.keySet().contains(node.getY() + arr[1])) {
        if (nodes.get(node.getY() + arr[1]).keySet().contains(node.getX() + arr[0])) {
          result.add(nodes.get(node.getY() + arr[1]).get(node.getX() + arr[0]));
        }
      }
    }
    return result;
  }
}
