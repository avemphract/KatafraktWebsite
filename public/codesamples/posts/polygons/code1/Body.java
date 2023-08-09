package code1;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

public class Body {
    public List<Polygon> shapes = new ArrayList<>();
    public List<Entry<MatrixProcessing, float[][]>> processes = new ArrayList<>();

    public void update() {
        for (Polygon polygon : shapes) {
            // Bu matrixi kullanarak dönüştürülmüş şekli kullanabiliriz,
            // görselleştirebiliriz.
            // float[][] transformedMatrix = polygon.getTransformedMatrix(processes);
            // ...

            // Yada şekillere update fonksiyonu atayarak her şekli kendi içinde de
            // görselleştirebiliriz.
            // polygon.update(processes);
            // ...
        }
    }
}