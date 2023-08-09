package code4;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CircleDrawing {
    HashMap<Integer, HashMap<Integer, Node>> nodes;

    public List<Node> getDrawedLine(Node center, float radius) {
        Set<Node> tempPoint = new HashSet<Node>();

        for (int x = 0, y = Math.round(radius); y > x; x++) {
            float hError = getError(x, y, radius);
            float vError = getError(x, y - 1, radius);

            if (hError > vError) {
                y--;
            }

            //Farklı olarak çembere en yakın nodu almak yerine çevreden, x=y doğrusu arasındaki tüm noktaları alır
            for (int i = y; i >= x; i--) {
                ifExistAdd(tempPoint, center.x + x, center.y + i);
                ifExistAdd(tempPoint, center.x + i, center.y + x);
                ifExistAdd(tempPoint, center.x + x, center.y - i);
                ifExistAdd(tempPoint, center.x + i, center.y - x);
                ifExistAdd(tempPoint, center.x - x, center.y - i);
                ifExistAdd(tempPoint, center.x - i, center.y - x);
                ifExistAdd(tempPoint, center.x - x, center.y + i);
                ifExistAdd(tempPoint, center.x - i, center.y + x);
            }
        }
        return new ArrayList<>(tempPoint);
    }

    public float getError(int x, int y, float radius) {
        return Math.abs(x * x + y * y - radius * radius);
    }

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
