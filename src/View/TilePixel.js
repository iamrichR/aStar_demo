class TilePixel {
    constructor(tileX, tileY, width, height) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.coordX = tileX * width;
        this.coordY = tileY * height;
        this.width = width;
        this.height = height;
        this.entityStr = "";
    }

    getCoord() {
        return [this.coordX, this.coordY];
    }

    notify(stateObj) {
        this.updateState(stateObj);
    }

    draw(sketch) {
        this.drawOutline(sketch);
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
