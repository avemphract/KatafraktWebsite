from platform import node
from assets.graphes_grids.code1.Node import Node


nodes: dict[int, dict[int, Node]] = dict()


def getError(x: int, y: int, radius: float):
    return abs(x * x + y * y - radius * radius)


def ifExistAdd(currentSet: set[Node], x: int, y: int):
    if x in nodes.keys and y in nodes.get(x).keys:
        currentSet.add(nodes.get(x).get(y))


def getDrawedLine(center: Node, radius) -> list(Node):
    result: set[Node] = set()
    x = 0
    y = round(radius)
    while y > x:
        hError = getError(x, y, radius)
        vError = getError(x, y - 1, radius)
        if hError > vError:
            y -= 1
        i = y
        #Farklı olarak çembere en yakın nodu almak yerine çevreden, x=y doğrusu arasındaki tüm noktaları alır
        while i >= x:
            ifExistAdd(result, center.x + x, center.y + y)
            ifExistAdd(result, center.x + y, center.y + x)
            ifExistAdd(result, center.x + x, center.y - y)
            ifExistAdd(result, center.x + y, center.y - x)
            ifExistAdd(result, center.x - x, center.y - y)
            ifExistAdd(result, center.x - y, center.y - x)
            ifExistAdd(result, center.x - x, center.y + y)
            ifExistAdd(result, center.x - y, center.y + x)
            i += 1
        x += 1    
    return list(result)
