class TilePixel {
    constructor(tileX, tileY, width, height) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.coordX = tileX * width;
        this.coordY = tileY * height;
        this.width = width;
        this.height = height;
        this.entityStr = "";
        this.considered = false;
        this.inPath = false;
    }

    getCoord() {
        return [this.coordX, this.coordY];
    }

    getTileCoord() {
        return [this.tileX, this.tileY];
    }

    notify(stateObj) {
        this.updateState(stateObj);
    }

    draw(sketch) {
        this.drawOutline(sketch);
        if (this.considered) this.drawConsidered(sketch);
        if (this.inPath) this.drawInPath(sketch);
        if (this.entityStr.length > 0) {
            switch (this.entityStr.toLowerCase()) {
                case "wall":
                    this.drawFilled(sketch);
                    break;
                case "startpoint":
                    this.drawEllipse(sketch, "#dc143c");
                    break;
                case "endpoint":
                    this.drawEllipse(sketch, "#4169e1");
                    break;
                default:
                    this.drawFilled(sketch, "#ff7f50");
                    break;
            }
        }
    }

    drawConsidered(sketch) {
        let [x, y] = this.getCoord();
        sketch.fill("#fad6b1");
        sketch.rect(x, y, this.width, this.height);
    }

    drawInPath(sketch) {
        //TODO - draw a vertical or horizontal line, depending on the path
        let [x, y] = this.getCoord();
        //let midX = x + this.width / 2 - 1;
        let midY = y + this.height / 2 - 1;
        sketch.fill("#ff0000");
        sketch.rect(x, midY, this.width, 3);
    }

    drawOutline(sketch, fill = "#000000") {
        let [x, y] = this.getCoord();
        let dx = x + this.width;
        let dy = y + this.height;
        sketch.fill(fill);
        sketch.line(x, y, dx, y);
        sketch.line(x, y, x, dy);
        sketch.line(dx, dy, dx, y);
        sketch.line(dx, dy, x, dy);
    }

    drawFilled(sketch, fill = "#000000") {
        let [x, y] = this.getCoord();
        sketch.fill(fill);
        sketch.rect(x, y, this.width, this.height);
    }

    drawEllipse(sketch, fill = "#000000") {
        let [x, y] = this.getCoord();
        sketch.fill(fill);
        sketch.ellipse(x, y, this.width, this.height);
    }

    updateState(stateObj) {
        this.entityStr = stateObj.entity.getEntityType();
    }
}

export default TilePixel;
