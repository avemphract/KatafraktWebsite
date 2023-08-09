namespace Posts.GrahpesConnections
{
  public class Connection
  {
    private readonly Node _from;
    public Node From {
      get { return _from; }
    }
    private readonly Node _to;
    public Node to
    {
      get { return to; }
    }
    private float _weight;
    public float Weight
    {
      get { return _weight; }
      set { _weight = value; }
    }
    public Connection(Node from, Node to, float weight)
    {
      this._from = from;
      this._to = to;
      this._weight = weight;
    }
  }
}