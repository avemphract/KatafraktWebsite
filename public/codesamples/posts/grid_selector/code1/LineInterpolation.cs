namespace grid_selector
{
    public class LineInterpolation{
        Dictionary<int, Dictionary<int, Node>> nodes;//Nodlarımızın bulunduğu harita.
        //Oluşturulmasını anlattığım Graftlardan Gridlere yazısını okuyabilirsiniz
        public List<Node> GetDrawedLine(Node begin, Node end){
            List<Node> result = new List<Node>();
            int dx = end.x - begin.x;//Doğru parçasının x ekseninin uzunluğu negatif olabilir.
            int dy = end.y - begin.y;//Doğru parçasının y ekseninin uzunluğu negatif olabilir.

            int nmax = Math.Max(Math.Abs(dx), Math.Abs(dy));//x ve y eksenine göre olan mutlak uzunlukluklardan uzun olanın seçimi

            for (int i = 0; i <= nmax && nmax != 0; i++){
                int x = begin.x + dx / nmax * i;//İnterpolasyonla oluşturulan noktanın x'i
                int y = begin.y + dy / nmax * i;//İnterpolasyonla oluşturulan noktanın y'si
                if (nodes[x] != null && nodes[x][y] != null){//Oluşturulan nokta haritada mevcut mu?
                    result.Add(nodes[x][y]);//Mevcutsa sonuca ekleriz
                }
            }
            if (nmax == 0){//Oluşturulan noktanın başlangıcı ve bitişi aynı ise
                result.Add(begin);//Başlangıç noktası sonuca eklenir
            }

            return result;
        }
    }

    public class Node{
        public int x;
        public int y;
    }
}