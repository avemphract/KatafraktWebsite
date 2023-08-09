import { RefMaybe, fakeRef } from "@/utils/types/RefObject";
import Shape from "../polygons/Shape";
import Point from "../polygons/Point";
import { matrixCalculation } from "../polygons/MatrixProcesses";

export default class ArcShape extends Shape<SVGPathElement>{
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    
    centerPoint:Point;
    startPoint:Point;
    endPoint:Point;
    radiusPoint:Point;

    constructor(centerPoint:Point, startPoint:Point, endPoint:Point, radius:number){
        super();
        this.centerPoint = centerPoint;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.radiusPoint = new Point(fakeRef(centerPoint.x + radius),fakeRef(centerPoint.y + 0));
    }

    public createElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][]; }[]): SVGPathElement {
        this.element = document.createElementNS(ArcShape.SVGNS, "path");
        this.element.setAttribute("class","arcline");
        this.changeElement(processes);
        return this.element;
    }
    public changeElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][]; }[]): void {
        const number = matrixCalculation(processes, this.getMatrix());
        this.centerPoint.changeElement(number[0]);
        this.startPoint.changeElement(number[1]);
        this.endPoint.changeElement(number[2]);
        this.radiusPoint.changeElement(number[3]);
        const startAngle = Math.atan2(number[1][1] - number[0][1], number[1][0] - number[0][0]);
        const endAngle = Math.atan2(number[2][1] - number[0][1], number[2][0] - number[0][0]);
        const radius = 100;//this.centerPoint.GetDistance(number[3][0], number[3][1]);
        console.log(radius);
        if(this.element){
            this.element.setAttribute("d",
                `M ${number[0][0] + Math.cos(startAngle) * radius} ${number[0][1] + Math.sin(startAngle) * radius} 
                A ${radius} ${radius} 0 0 ${startAngle>endAngle? 0:1} ${number[0][0] + Math.cos(endAngle) * radius} ${number[0][1] + Math.sin(endAngle) * radius}`);
        }
    }

    public getMatrix(): number[][] {
        return [
            [this.centerPoint.x, this.centerPoint.y],
            [this.startPoint.x, this.startPoint.y],
            [this.endPoint.x, this.endPoint.y],
            [this.radiusPoint.x, this.radiusPoint.y],
        ];
    }
    public setFromMatrix(matrix: number[][]): void {
        this.centerPoint.set(matrix[0][0],matrix[0][1]);
        this.startPoint.set(matrix[1][0],matrix[1][1]);
        this.endPoint.set(matrix[2][0],matrix[2][1]);
        this.radiusPoint.set(matrix[3][0],matrix[3][1]);
    }

}