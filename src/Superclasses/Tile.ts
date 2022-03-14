import Entity from '../Model/Entities/Entity';

class Tile {
    tileX: number;
    tileY: number;
    entity: Entity | null;
    considered: boolean;
    inPath: boolean;

    constructor(tileX: number, tileY: number) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.entity = null;
        this.considered = false;
        this.inPath = false;
    }

    getTileCoord() {
        return [this.tileX, this.tileY];
    }
}

export default Tile;
