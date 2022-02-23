class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return [this.x, this.y];
    }

    move(directionStr, magnitude = 1) {
        let yDirection = 0;
        let xDirection = 0;
        switch (directionStr.toUpperCase()) {
            case "UP":
                yDirection = -1;
                break;
            case "DOWN":
                yDirection = 1;
                break;
            case "LEFT":
                xDirection = -1;
                break;
            case "RIGHT":
                xDirection = 1;
                break;
        }

        this.x += xDirection * magnitude;
        this.y += yDirection * magnitude;
    }

    getDrawProps() {
        let drawFunction = ellipse;
        let color = "#ff0000";

        return {
            drawFunction: drawFunction,
            color: color,
        };
    }
}

export default Entity;
