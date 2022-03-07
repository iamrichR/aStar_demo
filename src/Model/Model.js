import Tilemap from "./Tilemap";
import Wall from "./Entities/Wall";
import StartPoint from "./Entities/StartPoint";
import EndPoint from "./Entities/EndPoint";
import Search from "./Search";

class Model {
    constructor(mapDetails) {
        this.tilemap = new Tilemap(mapDetails);
        this.isSearching = false;
        this.lastSearch = null;
    }

    update() {
        //nothing for now
    }

    createInitialState() {
        //start point in mid-left area
        this.tilemap.createEntityAtTile(8, 12, new StartPoint(0, 0));
        //target point in mid-right area
        this.tilemap.createEntityAtTile(24, 12, new EndPoint(0, 0));
        //couple of wall tiles in middle, blocking a straight line path
        this.tilemap.createEntityAtTile(15, 9, new Wall(0, 0));
        this.tilemap.createEntityAtTile(15, 10, new Wall(0, 0));
        this.tilemap.createEntityAtTile(16, 10, new Wall(0, 0));
        //this.tilemap.createEntityAtTile(16, 11, new Wall(0, 0));
        //this.tilemap.createEntityAtTile(16, 12, new Wall(0, 0));
        //this.tilemap.createEntityAtTile(16, 13, new Wall(0, 0));
        this.tilemap.createEntityAtTile(16, 14, new Wall(0, 0));
        this.tilemap.createEntityAtTile(15, 14, new Wall(0, 0));
        this.tilemap.createEntityAtTile(15, 15, new Wall(0, 0));
    }

    toggleWallAtPoint(tileX, tileY) {
        this.tilemap.toggleWallAtTile(tileX, tileY);
    }

    setupObservers(viewTiles) {
        this.tilemap.setupObservers(viewTiles);
    }

    startSearch() {
        this.isSearching = true;
        let startPoint = this.tilemap.grid[8][12];
        let goalPoint = this.tilemap.grid[24][12];
        let search = new Search(startPoint, goalPoint, this.tilemap.grid);
        let searchDetails = search.simpleTestSearch();

        if (searchDetails.success) {
            this.lastSearch = search;
        }

        return searchDetails;
    }
}

export default Model;
