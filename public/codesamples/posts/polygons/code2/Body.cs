using code1;

namespace polygons.code2
{
    public class Body
    {
        public List<Polygon> shapes = new List<Polygon>();
        public List<KeyValuePair<ProcessingType, float[,]>> processes = new List<KeyValuePair<ProcessingType, float[,]>>();


        // Ters dönüşüm. Bu fonksiyon sayesinde ekranda bildiğimiz kordinatı body'nin
        // kordinat düzlemine dönüştürürz. Yukarılardaki örnekte bunu ekrandaki mouse
        // kordinatını, bodynin kordinat düzlemine dönüştürdüm. Daha sonrada
        // dönüştürdüğüm noktanın kordianatını şekilin noktasının üzerine yazdım.
        public float[,] ReverseTransform(float[,] matrix)
        {
            for (int i = processes.Count - 1; i >= 0; i--)
            {
                KeyValuePair<ProcessingType, float[,]> process = processes[i];
                matrix = process.Key.ReverseApply(process.Value, matrix);
            }
            return matrix;
        }
    }
}