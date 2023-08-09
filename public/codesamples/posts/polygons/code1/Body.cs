
namespace code1
{
  public class Body
  {
    public List<Polygon> shapes = new List<Polygon>();
    public List<KeyValuePair<ProcessingType, float[,]>> processes = new List<KeyValuePair<ProcessingType, float[,]>>();

    public void Update()
    {
      foreach (Polygon polygon in shapes)
      {
        //Bu matrixi kullanarak dönüştürülmüş şekli kullanabiliriz, görselleştirebiliriz.
        //float[,] transformedMatrix = polygon.getTransformedMatrix(processes);
        //...

        //Yada şekillere update fonksiyonu atayarak her şekli kendi içinde de görselleştirebiliriz.
        //polygon.update(processes);
        //...
      }
    }
  }
}