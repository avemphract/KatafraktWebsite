from assets.graphes_grids.code1.Node import Node


nodes: dict[int, dict[int, Node]] = dict()


def getDrawedLine(begin: Node, end: Node) -> list(Node):
    result: list[Node] = list()
    dx = end.x - begin.x
    dy = end.y - begin.y
    nx = abs(dx)
    ny = abs(dy)
    signX = 1 if dx > 0 else -1
    signY = 1 if dy > 0 else -1
    result.append(begin)
    ix = 0
    iy = 0
    while ix < nx or iy < ny: # Döngümüz ix ve iy, nx ve ny'ye eşit olana kadar devam eder.
        if (0.5 + ix) / nx < (0.5 + iy) / ny: # Doğru yatay sınır ile daha önce kesişiyor.
            ix += 1 # Bu döngüdeki adımımız yatayda
        else: # Doğru dikey sınır ile daha önce kesişiyor.
            iy += 1 # Bu döngüdeki adımımız dikeyde
        result.append(nodes.get(begin.x+ix*signX).get(begin.y+iy*signY))
    return result
