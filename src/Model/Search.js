import SearchPath from "./SearchPath";

class Search {
    constructor() {
        this.path = null;
    }

    resetPath() {
        this.path = null;
    }

    simpleTestSearch(start, end, map) {
        this.resetPath();
        let complete = false;
        let currentTile = start;
        let [coordX, coordY] = start.getTileCoord();

        while (!complete) {
            if (currentTile == end) {
                complete = true;
                continue;
            }

            currentTile = map[coordX + 1][coordY];
            [coordX, coordY] = currentTile.getTileCoord();
            this.path.push("east");
        }

        return {
            success: true,
            start: start.getTileCoord(),
            end: end.getTileCoord(),
            path: this.path,
        };
    }

    aStarSearch(start, end, map) {
        this.resetPath();
        let searchComplete = false;
        //currentPath - an array of e/w/n/s directions
        let currentPath = new SearchPath([], start);
        //toConsider - an array of available path choices
        //{tile object, heuristic, cost (num of steps), Fscore}
        //note - cost would just be the (length of the path array - 1)
        let toConsider = [];

        while (!searchComplete) {
            let currentTile = currentPath.endpoint;
            let newTiles = Object.values(map.getAllAdjacentTiles(currentTile));

            //TODO - also filter out tiles already in path - including startPoint
            newTiles.filter((tile) => !toConsider.includes(tile));

            newTiles.forEach((tile) => {
                //create SearchPath object
                //calculate heuristic etc
                /*each adjacent tile should be a duplicate
                  of the current SearchPath obj, with an added step to
                  move to the new tile */
                //toConsider.push(searchpath obj)
            });

            toConsider = toConsider.concat(newTiles);

            //moving to a second step in order to test the filter
            /*hold onto this code, because this is how you create a 
              possible next step */
            let newPath = SearchPath.copyPath(currentPath);
            let nextTile = map.getAdjacent("north", currentTile);
            newPath.addStep("north", nextTile, map.getDistance(nextTile, end));
            currentPath = newPath;

            // ! repeated code for testing, delete later
            currentTile = currentPath.endpoint;
            newTiles = Object.values(map.getAllAdjacentTiles(currentTile));

            newTiles.filter((tile) => !toConsider.includes(tile));
            toConsider = toConsider.concat(newTiles);
            console.log(currentPath);
            console.log(toConsider);
            // !

            //add new options to toConsider
            //calculate F-Score for any new options
            //determine the heuristic and cost of each tile
            //combine those values to an F-score
            //move to best next path option and go back to start of loop

            searchComplete = true;
        }
    }
}

export default Search;
