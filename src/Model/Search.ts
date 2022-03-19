import SearchPath from './SearchPath';
import TileModel from './TileModel';
import TilemapModel from './TilemapModel';
import { TileStep } from '../Interfaces/TileUtilities';

class Searcher {
    start: TileModel;
    end: TileModel;
    map: TilemapModel;
    toConsider: SearchPath[];
    alreadyConsidered: SearchPath[];
    currentPath: SearchPath;
    searchComplete: boolean;
    numSteps: number;

    constructor(start: TileModel, end: TileModel, map: TilemapModel) {
        this.start = start;
        this.end = end;
        this.map = map;
        this.toConsider = [];
        this.alreadyConsidered = [];
        this.currentPath = new SearchPath(start);
        this.searchComplete = false;
        console.log('beginning search...');
        this.numSteps = 0;
    }

    aStarSearch_step() {
        console.log(`search step #${this.numSteps}`);

        const currentTile = this.currentPath.getEndpoint();

        //get all adjacent tiles from current
        //and filter out out-of-bounds and impassable tiles.
        const newTilesToCheck: TileStep[] = this.map
            .getAdjacentTilesNonNull(currentTile)
            .filter((step) => {
                return step.tile.entity === null || step.tile.entity.isPassable;
            });

        //iterate through adjacent tiles from current step
        newTilesToCheck.forEach((step) => {
            //create a new path from an adjacent tile
            const newPath = SearchPath.copyPath(this.currentPath);
            newPath.addStep(step, this.map.getDistance(step.tile, this.end));

            //ensure that a given tile hasn't already been checked
            let pathIsNew = true;

            //this is slow, but the tilemaps aren't big so it should be fine
            this.toConsider.forEach((existingPath) => {
                if (existingPath.getEndpoint() == newPath.getEndpoint()) {
                    pathIsNew = false;
                }
            });

            this.alreadyConsidered.forEach((closedPath) => {
                if (closedPath.getEndpoint() == newPath.getEndpoint()) {
                    pathIsNew = false;
                }
            });

            if (pathIsNew) {
                this.toConsider.push(newPath);
                // newPath.getEndpoint().setConsidered(true);
            }
        });

        let bestScore = 0;
        let bestScoreIdx = 0;

        //find the best Fscore out of all open paths
        this.toConsider.forEach((path, idx) => {
            if (path.fScore > bestScore) {
                bestScore = path.fScore;
                bestScoreIdx = idx;
            }
        });

        //set new currentPath
        this.assignNewPath(this.toConsider[bestScoreIdx], bestScoreIdx);

        this.setTileSearchFlags();

        //check for completion
        if (this.currentPath.getEndpoint() == this.end) {
            console.log(this.currentPath.steps);
            this.searchComplete = true;
        }
    }

    setTileSearchFlags() {
        this.map.clearAllSearchFlags();
        this.toConsider.forEach((path) => {
            path.getEndpoint().setConsidered(true);
        });
        this.currentPath.steps.forEach((step) => {
            step.tile.setConsidered(false);
            step.tile.setInPath(true);
        });
    }

    assignNewPath(newPath: SearchPath, idx: number): void {
        this.currentPath = newPath;
        this.toConsider.splice(idx, 1);
    }
}

export default Searcher;
