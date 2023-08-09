import { SvgRenderOrder } from "../../types/SvgRenderOrder";
import { BiDirectional2DConnection, type Connection2D } from "../Connections2D";
import { GridMap2D } from "../Map2D";
import { Node2D } from "../Node2D";

import gsap from "gsap";
const SVGNS = "http://www.w3.org/2000/svg";

export class PreviewGrid extends GridMap2D<GraphGridNode2D> {
    public beforeConstruction(): void {
        //Empty
    }
    gridVisible = true;

    constructor(id: string, width: number, height: number) {
        super(id, width, height, [
            [1, 0],
            [1, 0],
            [-1, 0],
            [0, -1]
        ]);
    }

    public override createConnection(from: Node2D, to: Node2D): Connection2D {
        const con = new BiDirectional2DConnection(from, to);
        con.baseWidth = 0.3;
        return con;
    }
    public override createNode(x: number, y: number): GraphGridNode2D {
        return new GraphGridNode2D(x, y, 0.8);
    }
    public transform() {
        this.gridVisible = !this.gridVisible;
        if (this.gridVisible) {
            gsap.to("#" + this.container.id + " .grid", { opacity: 1, duration: 1, ease: "power3.out" });
            //gsap.to("#" + this.container.id + " .node", { opacity: 0, duration: 1, ease: "power3.out" });
        } else {
            gsap.to("#" + this.container.id + " .grid", { opacity: 0, duration: 1, ease: "power3.out" });
            //gsap.to("#" + this.container.id + " .node", { opacity: 1, duration: 1, ease: "power3.out" });
        }
    }
}

export class GraphGridNode2D extends Node2D {
    rectSize: number;
    scale: number;
    constructor(x: number, y: number, rectSize: number, scale = 1) {
        super(x, y);
        this.rectSize = rectSize;
        this.r = 0.3;
        this.scale = scale;
    }

    public override mounted() {
        const res = super.mounted(this.scale);
        const gridElement = document.createElementNS(SVGNS, "rect");
        gsap.set(gridElement, {
            x: this.x - this.rectSize / 2,
            y: this.y - this.rectSize / 2,
            width: this.rectSize,
            height: this.rectSize,
            stroke: 0.01,
            borderRadius: 0.01,
            attr: {
                class: "grid"
            }
        });
        const e = new SvgRenderOrder(gridElement, 3);
        res.push(e);
        this.namelessElements.push(e);
        return res;
    }
}
