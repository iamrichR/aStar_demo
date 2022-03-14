import Tile from '../Superclasses/Tile';

interface TileStep {
    direction: string;
    tile: Tile;
}

interface TileStepNullable {
    direction: string;
    tile: Tile | null;
}

export { TileStep, TileStepNullable };
