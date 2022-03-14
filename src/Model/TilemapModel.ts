import Tilemap from '../Superclasses/Tilemap';
import TilePixel from '../View/TilePixel';
import Entity from './Entities/Entity';
import TileModel from './TileModel';
import { TileStep, TileStepNullable } from './TileStep';

class TilemapModel extends Tilemap {
    mapWidth: number;
    mapHeight: number;
    grid: TileModel[][];

    constructor(mapDetails: { dimensions: number[] }) {
        super();
        [this.mapWidth, this.mapHeight] = mapDetails.dimensions;
        this.grid = this.buildGrid();
    }

    setDimensions(dimensions: number[]) {
        [this.mapWidth, this.mapHeight] = dimensions;
    }

    buildGrid() {
        const grid = [...Array(this.mapWidth)].map((column, tileX) => {
            return [...Array(this.mapHeight)].map((cell, tileY) => {
                const newTile = new TileModel(tileX, tileY);
                return newTile;
            });
        });

        return grid;
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
                    tileX == Math.round(this.mapWidth / 2 - 1) ||
                    tileY == Math.round(this.mapHeight / 2 - 1) ||
                    tileX == this.mapWidth - 1 ||
                    tileY == this.mapHeight - 1
                ) {
                    cell.toggleWall();
                }
            });
        });
    }
}

export default TilemapModel;
