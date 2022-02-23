import p5 from "p5";
import Controller from "./Controller";

//TODO - run p5 in instance mode, instead of global

class App {
    constructor() {}

    setup() {
        //this breaks if it's not an anonymous function
        this.sketch = new p5((sketch) => {
            this.buildSketch(sketch);
        });
        this.controller = new Controller();
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
}

let app = new App();

app.setup();
