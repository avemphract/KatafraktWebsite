package posts.graphes_grids.code1;

import java.util.HashSet;
import java.util.Set;
import posts.graphes_grids.code2.Connection;

public class Node {
  private String name;
  private Set<Connection> connections = new HashSet<>();

  public Node(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public Set<Connection> getConnections() {
    return connections;
  }
}