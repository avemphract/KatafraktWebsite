package code1;

public enum MatrixProcessing {
    VECTOR_ADDITION() {
        @Override // Matrisin vektörel toplam fonksiyonu Vektör+Matris şeklinde kullanılır.
        public float[][] apply(float[][] process, float[][] matrix) {
            float[][] result = new float[matrix.length][matrix[0].length];
            for (int i = 0; i < result.length; i++) {
                for (int j = 0; j < result[0].length; j++) {
                    result[i][j] = process[0][j] + matrix[i][j];
                }
            }
            return result;
        }

    },
    MULTIPICATION() {
        @Override // Matris çarpım fonksiyonu
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

    };

    public abstract float[][] apply(float[][] process, float[][] matrix);

    // Yeni bir öteleme matrisi oluşturur. Matrisi ikiye iki oluşturmamızın sebebi
    // bu oluşturulan matris daha sonra hatasız bir şekilde scale ve rotate
    // matrislerine dönüştürmek içindir.
    public static float[][] swift(float x, float y) {
        return swift(new float[2][2], x, y);
    }

    // Var olan matrisi verilen değerlere göre öteleme matrisine çevirmeye yarar.
    // En iyi kullanım yöntemi body objesine daha önce kaydettiğimiz bir öteleme
    // işlemini bu fonksiyonla güncellemektir.
    public static float[][] swift(float[][] process, float x, float y) {
        process[0][0] = x;
        process[0][1] = y;
        return process;
    }

    // Yeni bir katlama dönüşüm matrisi oluşturur. Bu oluşturduğumuz matrisi
    // MatrixProcessing enumu ile Body'e kaydedebiliriz.
    public static float[][] scale(float kx, float ky) {
        return scale(new float[2][2], kx, ky);
    }

    // Var olan matrisi verilen değerlere göre katmala matrisine çevirmeye yarar.
    // En iyi kullanım yöntemi body objesine daha önce kaydettiğimiz bir katlama
    // işlemini bu fonksiyonla güncellemektir.
    public static float[][] scale(float[][] process, float kx, float ky) {
        process[0][0] = kx;
        process[0][1] = 0;
        process[1][0] = 0;
        process[1][1] = ky;
        return process;
    }

    // Yeni bir dönme dönüşüm matrisi oluşturur. Bu oluşturduğumuz matrisi
    // MatrixProcessing enumu ile Body'e kaydedebiliriz.
    public static float[][] rotation(float q) {
        return rotation(new float[2][2], q);
    }

    // Var olan matrisi verilen değerlere göre katmala matrisine çevirmeye yarar.
    // En iyi kullanım yöntemi body objesine daha önce kaydettiğimiz bir döndürme
    // işlemini bu fonksiyonla güncellemektir.
    public static float[][] rotation(float[][] process, float q) {
        process[0][0] = (float) Math.cos(q);
        process[0][1] = (float) -Math.sin(q);
        process[1][0] = (float) Math.sin(q);
        process[1][1] = (float) Math.cos(q);
        return process;
    }
}
