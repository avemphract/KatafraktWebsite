import { RefMaybe, fakeRef } from "@/utils/types/RefObject";
import Composition from "../polygons/Composition";
import Point from "../polygons/Point";
import PolyLine from "../polygons/PolyLine";
import ArcShape from "./ArcShape";
import Circle from "./Circle";
import TextShape from "./TextShape";
import { publicDecrypt } from "crypto";
import Shape from "../polygons/Shape";
import { matrixCalculation, reverseCalculation } from "../polygons/MatrixProcesses";
import Polygon from "../polygons/Polygon";

export default class DetailedInterceptionCircleShapeContainer{
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    readonly id: string;
    
    composition1: Composition;
    
    composition2: Composition; 

    compositionT: ModifiedComposition;
    
    container: HTMLElement;
    viewbox: { x: number; y: number; width: number; height: number } = { x: 0, y: 0, width: 1000, height: 1000 };

    intercepitonPoints: Point[];

    private selectedCompositon: Composition;
    private get otherComposition(){return this.selectedCompositon == this.composition1 ? this.composition2 : this.composition1}
    private beforePos: { x: number, y: number };


    constructor(id:string, composition1:Composition, composition2:Composition){
        this.id = id;
        this.composition1 = composition1;
        this.composition2 = composition2;
        this.compositionT = new ModifiedComposition();
    }

    mounted() {
        this.container = document.getElementById(this.id);
        
        this.composition1.createElement(this.container);
        this.composition1.shapes.forEach(s => {
            s.element.addEventListener("mousedown", (event: MouseEvent) => {
                this.selectedCompositon = this.composition1;
                this.beforePos = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
                this.beforePos.x -= this.selectedCompositon.getX();
                this.beforePos.y -= this.selectedCompositon.getY();            
            });
        });
        
        
        this.composition2.createElement(this.container);
        this.composition2.shapes.forEach(s => {
            s.element.addEventListener("mousedown", (event: MouseEvent) => {
                this.selectedCompositon = this.composition2;
                this.beforePos = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
                this.beforePos.x -= this.selectedCompositon.getX();
                this.beforePos.y -= this.selectedCompositon.getY();
            });
        });

        this.compositionT.createElement(this.container);
        this.compositionT.changeModifiedElement(this.composition1, this.composition2);

        this.container.addEventListener("mousemove", (event: MouseEvent) => {
            if(this.selectedCompositon){
                const current = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
                //const p1 = matrixCalculation(this.composition1.operations, this.composition1.shapes[0].getMatrix());
                //const p2 = matrixCalculation(this.composition2.operations, this.composition2.shapes[0].getMatrix());
                this.selectedCompositon.transform(current.x - this.beforePos.x , current.y - this.beforePos.y);
                //const pi2 = reverseCalculation(this.composition1.operations, p2);
                this.compositionT.changeModifiedElement(this.composition1, this.composition2);
            }
        });
        
        this.container.addEventListener("mouseup", () => {
            this.selectedCompositon = null;
        });
    }
     
    pageToSvg(x: number, y: number, domRect: DOMRect): { x: number; y: number } {
        return {
            x: (x - domRect.x) * (this.viewbox.width / domRect.width) + this.viewbox.x,
            y: (y - domRect.y) * (this.viewbox.height / domRect.height) + this.viewbox.y
        };
    }
}


class ModifiedComposition extends Composition{
    
    intercepitonPoints:Point[];
    triangle: Polygon;
    angles: ArcShape[];
    anglesText: TextShape[];
    edgesText: TextShape[];
    constructor() {
        const intercepitonPoints = [
            new Point(ref(0),ref(0)),
            new Point(ref(0),ref(0)), 
            new Point(ref(0),ref(0))];
        super([
            new Polygon(intercepitonPoints),
            new ArcShape(intercepitonPoints[0], intercepitonPoints[1], intercepitonPoints[2],1),
            new ArcShape(intercepitonPoints[1], intercepitonPoints[2], intercepitonPoints[0],1),
            new ArcShape(intercepitonPoints[2], intercepitonPoints[0], intercepitonPoints[1],1),
            new TextShape(intercepitonPoints[0], () => "A"),//0 angle
            new TextShape(intercepitonPoints[1], () => "B"),//1 angle
            new TextShape(intercepitonPoints[2], () => "C"),//2 angle
            new TextShape([intercepitonPoints[1], intercepitonPoints[2]], () => "a"),//0 length
            new TextShape([intercepitonPoints[2], intercepitonPoints[0]], () => "b"),//1 length
            new TextShape([intercepitonPoints[0], intercepitonPoints[1]], () => "c"),//2 length
        ]);
        this.triangle = this.shapes[0] as Polygon;
        this.angles = [this.shapes[1] as ArcShape, this.shapes[2] as ArcShape, this.shapes[3] as ArcShape];
        this.anglesText = [this.shapes[4] as TextShape, this.shapes[5] as TextShape, this.shapes[6] as TextShape];
        this.edgesText = [this.shapes[7] as TextShape, this.shapes[8] as TextShape, this.shapes[9] as TextShape];
        this.intercepitonPoints = intercepitonPoints;
    }

    createElement(element: HTMLElement) {
        super.createElement(element);
    }

    changeModifiedElement(composition1: Composition, composition2: Composition): void {
        const p1 = matrixCalculation(composition1.operations, composition1.shapes[0].getMatrix());
        const p2 = matrixCalculation(composition2.operations, composition2.shapes[0].getMatrix());

        const pi1 = reverseCalculation(this.operations,p1);
        const pi2 = reverseCalculation(this.operations,p2);
        
        this.intercepitonPoints[0].set(pi1[0][0], pi1[0][1]);
        this.intercepitonPoints[1].set(pi2[0][0], pi2[0][1]);
        
        super.changeElement();
    }

    
}