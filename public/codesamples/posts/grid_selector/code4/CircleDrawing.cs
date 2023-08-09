namespace grid_selector.code4
{
    public class CircleDrawing{
        Dictionary<int, Dictionary<int, Node>> nodes;

        public List<Node> GetDrawedLine(Node center, float radius){
            HashSet<Node> tempPoint = new HashSet<Node>();

            for (int x = 0, y = (int)Math.Round(radius); y > x; x++){
                float hError = GetError(x, y, radius);
                float vError = GetError(x, y - 1, radius);

                if (hError > vError){
                    y--;
                }
                //Farklı olarak çembere en yakın nodu almak yerine çevreden, x=y doğrusu arasındaki tüm noktaları alır
                for (int i = y; i >= x; i--){ 
                    IfExistAdd(tempPoint, center.x + x, center.y + i);
                    IfExistAdd(tempPoint, center.x + i, center.y + x);
                    IfExistAdd(tempPoint, center.x + x, center.y - i);
                    IfExistAdd(tempPoint, center.x + i, center.y - x);
                    IfExistAdd(tempPoint, center.x - x, center.y - i);
                    IfExistAdd(tempPoint, center.x - i, center.y - x);
                    IfExistAdd(tempPoint, center.x - x, center.y + i);
                    IfExistAdd(tempPoint, center.x - i, center.y + x);
                }
            }
            return new List<Node>(tempPoint);
        }

        public float GetError(int x, int y, float radius)
        {
            return Math.Abs(x * x + y * y - radius * radius);
        }

        public void IfExistAdd(HashSet<Node> nodes, int x, int y)
        {
            if (this.nodes.ContainsKey(x) && this.nodes[x].ContainsKey(y))
            {
                nodes.Add(this.nodes[x][y]);
            }
        }
    }
}