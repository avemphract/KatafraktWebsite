import { RefMaybe } from "utils/types/RefObject";
import { matrixCalculation } from "./MatrixProcesses";
import type Point from "./Point";
import Shape from "./Shape";

export default class PolyLine extends Shape<SVGPolylineElement> {
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    borderElement: SVGRectElement | null = null;
    points: Point[];
    border: { left: number; right: number; top: number; bottom: number } = { left: 0, right: 0, top: 0, bottom: 0 };

    constructor(points: Point[]) {
        super();
        this.points = points;
        this.setBorder();
    }
    private setBorder() {
        this.border = {
            left: Math.min(...this.points.map((p) => p.x)),
            right: Math.max(...this.points.map((p) => p.x)),
            top: Math.max(...this.points.map((p) => p.y)),
            bottom: Math.min(...this.points.map((p) => p.y))
        };
    }
    public createElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][] }[]) {
        this.element = document.createElementNS(PolyLine.SVGNS, "polyline");
        this.changeElement(processes);
        return this.element;
    }

    public changeElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][] }[]) {
        const number = matrixCalculation(processes, this.getMatrix());
        this.setBorder();
        if (this.element) {
            let pointsAttr = "";
            for (let i = 0; i < number.length; i++) {
                if (this.points[i].element) {
                    this.points[i].element!.textContent = `(${Math.floor(number[i][0])},${Math.floor(number[i][1])})`;
                    this.points[i].element!.setAttribute("transform", `translate(${number[i][0]},${number[i][1]})`);
                }
                this.points[i].changeElement(number[i]);
                pointsAttr += number[i].join(",") + " ";
            }
            this.element.setAttribute("points", pointsAttr);
            this.element.setAttribute("class", "polyline");
        }
        if (this.borderElement) {
            this.changeRect();
        }
    }

    public getMatrix(): number[][] {
        const result: number[][] = [];
        for (let i = 0; i < this.points.length; i++) {
            result.push([this.points[i].x, this.points[i].y]);
        }
        return result;
    }
    public setFromMatrix(matrix: number[][]): void {
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            p.x = matrix[i][0];
            p.y = matrix[i][1];
        }
    }
}
