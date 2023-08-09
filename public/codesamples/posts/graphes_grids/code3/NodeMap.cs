using System.Collections.Generic;
namespace Posts.GraphesGrids.Code3
{
    public class NodeMap
    {
        private Dictionary<int, Dictionary<int, Node>> nodes = new Dictionary<int, Dictionary<int, Node>>();
        private int[,] neighbours = new int[,] { { 0, 1 }, { 0, -1 }, { 1, 0 }, { -1, 0 } };

        // Haritayı oluşturan fonksiyon
        public void createMap(int horizontalNodeCount, int verticalNodeCount)
        {
            for (int i = 0; i < verticalNodeCount; i++)
            {
                if (!nodes.ContainsKey(i))
                {
                    nodes.Add(i, new Dictionary<int, Node>());
                }
                for (int j = 0; j < horizontalNodeCount; j++)
                {
                    nodes[i].Add(j, new Node(j, i));
                }
            }

            foreach (Dictionary<int, Node> i in nodes.Values)
            {
                foreach (Node node in i.Values)
                {
                    foreach (Node neighbour in getNeighbour(node))
                    {
                        node.Connections.Add(new Connection(node, neighbour));
                    }
                }
            }
        }

        // Düğümlerin komşularını veren fonksiyon
        public List<Node> getNeighbour(Node node)
        {
            List<Node> result = new List<Node>();
            for (int i = 0; i < neighbours.GetLength(0); i++)
            {

                if (nodes.ContainsKey(node.y + neighbours[i, 1]))
                {
                    if (nodes[node.y + neighbours[i, 1]].ContainsKey(node.x + neighbours[i, 0]))
                    {
                        result.Add(nodes[node.y + neighbours[i, 1]][node.x + neighbours[i, 0]]);
                    }
                }
            }
            return result;
        }
    }
}
