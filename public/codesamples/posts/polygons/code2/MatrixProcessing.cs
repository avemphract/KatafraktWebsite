namespace polygons.code2
{
    public class ProcessingType
    {
        private Func<float[,], float[,], float[,]> processHandler;
        private Func<float[,], float[,]> reversion;
        private ProcessingType(Func<float[,], float[,], float[,]> processHandler, Func<float[,], float[,]> reversion)
        {
            this.processHandler = processHandler;
            this.reversion = reversion;
        }

        public float[,] Apply(float[,] process, float[,] matrix)
        {
            return processHandler(process, matrix);
        }
        public float[,] ReverseApply(float[,] process, float[,] matrix)
        {
            return processHandler(reversion(process), matrix);
        }
        public static readonly ProcessingType VECTOR_ADDITION = new ProcessingType(VECTOR_ADDITION_FUNC, REVERSE_SIGN);

        public static readonly ProcessingType MULTIPICATION = new ProcessingType(MULTIPICATION_FUNC, INVERSE_MATRIX);

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
        // Matrisi toplama işlemine göre tersini alma

        private static float[,] REVERSE_SIGN(float[,] process)
        {
            float[,] result = new float[2, 2];
            for (int i = 0; i < process.GetLength(0); i++)
            {
                for (int j = 0; j < process.GetLength(1); j++)
                {
                    result[i, j] = -process[i, j];
                }
            }
            return result;
        }

        private static float[,] MULTIPICATION_FUNC(float[,] process, float[,] matrix)
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

        // Yalnızca iki boyutlu matrisler için matrisin tersini alma
        private static float[,] INVERSE_MATRIX(float[,] process)
        {
            float[,] result = new float[2, 2];
            float d = Math.Abs(process[0, 0] * process[1, 1] - process[0, 1] * process[1, 0]);
            result[0, 0] = process[1, 1] / d;
            result[1, 0] = -process[1, 0] / d;
            result[0, 1] = -process[0, 1] / d;
            result[1, 1] = process[0, 0] / d;
            return result;

        }
    }

    public static class MatrixCreator
    {
        public static float[,] Swift(float x, float y)
        {
            return Swift(new float[2, 2], x, y);
        }

        public static float[,] Swift(float[,] process, float x, float y)
        {
            process[0, 0] = x;
            process[0, 1] = y;
            return process;
        }

        public static float[,] Scale(float kx, float ky)
        {
            return Scale(new float[2, 2], kx, ky);
        }

        public static float[,] Scale(float[,] process, float kx, float ky)
        {
            process[0, 0] = kx;
            process[0, 1] = 0;
            process[1, 0] = 0;
            process[1, 1] = ky;
            return process;
        }

        public static float[,] Rotation(float q)
        {
            return Rotation(new float[2, 2], q);
        }

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