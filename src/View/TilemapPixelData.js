import TilePixel from "./TilePixel";

class TilemapPixelData {
    constructor(canvas) {
        //width 32 x height 24
        this.canvas = canvas;
        this.mapWidth = 32;
        this.mapHeight = 24;
        [this.tileWidth, this.tileHeight] = this.calcTileDimensions();
        this.grid = this.buildGrid();
    }

    getTile(tileX, tileY) {
        if (this.isInBounds(tileX, tileY)) {
            return this.grid[tileX][tileY];
        } else {
            console.log("tile value out of bounds:  ", tileX, tileY);
            return null;
        }
    }

    getAdjacent(dir, currentTile) {
        const [currX, currY] = currentTile.getTileCoord();
        switch (dir.toLowerCase()) {
            case "north":
                return this.getTile(currX, currY - 1);
                break;
            case "east":
                return this.getTile(currX + 1, currY);
                break;
            case "south":
                return this.getTile(currX, currY + 1);
                break;
            case "west":
                return this.getTile(currX - 1, currY);
                break;
        }
    }

    getTileDimensions() {
        return [this.mapWidth, this.mapHeight];
    }

    getMapDetails() {
        return {
            dimensions: this.getTileDimensions(),
        };
    }

    draw(sketch) {
        this.grid.forEach((column) => {
            column.forEach((tile) => {
                tile.draw(sketch);
            });
        });
    }

    buildGrid() {
        let grid = [...Array(this.mapWidth)].map((column, tileX) => {
            return [...Array(this.mapHeight)].map((cell, tileY) => {
                let newTile = new TilePixel(
                    tileX,
                    tileY,
                    this.tileWidth,
                    this.tileHeight
                );
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

    updateMap(modelGrid) {
        for (let x = 0; x < modelGrid.length; x++) {
            for (let y = 0; y < modelGrid[x].length; y++) {
                this.grid[x][y].updateState(modelGrid[x][y].getState());
            }
        }
    }

    calcTileDimensions() {
        let w = this.canvas.canvas.width / this.mapWidth;
        let h = this.canvas.canvas.height / this.mapHeight;
        return [w, h];
    }

    getTileFromPixelCoord(pixelX, pixelY) {
        let [tileX, tileY] = [
            this.getTileXFromCoord(pixelX),
            this.getTileYFromCoord(pixelY),
        ];
        return [tileX, tileY];
    }

    getTileXFromCoord(pixelX) {
        return Math.floor(pixelX / this.tileWidth);
    }

    getTileYFromCoord(pixelY) {
        return Math.floor(pixelY / this.tileHeight);
    }
}

export default TilemapPixelData;
