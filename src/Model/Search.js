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
                continue;
            }

            currentTile = this.map[coordX + 1][coordY];
            [coordX, coordY] = currentTile.getTileCoord();
            this.path.push("east");
        }

        return {
            success: true,
            start: this.start.getTileCoord(),
            end: this.end.getTileCoord(),
            path: this.path,
        };
    }

    //getDistance()
}

export default Search;
