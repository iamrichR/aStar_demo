import TileModel from './TileModel';
import { TileStep } from '../Interfaces/TileUtilities';

class SearchPath {
    steps: TileStep[];
    startPoint: TileModel;
    heuristic: number;
    numSteps: number;
    fScore: number;

    constructor(start: TileModel, steps: TileStep[] = []) {
        this.startPoint = start;
        this.steps = steps;
        //TODO - figure out how to properly represent these values
        this.heuristic = 0;
        this.numSteps = 0;
        this.fScore = 0;
    }

    createAndAddStep(
        direction: string,
        tile: TileModel,
        heuristic: number
    ): void {
        const newStep: TileStep = { direction: direction, tile: tile };
        this.addStep(newStep, heuristic);
    }

    addStep(newStep: TileStep, heuristic: number): void {
        this.steps.push(newStep);
        this.numSteps++;
        this.heuristic = heuristic;
        this.calculatefScore();
    }

    getEndpoint(): TileModel {
        if (this.steps.length == 0) {
            return this.startPoint;
        } else {
            return this.steps[this.steps.length - 1].tile;
        }
    }

    calculatefScore() {
        //TODO - figure out what the actual math for this is supposed to be
        this.fScore = 200 - this.heuristic + this.numSteps;
    }

    static copyPath(oldPath: SearchPath) {
        const newPath = new SearchPath(
            oldPath.startPoint,
            oldPath.steps.slice()
        );
        newPath.heuristic = oldPath.heuristic;
        newPath.numSteps = oldPath.numSteps;
        newPath.fScore = oldPath.fScore;
        return newPath;
    }
}

export default SearchPath;
