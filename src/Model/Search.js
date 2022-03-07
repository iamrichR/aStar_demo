class Search {
    constructor(start, end, map) {
        this.start = start;
        this.end = end;
        this.map = map;
        this.path = [];
    }

    simpleTestSearch() {
        let complete = false;
        let currentTile = this.start;
        let [coordX, coordY] = this.start.getTileCoord();

        while (!complete) {
            if (currentTile == this.end) {
                complete = true;
                console.log("here?");
                continue;
            }

            currentTile = this.map[coordX + 1][coordY];
            [coordX, coordY] = currentTile.getTileCoord();
            this.path.push([1, 0]);
        }

        return {
            success: true,
            start: this.start,
            end: this.end,
            path: this.path,
        };
    }

    //getDistance()
}

export default Search;
