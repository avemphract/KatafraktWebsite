import gsap from "gsap";
import type Composition from "./Composition";
import Polygon from "./Polygon";
import PolyLine from "./PolyLine";

export default class StaticContainer {
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    readonly id: string;
    container: null | HTMLElement = null;
    composition: Composition[] = [];
    coordinate: boolean;
    debug: boolean;
    viewbox: { x: number; y: number; width: number; height: number } = { x: 0, y: 0, width: 1000, height: 1000 };

    textElements: Map<{ x: number; y: number }, SVGTextElement> = new Map();
    constructor(id: string, coordinate: boolean, debug = false) {
        this.id = id;
        this.coordinate = coordinate;
        this.debug = debug;
    }

    mounted() {
        this.container = document.getElementById(this.id)!;
        const view = this.container
            .getAttribute("viewBox")
            ?.split(" ")
            .map((s) => Number.parseInt(s));
        this.viewbox = { x: view[0], y: view[1], width: view[2], height: view[3] };

        if (this.coordinate) {
            for (let i = this.viewbox.x; i < this.viewbox.x + this.viewbox.width; i += 10) {
                if (i == 0) {
                    const element = document.createElementNS(StaticContainer.SVGNS, "line");
                    gsap.set(element, {
                        strokeWidth: 5,
                        stroke: "black",
                        attr: {
                            x1: i,
                            y1: this.viewbox.y,
                            x2: i,
                            y2: this.viewbox.y + this.viewbox.height,
                            class: "coor"
                        }
                    });
                    this.container.appendChild(element);
                } else if (i % 100 == 0) {
                    const element = document.createElementNS(StaticContainer.SVGNS, "line");
                    gsap.set(element, {
                        strokeWidth: 1,
                        stroke: "black",
                        attr: {
                            x1: i,
                            y1: this.viewbox.y,
                            x2: i,
                            y2: this.viewbox.y + this.viewbox.height
                        }
                    });
                    this.container.appendChild(element);
                }
            }

            for (let i = this.viewbox.y; i < this.viewbox.y + this.viewbox.height; i += 10) {
                if (i == 0) {
                    const element = document.createElementNS(StaticContainer.SVGNS, "line");
                    gsap.set(element, {
                        strokeWidth: 5,
                        stroke: "black",
                        attr: {
                            x1: this.viewbox.y,
                            y1: i,
                            x2: this.viewbox.y + this.viewbox.height,
                            y2: i,
                            class: "coor"
                        }
                    });
                    this.container.appendChild(element);
                } else if (i % 100 == 0) {
                    const element = document.createElementNS(StaticContainer.SVGNS, "line");
                    gsap.set(element, {
                        strokeWidth: 1,
                        stroke: "black",
                        attr: {
                            x1: this.viewbox.y,
                            y1: i,
                            x2: this.viewbox.y + this.viewbox.height,
                            y2: i,
                            class: "coor"
                        }
                    });
                    this.container.appendChild(element);
                }
            }
        }

        for (const com of this.composition) {
            com.createElement(this.container!);
        }
        if (this.debug) {
            for (const com of this.composition) {
                for (const shape of com.shapes) {
                    if (shape instanceof Polygon || shape instanceof PolyLine) {
                        for (const p of shape.points) {
                            const text = document.createElementNS(StaticContainer.SVGNS, "text");
                            text.textContent = `(${Math.floor(p.x)},${Math.floor(p.y)})`;
                            gsap.set(text, {
                                x: p.x,
                                y: p.y,
                                textAnchor: "middle",
                                dominantBaseline: "middle",
                                pointerEvents: "none",
                                fontSize: 50,
                                attr: {
                                    class: "point-text"
                                }
                            });
                            p.element = text;
                            this.container.appendChild(text);
                        }
                    }
                }
            }
        }

        this.composition.forEach((c) => c.changeElement());
    }
}
