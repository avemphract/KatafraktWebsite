import gsap from "gsap";
import type Composition from "./Composition";
import { matrixCalculation, reverseCalculation } from "./MatrixProcesses";
import type Point from "./Point";
import Polygon from "./Polygon";
import PolyLine from "./PolyLine";
import Circle from "../shape_intercepitons/Circle";

export default class ChangeableShapeContainer {
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    readonly id: string;
    composition: Composition;
    namedNode: boolean;
    container: HTMLElement;
    pointElements: Map<SVGCircleElement, Point> = new Map();
    selectedPoint: Point | null = null;
    afterChangeEvent: () => void = () => {
        //Empty
    };
    updateChangeEvent: () => void = () => {
        //Empty
    };

    viewbox: { x: number; y: number; width: number; height: number } = { x: 0, y: 0, width: 1000, height: 1000 };
    constructor(id: string, composition: Composition, namedNodes = false) {
        this.id = id;
        this.composition = composition;
        this.namedNode = namedNodes;
    }

    mounted() {
        this.container = document.getElementById(this.id)!;
        const view = this.container
            .getAttribute("viewBox")
            ?.split(" ")
            .map((s) => Number.parseInt(s));
        this.viewbox = { x: view[0], y: view[1], width: view[2], height: view[3] };

        for (let i = this.viewbox.x; i < this.viewbox.x + this.viewbox.width; i += 10) {
            if (i == 0) {
                const element = document.createElementNS(ChangeableShapeContainer.SVGNS, "line");
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
                const element = document.createElementNS(ChangeableShapeContainer.SVGNS, "line");
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
                const element = document.createElementNS(ChangeableShapeContainer.SVGNS, "line");
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
                const element = document.createElementNS(ChangeableShapeContainer.SVGNS, "line");
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

        this.composition.createElement(this.container);

        for (const s of this.composition.shapes) {
            if (s instanceof PolyLine || s instanceof Polygon) {
                let i = 1;
                for (const p of s.points) {
                    const element = document.createElementNS(ChangeableShapeContainer.SVGNS, "circle");
                    const transformed: number[][] = matrixCalculation(this.composition.operations, p.getMatrix());
                    gsap.set(element, {
                        x: transformed[0][0],
                        y: transformed[0][1],
                        attr: {
                            r: 20,
                            class: "node grabbable"
                        }
                    });
                    if (this.namedNode) {
                        const text = document.createElementNS(ChangeableShapeContainer.SVGNS, "text");
                        gsap.set(text, {
                            x: transformed[0][0],
                            y: transformed[0][1] - 50,
                            textAnchor: "middle",
                            dominantBaseline: "middle",
                            pointerEvents: "none",
                            fontSize: 50,
                            attr: {
                                class: "point-text"
                            }
                        });
                        text.textContent = i++ + "";
                        p.nameElement = text;
                        this.container.appendChild(text);
                    }
                    element.addEventListener("mousedown", () => {
                        this.selectedPoint = p;
                        this.selectedPoint.nodeElement?.classList.add("grabbing");
                    });
                    p.nodeElement = element;
                    this.pointElements.set(element, p);
                    this.container.appendChild(element);
                }
            }
            if(s instanceof Circle){                    
                const transformed: number[][] = matrixCalculation(this.composition.operations, s.getMatrix());
                const centerElement = document.createElementNS(ChangeableShapeContainer.SVGNS, "circle");
                gsap.set(centerElement, {
                    x: transformed[0][0],
                    y: transformed[0][1],
                    attr: {
                        r: 20,
                        class: "node grabbable"
                    }
                });
                s.center.nodeElement = centerElement;
                centerElement.addEventListener("mousedown", () => {
                    this.selectedPoint = s.center;
                    this.selectedPoint.nodeElement?.classList.add("grabbing");
                });
                this.container.appendChild(centerElement);
                const radiusElement = document.createElementNS(ChangeableShapeContainer.SVGNS, "circle");
                gsap.set(radiusElement, {
                    x: transformed[1][0],
                    y: transformed[1][1],
                    attr: {
                        r: 20,
                        class: "node grabbable"
                    }
                });
                s.edgePoint.nodeElement = radiusElement;
                radiusElement.addEventListener("mousedown", () => {
                    this.selectedPoint = s.edgePoint;
                    this.selectedPoint.nodeElement?.classList.add("grabbing");
                });
                this.container.appendChild(radiusElement);
                if (this.namedNode) {
                    const text1 = document.createElementNS(ChangeableShapeContainer.SVGNS, "text");
                    gsap.set(text1, {
                        x: transformed[0][0],
                        y: transformed[0][1] - 50,
                        textAnchor: "middle",
                        dominantBaseline: "middle",
                        pointerEvents: "none",
                        fontSize: 50,
                        attr: {
                            class: "point-text"
                        }
                    });
                    text1.textContent = 1 + "";
                    s.center.nameElement = text1;
                    this.container.appendChild(text1);

                    
                    const text2 = document.createElementNS(ChangeableShapeContainer.SVGNS, "text");
                    gsap.set(text2, {
                        x: transformed[1][0],
                        y: transformed[1][1] - 50,
                        textAnchor: "middle",
                        dominantBaseline: "middle",
                        pointerEvents: "none",
                        fontSize: 50,
                        attr: {
                            class: "point-text"
                        }
                    });
                    text2.textContent = 2 + "";
                    s.edgePoint.nameElement = text2;
                    this.container.appendChild(text2);
                }
            }
        }

        this.container.addEventListener("mousemove", (event: MouseEvent) => {
            if (this.selectedPoint) {
                const current = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
                const transformed: number[][] = reverseCalculation(this.composition.operations, [[current.x, current.y]]);
                this.selectedPoint.x = transformed[0][0];
                this.selectedPoint.y = transformed[0][1];
                this.composition.changeElement();
            }
        });
        document.addEventListener("mouseup", () => {
            if (this.selectedPoint) {
                this.selectedPoint.nodeElement?.classList.remove("grabbing");
                this.selectedPoint = null;
                this.afterChangeEvent();
            }
        });
    }

    pageToSvg(x: number, y: number, domRect: DOMRect): { x: number; y: number } {
        return {
            x: (x - domRect.x) * (this.viewbox.width / domRect.width) + this.viewbox.x,
            y: (y - domRect.y) * (this.viewbox.height / domRect.height) + this.viewbox.y
        };
    }
}
