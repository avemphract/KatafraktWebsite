namespace Posts.GraphesGrids.Code3
{
    public class Connection
    {

        private readonly Node _from;
        public Node From
        {
            get { return From; }
        }
        private readonly Node _to;
        private Node To
        {
            get { return To; }
        }
        public Connection(Node from, Node to)
        {
            _from = from;
            _to = to;
        }
    }
}
