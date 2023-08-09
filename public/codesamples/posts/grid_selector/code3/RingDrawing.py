from platform import node
from assets.graphes_grids.code1.Node import Node


nodes: dict[int, dict[int, Node]] = dict()

#Çemberin matematiksel denklemine göre hata miktarını hesaplama
def getError(x: int, y: int, radius: float):
    return abs(x * x + y * y - radius * radius)

#Eğer haritada böyle bir nod varsa sonuca ekleme fonksiyonu
def ifExistAdd(currentSet: set[Node], x: int, y: int):
    if x in nodes.keys and y in nodes.get(x).keys:
        currentSet.add(nodes.get(x).get(y))


def getDrawedLine(center: Node, radius) -> list(Node):
    result: set[Node] = set()
    x = 0
    y = round(radius)
    while y > x:
        x+=1
        hError = getError(x, y, radius) # x ekseninde bir kaydırılmış noktanın çember denklemine göre hatası
        vError = getError(x, y - 1, radius)# x ve y ekseninde bir kaydırılmış noktanın çember denklemine göre hatası
        if hError > vError: #Dikey hata, yatay hatadan daha büyükse
            y -= 1 #x ve y ekseninde kaydırılmış halinden devam edilir.

        #Bu döngü 45 dereceye kadar noktaları verir geri kalanlar için aşağıdaki noktalarıda sonuca ekleriz
        ifExistAdd(result, center.x + x, center.y + y)
        ifExistAdd(result, center.x + y, center.y + x)
        ifExistAdd(result, center.x + x, center.y - y)
        ifExistAdd(result, center.x + y, center.y - x)
        ifExistAdd(result, center.x - x, center.y - y)
        ifExistAdd(result, center.x - y, center.y - x)
        ifExistAdd(result, center.x - x, center.y + y)
        ifExistAdd(result, center.x - y, center.y + x)
    return list(result)
