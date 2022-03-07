import ViewWindow from "./ViewWindow";
import TilemapPixelData from "./TilemapPixelData";

class View {
    constructor(sketch) {
        this.window = new ViewWindow(sketch);
        this.tilemap = new TilemapPixelData(this.window.canvas);
        sketch.background("#ffffff");
        sketch.ellipseMode(sketch.CORNER);
    }

    animateSearch(sketch) {
        console.log("animating");
    }

    getMapDetails() {
        return this.tilemap.getMapDetails();
    }

    getTile(mouseX, mouseY) {
        return this.tilemap.getTile(mouseX, mouseY);
    }

    draw(sketch) {
        sketch.background("#ffffff");
        this.tilemap.draw(sketch);
    }

    // windowResized() {
    //     console.log("window has been resized");
    //     let [width, height] = getCanvasDimensions();
    //     resizeCanvas(width, height);
    //     tiles.build();
    //     tiles.checkerboard();
    // }
}

export default View;
