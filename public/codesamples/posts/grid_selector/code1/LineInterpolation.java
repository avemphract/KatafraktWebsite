package code1;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class LineInterpolation {
    HashMap<Integer,HashMap<Integer,Node>> nodes;//Nodlarımızın bulunduğu harita.
    //Oluşturulmasını anlattığım Graftlardan Gridlere yazısını okuyabilirsiniz

    public List<Node> getDrawedLine(Node begin, Node end){
            List<Node> result = new ArrayList<Node>();
            int dx = end.x - begin.x;//Doğru parçasının x ekseninin uzunluğu negatif olabilir.
            int dy = end.y - begin.y;//Doğru parçasının y ekseninin uzunluğu negatif olabilir.

            int nmax = Math.max(Math.abs(dx), Math.abs(dy));//x ve y eksenine göre olan mutlak uzunlukluklardan uzun olanın seçimi

            for (int i = 0; i <= nmax && nmax != 0; i++){
                int x = begin.x + dx / nmax * i;//İnterpolasyon oluşturulan noktanın x'i
                int y = begin.y + dy / nmax * i;//İnterpolasyonla oluşturulan noktanın y'si 
                if (nodes.containsKey(x) && nodes.get(x).containsKey(y)){//Oluşturulan nokta haritada mevcut mu?
                    result.add(nodes.get(x).get(y));//Mevcutsa sonuca ekleriz
                }
            }
            if (nmax == 0){//Oluşturulan noktanın başlangıcı ve bitişi aynı ise
                result.add(begin);
            }

            return result;//Başlangıç noktası sonuca eklenir
        }
}

class Node{
    public int x;
    public int y;
}
