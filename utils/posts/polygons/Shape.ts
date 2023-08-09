import gsap from "gsap";
import { RefMaybe } from "utils/types/RefObject";

export default abstract class Shape<T extends SVGElement> {
    static readonly SVGNS = "http://www.w3.org/2000/svg";
    element: T | null = null;
    borderElement: SVGRectElement | null = null;
    border: { left: number; right: number; top: number; bottom: number } = { left: 0, right: 0, top: 0, bottom: 0 };

    public abstract createElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][] }[]): T;
    public abstract changeElement(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][] }[]): void;
    public changeRect() {
        gsap.set(this.borderElement, {
            attr: {
                x: this.border.left,
                y: this.border.bottom,
                width: this.border.right - this.border.left,
                height: this.border.top - this.border.bottom,
                class: "rect"
            }
        });
    }
    public createRect() {
        this.borderElement = document.createElementNS(Shape.SVGNS, "rect");
        this.changeRect();
        return this.borderElement;
    }
    public addClass(className:string):Shape<T>{
        if(this.element) this.element.classList.add(className);
        return this;
    }
    public abstract getMatrix(): number[][];
    public abstract setFromMatrix(matrix: number[][]): void;
}
