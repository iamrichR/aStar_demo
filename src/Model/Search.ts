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
                newPath.getEndpoint().setConsidered(true);
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

        //check for completion
        if (this.currentPath.getEndpoint() == this.end) {
            console.log(this.currentPath.steps);
            this.searchComplete = true;
        }
    }

    assignNewPath(newPath: SearchPath, idx: number): void {
        this.currentPath.steps.forEach((step) => {
            step.tile.inPath == false;
        });
        newPath.steps.forEach((step) => {
            step.tile.inPath == true;
        });
        this.currentPath = newPath;
        this.toConsider.splice(idx, 1);
        this.currentPath.getEndpoint().setInPath(true);
        this.currentPath.getEndpoint().setConsidered(false);
    }
}

// function aStarSearch(start: TileModel, end: TileModel, map: TilemapModel) {
//     console.log('searching...');
//     let searchComplete = false;

//     const toConsider: SearchPath[] = [new SearchPath(start)];
//     const alreadyConsidered: SearchPath[] = [];

//     let currentPath: SearchPath = new SearchPath(start);

//     //! testing
//     const i = 0;
//     //!

//     while (!searchComplete) {
//         const currentTile = currentPath.getEndpoint();
//         currentTile.setInPath(true);
//         const newTilesToCheck: TileStep[] = map
//             .getAdjacentTilesNonNull(currentTile)
//             .filter((step) => {
//                 return (
//                     step.tile.entity === null ||
//                     step.tile.entity.getEntityType() !== 'Wall'
//                 );
//             });

//         //iterate through adjacent tiles from current step
//         newTilesToCheck.forEach((step) => {
//             // if (
//             //     step.tile.entity == null ||
//             //     !(step.tile.entity.getEntityType() != 'Wall')
//             // ) {
//             //create a new path from an adjacent tile
//             const newPath = SearchPath.copyPath(currentPath);
//             newPath.addStep(step, map.getDistance(step.tile, end));

//             //ensure that a given tile hasn't already been checked
//             let pathIsNew = true;

//             //TODO - make sure new tile isn't already in the path

//             //this is slow, but the tilemaps aren't big so it should be fine
//             toConsider.forEach((existingPath) => {
//                 if (existingPath.getEndpoint() == newPath.getEndpoint()) {
//                     pathIsNew = false;
//                 }
//             });

//             alreadyConsidered.forEach((closedPath) => {
//                 if (closedPath.getEndpoint() == newPath.getEndpoint()) {
//                     pathIsNew = false;
//                 }
//             });

//             if (pathIsNew) {
//                 toConsider.push(newPath);
//                 newPath.getEndpoint().setConsidered(true);
//             }
//             // }
//         });

//         let bestScore = 0;
//         let bestScoreIdx = 0;

//         toConsider.forEach((path, idx) => {
//             if (path.fScore > bestScore) {
//                 bestScore = path.fScore;
//                 bestScoreIdx = idx;
//             }
//         });

//         currentPath = assignNewPath(
//             toConsider,
//             currentPath,
//             toConsider[bestScoreIdx],
//             bestScoreIdx
//         );

//         if (currentPath.getEndpoint() == end) {
//             console.log(currentPath.steps);
//             searchComplete = true;
//         }
//     }

//     // toConsider.forEach((path) => {
//     //     console.log(path.steps);
//     // });
// }

// function assignNewPath(
//     toConsider: SearchPath[],
//     currentPath: SearchPath,
//     newPath: SearchPath,
//     idx: number
// ): SearchPath {
//     currentPath.steps.forEach((step) => {
//         step.tile.inPath == false;
//     });
//     newPath.steps.forEach((step) => {
//         step.tile.inPath == true;
//     });
//     currentPath = newPath;
//     toConsider.splice(idx, 1);
//     currentPath.getEndpoint().setInPath(true);
//     currentPath.getEndpoint().setConsidered(false);
//     return currentPath;
// }

export default Searcher;
