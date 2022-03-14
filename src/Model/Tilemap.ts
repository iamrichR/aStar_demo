import TilePixel from '../View/TilePixel';
import Entity from './Entities/Entity';
import TileModel from './TileModel';
import { TileStep, TileStepNullable } from './TileStep';

class Tilemap {
    width: number;
    height: number;
    grid: TileModel[][];

    constructor(mapDetails: { dimensions: number[] }) {
        [this.width, this.height] = mapDetails.dimensions;
        this.grid = this.buildGrid();
    }

    getTile(x: number, y: number) {
        if (this.isInBounds(x, y)) {
            return this.grid[x][y];
        } else {
            return null;
        }
    }

    getAdjacent(direction: string, currentTile: TileModel) {
        const [currX, currY] = currentTile.getTileCoord();
        switch (direction.toLowerCase()) {
            case 'north':
                return this.getTile(currX, currY - 1);
                break;
            case 'east':
                return this.getTile(currX + 1, currY);
                break;
            case 'south':
                return this.getTile(currX, currY + 1);
                break;
            case 'west':
                return this.getTile(currX - 1, currY);
                break;
        }
        return null;
    }

    getDistance(a: TileModel, b: TileModel) {
        const [aX, aY] = a.getTileCoord();
        const [bX, bY] = b.getTileCoord();
        const xDistance = Math.abs(aX - bX);
        const yDistance = Math.abs(aY - bY);
        return xDistance + yDistance;
    }

    getAdjacentTiles(currentTile: TileModel): TileStepNullable[] {
        const adjacentTiles: TileStepNullable[] = [];

        ['north', 'east', 'south', 'west'].forEach((dir) => {
            const adjacentTile = this.getAdjacent(dir, currentTile);
            adjacentTiles.push({
                direction: dir,
                tile: adjacentTile,
            });
        });

        return adjacentTiles;
    }

    getAdjacentTilesNonNull(currentTile: TileModel): TileStep[] {
        const adjacentTiles: TileStep[] = [];

        this.getAdjacentTiles(currentTile).forEach((step) => {
            if (step.tile !== null) {
                adjacentTiles.push({
                    direction: step.direction,
                    tile: step.tile,
                });
            }
        });

        return adjacentTiles;
    }

    setDimensions(dimensions: number[]) {
        [this.width, this.height] = dimensions;
    }

    buildGrid() {
        const grid = [...Array(this.width)].map((column, tileX) => {
            return [...Array(this.height)].map((cell, tileY) => {
                const newTile = new TileModel(tileX, tileY);
                return newTile;
            });
        });

        return grid;
    }

    isInBounds(tileX: number, tileY: number) {
        if (tileX >= this.width || tileX < 0) {
            return false;
        }

        if (tileY >= this.height || tileY < 0) {
            return false;
        }

        return true;
    }

    setupObservers(viewTiles: TilePixel[][]) {
        this.grid.forEach((column, tileX) => {
            column.forEach((cell, tileY) => {
                cell.subscribe(viewTiles[tileX][tileY]);
            });
        });
    }

    toggleWallAtTile(tileX: number, tileY: number) {
        if (this.isInBounds(tileX, tileY)) {
            this.grid[tileX][tileY].createWall();
        }
    }

    createEntityAtTile(tileX: number, tileY: number, entity: Entity) {
        this.grid[tileX][tileY].setEntity(entity);
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
