package code3;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

public class RingDrawing {

    HashMap<Integer, HashMap<Integer, Node>> nodes;

    public List<Node> getDrawedLine(Node center, float radius) {
        Set<Node> tempPoint = new HashSet<Node>();

        for (int x = 0, y = Math.round(radius); y > x; x++) {
            float hError = getError(x, y, radius);// x ekseninde bir kaydırılmış noktanın çember denklemine göre hatası
            float vError = getError(x, y - 1, radius);// x ve y ekseninde bir kaydırılmış noktanın çember denklemine göre hatası

            if (hError > vError) {//Dikey hata, yatay hatadan daha büyükse
                y--;//x ve y ekseninde kaydırılmış halinden devam edilir.
            }

            //Bu döngü 45 dereceye kadar noktaları verir geri kalanlar için aşağıdaki noktalarıda sonuca ekleriz
            this.ifExistAdd(tempPoint, center.x + x, center.y + y);
            this.ifExistAdd(tempPoint, center.x + y, center.y + x);
            this.ifExistAdd(tempPoint, center.x + x, center.y - y);
            this.ifExistAdd(tempPoint, center.x + y, center.y - x);
            this.ifExistAdd(tempPoint, center.x - x, center.y - y);
            this.ifExistAdd(tempPoint, center.x - y, center.y - x);
            this.ifExistAdd(tempPoint, center.x - x, center.y + y);
            this.ifExistAdd(tempPoint, center.x - y, center.y + x);
        }
        return new ArrayList<>(tempPoint);
    }

    //Çemberin matematiksel denklemine göre hata miktarını hesaplama
    public float getError(int x, int y, float radius) {
        return Math.abs(x * x + y * y - radius * radius);
    }

    //Eğer haritada böyle bir nod varsa sonuca ekleme fonksiyonu
    public void ifExistAdd(Set<Node> nodes, int x, int y) {
        if (this.nodes.containsKey(x) && this.nodes.get(x).containsKey(y)) {
            nodes.add(this.nodes.get(x).get(y));
        }
    }
}

class Node {
    public int x;
    public int y;
}