import TilePixel from "./TilePixel";

class ViewWindow {
    constructor(sketch) {
        this.resolutions = [
            {
                width: 256,
                height: 144,
            },
            {
                width: 320,
                height: 240,
            },
            {
                width: 480,
                height: 360,
            },
            {
                width: 640,
                height: 480,
            },
            {
                width: 1280,
                height: 720,
            },
        ];
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
