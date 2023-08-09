import { fakeRef } from "@/utils/types/RefObject";
import Composition from "../polygons/Composition";
import { matrixCalculation, reverseCalculation } from "../polygons/MatrixProcesses";
import Point from "../polygons/Point";
import Circle from "./Circle";
import LineShape from "./LineShape";

export default class InterceptionCircleShapeContainer{
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    readonly id: string;
    
    composition1: Composition;
    
    composition2: Composition; 

    compositionDistance: Composition;

    container: HTMLElement;
    viewbox: { x: number; y: number; width: number; height: number } = { x: 0, y: 0, width: 1000, height: 1000 };

    selectedCompositon: Composition;
    private get otherComposition(){return this.selectedCompositon == this.composition1 ? this.composition2 : this.composition1}
    
    
    private beforePos: { x: number, y: number };

    constructor(id: string, composition1: Composition, composition2: Composition){
        this.id = id;
        this.composition1 = composition1;
        this.composition2 = composition2;
        this.compositionDistance = new Composition([
            new LineShape(new Point(fakeRef(0),fakeRef(0)), new Point(fakeRef(0),fakeRef(0))),
            new LineShape(new Point(fakeRef(0),fakeRef(0)), new Point(fakeRef(0),fakeRef(0))),
            new LineShape(new Point(fakeRef(0),fakeRef(0)), new Point(fakeRef(0),fakeRef(0))),
        ]);
        this.compositionDistance.shapes.forEach((s)=>(s as LineShape).nameFunciton = (shape:LineShape) => shape.length.toFixed(0) );
    }
    mounted() {
        this.container = document.getElementById(this.id);
        //this.viewbox = { x: view[0], y: view[1], width: view[2], height: view[3] };


        const p1 = matrixCalculation(this.composition1.operations, (this.composition1.shapes[0] as Circle).center.getMatrix());
        const p2 = matrixCalculation(this.composition2.operations, (this.composition2.shapes[0] as Circle).center.getMatrix());

        const pi1 = reverseCalculation(this.composition2.operations, p1);
        const pi2 = reverseCalculation(this.composition1.operations, p2);

        const l1 = new LineShape((this.composition1.shapes[0] as Circle).center,new Point(fakeRef(pi1[0][0]),fakeRef(pi1[0][1])));
        l1.nameFunciton = (shape:LineShape) => shape.length.toFixed(0); 
        this.composition1.shapes.push(l1);

        const l2 = new LineShape((this.composition2.shapes[0] as Circle).center,new Point(fakeRef(pi2[0][0]),fakeRef(pi2[0][1])));
        l2.nameFunciton = (shape:LineShape) => shape.length.toFixed(0); 
        this.composition2.shapes.push(l2);


        this.composition1.createElement(this.container);
        this.composition1.shapes[1].addClass("radius");
        this.composition1.shapes.forEach(s => {
            s.element.addEventListener("mousedown", (event: MouseEvent) => {
                this.selectedCompositon = this.composition1;
                this.beforePos = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
                this.beforePos.x -= this.selectedCompositon.getX();
                this.beforePos.y -= this.selectedCompositon.getY();            
            });
        });
        
        
        this.composition2.createElement(this.container);
        this.composition2.shapes[1].addClass("radius");
        this.composition2.shapes.forEach(s => {
            s.element.addEventListener("mousedown", (event: MouseEvent) => {
                this.selectedCompositon = this.composition2;
                this.beforePos = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
                this.beforePos.x -= this.selectedCompositon.getX();
                this.beforePos.y -= this.selectedCompositon.getY();
            });
        });

        this.compositionDistance.createElement(this.container);
        this.compositionDistance.shapes[0].addClass("distance");
        this.compositionDistance.shapes[1].addClass("distance");
        this.compositionDistance.shapes[2].addClass("distance");
        this.container.append(...(this.compositionDistance.shapes.filter(f=>f instanceof LineShape).map(s=> (s as LineShape).nameElement)));
        this.container.append(...(this.composition1.shapes.filter(f=>f instanceof LineShape).map(s=> (s as LineShape).nameElement)));
        this.container.append(...(this.composition2.shapes.filter(f=>f instanceof LineShape).map(s=> (s as LineShape).nameElement)));

        const d = ((pi1[0][0] - (this.composition1.shapes[1] as LineShape).startPoint.x)**2 + (pi1[0][1] - (this.composition1.shapes[1] as LineShape).startPoint.y)**2)**0.5;
        pi1[0][0] = (pi1[0][0] - (this.composition1.shapes[1] as LineShape).startPoint.x)/d*(this.composition2.shapes[0] as Circle).radius + (this.composition1.shapes[1] as LineShape).startPoint.x;
        pi1[0][1] = (pi1[0][1] - (this.composition1.shapes[1] as LineShape).startPoint.y)/d*(this.composition2.shapes[0] as Circle).radius + (this.composition1.shapes[1] as LineShape).startPoint.y;
        pi2[0][0] = (pi2[0][0] - (this.composition2.shapes[1] as LineShape).startPoint.x)/d*(this.composition1.shapes[0] as Circle).radius + (this.composition2.shapes[1] as LineShape).startPoint.x;
        pi2[0][1] = (pi2[0][1] - (this.composition2.shapes[1] as LineShape).startPoint.y)/d*(this.composition1.shapes[0] as Circle).radius + (this.composition2.shapes[1] as LineShape).startPoint.y;
        const pi3 = reverseCalculation(this.compositionDistance.operations, [p1[0],p2[0]]);
        
        (this.composition2.shapes[1] as LineShape).endPoint.set(pi1[0][0], pi1[0][1]);
        (this.composition1.shapes[1] as LineShape).endPoint.set(pi2[0][0], pi2[0][1]);
        (this.compositionDistance.shapes[0] as LineShape).setFromMatrix(pi3);
        (this.compositionDistance.shapes[1] as LineShape).setFromMatrix([pi3[0],[pi3[0][0],pi3[1][1]]]);
        (this.compositionDistance.shapes[2] as LineShape).setFromMatrix([[pi3[0][0],pi3[1][1]],pi3[1]]);
        
        this.composition1.changeElement();
        this.composition2.changeElement();
        this.compositionDistance.changeElement();

        this.container.addEventListener("mousemove", (event: MouseEvent) => {
            if(this.selectedCompositon){
                const current = this.pageToSvg(event.clientX, event.clientY, this.container!.getBoundingClientRect());
                //const p1 = matrixCalculation(this.composition1.operations, this.composition1.shapes[0].getMatrix());
                //const p2 = matrixCalculation(this.composition2.operations, this.composition2.shapes[0].getMatrix());
                this.selectedCompositon.transform(current.x - this.beforePos.x , current.y - this.beforePos.y);

                const p1 = matrixCalculation(this.composition1.operations, (this.composition1.shapes[0] as Circle).center.getMatrix());
                const p2 = matrixCalculation(this.composition2.operations, (this.composition2.shapes[0] as Circle).center.getMatrix());

                const pi1 = reverseCalculation(this.composition2.operations, p1);
                const d = ((pi1[0][0] - (this.composition1.shapes[1] as LineShape).startPoint.x)**2 + (pi1[0][1] - (this.composition1.shapes[1] as LineShape).startPoint.y)**2)**0.5;
                pi1[0][0] = (pi1[0][0] - (this.composition1.shapes[1] as LineShape).startPoint.x)/d*(this.composition2.shapes[0] as Circle).radius + (this.composition1.shapes[1] as LineShape).startPoint.x;
                pi1[0][1] = (pi1[0][1] - (this.composition1.shapes[1] as LineShape).startPoint.y)/d*(this.composition2.shapes[0] as Circle).radius + (this.composition1.shapes[1] as LineShape).startPoint.y;
                const pi2 = reverseCalculation(this.composition1.operations, p2);
                pi2[0][0] = (pi2[0][0] - (this.composition2.shapes[1] as LineShape).startPoint.x)/d*(this.composition1.shapes[0] as Circle).radius + (this.composition2.shapes[1] as LineShape).startPoint.x;
                pi2[0][1] = (pi2[0][1] - (this.composition2.shapes[1] as LineShape).startPoint.y)/d*(this.composition1.shapes[0] as Circle).radius + (this.composition2.shapes[1] as LineShape).startPoint.y;
                const pi3 = reverseCalculation(this.compositionDistance.operations, [p1[0],p2[0]]);
                
                (this.composition2.shapes[1] as LineShape).endPoint.set(pi1[0][0], pi1[0][1]);
                (this.composition1.shapes[1] as LineShape).endPoint.set(pi2[0][0], pi2[0][1]);
                (this.compositionDistance.shapes[0] as LineShape).setFromMatrix(pi3);
                (this.compositionDistance.shapes[1] as LineShape).setFromMatrix([pi3[0],[pi3[0][0],pi3[1][1]]]);
                (this.compositionDistance.shapes[2] as LineShape).setFromMatrix([[pi3[0][0],pi3[1][1]],pi3[1]]);
                
                this.otherComposition.changeElement();
                this.compositionDistance.changeElement();
                //const pi2 = reverseCalculation(this.composition1.operations, p2);
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