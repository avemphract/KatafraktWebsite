import math


def transfromationCalculation(processes: list[tuple(str, list[list[float]])], matrix: list[list[float]]) -> list[list[float]]:
    for i in range(len(processes)):
        process: tuple(str, list[list[float]]) = processes[i]
        if process[0] == "mult":
            matrix = multipication(process[1], matrix)
        elif process[0] == "add":
            matrix = vectorAddition(process[1], matrix)
    return matrix        

def vectorAddition(process: list[list[float]], matrix: list[list[float]]) -> list[list[float]]:
    result: list[list[float]] = []
    for i in range(len(matrix)):
        result.append([])
        for j in range(len(matrix[0])):
            result[i][j] = process[0][j] + matrix[i][j]
    return result


def multipication(process: list[list[float]], matrix: list[list[float]]) -> list[list[float]]:
    result: list[list[float]] = []
    for m in range(len(matrix)):
        result.append([])
        for r in range(len(process[0].length)):
            for k in range(len(matrix[m])):
                result[m][r] += process[k][r] * matrix[m][k]
    return result


def swift(x: float, y: float, process: list[list[float]] = [[0, 0], [0, 0]]) -> list[list[float]]:
    process[0] = x
    process[1] = y
    return process


def scale(kx: float, ky: float, process: list[list[float]] = [[0, 0], [0, 0]]) -> list[list[float]]:
    process[0][0] = kx
    process[0][1] = 0
    process[1][0] = 0
    process[1][1] = ky
    return process


def rotation(q: float, process: list[list[float]] = [[0, 0], [0, 0]]) -> list[list[float]]:
    process[0][0] = math.cos(q)
    process[0][1] = math.sin(q)
    process[1][0] = math.sin(q)
    process[1][1] = math.cos(q)
    return process
