import SearchPath from './SearchPath';
import TileModel from './TileModel';
import TilemapModel from './TilemapModel';
import { TileStep } from '../Interfaces/TileUtilities';

function aStarSearch(start: TileModel, end: TileModel, map: TilemapModel) {
    console.log('searching...');
    let searchComplete = false;

    const toConsider: SearchPath[] = [new SearchPath(start)];
    const alreadyConsidered: SearchPath[] = [];

    let currentPath: SearchPath = new SearchPath(start);

    //! testing
    const i = 0;
    //!

    while (!searchComplete) {
        const currentTile = currentPath.getEndpoint();
        currentTile.setInPath(true);
        const newTilesToCheck: TileStep[] =
            map.getAdjacentTilesNonNull(currentTile);

        //iterate through adjacent tiles from current step
        newTilesToCheck.forEach((step) => {
            //create a new path from an adjacent tile
            const newPath = SearchPath.copyPath(currentPath);
            newPath.addStep(step, map.getDistance(step.tile, end));

            //ensure that a given tile hasn't already been checked
            let pathIsNew = true;

            //TODO - make sure new tile isn't already in the path

            //this is slow, but the tilemaps aren't big so it should be fine
            toConsider.forEach((existingPath) => {
                if (existingPath.getEndpoint() == newPath.getEndpoint()) {
                    pathIsNew = false;
                }
            });

            alreadyConsidered.forEach((closedPath) => {
                if (closedPath.getEndpoint() == newPath.getEndpoint()) {
                    pathIsNew = false;
                }
            });

            if (pathIsNew) {
                toConsider.push(newPath);
                newPath.getEndpoint().setConsidered(true);
            }
        });

        let bestScore = 0;
        let bestScoreIdx = 0;

        toConsider.forEach((path, idx) => {
            if (path.fScore > bestScore) {
                bestScore = path.fScore;
                bestScoreIdx = idx;
            }
        });

        currentPath = assignNewPath(
            toConsider,
            currentPath,
            toConsider[bestScoreIdx],
            bestScoreIdx
        );

        if (currentPath.getEndpoint() == end) {
            console.log(currentPath.steps);
            searchComplete = true;
        }
    }

    // toConsider.forEach((path) => {
    //     console.log(path.steps);
    // });
}

function assignNewPath(
    toConsider: SearchPath[],
    currentPath: SearchPath,
    newPath: SearchPath,
    idx: number
): SearchPath {
    currentPath = newPath;
    toConsider.splice(idx, 1);
    currentPath.getEndpoint().setInPath(true);
    currentPath.getEndpoint().setConsidered(false);
    return currentPath;
}

export default aStarSearch;
