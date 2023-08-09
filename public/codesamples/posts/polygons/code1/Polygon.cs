using System.Collections.Generic;

namespace code1
{
  public class Polygon
  {
    public List<Point> points = new List<Point>();

    public Polygon(params Point[] points)
    {
      this.points.AddRange(points);
    }

    //Şeklin dönüştürülmemiş matrisini elde etme
    public float[,] getMatrix()
    {
      float[,] result = new float[points.Count, 2];
      for (int i = 0; i < points.Count; i++)
      {
        result[i, 0] = points[i].x;
        result[i, 1] = points[i].y;
      }
      return result;
    }

    //Şekle yeni değerlerini matrisler yardımıyla atama
    public void setFromMatrix(float[,] matrix)
    {
      for (int i = 0; i < matrix.GetLength(1); i++)
      {
        Point p = points[i];
        p.x = matrix[i, 0];
        p.y = matrix[i, 1];
      }
    }

    //Şeklin dönüştürülmüş matrisini elde elme
    public float[,] getTransformedMatrix(List<KeyValuePair<ProcessingType, float[,]>> processes)
    {
      float[,] current = getMatrix();
      for (int i = 0; i < processes.Count; i++)
      {
        KeyValuePair<ProcessingType, float[,]> process = processes[i];
        current = process.Key.Apply(process.Value, current);
      }
      return current;
    }
  }
}
