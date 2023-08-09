namespace grid_selector.code3{
    public class RingDrawing{
        Dictionary<int, Dictionary<int, Node>> nodes;

        public List<Node> GetDrawedLine(Node center, float radius){
            HashSet<Node> tempPoint = new HashSet<Node>();

            for (int x = 0, y = (int)Math.Round(radius); y > x; x++){
                float hError = GetError(x, y, radius);// x ekseninde bir kaydırılmış noktanın çember denklemine göre hatası
                float vError = GetError(x, y - 1, radius);// x ve y ekseninde bir kaydırılmış noktanın çember denklemine göre hatası

                if (hError > vError){//Dikey hata, yatay hatadan daha büyükse
                
                    y--;//x ve y ekseninde kaydırılmış halinden devam edilir.
                }

                //Bu döngü 45 dereceye kadar noktaları verir geri kalanlar için aşağıdaki noktalarıda sonuca ekleriz
                this.IfExistAdd(tempPoint, center.x + x, center.y + y);
                this.IfExistAdd(tempPoint, center.x + y, center.y + x);
                this.IfExistAdd(tempPoint, center.x + x, center.y - y);
                this.IfExistAdd(tempPoint, center.x + y, center.y - x);
                this.IfExistAdd(tempPoint, center.x - x, center.y - y);
                this.IfExistAdd(tempPoint, center.x - y, center.y - x);
                this.IfExistAdd(tempPoint, center.x - x, center.y + y);
                this.IfExistAdd(tempPoint, center.x - y, center.y + x);
            }
            return new List<Node>(tempPoint);
        }

        //Çemberin matematiksel denklemine göre hata miktarını hesaplama
        public float GetError(int x, int y, float radius){
            return Math.Abs(x * x + y * y - radius * radius);
        }

        //Eğer haritada böyle bir nod varsa sonuca ekleme fonksiyonu
        public void IfExistAdd(HashSet<Node> nodes, int x, int y){
            if (this.nodes.ContainsKey(x) && this.nodes[x].ContainsKey(y)){
                nodes.Add(this.nodes[x][y]);
            }
        }
    }
}