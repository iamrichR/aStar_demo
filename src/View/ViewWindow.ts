import p5 from "p5";
import resolutions from "./resolutions";

class ViewWindow {
    resolutions: { width: number; height: number }[];
    WIDTH_MAX: number;
    breakpoints: number[];
    width: number;
    height: number;
    canvas: p5.Renderer;

    constructor(sketch: p5) {
        this.resolutions = resolutions;
        this.WIDTH_MAX = 1000;
        this.breakpoints = [];

        this.resolutions.forEach((resolution) => {
            this.breakpoints.push(resolution.width / 2);
        });

        [this.width, this.height] = this.getCanvasDimensions();
        this.canvas = sketch.createCanvas(this.width, this.height);
    }

    getCanvasDimensions() {
        //default value just in case
        let [width, height] = [
            this.resolutions[0].width,
            this.resolutions[0].height,
        ];
        return [800, 600];
        // let delta = 0;
        // breakpoints.forEach((breakpoint, idx) => {
        //     delta =  - breakpoint;

        //     if (delta > 700) {
        //         width = this.resolutions[idx].width;
        //         height = this.resolutions[idx].height;
        //         return [width, height];
        //     }
        // });

        // return [width, height];
    }
}

export default ViewWindow;
