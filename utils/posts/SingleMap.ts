import ObjectSet from "../types/ObjectSet";
import { SvgRenderOrder } from "../types/SvgRenderOrder";
import { Connection2D } from "./Connections2D";
import { Node2D } from "./Node2D";


export class SingleConnectionMap2D {
    readonly id: string;
    scale: number;
    public container: HTMLElement;
    public connection: Connection2D;

    constructor(id: string, connection: Connection2D, scale = 1) {
        this.id = id;
        this.connection = connection;
        this.scale = scale;
    }

    public mounted() {
        this.container = document.getElementById(this.id);
        const svgs: ObjectSet<SvgRenderOrder> = new ObjectSet();
        this.connection.mountConst(this.scale).forEach((e) => svgs.add(e));
        for (const element of [...svgs.values()].sort((n1, n2) => -n1.order + n2.order)) {
            this.container.appendChild(element.svg);
        }
    }
}
export class SingleWeightedConnectionMap2D {
    readonly id: string;
    scale: number;
    public container: HTMLElement;
    public connection: Connection2D;

    constructor(id: string, connection: Connection2D, scale = 1) {
        this.id = id;
        this.connection = connection;
        this.scale = scale;
    }

    public mounted() {
        this.container = document.getElementById(this.id);
        const svgs: ObjectSet<SvgRenderOrder> = new ObjectSet();
        this.connection.mountConst(this.scale).forEach((e) => svgs.add(e));
        for (const element of [...svgs.values()].sort((n1, n2) => -n1.order + n2.order)) {
            this.container.appendChild(element.svg);
        }
    }
}
export class SingleNodeGraphMap2D {
    readonly id: string;
    scale: number;
    public container: HTMLElement;
    public node: Node2D;

    constructor(id: string, node: Node2D, scale = 1) {
        this.id = id;
        this.node = node;
        this.scale = scale;
        this.node = node;
    }

    public mounted() {
        this.container = document.getElementById(this.id);
        const svgs: ObjectSet<SvgRenderOrder> = new ObjectSet();
        this.node.mountZero(this.scale).forEach((e) => svgs.add(e));
        for (const element of [...svgs.values()].sort((n1, n2) => -n1.order + n2.order)) {
            this.container.appendChild(element.svg);
        }
    }
}
