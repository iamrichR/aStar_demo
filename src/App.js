import p5 from "p5";
import Controller from "./Controller";

//TODO - run p5 in instance mode, instead of global

class App {
    constructor() {}

    setup() {
        this.sketch = new p5((sketch) => {
            this.buildSketch(sketch);
        });
        this.controller = new Controller();
        this.attachButtonEvents({
            startButton: document.getElementById("start-btn"),
        });
    }

    buildSketch(sketch) {
        sketch.setup = () => {
            this.controller.setup(this.sketch);
        };

        sketch.draw = () => {
            this.controller.update();
            this.controller.draw(this.sketch);
        };

        sketch.mousePressed = () => {
            this.controller.mousePressed(sketch.mouseX, sketch.mouseY, sketch);
        };

        // ///TODO - implement dynamically changing the display on resize.  Maybe?
        // sketch.windowResize = () => {
        //     this.controller.windowResized();
        // };
    }

    attachButtonEvents(elements) {
        elements.startButton.addEventListener("click", () => {
            this.controller.startSearch(this.sketch);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let app = new App();
    app.setup();
});
