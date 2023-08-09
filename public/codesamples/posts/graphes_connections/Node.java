package posts.graphes_connections;

import java.util.Set;
import java.util.HashSet;

public class Node {
  private int x;
  private int y;
  private Set<Connection> connections = new HashSet<>();

  public Node(int x, int y) {
    this.x = x;
    this.y = y;
  }

  public int getX() {
    return x;
  }

  public int getY() {
    return y;
  }

  public Set<Connection> getConnections() {
    return connections;
  }
}
