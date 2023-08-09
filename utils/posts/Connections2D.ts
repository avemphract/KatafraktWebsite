import gsap from "gsap";
import { SvgRenderOrder } from "../types/SvgRenderOrder";
import { Equalable } from "../types/ObjectSet";
import type { Node2D } from "./Node2D";

const SVGNS = "http://www.w3.org/2000/svg";

export abstract class Connection2D implements Equalable {
    protected _from: Node2D;
    protected _to: Node2D;
    elements: Map<string, SvgRenderOrder> = new Map();
    namelessElements: SvgRenderOrder[] = [];
    baseWidth = 0.4;
    private _isHighlighted = false;

    constructor(from: Node2D, to: Node2D) {
        this.from = from;
        this.setTo(to);
    }

    public equals(con: Connection2D) {
        return this.to === con.to && this.from === con.from;
    }

    get from(): Node2D {
        return this._from;
    }

    set from(value: Node2D) {
        if (this._from != null) this._from.connections.splice(this._from.connections.indexOf(this), 1);
        this._from = value;
        if (this._from != null) {
            this._from.connections.push(this);
        }
    }

    get to(): Node2D {
        return this._to!;
    }

    abstract setTo(value: Node2D): void;
    get isHighlighted(): boolean {
        return this._isHighlighted;
    }

    set isHighlighted(isHighlighted: boolean) {
        this._isHighlighted = isHighlighted;
        if (this._isHighlighted) {
            for (const e of this.elements.values()) e.svg.classList.add("highlighted");
            for (const e of this.namelessElements) e.svg.classList.add("highlighted");
        } else {
            for (const e of this.elements.values()) e.svg.classList.remove("highlighted");
            for (const e of this.namelessElements) e.svg.classList.remove("highlighted");
        }
    }

    public abstract mounted(scale: number): SvgRenderOrder[];
    public abstract mountConst(scale: number): SvgRenderOrder[];
    public abstract change(scale: number): void;
}

export class BiDirectional2DConnection extends Connection2D {
    setTo(value: Node2D): void {
        if (this._to != null) this._to.connections.splice(this._to.connections.indexOf(this), 1);
        this._to = value;
        if (this._to != null) {
            this._to.connections.push(this);
        }
    }

    public override mounted(scale: number) {
        const element = document.createElementNS(SVGNS, "line");
        const angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
        gsap.set(element, {
            strokeWidth: this.baseWidth * scale,
            markerEnd: "none",
            attr: {
                x1: this.from.x,
                y1: this.from.y,
                x2: this.to.x - Math.cos(angle) * 0.2,
                y2: this.to.y - Math.sin(angle) * 0.2,
                class: "connection"
            }
        });
        element.addEventListener("mouseenter", () => (this.isHighlighted = true));
        element.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const e = new SvgRenderOrder(element, 6);
        this.namelessElements.push(e);
        return [e];
    }

    public override mountConst(scale: number) {
        const element = document.createElementNS(SVGNS, "line");
        gsap.set(element, {
            strokeWidth: this.baseWidth * scale,
            markerEnd: "none",
            attr: {
                x1: -0.6,
                x2: 0.6,
                y2: 0,
                class: "connection"
            }
        });
        element.addEventListener("mouseenter", () => (this.isHighlighted = true));
        element.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const e = new SvgRenderOrder(element, 6);
        this.namelessElements.push(e);
        return [e];
    }

    public override change(scale: number): void {
        const angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
        gsap.set(this.elements, {
            strokeWidth: this.baseWidth * scale,
            markerEnd: "none",
            attr: {
                x1: this.from.x,
                y1: this.from.y,
                x2: this.to.x - Math.cos(angle) * 0.2,
                y2: this.to.y - Math.sin(angle) * 0.2,
                class: "connection"
            }
        });
    }
}

export class BiDirectionalWeight2DConnection extends Connection2D {
    public weight: number;
    constructor(from: Node2D, to: Node2D, weight: number) {
        super(from, to);
        this.weight = weight;
    }

    setTo(value: Node2D): void {
        if (this._to != null) this._to.connections.splice(this._to.connections.indexOf(this), 1);
        this._to = value;
        if (this._to != null) {
            this._to.connections.push(this);
        }
    }

    public override mounted(scale: number) {
        const element = document.createElementNS(SVGNS, "line");
        gsap.set(element, {
            strokeWidth: this.baseWidth * (this.weight * 1.8 + 0.2) * scale,
            markerEnd: "none",
            attr: {
                x1: this.from.x,
                y1: this.from.y,
                x2: this.to.x,
                y2: this.to.y,
                class: "connection"
            }
        });
        element.addEventListener("mouseenter", () => (this.isHighlighted = true));
        element.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const e = new SvgRenderOrder(element, 6);
        this.namelessElements.push(e);
        return [e];
    }

    public override mountConst(scale: number) {
        const element = document.createElementNS(SVGNS, "line");
        gsap.set(element, {
            strokeWidth: this.baseWidth * (this.weight * 1.8 + 0.2) * scale,
            markerEnd: "none",
            attr: {
                x1: -0.6,
                x2: 0.6,
                y2: 0,
                class: "connection"
            }
        });
        element.addEventListener("mouseenter", () => (this.isHighlighted = true));
        element.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const e = new SvgRenderOrder(element, 6);
        this.namelessElements.push(e);

        const textElement = document.createElementNS(SVGNS, "text");
        textElement.textContent = Math.floor(11 - this.weight * 10) + "";
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
        const t = new SvgRenderOrder(textElement, 4);
        this.namelessElements.push(t);
        return [e, t];
    }

    public override change(scale: number): void {
        const angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
        gsap.set(this.elements, {
            strokeWidth: this.baseWidth * (this.weight * 1.8 + 0.2) * scale,
            markerEnd: "none",
            attr: {
                x1: this.from.x,
                y1: this.from.y,
                x2: this.to.x - Math.cos(angle) * 0.2,
                y2: this.to.y - Math.sin(angle) * 0.2,
                class: "connection"
            }
        });
    }
}

export class Directional2DConnection extends Connection2D {

    setTo(to: Node2D): void {
        this._to = to;
    }

    public override mountConst(scale: number): SvgRenderOrder[] {
        const element = document.createElementNS(SVGNS, "line");
        gsap.set(element, {
            strokeWidth: this.baseWidth * scale,
            attr: {
                x1: -0.6,
                x2: 0.4,
                y2: 0,
                class: "connection"
            }
        });
        element.addEventListener("mouseenter", () => (this.isHighlighted = true));
        element.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const e = new SvgRenderOrder(element, 6);
        this.namelessElements.push(e);
        return [e];
    }

    public override mounted(scale: number) {
        const element = document.createElementNS(SVGNS, "line");
        const angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
        gsap.set(element, {
            strokeWidth: this.baseWidth * scale,
            attr: {
                x1: this.from.x,
                y1: this.from.y,
                x2: this.to.x - Math.cos(angle) * (0.4 + 0.2),
                y2: this.to.y - Math.sin(angle) * (0.4 + 0.2),
                class: "connection"
            }
        });
        element.addEventListener("mouseenter", () => (this.isHighlighted = true));
        element.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const e = new SvgRenderOrder(element, 6);
        this.namelessElements.push(e);
        return [e];
    }

    public override change(scale: number): void {
        const angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
        gsap.set(this.elements, {
            strokeWidth: this.baseWidth * scale,
            markerEnd: "none",
            attr: {
                x1: this.from.x,
                y1: this.from.y,
                x2: this.to.x - Math.cos(angle) * (0.4 + 0.2),
                y2: this.to.y - Math.sin(angle) * (0.4 + 0.2),
                class: "connection"
            }
        });
    }
}

export class DirectionalWeight2DConnection extends Connection2D {
    public weight: number;
    constructor(from: Node2D, to: Node2D, weight: number) {
        super(from, to);
        this.weight = weight;
    }

    setTo(to: Node2D): void {
        this._to = to;
    }

    public override mountConst(scale: number): SvgRenderOrder[] {
        const element = document.createElementNS(SVGNS, "line");
        gsap.set(element, {
            strokeWidth: this.baseWidth * (this.weight * 1.8 + 0.2) * scale,
            attr: {
                x1: -0.6,
                x2: 0.4 - this.weight / 6,
                y2: 0,
                class: "connection"
            }
        });
        element.addEventListener("mouseenter", () => (this.isHighlighted = true));
        element.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const e = new SvgRenderOrder(element, 6);
        this.namelessElements.push(e);
        const textElement = document.createElementNS(SVGNS, "text");
        textElement.textContent = Math.floor(11 - this.weight * 10) + "";
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
        const t = new SvgRenderOrder(textElement, 4);
        this.namelessElements.push(t);
        return [e, t];
    }

    public override mounted(scale: number) {
        const element = document.createElementNS(SVGNS, "line");
        const angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
        gsap.set(element, {
            strokeWidth: this.baseWidth * (this.weight * 1.8 + 0.2) * scale,
            attr: {
                x1: this.from.x,
                y1: this.from.y,
                x2: this.to.x - Math.cos(angle) * (0.3 + 0.4 * this.weight),
                y2: this.to.y - Math.sin(angle) * (0.3 + 0.4 * this.weight),
                class: "connection"
            }
        });
        element.addEventListener("mouseenter", () => (this.isHighlighted = true));
        element.addEventListener("mouseleave", () => (this.isHighlighted = false));
        const e = new SvgRenderOrder(element, 6);
        this.namelessElements.push(e);
        return [e];
    }

    public override change(scale: number): void {
        const angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
        gsap.set(this.elements, {
            strokeWidth: this.baseWidth * (this.weight * 1.8 + 0.2) * scale,
            markerEnd: "none",
            attr: {
                x1: this.from.x,
                y1: this.from.y,
                x2: this.to.x - Math.cos(angle) * (0.4 + 0.2),
                y2: this.to.y - Math.sin(angle) * (0.4 + 0.2),
                class: "connection"
            }
        });
    }
}
