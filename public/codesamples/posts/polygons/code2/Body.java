package code2;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import code1.Polygon;

public class Body {
    public List<Polygon> shapes = new ArrayList<>();
    public List<Entry<MatrixProcessing, float[][]>> processes = new ArrayList<>();

    // Ters dönüşüm. Bu fonksiyon sayesinde ekranda bildiğimiz kordinatı body'nin
    // kordinat düzlemine dönüştürürz. Yukarılardaki örnekte bunu ekrandaki mouse
    // kordinatını, bodynin kordinat düzlemine dönüştürdüm. Daha sonrada
    // dönüştürdüğüm noktanın kordianatını şekilin noktasının üzerine yazdım.
    public float[][] reverseTransform(float[][] matrix) {
        for (int i = processes.size() - 1; i >= 0; i--) {
            Entry<MatrixProcessing, float[][]> process = processes.get(i);
            matrix = process.getKey().reverseApply(process.getValue(), matrix);
        }
        return matrix;
    }
}
