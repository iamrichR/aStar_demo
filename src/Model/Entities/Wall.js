import Entity from "./Entity";

class Wall extends Entity {
    constructor(x, y) {
        super(x, y);
        this.isPassable = false;
    }
}

export default Wall;
