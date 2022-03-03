class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return [this.x, this.y];
    }

    getEntityType() {
        return this.constructor.name;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
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
}

export default Entity;
