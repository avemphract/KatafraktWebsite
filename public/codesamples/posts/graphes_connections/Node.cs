namespace Posts.GrahpesConnections
{
    public class Node
    {
        private int _x;
        private int x
        {
            get { return _x; }
        }
        private int _y;
        private int y
        {
            get { return _y; }
        }
        private HashSet<Connection> _connections = new HashSet<Connection>();
        public HashSet<Connection> connections
        {
            get { return _connections; }
        }
        public Node(int x, int y)
        {
            _x = x;
            _y = y;
        }
    }
}