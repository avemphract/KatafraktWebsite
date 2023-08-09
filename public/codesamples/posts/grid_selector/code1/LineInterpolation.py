from assets.graphes_grids.code1.Node import Node


nodes: dict[int, dict[int, Node]] = dict() #Nodlarımızın bulunduğu harita.
#Oluşturulmasını anlattığım Graftlardan Gridlere yazısını okuyabilirsiniz


def getDrawedLine(begin: Node, end: Node) -> list(Node):
    result: list[Node] = list()
    dx = end.x - begin.x #Doğru parçasının x ekseninin uzunluğu negatif olabilir.
    dy = end.y - begin.y #Doğru parçasının y ekseninin uzunluğu negatif olabilir.

    nmax = max(abs(dx), abs(dy)) #x ve y eksenine göre olan mutlak uzunlukluklardan uzun olanın seçimi
    i = 0
    while i <= nmax and nmax != 0:
        x = begin.x + dx / nmax * i #İnterpolasyonla oluşturulan noktanın x'i
        y = begin.y + dy / nmax * i #İnterpolasyonla oluşturulan noktanın y'si
        
        if nodes.get(x) != None and nodes.get(x).get(y) != None: #Oluşturulan nokta haritada mevcut mu?
            result.append(nodes.get(x).get(y)) #Mevcutsa sonuca ekleriz
        i += 1
        
    if nmax == 0: #Oluşturulan noktanın başlangıcı ve bitişi aynı ise
        result.append(begin) #Başlangıç noktası sonuca eklenir
    
    return result
