from assets.polygons.code1.Polygon import Polygon
from assets.polygons.code2.MatrixProcessing import reverseTransformationCalculation


class Body:
    shapes: list[Polygon]
    processes: list[tuple(str, list[list[float]])]

    # Ters dönüşüm. Bu fonksiyon sayesinde ekranda bildiğimiz kordinatı body'nin
    # kordinat düzlemine dönüştürürz. Yukarılardaki örnekte bunu ekrandaki mouse
    # kordinatını, bodynin kordinat düzlemine dönüştürdüm. Daha sonrada
    # dönüştürdüğüm noktanın kordianatını şekilin noktasının üzerine yazdım.
    def reverseTransformation(self, matrix: list[list[float]]) -> list[list[float]]:
        return reverseTransformationCalculation(self.processes, matrix);
