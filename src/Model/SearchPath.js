class SearchPath {
    constructor(directions, start) {
        this.directions = directions;
        this.startPoint = start;
        this.endpoint = start;
        //TODO - figure out how to properly represent these values
        this.heuristic = 0;
        this.cost = 0;
        this.fScore = 0;
    }

    addStep(direction, nextTile, heuristic) {
        this.directions.push(direction);
        this.endpoint = nextTile;
        this.cost++;
        this.heuristic = heuristic;
        this.calculatefScore();
    }

    calculatefScore() {
        //TODO - figure out what the actual math for this is supposed to be
        this.fScore = this.heuristic - this.cost;
    }

    static copyPath(oldPath) {
        let newPath = new SearchPath(oldPath.directions, oldPath.startPoint);
        newPath.endpoint = oldPath.endpoint;
        newPath.heuristic = oldPath.heuristic;
        newPath.cost = oldPath.cost;
        newPath.fScore = oldPath.fScore;
        return newPath;
    }
}

export default SearchPath;
