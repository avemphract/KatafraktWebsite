import { matrixCalculation } from "../polygons/MatrixProcesses";
import Shape from "../polygons/Shape";
import Point from "../polygons/Point";
import { RefMaybe } from "utils/types/RefObject";

export default class Circle extends Shape<SVGCircleElement>{
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    borderElement: SVGRectElement | null = null;
    center:Point;
    edgePoint:Point;
    radius:number;


    constructor(center:Point, radius:number){
        super();
        this.center = center;
        this.edgePoint = new Point(ref(center.x + radius), ref(center.y));
        this.radius = radius;
    }

    public createElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][]; }[]): SVGCircleElement {
        this.element = document.createElementNS(Circle.SVGNS, "circle");
        this.element.setAttribute("class","circle");
        this.changeElement(processes);
        return this.element;
    }
    public changeElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][]; }[]): void {
        const number = matrixCalculation(processes, this.getMatrix());
        this.center.changeElement(number[0]);
        this.edgePoint.changeElement(number[1]);
        if(this.element){            
            this.radius = Math.pow(Math.pow(number[1][0] - number[0][0],2) + Math.pow(number[1][1] - number[0][1],2),0.5);
            this.element.setAttribute("cx",number[0][0].toString());
            this.element.setAttribute("cy",number[0][1].toString());
            this.element.setAttribute("r",(this.radius - 5).toString());
        }
    }
    public getMatrix(): number[][] {
        return [[this.center.x,this.center.y],[this.edgePoint.x,this.edgePoint.y]];
    }
    public setFromMatrix(matrix: number[][]): void {
        this.center.set(matrix[0][0],matrix[0][1]);
        this.edgePoint.set(matrix[1][0], matrix[1][1]);
    }
    
}