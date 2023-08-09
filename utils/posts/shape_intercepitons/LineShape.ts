import { RefMaybe } from "utils/types/RefObject";
import { matrixCalculation } from "../polygons/MatrixProcesses";
import Point from "../polygons/Point";
import Shape from "../polygons/Shape";

export default class LineShape extends Shape<SVGLineElement>{
    startPoint:Point;
    endPoint:Point;
    nameElement: SVGTextElement | null = null;
    nameFunciton: (shape:LineShape)=>string;

    private _length:number;
    public get length() { return this._length; }

    constructor(startPoint:Point, endPoint:Point){
        super();
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
    
    public createElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][]; }[]): SVGLineElement {
        this.element = document.createElementNS(LineShape.SVGNS, "line");
        this.element.setAttribute("class", "line");
        if(this.nameFunciton){
            this.nameElement = document.createElementNS(LineShape.SVGNS, "text");
            this.nameElement.setAttribute("class","line text");
        }        
        this.changeElement(processes);
        return this.element;
    }
    
    public changeElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][]; }[]): void {
        const number = matrixCalculation(processes, this.getMatrix());
        this.startPoint.changeElement(number[0]);
        this.endPoint.changeElement(number[1]);
        this._length = ((number[1][0] - number[0][0])**2+(number[1][1] - number[0][1])**2)**0.5;
        if(this.element){
            this.element.setAttribute("x1",number[0][0].toString());
            this.element.setAttribute("y1",number[0][1].toString());
            this.element.setAttribute("x2",number[1][0].toString());
            this.element.setAttribute("y2",number[1][1].toString());
        }
        if(this.nameElement && this.nameFunciton){
            this.nameElement.setAttribute("x",((number[0][0] + number[1][0])/2).toString());
            this.nameElement.setAttribute("y",((number[0][1] + number[1][1])/2).toString());
            this.nameElement.textContent = this.nameFunciton(this);
        }
    }
    
    public getMatrix(): number[][] {
        return [[this.startPoint.x, this.startPoint.y],[this.endPoint.x, this.endPoint.y]];
    }
    
    public setFromMatrix(matrix: number[][]): void {
        this.startPoint.set(matrix[0][0],matrix[0][1]);
        this.endPoint.set(matrix[1][0],matrix[1][1]);
    }

}