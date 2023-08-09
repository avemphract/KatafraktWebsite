package code1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map.Entry;

public class Polygon {
  public ArrayList<Point> points = new ArrayList<>();

  public Polygon(Point... points) {
    Collections.addAll(this.points, points);
  }

  //Şeklin dönüştürülmemiş matrisini elde etme
  public float[][] getMatrix() {
    float[][] result = new float[points.size()][2];
    for (int i = 0; i < points.size(); i++) {
      result[i][0] = points.get(i).x;
      result[i][1] = points.get(i).y;
    }
    return result;
  }

  //Şekle yeni değerlerini matrisler yardımıyla atama
  public void setFromMatrix(float[][] matrix) {
    for (int i = 0; i < matrix[0].length; i++) {
      Point p = points.get(i);
      p.x = matrix[i][0];
      p.y = matrix[i][1];
    }
  }

  //Şeklin dönüştürülmüş matrisini elde elme
  public float[][] getTransformedMatrix(List<Entry<MatrixProcessing, float[][]>> processes) {
    float[][] current = getMatrix();
    for (int i = 0; i < processes.size(); i++) {
      Entry<MatrixProcessing, float[][]> process = processes.get(i);
      current = process.getKey().apply(process.getValue(), current);
    }
    return current;
  }
}