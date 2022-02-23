class TilePixel {
    constructor(tileX, tileY, width, height) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.coordX = tileX * width;
        this.coordY = tileY * height;
        this.width = width;
        this.height = height;
        this.isWall = false;
        this.isOccupied = false;
        this.entity = null;
    }

    getCoord() {
        return [this.coordX, this.coordY];
    }

    notify(stateObj) {
        this.updateState(stateObj);
    }

    draw(sketch) {
        if (this.isWall) {
            this.drawFilled(sketch);
        } else if (this.isOccupied) {
            this.drawOutline(sketch);
            this.drawEntity(sketch);
        } else {
            this.drawOutline(sketch);
        }
    }

    drawOutline(sketch) {
        let [x, y] = this.getCoord();
        let dx = x + this.width;
        let dy = y + this.height;
        sketch.line(x, y, dx, y);
        sketch.line(x, y, x, dy);
        sketch.line(dx, dy, dx, y);
        sketch.line(dx, dy, x, dy);
    }

    drawFilled(sketch) {
        let [x, y] = this.getCoord();
        sketch.fill("#000000");
        sketch.rect(x, y, this.width, this.height);
    }

    drawEntity(sketch) {
        let [x, y] = this.getCoord();
        let drawProps = this.entity.getDrawProps();
        sketch.fill(drawProps.color);
        sketch.ellipse(x, y, this.width, this.height);
    }

    updateState(stateObj) {
        this.isWall = stateObj.isWall;
        this.isOccupied = stateObj.isOccupied;
    }
}

export default TilePixel;
