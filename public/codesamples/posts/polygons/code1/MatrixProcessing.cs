
namespace code1
{
  public class ProcessingType
  {
    private Func<float[,], float[,], float[,]> ProcessHandler;
    private ProcessingType(Func<float[,], float[,], float[,]> f)
    {
      this.ProcessHandler = f;
    }

    public float[,] Apply(float[,] process, float[,] matrix)
    {
      return ProcessHandler(process, matrix);
    }
    // Matrisin vektörel toplam fonksiyonu Vektör+Matris şeklinde kullanılır.
    public static readonly ProcessingType VECTOR_ADDITION = new ProcessingType(ProcessingType.VECTOR_ADDITION_FUNC);

    // Matris çarpım fonksiyonu
    public static readonly ProcessingType MULTIPICATION = new ProcessingType(ProcessingType.MULTIPICATION_FUNC);

    private static float[,] VECTOR_ADDITION_FUNC(float[,] process, float[,] matrix)
    {
      float[,] result = new float[matrix.GetLength(0), matrix.GetLength(1)];
      for (int i = 0; i < result.GetLength(0); i++)
      {
        for (int j = 0; j < matrix.GetLength(1); j++)
        {
          result[i, j] = process[0, j] + matrix[i, j];
        }
      }
      return result;
    }

    public static float[,] MULTIPICATION_FUNC(float[,] process, float[,] matrix)
    {
      float[,] result = new float[matrix.GetLength(0), process.GetLength(1)];
      for (int m = 0; m < matrix.GetLength(0); m++)
      {
        for (int r = 0; r < process.GetLength(1); r++)
        {
          for (int k = 0; k < matrix.GetLength(1); k++)
          {
            result[m, r] += process[k, r] * matrix[m, k];
          }
        }
      }
      return result;
    }
  }

  public static class MatrixCreator
  {

    // Yeni bir öteleme matrisi oluşturur. Matrisi ikiye iki oluşturmamızın sebebi
    // bu oluşturulan matris daha sonra hatasız bir şekilde scale ve rotate
    // matrislerine dönüştürmek içindir.
    public static float[,] Swift(float x, float y)
    {
      return Swift(new float[2, 2], x, y);
    }

    // Var olan matrisi verilen değerlere göre öteleme matrisine çevirmeye yarar.
    // En iyi kullanım yöntemi body objesine daha önce kaydettiğimiz bir öteleme
    // işlemini bu fonksiyonla güncellemektir.
    public static float[,] Swift(float[,] process, float x, float y)
    {
      process[0, 0] = x;
      process[0, 1] = y;
      return process;
    }

    // Yeni bir katlama dönüşüm matrisi oluşturur. Bu oluşturduğumuz matrisi
    // MatrixProcessing enumu ile Body'e kaydedebiliriz.
    public static float[,] Scale(float kx, float ky)
    {
      return Scale(new float[2, 2], kx, ky);
    }

    // Var olan matrisi verilen değerlere göre katmala matrisine çevirmeye yarar.
    // En iyi kullanım yöntemi body objesine daha önce kaydettiğimiz bir katlama
    // işlemini bu fonksiyonla güncellemektir.
    public static float[,] Scale(float[,] process, float kx, float ky)
    {
      process[0, 0] = kx;
      process[0, 1] = 0;
      process[1, 0] = 0;
      process[1, 1] = ky;
      return process;
    }

    // Yeni bir dönme dönüşüm matrisi oluşturur. Bu oluşturduğumuz matrisi
    // MatrixProcessing enumu ile Body'e kaydedebiliriz.
    public static float[,] Rotation(float q)
    {
      return Rotation(new float[2, 2], q);
    }

    // Var olan matrisi verilen değerlere göre katmala matrisine çevirmeye yarar.
    // En iyi kullanım yöntemi body objesine daha önce kaydettiğimiz bir döndürme
    // işlemini bu fonksiyonla güncellemektir.
    public static float[,] Rotation(float[,] process, float q)
    {
      process[0, 0] = (float)Math.Cos(q);
      process[0, 1] = (float)-Math.Sin(q);
      process[1, 0] = (float)Math.Sin(q);
      process[1, 1] = (float)Math.Cos(q);
      return process;
    }
  }
}

