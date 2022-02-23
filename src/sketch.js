let app;

function setup() {
    app = new App["default"]();
}

function draw() {
    app.draw();
}

function windowResized() {
    app.windowResized();
}
