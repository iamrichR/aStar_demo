import Entity from '../Model/Entities/Entity';
import p5 from 'p5';
import Tile from '../Superclasses/Tile';
import { TileState } from '../Interfaces/TileUtilities';

class TilePixel extends Tile {
    tileX: number;
    tileY: number;
    entity: Entity | null;
    considered: boolean;
    inPath: boolean;
    coordX: number;
    coordY: number;
    width: number;
    height: number;

    constructor(tileX: number, tileY: number, width: number, height: number) {
        super(tileX, tileY);
        this.coordX = tileX * width;
        this.coordY = tileY * height;
        this.width = width;
        this.height = height;
    }

    getPixelCoord() {
        return [this.coordX, this.coordY];
    }

    notify(modelState: TileState) {
        this.updateState(modelState);
    }

    draw(sketch: p5) {
        this.drawOutline(sketch);
        if (this.considered) this.drawConsidered(sketch);
        if (this.inPath) this.drawInPath(sketch);
        if (this.entity) {
            switch (this.entity.getEntityType().toLowerCase()) {
                case 'wall':
                    this.drawFilled(sketch);
                    break;
                case 'startpoint':
                    this.drawEllipse(sketch, '#dc143c');
                    break;
                case 'endpoint':
                    this.drawEllipse(sketch, '#4169e1');
                    break;
                default:
                    this.drawFilled(sketch, '#ff7f50');
                    break;
            }
        }
    }

    drawConsidered(sketch: p5) {
        const [x, y] = this.getPixelCoord();
        sketch.fill('#fad6b1');
        sketch.rect(x, y, this.width, this.height);
    }

    drawInPath(sketch: p5) {
        //TODO - draw a vertical or horizontal line, depending on the path
        const [x, y] = this.getPixelCoord();
        //let midX = x + this.width / 2 - 1;
        const midY = y + this.height / 2 - 1;
        sketch.fill('#ff0000');
        sketch.rect(x, midY, this.width, 3);
    }

    drawOutline(sketch: p5, fill = '#000000') {
        const [x, y] = this.getPixelCoord();
        const dx = x + this.width;
        const dy = y + this.height;
        sketch.fill(fill);
        sketch.line(x, y, dx, y);
        sketch.line(x, y, x, dy);
        sketch.line(dx, dy, dx, y);
        sketch.line(dx, dy, x, dy);
    }

    drawFilled(sketch: p5, fill = '#000000') {
        const [x, y] = this.getPixelCoord();
        sketch.fill(fill);
        sketch.rect(x, y, this.width, this.height);
    }

    drawEllipse(sketch: p5, fill = '#000000') {
        const [x, y] = this.getPixelCoord();
        sketch.fill(fill);
        sketch.ellipse(x, y, this.width, this.height);
    }

    updateState(modelState: TileState) {
        this.entity = modelState.entity;
        this.considered = modelState.considered;
        this.inPath = modelState.inPath;
    }
}

export default TilePixel;
