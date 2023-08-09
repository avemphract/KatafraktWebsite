import { BiDirectionalWeight2DConnection, DirectionalWeight2DConnection } from "../Connections2D";

import gsap from "gsap";
import { Node2D } from "../Node2D";
import { GridMap2D } from "../Map2D";

const SVGNS = "http://www.w3.org/2000/svg";
type Weighted2DConnection = BiDirectionalWeight2DConnection | DirectionalWeight2DConnection;
class RectangleCollide {
    static readonly SVGNS: string = "http://www.w3.org/2000/svg";
    readonly width: number;
    readonly height: number;
    x: number;
    y: number;
    color: string;
    additionWeight: number;

    event: (node: Node2D) => void;

    begin: { initX: number; initY: number; mouseX: number; mouseY: number } | null = null;
    dynamicGrid: DynamicGridSvg;
    collidedConnections: Weighted2DConnection[] = [];
    constructor(x: number, y: number, width: number, height: number, additionWeight: number, color: string, dynamicGrid: DynamicGridSvg) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.additionWeight = additionWeight;
        this.dynamicGrid = dynamicGrid;
    }

    mounted(container: HTMLElement) {
        const element = document.createElementNS(SVGNS, "rect");
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
        const result: Weighted2DConnection[] = [];
        for (const con of this.dynamicGrid.allConnections) {
            if (con.to.isInsideBox(this.x, this.y, this.width, this.height) || con.from.isInsideBox(this.x, this.y, this.width, this.height)) {
                result.push(con);
            }
        }
        result.filter((c) => !this.collidedConnections.includes(c)).forEach((c) => (c.weight += this.additionWeight));
        this.collidedConnections.filter((c) => !result.includes(c)).forEach((c) => (c.weight -= this.additionWeight));
        this.collidedConnections = result;
    }

    static pageToSvg(x: number, y: number, container: { x: number; y: number; width: number; height: number }): { x: number; y: number } {
        return {
            x: (x - container.x) * (10 / container.width) - 0.5,
            y: (y - container.y) * (10 / container.height) - 0.5
        };
    }
}

export default class DynamicGridSvg extends GridMap2D<Node2D> {
    stopperRect: RectangleCollide;
    slowerRect: RectangleCollide;
    allConnections: Set<Weighted2DConnection> = new Set<Weighted2DConnection>();

    constructor(id: string) {
        super(
            id,
            10,
            10,
            [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1]
            ],
            0.5
        );
        for (const node of this.getNodes()) {
            for (const con of node.connections) {
                this.allConnections.add(con as Weighted2DConnection);
            }
        }
        this.slowerRect = new RectangleCollide(0, 0, 2, 2, 5, "#bbbe6099", this);
        this.stopperRect = new RectangleCollide(5, 5, 3, 3, 1000, "#be736099", this);
    }

    public beforeConstruction(): void 
    {
        //Empty
    }
    public createNode(x: number, y: number): Node2D {
        return new Node2D(x, y);
    }
    
    public createConnection(from: Node2D, to: Node2D): Weighted2DConnection {
        if (to.connections.find((n) => n.to == from)) {
            return null;
        } else {
            const r = Math.random();
            if (r < 0.5) {
                const c = new BiDirectionalWeight2DConnection(from, to, Math.random() + 0.1);
                return c;
            } else if (r < 0.7) {
                const c = new DirectionalWeight2DConnection(from, to, Math.random() + 0.1);
                return c;
            }
            return null;
        }
    }
    
    public override mounted(): void {
        super.mounted();
        this.stopperRect.mounted(this.container);
        this.slowerRect.mounted(this.container);
        this.stopperRect.collide();
        this.slowerRect.collide();
    }
}
