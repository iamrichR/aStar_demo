import Tilemap from './Tilemap';
import Wall from './Entities/Wall';
import StartPoint from './Entities/StartPoint';
import EndPoint from './Entities/EndPoint';
import Search from './Search';
import TilePixel from '../View/TilePixel';

class Model {
    tilemap: Tilemap;
    isSearching: boolean;
    lastSearch: Search | null;

    constructor(mapDetails: { dimensions: number[] }) {
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

    toggleWallAtPoint(tileX: number, tileY: number) {
        this.tilemap.toggleWallAtTile(tileX, tileY);
    }

    setupObservers(viewTiles: TilePixel[][]) {
        this.tilemap.setupObservers(viewTiles);
    }

    startSearch() {
        this.isSearching = true;
        const startPoint = this.tilemap.grid[8][12];
        const goalPoint = this.tilemap.grid[24][12];
        // let search = new Search();
        // let searchDetails = search.simpleTestSearch(
        //     startPoint,
        //     goalPoint,
        //     this.tilemap.grid
        // );

        // if (searchDetails.success) {
        //     this.lastSearch = search;
        //     this.isSearching = false;
        // }

        // return searchDetails;

        const search = new Search();
        const searchDetails = search.aStarSearch(
            startPoint,
            goalPoint,
            this.tilemap
        );
    }
}

export default Model;
