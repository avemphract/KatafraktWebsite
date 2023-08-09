import gsap from "gsap";
import GridSvg from "./GridSvg";
import type { Node } from "./GridSvg";

const SVGNS = "http://www.w3.org/2000/svg";

export default class GridWalk extends GridSvg {
    moveableElementBegin: MoveableElement | undefined = undefined;
    moveableElementEnd: MoveableElement | undefined = undefined;
    connection: MoveableElementConnection;

    constructor(id: string) {
        super(id);
        this.moveableElementBegin = new MoveableElement(this);
        this.moveableElementEnd = new MoveableElement(this);
        this.connection = new MoveableElementConnection(this.moveableElementBegin, this.moveableElementEnd);
    }

    mounted(): void {
        super.mounted();
        this.moveableElementBegin!.node = this.parts[1][1];
        this.moveableElementBegin!.events.push(this.connection);
        this.moveableElementEnd!.node = this.parts[4][2];
        this.moveableElementEnd!.events.push(this.connection);

        this.connection.mounted(this.container!);
        this.moveableElementBegin!.mounted(this.container!);
        this.moveableElementEnd!.mounted(this.container!);

        //events
        this.container!.addEventListener("mousemove", (event: MouseEvent) => {
            const current = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
            if (this.moveableElementBegin?.move(current)) {
                this.walk();
            }
            if (this.moveableElementEnd?.move(current)) {
                this.walk();
            }
        });

        document.addEventListener("mouseup", (event: MouseEvent) => {
            const current = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
            this.moveableElementBegin?.stop(current);
            this.moveableElementEnd?.stop(current);
        });
        this.walk();
    }

    walk() {
        const tempPoint: Node[] = [];
        const dx = this.moveableElementEnd!.node!.x - this.moveableElementBegin!.node!.x;
        const dy = this.moveableElementEnd!.node!.y - this.moveableElementBegin!.node!.y;
        const nx = Math.abs(dx);
        const ny = Math.abs(dy);
        const sign_x = dx > 0 ? 1 : -1,
            sign_y = dy > 0 ? 1 : -1;

        let x = this.moveableElementBegin!.node!.x;
        let y = this.moveableElementBegin!.node!.y;

        tempPoint.push(this.parts[x][y]);
        for (let ix = 0, iy = 0; ix < nx || iy < ny; ) {
            if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
                // next step is horizontal
                x += sign_x;
                ix++;
            } else {
                // next step is vertical
                y += sign_y;
                iy++;
            }
            tempPoint.push(this.parts[x][y]);
        }

        for (const node of this.connection.highlightedPoint.filter((p) => !tempPoint.includes(p))) {
            node.element!.classList.remove("highlighted");
        }
        for (const node of tempPoint.filter((p) => !this.connection.highlightedPoint.includes(p))) {
            node.element!.classList.add("highlighted");
        }
        this.connection.highlightedPoint = tempPoint;
    }
}

class MoveableElement {
    element: SVGElement | undefined = undefined;
    node: Node | undefined = undefined;
    selected = false;
    mouseDownPoint: { x: number; y: number } = { x: 0, y: 0 };
    events: MoveableElementConnection[] = [];

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

        this.element = document.createElementNS(SVGNS, "circle");
        gsap.set(this.element, {
            attr: {
                cx: this.node!.x,
                cy: this.node!.y,
                r: 0.2,
                class: "moveable"
            }
        });
        this.element.addEventListener("mousedown", (event: MouseEvent) => {
            this.selected = true;
            this.mouseDownPoint = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
            this.element!.classList.add("grabbing");
        });

        container.append(this.element);
    }

    move(point: { x: number; y: number }): boolean {
        if (this.selected) {
            const tempNode: Node =
                this.gridSvg.parts[Math.round(this.node!.x - this.mouseDownPoint.x + point.x)][Math.round(this.node!.y - this.mouseDownPoint.y + point.y)];
            if (tempNode && tempNode != this.node) {
                this.mouseDownPoint.x += tempNode.x - this.node!.x;
                this.mouseDownPoint.y += tempNode.y - this.node!.y;
                this.node = tempNode;
                this.events.forEach((e) => e.change());
                gsap.set(this.element!, {
                    attr: {
                        cx: tempNode.x,
                        cy: tempNode.y,
                        r: 0.2,
                        class: "moveable"
                    }
                });
                return true;
            }
        }
        return false;
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

class MoveableElementConnection {
    begin: MoveableElement;
    end: MoveableElement;
    element: SVGLineElement | undefined = undefined;
    highlightedPoint: Node[] = [];

    constructor(begin: MoveableElement, end: MoveableElement) {
        this.begin = begin;
        this.end = end;
    }

    mounted(container: HTMLElement) {
        this.element = document.createElementNS(SVGNS, "line");
        gsap.set(this.element, {
            attr: {
                x1: this.begin.node!.x,
                y1: this.begin.node!.y,
                x2: this.end.node!.x,
                y2: this.end.node!.y,
                class: "moveable-connection"
            },
            strokeWidth: 0.4
        });
        container.append(this.element);
    }

    change() {
        gsap.set(this.element!, {
            attr: {
                x1: this.begin.node!.x,
                y1: this.begin.node!.y,
                x2: this.end.node!.x,
                y2: this.end.node!.y
            }
        });
    }
}
