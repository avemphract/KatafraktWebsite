package posts.graphes_grids.code2;

import posts.graphes_grids.code1.Node;

public class Connection {
  private Node from;
  private Node to;

  public Connection(Node from, Node to) {
    this.from = from;
    this.to = to;
  }

  public Node getFrom() {
    return from;
  }

  public Node getTo() {
    return to;
  }
}
