import gsap from "gsap";
import { RefMaybe } from "utils/types/RefObject";
export default class Point {
    element: SVGTextElement | null = null;
    nodeElement: SVGElement | null = null;
    nameElement: SVGTextElement | null = null;
    private _uniqueKey:number = Math.random();
    public get uniqueKey(){ return this._uniqueKey; }

    private _x: RefMaybe<number>;
    public get x(): number {
        return this._x.value;
    }
    public set x(value: number) {
        this._x.value = value;
    }
    
    private _y: RefMaybe<number>;
    public get y(): number {
        return this._y.value;
    }
    public set y(value: number) {
        this._y.value = value;
    }
    
    constructor(x: RefMaybe<number>, y: RefMaybe<number>) {
        this._x = x;
        this._y = y;
    }

    public set(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    public getMatrix(): number[][] {
        return [[this.x, this.y]];
    }

    public changeElement(transformedVector: number[]) {
        if (this.nodeElement) {
            gsap.set(this.nodeElement, {
                x: transformedVector[0],
                y: transformedVector[1]
            });
        }
        if (this.nameElement) {
            gsap.set(this.nameElement, {
                x: transformedVector[0],
                y: transformedVector[1] - 50
            });
        }
    }

    public GetDistance(x:number, y:number):number;
    public GetDistance(p2:Point):number;
    public GetDistance(x:Point|number,y:number|void)
    {
        if(x instanceof Point)
            return ((this.x - x.x)**2+(this.y - x.y)**2)**0.5;
        else{
            return ((this.x - x)**2 + (this.y - (y as number))**2)**0.5
        }
    }
    public Copy(){
        return new Point(this._x, this._y);
    }
}
