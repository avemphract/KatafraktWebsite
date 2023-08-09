import type Composition from "./Composition";

export default class MovableContainer {
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    readonly id: string;
    container: HTMLElement;
    composition: Composition[] = [];
    selectedCom: Composition | null = null;
    recentPos: { x: number; y: number } = { x: 0, y: 0 };
    viewbox: { x: number; y: number; width: number; height: number } = { x: 0, y: 0, width: 1000, height: 1000 };
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

        for (const com of this.composition) {
            com.createElement(this.container!);
            com.addClass("grabbable");
            com.shapes
                .map((s) => s.element)
                .forEach((c) =>
                    c?.addEventListener("mousedown", (event: MouseEvent) => {
                        this.selectedCom = com;
                        com.addClass("grabbing");
                        this.recentPos = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
                    })
                );
        }
        this.container.addEventListener("mousemove", (event: MouseEvent) => {
            if (this.selectedCom) {
                const current = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
                this.selectedCom.translate(current.x - this.recentPos.x, current.y - this.recentPos.y);
                this.recentPos = current;
            }
        });
        document.addEventListener("mouseup", () => {
            if (this.selectedCom) {
                this.selectedCom.removeClass("grabbing");
                this.selectedCom = null;
            }
        });

        for (const com of this.composition) {
            com.createBorder(this.container!);
        }
    }

    pageToSvg(x: number, y: number, domRect: DOMRect): { x: number; y: number } {
        return {
            x: (x - domRect.x) * (this.viewbox.width / domRect.width) - this.viewbox.x,
            y: (y - domRect.y) * (this.viewbox.height / domRect.height) - this.viewbox.y
        };
    }
}
