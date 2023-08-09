from assets.polygons.code1.MatrixProcessing import transfromationCalculation

from assets.polygons.code1.Point import Point


class Polygon:
    points: list[Point]

    def __init__(self, points: list[Point]):
        self.points = points

    def getMatrix(self) -> list[list[float]]:
        result: list[list[float]] = []
        for i in range(len(self.points)):
            result.append([self.points[i].x, self.points[i].y])
        return result

    def setFromMatrix(self, matrix: list[list[float]]):
        for i in range(len(matrix)):
            p = self.points[i]
            p.x = matrix[i][0]
            p.y = matrix[i][1]

    def getTransformedMatrix(self, processes: list[tuple(str, list[list[float]])]):
        return transfromationCalculation(processes, self.getMatrix())
