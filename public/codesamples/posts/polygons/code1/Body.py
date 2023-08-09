from assets.polygons.code1.Polygon import Polygon


class Body:
    shapes: list[Polygon]
    processes: list[tuple(str, list[list[float]])]

    def update(self):
        for shape in self.shapes:
            shape
            # Bu matrixi kullanarak dönüştürülmüş şekli kullanabiliriz,
            # görselleştirebiliriz.
            # shape.getTransformedMatrix(processes);
            # ...

            # Yada şekillere update fonksiyonu atayarak her şekli kendi içinde de
            # görselleştirebiliriz.
            # shape.update(processes);
            # ... 
