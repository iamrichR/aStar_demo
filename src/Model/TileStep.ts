import TileModel from './TileModel';

interface TileStep {
    direction: string;
    tile: TileModel;
}

interface TileStepNullable {
    direction: string;
    tile: TileModel | null;
}

export { TileStep, TileStepNullable };
