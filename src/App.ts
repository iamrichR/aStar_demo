import p5 from 'p5';
import Controller from './Controller';

//TODO - run p5 in instance mode, instead of global

class App {
    sketch: p5;
    controller: Controller;

    // constructor() {}

    setup() {
        this.sketch = new p5((sketch) => {
            this.buildSketch(sketch);
        });
        this.controller = new Controller();
        this.attachButtonEvents({
            startButton: document.getElementById('start-btn'),
            nextButton: document.getElementById('next-btn'),
        });
    }

    buildSketch(sketch: p5) {
        sketch.setup = () => {
            this.controller.setup(this.sketch);
        };

        sketch.draw = () => {
            this.controller.update();
            this.controller.draw(this.sketch);
        };

        sketch.mousePressed = () => {
            this.controller.mousePressed(sketch.mouseX, sketch.mouseY);
        };

        // ///TODO - implement dynamically changing the display on resize.  Maybe?
        // sketch.windowResize = () => {
        //     this.controller.windowResized();
        // };
    }

    attachButtonEvents(elements: {
        startButton: HTMLElement | null;
        nextButton: HTMLElement | null;
    }) {
        if (elements.startButton != null) {
            elements.startButton.addEventListener('click', () => {
                this.controller.startSearch();
            });
        } else {
            console.log('ERROR:  start button element not found');
        }
        if (elements.nextButton != null) {
            elements.nextButton.addEventListener('click', () => {
                this.controller.continueSearch();
            });
        } else {
            console.log('ERROR:  start button element not found');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.setup();
});
