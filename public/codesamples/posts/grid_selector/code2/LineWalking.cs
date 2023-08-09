namespace grid_selector
{
    public class LineWalking{
        Dictionary<int, Dictionary<int, Node>> nodes;
        public List<Node> GetDrawedLine(Node begin, Node end){
            List<Node> result = new List<Node>();
            int dx = end.x - begin.x;
            int dy = end.y - begin.y;
            int nx = Math.Abs(dx);
            int ny = Math.Abs(dy);
            int signX = dx > 0 ? 1 : -1;
            int signY = dy > 0 ? 1 : -1;

            result.Add(begin);
            for (int ix = 0, iy = 0; ix < nx || iy < ny;){ // Döngümüz ix ve iy, nx ve ny'ye eşit olana kadar devam eder.
                if ((0.5 + ix) / nx < (0.5 + iy) / ny){ // Doğru yatay sınır ile daha önce kesişiyor.
                    ix++; // Bu döngüdeki adımımız yatayda
                }
                else{ // Doğru dikey sınır ile daha önce kesişiyor.       
                    iy++; // Bu döngüdeki adımımız dikeyde
                }
                result.Add(nodes[begin.x + ix * signX][begin.y + iy * signY]);
            }
            return result;
        }
    }
}