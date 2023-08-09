namespace Posts.GraphesGrids.Code3
{
    public class Node
    {
        private int _x;
        public int x
        {
            get { return _x; }
        }
        private int _y;
        public int y
        {
            get { return _y; }
        }
        private HashSet<Connection> connections=new HashSet<Connection>();
        public HashSet<Connection> Connections
        {
            get { return connections; }
        }
        public Node(int x, int y)
        {
            _x = x;
            _y = y;
        }
    }
}
