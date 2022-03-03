import Tilemap from "./Tilemap";

class Model {
    constructor(mapDetails) {
        this.tilemap = new Tilemap(mapDetails);
    }

    update() {
        //nothing for now
    }

    createInitialState() {
        //start point in mid-left area
        this.tilemap.createWall(8, 12);
        //target point in mid-right area
        this.tilemap.createWall(24, 12);
        //couple of wall tiles in middle, blocking a straight line path
        this.tilemap.createWall(15, 9);
        this.tilemap.createWall(15, 10);
        this.tilemap.createWall(16, 10);
        this.tilemap.createWall(16, 11);
        this.tilemap.createWall(16, 12);
        this.tilemap.createWall(16, 13);
        this.tilemap.createWall(16, 14);
        this.tilemap.createWall(15, 14);
        this.tilemap.createWall(15, 15);
    }

    createWall(tileX, tileY) {
        this.tilemap.createWall(tileX, tileY);
    }

    setupObservers(viewTiles) {
        this.tilemap.setupObservers(viewTiles);
    }
}

export default Model;
