import TilePixel from "./TilePixel";
import p5 from "p5";

class TilemapPixel {
    mapWidth: number;
    mapHeight: number;
    tileWidth: number;
    tileHeight: number;
    grid: TilePixel[][];

    constructor(canvasWidth: number, canvasHeight: number) {
        //width 32 x height 24
        this.mapWidth = 32;
        this.mapHeight = 24;
        [this.tileWidth, this.tileHeight] = this.calcTileDimensions(
            canvasWidth,
            canvasHeight
        );
        this.grid = this.buildGrid();
    }

    getTile(tileX: number, tileY: number) {
        if (this.isInBounds(tileX, tileY)) {
            return this.grid[tileX][tileY];
        } else {
            console.log("tile value out of bounds:  ", tileX, tileY);
            return null;
        }
    }

    getAdjacent(direction: string, currentTile: TilePixel) {
        const [currX, currY] = currentTile.getTileCoord();
        switch (direction.toLowerCase()) {
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

    draw(sketch: p5) {
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

    isInBounds(tileX: number, tileY: number) {
        if (tileX >= this.mapWidth || tileX < 0) {
            return false;
        }

        if (tileY >= this.mapHeight || tileY < 0) {
            return false;
        }

        return true;
    }

    // updateMap(modelGrid:Tile[][]) {
    //     for (let x = 0; x < modelGrid.length; x++) {
    //         for (let y = 0; y < modelGrid[x].length; y++) {
    //             this.grid[x][y].updateState(modelGrid[x][y].getState());
    //         }
    //     }
    // }

    calcTileDimensions(canvasWidth: number, canvasHeight: number) {
        let w = canvasWidth / this.mapWidth;
        let h = canvasHeight / this.mapHeight;
        return [w, h];
    }

    getTileFromPixelCoord(pixelX: number, pixelY: number) {
        const tileCoords: [number, number] = [
            this.getTileXFromCoord(pixelX),
            this.getTileYFromCoord(pixelY),
        ];
        return tileCoords;
    }

    getTileXFromCoord(pixelX: number) {
        return Math.floor(pixelX / this.tileWidth);
    }

    getTileYFromCoord(pixelY: number) {
        return Math.floor(pixelY / this.tileHeight);
    }
}

export default TilemapPixel;
