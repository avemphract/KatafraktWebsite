import { RefMaybe, fakeRef } from "@/utils/types/RefObject";
import type Shape from "./Shape";
export default class Composition {
    shapes: Shape<SVGElement>[];

    public operations: { type: "mult" | "add"; matrix: RefMaybe<number>[][] }[] = [];
    readonly position: RefMaybe<number>[][];
    afterChangeEvent: () => void = () => {
        //empty
    };

    constructor(pieces: Shape<SVGElement>[], posX : RefMaybe<number> = fakeRef(0), posY : RefMaybe<number> = fakeRef(0)) {
        this.shapes = pieces;
        this.position = ([[posX, posY]]);
        this.operations.push({ type: "add", matrix: this.position });
    }

    setAttribute(key: string, value: string) {
        this.shapes.forEach((s) => s.element?.setAttribute(key, value));
    }

    addClass(value: string) {
        this.shapes.forEach((s) => s.element?.classList.add(value));
    }
    removeClass(value: string) {
        this.shapes.forEach((s) => s.element?.classList.remove(value));
    }

    translate(x: number, y: number) {
        this.position[0][0].value += x;
        this.position[0][1].value += y;
        this.shapes.forEach((s) => {
            s.changeElement(this.operations);
        });
    }

    transform( x: number, y: number ) {
        this.position[0][0].value = x;
        this.position[0][1].value = y;
        this.shapes.forEach((s) => {
            s.changeElement(this.operations);
        });
    }
    
    transformX( x: number) {
        this.position[0][0].value = x;
        this.shapes.forEach((s) => {
            s.changeElement(this.operations);
        });
    }
    
    transformY( y: number) {
        this.position[0][1].value = y;
        this.shapes.forEach((s) => {
            s.changeElement(this.operations);
        });
    }

    createElement(element: HTMLElement) {
        element.append(...this.shapes.map((p) => p.createElement(this.operations)));
    }
    changeElement() {
        this.shapes.forEach((s) => s.changeElement(this.operations));
        this.afterChangeEvent();
    }
    createBorder(element: HTMLElement) {
        element.append(...this.shapes.map((p) => p.createRect()));
    }
    getX() {return this.position[0][0].value;}
    getY() {return this.position[0][1].value;}

}
