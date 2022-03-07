import ViewWindow from "./ViewWindow";
import TilemapPixelData from "./TilemapPixelData";

class View {
    constructor(sketch) {
        this.window = new ViewWindow(sketch);
        this.tilemap = new TilemapPixelData(this.window.canvas);
        sketch.background("#ffffff");
        sketch.ellipseMode(sketch.CORNER);
    }

    animateSearch(sketch, searchDetails) {
        console.log("animating");
        const path = searchDetails.path;
        const start = searchDetails.start;
        const end = searchDetails.end;
        let current = this.tilemap.getTile(start[0], start[1]);
        current.considered = true;
        current.inPath = true;

        for (let i = 0; i < path.length; i++) {
            current = this.tilemap.getAdjacent(path[i], current);
            current.considered = true;
            current.inPath = true;
        }
    }

    getMapDetails() {
        return this.tilemap.getMapDetails();
    }

    getTileFromMouse(mouseX, mouseY) {
        return this.tilemap.getTileFromPixelCoord(mouseX, mouseY);
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
