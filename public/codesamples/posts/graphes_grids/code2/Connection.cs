using Posts.GraphesGrids.Code1;
namespace Posts.GraphesGrids.Code2
{
    public class Connection
    {
        private Node _from;
        public Node from
        {
            get { return from; }
        }
        public Node _to;
        public Node to
        {
            get { return to; }
        }
        public Connection(Node from, Node to)
        {
            _from = from;
            _to = to;
        }
    }
}
