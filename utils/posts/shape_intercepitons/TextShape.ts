import { RefMaybe } from "utils/types/RefObject";
import Shape from "../polygons/Shape";
import Point from "../polygons/Point";
import { matrixCalculation } from "../polygons/MatrixProcesses";

export default class TextShape extends Shape<SVGTextElement>{
    points: Point[];
    
    nameFunction: () => string;

    constructor(points:Point[], nameFunction:()=>string);
    constructor(points:Point, nameFunction:()=>string);
    constructor(points:Point|Point[], nameFunction:()=>string){
        super();
        if(points instanceof Point)
            this.points=[points];
        else
            this.points = points;
        this.nameFunction = nameFunction;
    }
    public createElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][]; }[]): SVGTextElement {
        this.element = document.createElementNS(Shape.SVGNS, "text");
        this.element.setAttribute("class","text");
        this.changeElement(processes);
        return this.element;

    }
    public changeElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][]; }[]): void {
        const num = matrixCalculation(processes, this.getMatrix());
        if(this.element){
            this.element.setAttribute("x", num[0][0].toString());
            this.element.setAttribute("y", num[0][1].toString());
            this.element.textContent = this.nameFunction();
        }
    }
    public getMatrix(): number[][] {
        return this.points.map(p => p.getMatrix()).reduce((sum:number[][], current:number[][]) => {
            sum[0][0] += current[0][0] / this.points.length; 
            sum[0][1] +=current[0][1] / this.points.length; 
            return sum;
        },[[0,0]]);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public setFromMatrix(matrix: number[][]): void {
        //
    }
}