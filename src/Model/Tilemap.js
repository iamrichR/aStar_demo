import Tile from "./Tile";

class Tilemap {
    constructor(mapDetails) {
        [this.width, this.height] = mapDetails.dimensions;
        this.grid = this.buildGrid();
    }

    setDimensions(dimensions) {
        [this.width, this.height] = dimensions;
    }

    buildGrid() {
        let grid = [...Array(this.width)].map((column, tileX) => {
            return [...Array(this.height)].map((cell, tileY) => {
                let newTile = new Tile(tileX, tileY);
                return newTile;
            });
        });

        return grid;
    }

    isInBounds(tileX, tileY) {
        if (tileX >= this.width || tileX < 0) {
            return false;
        }

        if (tileY >= this.height || tileY < 0) {
            return false;
        }

        return true;
    }

    setupObservers(viewTiles) {
        this.grid.forEach((column, tileX) => {
            column.forEach((cell, tileY) => {
                cell.subscribe(viewTiles[tileX][tileY]);
            });
        });
    }

    createWall(tileX, tileY) {
        if (this.isInBounds(tileX, tileY)) {
            this.grid[tileX][tileY].toggleWall();
        }
    }

    checkerboard() {
        this.grid.map((column, tileX) => {
            column.map((cell, tileY) => {
                //  CHECKERBOARD PATTERN  //
                // if (tileX % 2 == 0) {
                //     if (tileY % 2 == 0) {
                //         cell.toggleWall();
                //     } else {
                //         cell.toggleWall();
                //     }
                // } else {
                //     if (tileY % 2 == 0) {
                //         cell.toggleWall();
                //     } else {
                //         cell.toggleWall();
                //     }
                // }
                // PERIMETER FILL //
                // if (
                //     tileX == 0 ||
                //     tileY == 0 ||
                //     tileX == this.mapWidth - 1 ||
                //     tileY == this.mapHeight - 1
                // ) {
                //     cell.toggleWall();
                // }
                // WINDOW PATTERN //
                if (
                    tileX == 0 ||
                    tileY == 0 ||
                    tileX == Math.round(this.width / 2 - 1) ||
                    tileY == Math.round(this.height / 2 - 1) ||
                    tileX == this.width - 1 ||
                    tileY == this.height - 1
                ) {
                    cell.toggleWall();
                }
            });
        });
    }
}

export default Tilemap;
