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

    getTile(pixelX, pixelY) {
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
