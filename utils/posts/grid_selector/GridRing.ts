import gsap from "gsap";
import GridSvg from "./GridSvg";
import type { Node } from "./GridSvg";

const SVGNS = "http://www.w3.org/2000/svg";

export default class GridRing extends GridSvg {
    moveableElement: MoveableElement;

    constructor(id: string) {
        super(id);
        this.moveableElement = new MoveableElement(this);
    }

    mounted(): void {
        super.mounted();
        this.moveableElement!.node = this.parts[1][1];
        this.moveableElement.mounted(this.container!);

        //events
        this.container!.addEventListener("mousemove", (event: MouseEvent) => {
            const current = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
            if (this.moveableElement.move(current)) {
                this.drawCircle();
            }
        });

        document.addEventListener("mouseup", (event: MouseEvent) => {
            const current = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
            this.moveableElement.stop(current);
        });
        this.drawCircle();
    }

    drawCircle() {
        const tempPoint: Set<Node> = new Set<Node>();

        for (let x = 0, y = Math.round(this.moveableElement.radius); y > x; x++) {
            const hError = this.getError(x, y);
            const vError = this.getError(x, y - 1);

            if (hError > vError) {
                y--;
            }

            this.ifExistAdd(tempPoint, this.moveableElement.node!.x + x, this.moveableElement.node!.y + y);
            this.ifExistAdd(tempPoint, this.moveableElement.node!.x + y, this.moveableElement.node!.y + x);
            this.ifExistAdd(tempPoint, this.moveableElement.node!.x + x, this.moveableElement.node!.y - y);
            this.ifExistAdd(tempPoint, this.moveableElement.node!.x + y, this.moveableElement.node!.y - x);
            this.ifExistAdd(tempPoint, this.moveableElement.node!.x - x, this.moveableElement.node!.y - y);
            this.ifExistAdd(tempPoint, this.moveableElement.node!.x - y, this.moveableElement.node!.y - x);
            this.ifExistAdd(tempPoint, this.moveableElement.node!.x - x, this.moveableElement.node!.y + y);
            this.ifExistAdd(tempPoint, this.moveableElement.node!.x - y, this.moveableElement.node!.y + x);
        }

        for (const node of Array.from(this.moveableElement.highlightedPoint).filter((p) => !tempPoint.has(p))) {
            node.element!.classList.remove("highlighted");
        }
        for (const node of Array.from(tempPoint).filter((p) => !this.moveableElement.highlightedPoint.has(p))) {
            node.element!.classList.add("highlighted");
        }
        this.moveableElement.highlightedPoint = tempPoint;
    }

    getError(x: number, y: number) {
        return Math.abs(x * x + y * y - this.moveableElement.radius * this.moveableElement.radius);
    }

    ifExistAdd(nodes: Set<Node>, x: number, y: number) {
        if (this.parts[x] && this.parts[x][y]) {
            nodes.add(this.parts[x][y]);
        }
    }

    changeRadius(radius: number) {
        this.moveableElement.radius = radius;
        if (this.moveableElement.node) {
            this.moveableElement.changeRadius();
            this.drawCircle();
        }
    }
}

class MoveableElement {
    highlightedPoint: Set<Node> = new Set();
    element: SVGElement | undefined = undefined;
    ring: SVGCircleElement | undefined = undefined;
    node: Node | undefined = undefined;
    selected = false;
    radius = 3;
    mouseDownPoint: { x: number; y: number } = { x: 0, y: 0 };

    gridSvg: GridSvg;
    container: HTMLElement | null = null;
    viewbox: { x: number; y: number; width: number; height: number } = { x: 0, y: 0, width: 1000, height: 1000 };

    constructor(gridSvg: GridSvg) {
        this.gridSvg = gridSvg;
    }

    mounted(container: HTMLElement) {
        this.container = container;
        const view = container
            .getAttribute("viewBox")
            ?.split(" ")
            .map((s) => Number.parseInt(s));
        this.viewbox = { x: view[0], y: view[1], width: view[2], height: view[3] };

        this.ring = document.createElementNS(SVGNS, "circle");
        gsap.set(this.ring, {
            attr: {
                cx: this.node!.x,
                cy: this.node!.y,
                r: this.radius,
                class: "ring"
            }
        });
        container.append(this.ring);

        this.element = document.createElementNS(SVGNS, "circle");
        gsap.set(this.element, {
            attr: {
                cx: this.node!.x,
                cy: this.node!.y,
                r: 0.4,
                class: "moveable"
            }
        });

        container.append(this.element);

        this.element.addEventListener("mousedown", (event: MouseEvent) => {
            this.selected = true;
            this.mouseDownPoint = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
            this.element!.classList.add("grabbing");
        });
    }

    move(point: { x: number; y: number }): boolean {
        if (this.selected) {
            const tempNode: Node =
                this.gridSvg.parts[Math.round(this.node!.x - this.mouseDownPoint.x + point.x)][Math.round(this.node!.y - this.mouseDownPoint.y + point.y)];
            if (tempNode && tempNode != this.node) {
                this.mouseDownPoint.x += tempNode.x - this.node!.x;
                this.mouseDownPoint.y += tempNode.y - this.node!.y;
                this.node = tempNode;
                gsap.set(this.element!, {
                    attr: {
                        cx: tempNode.x,
                        cy: tempNode.y,
                        class: "moveable"
                    }
                });
                this.changeRadius();
                return true;
            }
        }
        return false;
    }

    changeRadius() {
        gsap.set(this.ring!, {
            attr: {
                cx: this.node!.x,
                cy: this.node!.y,
                r: this.radius
            }
        });
    }

    stop(point: { x: number; y: number }) {
        if (this.selected) {
            this.node =
                this.gridSvg.parts[Math.round(this.node!.x - this.mouseDownPoint!.x + point.x)][Math.round(this.node!.y - this.mouseDownPoint!.y + point.y)];
        }
        this.selected = false;
    }

    pageToSvg(x: number, y: number, domRect: DOMRect): { x: number; y: number } {
        return {
            x: (x - domRect.x) * (this.viewbox.width / domRect.width) + this.viewbox.x,
            y: (y - domRect.y) * (this.viewbox.height / domRect.height) + this.viewbox.y
        };
    }
}
