import gsap from "gsap";

const SVGNS = "http://www.w3.org/2000/svg";

export default class GridSvg {
    public readonly id: string;
    public container: HTMLElement | null = null;
    public parts: Node[][] = [];

    public viewbox: { x: number; y: number; width: number; height: number } = { x: 0, y: 0, width: 1000, height: 1000 };

    constructor(id: string) {
        this.id = id;
    }

    mounted() {
        this.container = document.getElementById(this.id)!;

        const view = this.container
            .getAttribute("viewBox")
            ?.split(" ")
            .map((s) => Number.parseInt(s));
        this.viewbox = { x: view[0], y: view[1], width: view[2], height: view[3] };

        for (let i = 0; i < this.viewbox.width; i++) {
            this.parts[i] = [];
            for (let j = 0; j < this.viewbox.height; j++) {
                this.parts[i][j] = new Node(i, j, false);
            }
        }

        for (const nodeArray of this.parts) {
            for (const node of nodeArray) {
                node.mounted(this.container);
            }
        }
    }

    toString(): string {
        return this.id;
    }

    pageToSvg(x: number, y: number, domRect: DOMRect): { x: number; y: number } {
        return {
            x: (x - domRect.x) * (this.viewbox.width / domRect.width) + this.viewbox.x,
            y: (y - domRect.y) * (this.viewbox.height / domRect.height) + this.viewbox.y
        };
    }
}

export class Node {
    public x: number;
    public y: number;
    public obstacle: boolean;

    public element: SVGElement | undefined = undefined;

    constructor(x: number, y: number, obstacle: boolean) {
        this.x = x;
        this.y = y;
        this.obstacle = obstacle;
    }

    mounted(container: HTMLElement) {
        const element = document.createElementNS(SVGNS, "rect");
        gsap.set(element, {
            attr: {
                x: this.x - 0.45,
                y: this.y - 0.45,
                width: 0.9,
                height: 0.9,
                class: "grid"
            }
        });
        this.element = element;

        container.append(element);
    }
}
