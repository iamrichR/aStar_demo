import Tilemap from "./Tilemap";

class Model {
    constructor(mapDetails) {
        this.tilemap = new Tilemap(mapDetails);
    }

    update() {
        //nothing for now
    }

    createWall(tileX, tileY) {
        this.tilemap.createWall(tileX, tileY);
    }

    setupObservers(viewTiles) {
        this.tilemap.setupObservers(viewTiles);
    }
}

export default Model;
