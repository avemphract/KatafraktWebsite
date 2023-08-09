package posts.graphes_connections;

public class Connection {
  private Node from;
  private Node to;
  private float weight;

  public Connection(Node from, Node to, float weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

  public Node getFrom() {
    return from;
  }

  public Node getTo() {
    return to;
  }

  public float getWeight() {
    return weight;
  }

  public void setWeight(float weight) {
    this.weight = weight;
  }
}
