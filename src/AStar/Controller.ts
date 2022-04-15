import View from './View/View';
import Model from './Model/Model';
import p5 from 'p5';

// ? should app and controller be merged?

class Controller {
    view: View;
    model: Model;
    setupComplete: boolean;
    placingState: string;

    constructor() {
        this.setupComplete = false;
    }

    /*
    all this stuff has to be initialized outside of the constuctor 
    because of how the p5 object works.  Could be worked around, but
    not really worth it
    */
    setup(sketch: p5) {
        this.view = new View(sketch);
        this.model = new Model(this.view.getMapDetails());
        this.model.setupObservers(this.view.tilemap.grid);
        this.model.createInitialState();
        //this.model.tilemap.checkerboard();
        this.placingState = 'START';

        this.setupComplete = true;
    }

    startSearch() {
        if (!this.model.isSearching) {
            this.model.startSearch();
        }
    }

    nextSearchStep() {
        if (this.model.isSearching) {
            this.model.nextSearchStep();
        }
    }

    updatePlacingState(newState: string) {
        this.placingState = newState;
    }

    update() {
        this.model.update();
    }

    draw(sketch: p5) {
        this.view.draw(sketch);
    }

    mousePressed(mouseX: number, mouseY: number) {
        switch (this.placingState) {
            case 'START':
                console.log('START');
                break;
            case 'END':
                console.log('END');
                break;
            case 'WALL':
                this.model.toggleWallAtPoint(
                    ...this.view.getTileFromMouse(mouseX, mouseY)
                );
                break;
            default:
                console.log(
                    'somehow an unauthorized placing state value got through?'
                );
                break;
        }
    }
}

export default Controller;
