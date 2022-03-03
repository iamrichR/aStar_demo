import View from "./View/View";
import Model from "./Model/Model";

// ? should app and controller be merged?

class Controller {
    constructor() {}

    setup(sketch) {
        this.view = new View(sketch);
        this.model = new Model(this.view.getMapDetails());
        this.model.setupObservers(this.view.tilemap.grid);
        this.model.createInitialState();
        //this.model.tilemap.checkerboard();
    }

    update() {
        this.model.update();
    }

    draw(sketch) {
        this.view.draw(sketch);
    }

    mousePressed(mouseX, mouseY) {
        this.model.toggleWallAtPoint(...this.view.getTile(mouseX, mouseY));
    }
}

export default Controller;
