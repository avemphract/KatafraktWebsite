import { SvgRenderOrder } from "../types/SvgRenderOrder";
import type { Connection2D } from "./Connections2D";
import gsap from "gsap";
const SVGNS = "http://www.w3.org/2000/svg";

export class Node2D {
    x: number;
    y: number;
    name: string;
    r = 0.4;
    namelessElements: SvgRenderOrder[] = [];
    container: HTMLElement;
    readonly connections: Connection2D[] = [];
    private _isHighlighted = false;

    constructor(x: number, y: number, name: string = null) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
    get isHighlighted(): boolean {
        return this._isHighlighted;
    }
    set isHighlighted(isHighlighted: boolean) {
        this._isHighlighted = isHighlighted;
        if (this._isHighlighted) {
            for (const e of this.namelessElements) e.svg.classList.add("highlighted");
            this.connections.forEach((c) => (c.isHighlighted = true));
        } else {
            for (const e of this.namelessElements) e.svg.classList.remove("highlighted");
            this.connections.forEach((c) => (c.isHighlighted = false));
        }
    }

    public mountZero(scale: number): SvgRenderOrder[] {
        const res: SvgRenderOrder[] = [];
        const nodeElement = document.createElementNS(SVGNS, "circle");
        gsap.set(nodeElement, {
            strokeWidth: 0.1 * scale,
            attr: {
                r: this.r * scale,
                class: "node"
            }
        });
        nodeElement.addEventListener("mouseenter", () => (this.isHighlighted = true));
        nodeElement.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const svgNode = new SvgRenderOrder(nodeElement, 5);
        res.push(svgNode);
        this.namelessElements.push(svgNode);

        if (this.name != null) {
            const textElement = document.createElementNS(SVGNS, "text");
            textElement.textContent = this.name;
            gsap.set(textElement, {
                pointerEvents: "none",
                fontStyle: "bold",
                fontSize: 0.5 * scale,
                alignmentBaseline: "central",
                textAnchor: "middle",
                fill: "white",
                attr: {
                    class: "node-text"
                }
            });
            const svgText = new SvgRenderOrder(textElement, 4);
            res.push(svgText);
            this.namelessElements.push(svgText);
        }
        return res;
    }
    public mounted(scale: number): SvgRenderOrder[] {
        const res = [];
        const nodeElement = document.createElementNS(SVGNS, "circle");
        gsap.set(nodeElement, {
            x: this.x,
            y: this.y,
            strokeWidth: 0.1 * scale,
            attr: {
                r: this.r * scale,
                class: "node"
            }
        });
        nodeElement.addEventListener("mouseenter", () => (this.isHighlighted = true));
        nodeElement.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const svgOrder = new SvgRenderOrder(nodeElement, 5);
        res.push(svgOrder);
        this.namelessElements.push(svgOrder);

        if (this.name != null) {
            const textElement = document.createElementNS(SVGNS, "text");
            textElement.textContent = this.name;
            gsap.set(textElement, {
                x: this.x,
                y: this.y,
                pointerEvents: "none",
                fontStyle: "bold",
                fontSize: 0.4 * scale,
                alignmentBaseline: "central",
                textAnchor: "middle",
                fill: "white",
                attr: {
                    class: "node-text"
                }
            });
            const textSvgOrder = new SvgRenderOrder(textElement, 4);
            res.push(textSvgOrder);
            this.namelessElements.push(textSvgOrder);
        }
        return res;
    }
    public isInsideBox(x: number, y: number, width: number, height: number) {
        if (x < this.x && this.x < x + width) {
            if (y < this.y && this.y < y + height) {
                return true;
            }
        }
        return false;
    }
}
