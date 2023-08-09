
using System.Collections.Generic;
using Posts.GraphesGrids.Code2;
namespace Posts.GraphesGrids.Code1
{
    public class Node
    {
        public string _name;
        private string Name
        {
            get { return Name; }
        }
        private readonly HashSet<Connection> _connections = new HashSet<Connection>();
        public HashSet<Connection> Connections
        {
            get { return _connections; }
        }
        public Node(string name)
        {
            _name = name;
        }
    }
}
