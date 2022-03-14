import Tile from './Tile';
import { TileStep, TileStepNullable } from '../Model/TileStep';

class Tilemap {
    mapWidth: number;
    mapHeight: number;
    grid: Tile[][];

    constructor() {
        this.grid = [];
    }

    getAdjacent(direction: string, currentTile: Tile) {
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

    getAdjacentTiles(currentTile: Tile): TileStepNullable[] {
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

    getAdjacentTilesNonNull(currentTile: Tile): TileStep[] {
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

    getDistance(a: Tile, b: Tile) {
        const [aX, aY] = a.getTileCoord();
        const [bX, bY] = b.getTileCoord();
        const xDistance = Math.abs(aX - bX);
        const yDistance = Math.abs(aY - bY);
        return xDistance + yDistance;
    }

    getTile(tileX: number, tileY: number) {
        if (this.isInBounds(tileX, tileY)) {
            return this.grid[tileX][tileY];
        } else {
            console.log('tile value out of bounds:  ', tileX, tileY);
            return null;
        }
    }

    getTileDimensions() {
        return [this.mapWidth, this.mapHeight];
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
}

export default Tilemap;
