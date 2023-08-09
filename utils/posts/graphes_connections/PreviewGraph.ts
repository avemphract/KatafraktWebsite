import { BiDirectionalWeight2DConnection, Connection2D, DirectionalWeight2DConnection } from "../Connections2D";
import { GridMap2D } from "../Map2D";
import { Node2D } from "../Node2D";

export class WeightedGridSvg extends GridMap2D<Node2D> {
    public beforeConstruction(): void {
        //Empty
    }
    public createNode(x: number, y: number): Node2D {
        return new Node2D(x, y, null);
    }
    public createConnection(from: Node2D, to: Node2D): Connection2D {
        if (to.connections.find((n) => n.to == from)) {
            return null;
        } else {
            const r = Math.random();
            if (r < 0.5) {
                return new BiDirectionalWeight2DConnection(from, to, Math.random());
            } else if (r < 0.7) {
                return new DirectionalWeight2DConnection(from, to, Math.random());
            }
        }
    }
}
export class WeightedNamedGridSvg extends GridMap2D<Node2D> {
    public beforeConstruction(): void {
        //Empty
    }
    public createNode(x: number, y: number): Node2D {
        return new Node2D(x, y, String.fromCharCode(65 + y + x * this.width));
    }
    public createConnection(from: Node2D, to: Node2D): Connection2D {
        if (to.connections.find((n) => n.to == from)) {
            return null;
        } else {
            const r = Math.random();
            if (r < 0.5) {
                return new BiDirectionalWeight2DConnection(from, to, Math.random());
            } else if (r < 0.7) {
                return new DirectionalWeight2DConnection(from, to, Math.random());
            }
        }
    }
}
