import SearchPath from './SearchPath';
import TileModel from './TileModel';
import TilemapModel from './TilemapModel';
import { TileStep } from '../Interfaces/TileUtilities';

function aStarSearch(start: TileModel, end: TileModel, map: TilemapModel) {
    console.log('searching...');
    let searchComplete = false;

    const toConsider: SearchPath[] = [new SearchPath(start)];
    const alreadyConsidered: SearchPath[] = [];

    const currentPath: SearchPath = new SearchPath(start);

    //! testing
    let i = 0;
    //!

    while (!searchComplete) {
        const currentTile = currentPath.getEndpoint();
        const newTilesToCheck: TileStep[] =
            map.getAdjacentTilesNonNull(currentTile);

        //iterate through adjacent tiles from current step
        newTilesToCheck.forEach((step) => {
            //create a new path from an adjacent tile
            const newPath = SearchPath.copyPath(currentPath);
            newPath.addStep(step, map.getDistance(step.tile, end));

            //ensure that a given tile hasn't already been checked
            let pathIsNew = true;

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
            }
        });

        //! this is for testing purposes, delete later
        //TODO - this code is how to move forward to new step, wrap it in a function or smth
        if (i == 0) {
            currentPath.addStep(
                toConsider[2].steps.slice(-1)[0],
                map.getDistance(toConsider[2].getEndpoint(), end)
            );
            toConsider.splice(2, 1);
            i++;
        } else {
            searchComplete = true;
        }
        //!

        // searchComplete = true;
    }

    toConsider.forEach((path) => {
        // console.log(path.steps);
    });
}

export default aStarSearch;
