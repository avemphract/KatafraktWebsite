package code2;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class LineWalking {
    HashMap<Integer, HashMap<Integer, Node>> nodes;

    public List<Node> getDrawedLine(Node begin, Node end) {

        List<Node> result = new ArrayList<Node>();
        int dx = end.x - begin.x;
        int dy = end.y - begin.y;
        int nx = Math.abs(dx);
        int ny = Math.abs(dy);
        int signX = dx > 0 ? 1 : -1;
        int signY = dy > 0 ? 1 : -1;

        result.add(begin);
        for (int ix = 0, iy = 0; ix < nx || iy < ny;) { // Döngümüz ix ve iy, nx ve ny'ye eşit olana kadar devam eder.
            if ((0.5 + ix) / nx < (0.5 + iy) / ny) { // Doğru yatay sınır ile daha önce kesişiyor.
                ix++; // Bu döngüdeki adımımız yatayda
            } else { // Doğru dikey sınır ile daha önce kesişiyor.
                iy++; // Bu döngüdeki adımımız dikeyde
            }
            result.add(nodes.get(begin.x + ix * signX).get(begin.y + iy * signY));
        }
        return result;
    }
}

class Node {
    public int x;
    public int y;
}