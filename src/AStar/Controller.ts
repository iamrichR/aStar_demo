import View from './View/View';
import Model from './Model/Model';
import p5 from 'p5';

// ? should app and controller be merged?

class Controller {
    view: View;
    model: Model;
    setupComplete: boolean;

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

    update() {
        this.model.update();
    }

    draw(sketch: p5) {
        this.view.draw(sketch);
    }

    mousePressed(mouseX: number, mouseY: number) {
        this.model.toggleWallAtPoint(
            ...this.view.getTileFromMouse(mouseX, mouseY)
        );
    }
}

export default Controller;
