import ObjectSet from "../types/ObjectSet";
import { SvgRenderOrder } from "../types/SvgRenderOrder";
import { Connection2D } from "./Connections2D";
import { Node2D } from "./Node2D";

abstract class Map2D {
    readonly id: string;
    public container: HTMLElement;
    public scale: number;
    public nodeArray: { [x: number]: { [y: number]: Node2D } };

    constructor(id: string, scale: number) {
        this.id = id;
        this.scale = scale;
    }

    public mounted() {
        this.container = document.getElementById(this.id);
        const svgs: ObjectSet<SvgRenderOrder> = new ObjectSet();
        for (const node of this.getNodes()) {
            node.mounted(this.scale).forEach((e) => svgs.add(e));
            for (const con of node.connections) {
                con.mounted(this.scale).forEach((e) => svgs.add(e));
            }
        }
        for (const element of [...svgs.values()].sort((n1, n2) => -n1.order + n2.order)) {
            this.container.appendChild(element.svg);
        }
    }

    public getNodes() {
        const result: Node2D[] = [];
        for (const arr of Object.values(this.nodeArray)) {
            for (const node of Object.values(arr)) {
                result.push(node);
            }
        }
        return result;
    }
}

export class GraphMap2D extends Map2D {
    grids = false;

    constructor(id: string, nodes: Node2D[], scale = 1) {
        super(id, scale);
        this.nodeArray = [];
        for (let i = 0; i < nodes.length; i++) {
            if (this.nodeArray[nodes[i].x] === undefined) this.nodeArray[nodes[i].x] = [];
            this.nodeArray[nodes[i].x][nodes[i].y] = nodes[i];
        }
    }
}

export abstract class GridMap2D<N extends Node2D> extends Map2D {
    grids = false;
    public width: number;
    public height: number;
    public neighbours: number[][];
    constructor(id: string, width: number, height: number, neighbours: number[][], scale = 1) {
        super(id, scale);
        this.width = width;
        this.height = height;
        const nodes: N[] = [];
        this.beforeConstruction();
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const node: N = this.createNode(j, i);
                if (node != null) nodes.push(this.createNode(j, i));
            }
        }
        this.nodeArray = [];
        for (let i = 0; i < nodes.length; i++) {
            if (this.nodeArray[nodes[i].x] === undefined) this.nodeArray[nodes[i].x] = [];
            this.nodeArray[nodes[i].x][nodes[i].y] = nodes[i];
        }
        this.neighbours = neighbours;
        for (const node of nodes) {
            for (const neighbourNode of this.getNeighbourNodes(node)) {
                this.createConnection(node, neighbourNode);
            }
        }
    }

    public getNeighbourNodes(node: Node2D) {
        const result: Node2D[] = [];
        for (const neigbour of this.neighbours) {
            if (this.nodeArray[node.x + neigbour[0]]) {
                if (this.nodeArray[node.x + neigbour[0]][node.y + neigbour[1]]) {
                    result.push(this.nodeArray[node.x + neigbour[0]][node.y + neigbour[1]]);
                }
            }
        }
        return result;
    }

    public abstract beforeConstruction(): void;
    public abstract createNode(x: number, y: number): N;
    public abstract createConnection(from: Node2D, to: Node2D): Connection2D;
}
