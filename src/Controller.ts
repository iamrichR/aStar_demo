import View from "./View/View";
import Model from "./Model/Model";
import p5 from "p5";

// ? should app and controller be merged?

class Controller {
    view: View;
    model: Model;

    constructor() {}

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
    }

    startSearch(sketch: p5) {
        if (!this.model.isSearching) {
            let searchDetails = this.model.startSearch();

            //TODO - you shouldn't need to activate anything in view to update map
            //just make use of the tile observers to update search details
            //this.view.animateSearch(sketch, searchDetails);

            //TODO - have something optional in view that can slow down and animate search
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
