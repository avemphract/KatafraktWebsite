import gsap from "gsap";

class RectangleCollide {
    static readonly SVGNS: string = "http://www.w3.org/2000/svg";
    readonly width: number;
    readonly height: number;
    x: number;
    y: number;
    color: string;
    additionWeight: number;

    begin: { initX: number; initY: number; mouseX: number; mouseY: number } | null = null;
    allConnections: Connection[] = [];
    collidedConnections: Connection[] = [];
    constructor(x: number, y: number, width: number, height: number, additionWeight: number, color: string, allConnections: Connection[]) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.additionWeight = additionWeight;
        this.allConnections = allConnections;
    }

    mounted(container: HTMLElement) {
        const element = document.createElementNS(DynamicGridSvg.SVGNS, "rect");
        element.addEventListener("mousedown", (event: MouseEvent) => {
            const c = container.getBoundingClientRect();
            const r = RectangleCollide.pageToSvg(event.clientX, event.clientY, { x: c.x, y: c.y, width: c.width, height: c.height });
            this.begin = { initX: this.x, initY: this.y, mouseX: r.x, mouseY: r.y };
        });
        container.addEventListener("mousemove", (event: MouseEvent) => {
            if (this.begin) {
                const c = container.getBoundingClientRect();
                const r = RectangleCollide.pageToSvg(event.clientX, event.clientY, { x: c.x, y: c.y, width: c.width, height: c.height });
                this.x = Math.min(Math.max(this.begin.initX + r.x - this.begin.mouseX, -0.5), 9.5 - this.width);
                this.y = Math.min(Math.max(this.begin.initY + r.y - this.begin.mouseY, -0.5), 9.5 - this.width);
                this.collide();
                gsap.set(element, {
                    x: this.x,
                    y: this.y
                });
            }
        });
        document.addEventListener("mouseup", () => {
            this.begin = null;
        });
        gsap.set(element, {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            fill: this.color,
            cursor: "move",
            attr: {
                class: "collide"
            }
        });
        container.append(element);
    }

    collide() {
        const result: Connection[] = [];
        for (const con of this.allConnections) {
            if (con.to.isInsideBox(this.x, this.y, this.width, this.height) || con.from.isInsideBox(this.x, this.y, this.width, this.height)) {
                result.push(con);
            }
        }
        result.filter((c) => !this.collidedConnections.includes(c)).forEach((c) => (c.additionalWeight += this.additionWeight));
        this.collidedConnections.filter((c) => !result.includes(c)).forEach((c) => (c.additionalWeight -= this.additionWeight));
        this.collidedConnections = result;
    }

    static pageToSvg(x: number, y: number, container: { x: number; y: number; width: number; height: number }): { x: number; y: number } {
        return {
            x: (x - container.x) * (10 / container.width) - 0.5,
            y: (y - container.y) * (10 / container.height) - 0.5
        };
    }
}

export default class DynamicGridSvg {
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    readonly id: string;
    container: HTMLElement | null = null;

    nodeArray: { [y: number]: { [x: number]: Node } } = [];
    allConnections: Connection[] = [];
    get nodes(): Node[] {
        const result: Node[] = [];
        for (const arr of Object.values(this.nodeArray)) {
            for (const node of Object.values(arr)) {
                result.push(node);
            }
        }
        return result;
    }

    neighbours: number[][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    stopperRect: RectangleCollide;
    slowerRect: RectangleCollide;

    constructor(horizontalCount: number, verticalCount: number, id: string) {
        this.id = id;
        for (let i = 0; i < verticalCount; i++) {
            if (this.nodeArray[i] == undefined) {
                this.nodeArray[i] = [];
            }
            for (let j = 0; j < horizontalCount; j++) {
                this.nodeArray[i][j] = new Node(j, i);
            }
        }

        for (const arr of Object.values(this.nodeArray)) {
            for (const node of Object.values(arr)) {
                for (const neighbour of this.getNeighbour(node)) {
                    if (Math.random() < 0.8) {
                        const c: Connection = new Connection(
                            node,
                            neighbour,
                            neighbour.connections.some((c) => c.from == node)
                                ? neighbour.connections.find((c) => c.from == node)?.baseWeight
                                : Math.floor(Math.random() * 6)
                        );
                        node.connections.push(c);
                        this.allConnections.push(c);
                    }
                }
            }
        }
        this.slowerRect = new RectangleCollide(0, 0, 2, 2, 5, "#bbbe6099", this.allConnections);
        this.stopperRect = new RectangleCollide(5, 5, 3, 3, 1000, "#be736099", this.allConnections);
    }

    mounted() {
        this.container = document.getElementById(this.id)!;

        for (const arr of Object.values(this.nodeArray)) {
            for (const node of Object.values(arr)) {
                for (const connection of node.connections) {
                    const isExist = this.alreadyExist(connection);
                    if (!isExist) {
                        if (connection.isTwoSidedConnection()) {
                            this.createUndirectedConnection(connection);
                        } else {
                            this.createDirectedConnection(connection);
                        }
                    } else {
                        connection.elements.push(isExist);
                    }
                }
            }
        }
        for (const arr of Object.values(this.nodeArray)) {
            for (const node of Object.values(arr)) {
                this.createNode(node);
            }
        }
        this.stopperRect.mounted(this.container);
        this.slowerRect.mounted(this.container);
        this.stopperRect.collide();
        this.slowerRect.collide();
    }

    alreadyExist(connection: Connection) {
        for (const c of connection.to.connections) {
            if (c.to == connection.from) {
                if (c.elements[connection.to.elements.length]) {
                    return c.elements[connection.to.elements.length];
                }
                return null;
            }
        }
        return null;
    }

    getNeighbour(node: Node) {
        const result: Node[] = [];
        this.neighbours.forEach((arr) => {
            if (this.nodeArray[node.y + arr[1]]) {
                if (this.nodeArray[node.y + arr[1]][node.x + arr[0]]) {
                    result.push(this.nodeArray[node.y + arr[1]][node.x + arr[0]]);
                }
            }
        });
        return result;
    }

    createNode(node: Node) {
        const nodeElement = document.createElementNS(DynamicGridSvg.SVGNS, "circle");
        node.elements.push(nodeElement);
        gsap.set(nodeElement, {
            x: node.x,
            y: node.y,
            attr: {
                r: 0.25,
                class: "node"
            }
        });
        this.container!.append(nodeElement);
    }

    createUndirectedConnection(connection: Connection) {
        const element = document.createElementNS(DynamicGridSvg.SVGNS, "line");
        const angle = Math.atan2(connection.to.y - connection.from.y, connection.to.x - connection.from.x);
        gsap.set(element, {
            strokeWidth: 0.05 + 0.02 * (11 - connection.weight),
            markerEnd: "none",
            attr: {
                x1: connection.from.x,
                y1: connection.from.y,
                x2: connection.to.x - Math.cos(angle) * 0.2,
                y2: connection.to.y - Math.sin(angle) * 0.2,
                class: "connection"
            }
        });
        connection.elements.push(element);
        this.container!.appendChild(element);
    }

    createDirectedConnection(connection: Connection) {
        const line = document.createElementNS(DynamicGridSvg.SVGNS, "line");
        const angle = Math.atan2(connection.to.y - connection.from.y, connection.to.x - connection.from.x);
        gsap.set(line, {
            strokeWidth: 0.05 + 0.02 * (11 - connection.weight),
            attr: {
                x1: connection.from.x,
                y1: connection.from.y,
                x2: connection.to.x - Math.cos(angle) * (0.34 + 0.03 * connection.baseWeight),
                y2: connection.to.y - Math.sin(angle) * (0.34 + 0.03 * connection.baseWeight),
                class: "connection"
            }
        });
        connection.elements.push(line);
        this.container!.appendChild(line);
    }
}
class Node {
    readonly name: string | null = null;
    readonly x: number;
    readonly y: number;
    readonly connections: Connection[] = [];

    readonly elements: SVGElement[] = [];

    private _isHighlighted = false;

    constructor(x: number, y: number, name: string | null = null) {
        this.x = x;
        this.y = y;
        this.name = name;
    }

    public isConnectedToNode(node: Node) {
        return this.connections.some((c) => c.to == node);
    }

    set isHighlighted(isHighlighted: boolean) {
        this._isHighlighted = isHighlighted;
        if (this._isHighlighted) {
            this.connections.forEach((c) => (c.isHighlighted = true));
            this.elements.forEach((e) => e.classList.add("highlighted"));
        } else if (!this._isHighlighted) {
            this.connections.forEach((c) => (c.isHighlighted = false));
            this.elements.forEach((e) => e.classList.remove("highlighted"));
        }
    }

    isInsideBox(x: number, y: number, width: number, height: number) {
        if (x < this.x && this.x < x + width) {
            if (y < this.y && this.y < y + height) {
                return true;
            }
        }
        return false;
    }
}

class Connection {
    readonly from: Node;
    readonly to: Node;
    baseWeight: number;
    _additionalWeight = 0;

    set additionalWeight(value: number) {
        this._additionalWeight = value;
        if (this.weight > 11) {
            this.elements.forEach((e) => {
                e.classList.add("hidden");
            });
        } else {
            this.elements.forEach((e) => {
                e.classList.remove("hidden");
                e.style.strokeWidth = 0.05 + 0.02 * (11 - Math.min(Math.max(this.weight, 0), 10)) + "";
            });
        }
    }

    get additionalWeight() {
        return this._additionalWeight;
    }

    get weight() {
        return this.baseWeight + this._additionalWeight;
    }

    readonly elements: SVGElement[] = [];

    constructor(from: Node, to: Node, weight = 5) {
        this.from = from;
        this.to = to;
        this.baseWeight = weight;
    }

    public isTwoSidedConnection() {
        return this.to.connections.some((c) => c.to === this.from);
    }

    private _isHighlighted = false;

    get isHighlighted(){
        return this._isHighlighted;
    }

    set isHighlighted(isHighlighted: boolean) {
        this._isHighlighted = isHighlighted;
        if (this._isHighlighted) {
            this.elements.forEach((l) => l.classList.add("highlighted"));
        } else if (!this._isHighlighted) {
            this.elements.forEach((l) => l.classList.remove("highlighted"));
        }
    }
}
