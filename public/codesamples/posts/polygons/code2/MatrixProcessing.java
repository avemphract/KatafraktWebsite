package code2;

public enum MatrixProcessing {
    VECTOR_ADDITION() {
        @Override
        public float[][] apply(float[][] process, float[][] matrix) {
            float[][] result = new float[matrix.length][matrix[0].length];
            for (int i = 0; i < result.length; i++) {
                for (int j = 0; j < result[0].length; j++) {
                    result[i][j] = process[0][j] + matrix[i][j];
                }
            }
            return result;
        }

        @Override // Matrisi toplama işlemine göre tersini aldıktan sonra toplama işlemi
        public float[][] reverseApply(float[][] process, float[][] matrix) {
            return apply(matrixReverseSign(process), matrix);
        }

    },
    MULTIPICATION() {
        @Override
        public float[][] apply(float[][] process, float[][] matrix) {
            float[][] result = new float[matrix.length][process[0].length];
            for (int m = 0; m < matrix.length; m++) {
                for (int r = 0; r < process[0].length; r++) {
                    for (int k = 0; k < matrix[m].length; k++) {
                        result[m][r] += process[k][r] * matrix[m][k];
                    }
                }
            }
            return result;
        }

        @Override // Matrisi tersini aldıktan sonra çarpma işlemi
        public float[][] reverseApply(float[][] process, float[][] matrix) {
            return apply(matrixInverse(process), matrix);
        }

    };

    public abstract float[][] apply(float[][] process, float[][] matrix);

    public abstract float[][] reverseApply(float[][] process, float[][] matrix);

    public static float[][] swift(float x, float y) {
        return swift(new float[2][2], x, y);
    }

    public static float[][] swift(float[][] process, float x, float y) {
        process[0][0] = x;
        process[0][1] = y;
        return process;
    }

    public static float[][] scale(float kx, float ky) {
        return scale(new float[2][2], kx, ky);
    }

    public static float[][] scale(float[][] process, float kx, float ky) {
        process[0][0] = kx;
        process[0][1] = 0;
        process[1][0] = 0;
        process[1][1] = ky;
        return process;
    }

    public static float[][] rotation(float q) {
        return rotation(new float[2][2], q);
    }

    public static float[][] rotation(float[][] process, float q) {
        process[0][0] = (float) Math.cos(q);
        process[0][1] = (float) -Math.sin(q);
        process[1][0] = (float) Math.sin(q);
        process[1][1] = (float) Math.cos(q);
        return process;
    }

    // Yalnızca iki boyutlu matrisler için matrisin tersini alma
    public static float[][] matrixInverse(float[][] matrix) {
        float[][] result = new float[2][2];
        float d = Math.abs(matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]);
        result[0][0] = matrix[1][1] / d;
        result[1][0] = -matrix[1][0] / d;
        result[0][1] = -matrix[0][1] / d;
        result[1][1] = matrix[0][0] / d;
        return result;
    }

    // Matrisi toplama işlemine göre tersini alma
    public static float[][] matrixReverseSign(float[][] matrix) {
        float[][] result = new float[2][2];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                result[i][j] = -matrix[i][j];
            }
        }
        return result;
    }
}
