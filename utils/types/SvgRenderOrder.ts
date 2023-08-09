export class SvgRenderOrder {
    svg: SVGElement;
    order: number;
    constructor(svg: SVGElement, order: number) {
        this.svg = svg;
        this.order = order;
    }

    equals(e: SvgRenderOrder): boolean {
        return this.svg === e.svg;
    }
}
